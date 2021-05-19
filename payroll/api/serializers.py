from rest_framework import serializers
from payroll.models import Deductions



class DeductionListSerializer(serializers.ModelSerializer): 
     class Meta:
          model = Deductions
          fields = ('id', 'code', 'name', 'description')