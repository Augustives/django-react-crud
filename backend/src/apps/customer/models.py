import uuid

from apps.address.models import Address
from apps.customer.constants import IdentifierType
from django.db import models
from utils.fields import ApiCharField


class Customer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = ApiCharField(
        max_length=128,
        null=False,
        blank=False,
    )
    identifier = ApiCharField(null=False, blank=False, max_length=32, db_index=True)
    identifier_type = ApiCharField(
        null=False, blank=False, max_length=4, choices=IdentifierType.choices
    )

    address = models.ForeignKey(
        Address, verbose_name="Addresses", on_delete=models.PROTECT
    )
