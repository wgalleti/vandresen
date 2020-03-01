from dbbackup import utils
from dbbackup.db.base import get_connector
from django.http import HttpResponse
from django.utils.encoding import smart_str
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from financeiro.models import (
    Fazenda,
    Fornecedor,
    Movimento,
    ContasPagar,
    ContasReceber,
)
from financeiro.serializers import (
    FazendaSerializer,
    FornecedorSerializer,
    MovimentoSerializer,
    ContasPagarSerializer,
    ContasReceberSerializer,
)


class FazendaViewSet(viewsets.ModelViewSet):
    queryset = Fazenda.objects.all().order_by('pk')
    serializer_class = FazendaSerializer

    @action(methods=['get'], detail=False)
    def backup(self, request, pk=None):
        connector = get_connector('default')
        filename = connector.generate_filename()
        outputfile = connector.create_dump()
        compressed_file, filename = utils.compress_file(outputfile, filename)
        outputfile = compressed_file
        outputfile.seek(0)
        response = HttpResponse(
            outputfile.read(),
            content_type="application/x-gzip"
        )
        response['Content-Disposition'] = f'attachment; filename={filename}'
        response['X-Sendfile'] = smart_str(outputfile.read())
        return response


class FornecedorViewSet(viewsets.ModelViewSet):
    queryset = Fornecedor.objects.all().order_by('pk')
    serializer_class = FornecedorSerializer

    @action(methods=['get'], detail=False)
    def saldos(self, request, pk=None):
        fazenda = request.query_params.get('fazenda')
        dados = []
        for f in self.get_queryset():
            mvs = Movimento.objects.filter(fornecedor=f)
            if fazenda is not None:
                mvs = mvs.filter(fazenda_id=fazenda)

            dados.append(dict(
                id=f.pk,
                nome=f.nome,
                saldo=sum([m.valor2 for m in mvs])
            ))
        return Response(dados)

    @action(methods=['get'], detail=True)
    def saldo(self, request, pk=None):
        fornecedor = self.get_object()
        fazenda = request.query_params.get('fazenda')
        mvs = Movimento.objects.filter(fornecedor=fornecedor)
        if fazenda is not None:
            mvs = mvs.filter(fazenda_id=fazenda)

        dados = []
        for m in mvs:
            dados.append(dict(
                data=m.data,
                descricao=m.descricao,
                valor=m.valor2
            ))

        return Response(dados)


class MovimentoViewSet(viewsets.ModelViewSet):
    queryset = Movimento.objects.all().order_by('pk')
    serializer_class = MovimentoSerializer
    filter_fields = ('fazenda', 'fornecedor')

    @action(methods=['get'], detail=False)
    def pivot(self, request, pk=None):
        def _parser(data):
            def _change_titles(item):
                converte = {
                    'fazenda__nome': 'fazenda',
                    'fornecedor__nome': 'fornecedor',
                    'cliente__nome': 'fornecedor',
                    'baixado': 'pago',
                    'recebido': 'pago',
                    'data_entrega': 'data'
                }
                return {
                    converte.get(i[0], i[0]): i[1].title() if isinstance(i[1], str) else i[1]
                    for i in item.items()
                }

            def _convert_value(item):
                valor = item.get('valor', 0)
                tipo = 1 if item.get('Tipo') == 'Credito' else -1

                return {**item, 'valor': valor * tipo}

            return [_convert_value(_change_titles(d)) for d in data]

        movimentos = _parser(
            Movimento.objects.all().values('fazenda__nome', 'fornecedor__nome', 'data', 'tipo', 'baixado', 'valor'))
        contas_pagar = [{**c, 'tipo': Movimento.DEBITO} for c in
                        ContasPagar.objects.all().values('fazenda__nome', 'fornecedor__nome', 'data_entrega', 'pago',
                                                         'valor')]
        contas_pagar = _parser(contas_pagar)
        contas_receber = [{**c, 'tipo': Movimento.CREDITO} for c in
                          ContasReceber.objects.all().values('fazenda__nome', 'cliente__nome', 'data_entrega',
                                                             'recebido', 'valor')]
        contas_receber = _parser(contas_receber)

        return Response([*movimentos, *contas_pagar, *contas_receber])

    @action(methods=['get'], detail=False)
    def fornecedor(self, request, pk=None):
        fornecedor = request.query_params.get('fornecedor')
        qs = self.get_queryset()
        if fornecedor is not None:
            qs = qs.filter(fornecedor_id=fornecedor)
        return Response(self.get_serializer(qs, many=True).data)

    @action(methods=['get'], detail=False)
    def tipos(self, request, pk=None):
        tipos = [dict(id=s[0], nome=s[1].replace('_', ' ').title()) for s in Movimento.TIPOS]
        return Response(tipos)


class ContasPagarViewSet(viewsets.ModelViewSet):
    queryset = ContasPagar.objects.all().order_by('pk')
    serializer_class = ContasPagarSerializer


class ContasReceberViewSet(viewsets.ModelViewSet):
    queryset = ContasReceber.objects.all().order_by('pk')
    serializer_class = ContasReceberSerializer
