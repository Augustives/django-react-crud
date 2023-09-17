import uuid

from apps.address.constants import Country
from django.db import models
from utils.fields import ApiCharField


class Address(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    country = ApiCharField(
        null=False, blank=False, max_length=2, choices=Country.choices
    )
    state = ApiCharField(max_length=64, null=False, blank=False)
    city = ApiCharField(max_length=64, null=False, blank=False)
    street = ApiCharField(max_length=256, null=False, blank=False)
    postal_code = ApiCharField(max_length=32, null=False, blank=False)
    additional_info = ApiCharField(max_length=256, null=False, blank=True)

    class Meta:
        verbose_name_plural = "Addresses"

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state}, {self.country}"
