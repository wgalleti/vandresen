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

    def __str__(self):
        return f'{self.pk}'
