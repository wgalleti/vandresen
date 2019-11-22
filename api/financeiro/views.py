from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from financeiro.models import (
    Fazenda,
    Fornecedor,
    Movimento,
    ContasPagar)
from financeiro.serializers import (
    FazendaSerializer,
    FornecedorSerializer,
    MovimentoSerializer,
    ContasPagarSerializer)


class FazendaViewSet(viewsets.ModelViewSet):
    queryset = Fazenda.objects.all().order_by('pk')
    serializer_class = FazendaSerializer


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
