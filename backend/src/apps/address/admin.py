from apps.address.models import Address
from django.contrib import admin


class AddressAdmin(admin.ModelAdmin):
    list_display = ("street", "city", "state", "country")
    search_fields = ("street", "city", "state", "country")


admin.site.register(Address, AddressAdmin)
