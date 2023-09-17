from django.db.models import TextChoices


class IdentifierType(TextChoices):
    CPF = "CPF"
    CNPJ = "CNPJ"
