from rest_framework import serializers
from payroll.models import Deductions, Allowances



class DeductionSerializer(serializers.ModelSerializer): 
     class Meta:
          model = Deductions
          fields = ('id', 'code', 'name', 'description')
          read_only_fields = ('id',)


class AllowanceSerializer(serializers.ModelSerializer): 
     class Meta:
          model = Allowances
          fields = ('id', 'code', 'name', 'description', 'amount')
          read_only_fields = ('id',)