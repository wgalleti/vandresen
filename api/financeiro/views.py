from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from financeiro.models import (
    Fazenda,
    Fornecedor,
    Movimento,
)
from financeiro.serializers import (
    FazendaSerializer,
    FornecedorSerializer,
    MovimentoSerializer,
)


class FazendaViewSet(viewsets.ModelViewSet):
    queryset = Fazenda.objects.all().order_by('pk')
    serializer_class = FazendaSerializer


class FornecedorViewSet(viewsets.ModelViewSet):
    queryset = Fornecedor.objects.all().order_by('pk')
    serializer_class = FornecedorSerializer


class MovimentoViewSet(viewsets.ModelViewSet):
    queryset = Movimento.objects.all().order_by('pk')
    serializer_class = MovimentoSerializer

    @action(methods=['get'], detail=False)
    def tipos(self, request, pk=None):
        tipos = [dict(id=s[0], nome=s[1].replace('_', ' ').title()) for s in Movimento.TIPOS]
        return Response(tipos)
