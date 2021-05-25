from rest_framework import serializers
from payroll.models import Deductions, Allowances, Template, TemplateData, TemplateDataAllowances, TemplateDataDeductions
from employee.api.serializers import EmployeeDetailsSerializer, StationSerializer

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


class TemplateDataDeductionsSerializer(serializers.ModelSerializer):
     deduction = DeductionSerializer(many=False)
     class Meta:
          model = TemplateDataDeductions
          fields = ('id', 'deduction', 'code', 'name', 'description', 'amount')
          read_only_fields = ('id',)


class TemplateDataSerializer(serializers.ModelSerializer):
     employee = EmployeeDetailsSerializer(many=False)
     station = StationSerializer(many=False)
     templateDataDeduc_templateData = TemplateDataDeductionsSerializer(many=True)
     class Meta:
          model = TemplateData
          fields = (
               'employee',
               'station',
               'id', 
               'template_id',
               'employee_no',
               'station_no',
               'paygroup' ,
               'fullname',
               'position',
               'salary_grade',
               'step_increment',
               'monthly_salary',
               'plantilla_item',
               'status',
               'is_atm',
               'atm_account_no',
               'tin',
               'gsis',
               'philhealth',
               'pagibig',
               'sss',
               'templateDataDeduc_templateData'
          )
          read_only_fields = ('id', 'employee', 'station')


class TemplateSerializer(serializers.ModelSerializer): 
     class Meta:
          model = Template
          fields = ('id', 'name', 'description', 'process_date', 'updated_at')
          read_only_fields = ('id',)