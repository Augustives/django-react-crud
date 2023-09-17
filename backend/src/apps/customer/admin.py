from apps.customer.models import Customer
from django.contrib import admin


class CustomerAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "identifier", "identifier_type")
    search_fields = ("id", "name", "identifier", "identifier_type")


admin.site.register(Customer, CustomerAdmin)
