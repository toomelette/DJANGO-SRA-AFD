from rest_framework import serializers

from employee.models import (
    Employee, 
)



class EmployeeSerializer(serializers.ModelSerializer): 

    class Meta:
        model = Employee
        fields = ('id', 'employee_id', 'fullname', 'position', 'is_active')
        