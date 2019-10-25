from rest_framework import serializers
from financeiro.models import (
    Fazenda,
    Fornecedor,
    Movimento,
)


class FazendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fazenda
        fields = '__all__'


class FornecedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fornecedor
        fields = '__all__'


class MovimentoSerializer(serializers.ModelSerializer):
    valor2 = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)

    class Meta:
        model = Movimento
        fields = '__all__'
