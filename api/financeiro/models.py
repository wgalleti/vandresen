from django.db import models


class Fazenda(models.Model):
    nome = models.CharField(max_length=50)
    cpf_cnpj = models.CharField(
        max_length=20,
        unique=True
    )

    def __str__(self):
        return self.nome


class Fornecedor(models.Model):
    nome = models.CharField(max_length=70)
    rg_ie = models.CharField(
        max_length=20,
        null=True,
        blank=True
    )
    cpf_cnpj = models.CharField(
        max_length=20,
        unique=True
    )
    endereco = models.TextField(
        null=True,
        blank=True
    )
    telefone = models.CharField(
        max_length=20,
        null=True,
        blank=True
    )
    email = models.EmailField(
        null=True,
        blank=True
    )
    banco = models.CharField(
        max_length=50,
        null=True,
        blank=True
    )
    agencia = models.CharField(
        max_length=50,
        null=True,
        blank=True
    )
    conta = models.CharField(
        max_length=50,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.nome


class Movimento(models.Model):
    DEBITO = 'debito'
    CREDITO = 'credito'

    TIPOS = (
        (DEBITO, 'Débito'),
        (CREDITO, 'Crédito')
    )

    fazenda = models.ForeignKey(
        to='financeiro.Fazenda',
        on_delete=models.DO_NOTHING
    )
    fornecedor = models.ForeignKey(
        to='financeiro.Fornecedor',
        on_delete=models.DO_NOTHING
    )
    data = models.DateField()
    valor = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0
    )
    descricao = models.TextField()
    documento = models.CharField(
        max_length=50,
        null=True,
        blank=True
    )
    tipo = models.CharField(
        max_length=20,
        choices=TIPOS,
        default=DEBITO
    )
    usuario = models.ForeignKey(
        to='auth.User',
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True
    )
    criado_em = models.DateTimeField(auto_now_add=True)
    editado_em = models.DateTimeField(auto_now=True)
    baixado = models.BooleanField(
        default=False
    )

    @property
    def valor2(self):
        return self.valor if self.tipo == Movimento.CREDITO else self.valor * -1

    def __str__(self):
        return f'{self.pk}'


class ContasPagar(models.Model):
    fazenda = models.ForeignKey(
        to='financeiro.Fazenda',
        on_delete=models.DO_NOTHING
    )
    fornecedor = models.ForeignKey(
        to='financeiro.Fornecedor',
        on_delete=models.DO_NOTHING
    )
    documento = models.CharField(
        max_length=50
    )
    data_entrega = models.DateField()
    data_pagamento = models.DateField()
    descricao = models.CharField(
        max_length=100
    )
    valor = models.DecimalField(
        max_digits=15,
        decimal_places=2
    )
    observacao = models.TextField(
        null=True,
        blank=True
    )
    pago = models.BooleanField(
        default=False
    )


class ContasReceber(models.Model):
    fazenda = models.ForeignKey(
        to='financeiro.Fazenda',
        on_delete=models.DO_NOTHING
    )
    cliente = models.ForeignKey(
        to='financeiro.Fornecedor',
        on_delete=models.DO_NOTHING
    )
    documento = models.CharField(
        max_length=50
    )
    data_entrega = models.DateField()
    data_recebimento = models.DateField()
    descricao = models.CharField(
        max_length=100
    )
    valor = models.DecimalField(
        max_digits=15,
        decimal_places=2
    )
    observacao = models.TextField(
        null=True,
        blank=True
    )
    recebido = models.BooleanField(
        default=False
    )
