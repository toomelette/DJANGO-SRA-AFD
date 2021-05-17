from django.db import models
from django.contrib.auth.models import User


class Deductions(models.Model):
    code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=200, default="")
    description = models.CharField(max_length=200, default="", blank=True)
    created_by = models.ForeignKey(User, related_name='deductions_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='deductions_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
