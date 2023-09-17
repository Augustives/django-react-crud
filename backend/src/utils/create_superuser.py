import os

from apps.customer.models import Customer
from django.contrib.auth import get_user_model
from django.db import IntegrityError

try:
    superuser = get_user_model().objects.create_superuser(
        email=os.environ.get("SUPER_USER_EMAIL", default="admin@gmail.com"),
        password=os.environ.get("SUPER_USER_PASSWORD", default="admin"),
        customer=Customer.objects.get(id="a9b1c2d3-4567-8910-1112-131415161718"),
    )
    superuser.save()
except IntegrityError:
    print(f"Failed to automatically create super user!")
