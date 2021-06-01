
from rest_framework import serializers
from payroll.models import (
     Deductions, 
     Allowances, 
     PayrollRegular, 
     PayrollRegularData, 
     PayrollRegularDataDeductions, 
     PayrollRegularDataAllowances
)
from employee.api.serializers import EmployeeDetailsSerializer, StationSerializer


class DeductionSerializer(serializers.ModelSerializer): 
     class Meta:
          model = Deductions
          fields = ('id', 'code', 'name', 'description')
          read_only_fields = ('id',)


class AllowanceSerializer(serializers.ModelSerializer): 
     class Meta:
          model = Allowances
          fields = ('id', 'code', 'name', 'description')
          read_only_fields = ('id',)


class PayrollRegularDataDeductionsSerializer(serializers.ModelSerializer):
     class Meta:
          model = PayrollRegularDataDeductions
          fields = ('id', 'code', 'name', 'description', 'amount')
          read_only_fields = ('id',)


class PayrollRegularDataAllowancesSerializer(serializers.ModelSerializer):
     class Meta:
          model = PayrollRegularDataAllowances
          fields = ('id', 'code', 'name', 'description', 'amount')
          read_only_fields = ('id',)


class PayrollRegularDataSerializer(serializers.ModelSerializer):
     payrollRegularDataDeduc_payrollRegularData = PayrollRegularDataDeductionsSerializer(many=True)
     payrollRegularDataAllow_payrollRegularData = PayrollRegularDataAllowancesSerializer(many=True)
     class Meta:
          model = PayrollRegularData
          fields = (
               'id', 
               'payroll_regular_id',
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
               'payrollRegularDataDeduc_payrollRegularData',
               'payrollRegularDataAllow_payrollRegularData'
          )
          read_only_fields = ('id',)


class PayrollRegularSerializer(serializers.ModelSerializer): 
     class Meta:
          model = PayrollRegular
          fields = ('id', 'description', 'remarks', 'process_date', 'updated_at')
          read_only_fields = ('id',)