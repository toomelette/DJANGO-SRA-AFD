
from rest_framework import serializers
from payroll.models import Deductions, Allowances, PayrollRegular, PayrollRegularData, PayrollRegularDataDeductions, PayrollRegularDataAllowances
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
     deduction = DeductionSerializer(many=False)
     class Meta:
          model = PayrollRegularDataDeductions
          fields = ('id', 'deduction', 'code', 'name', 'description', 'amount')
          read_only_fields = ('id',)


class PayrollRegularDataSerializer(serializers.ModelSerializer):
     employee = EmployeeDetailsSerializer(many=False)
     station = StationSerializer(many=False)
     payrollRegularDataDeduc_payrollRegularData = PayrollRegularDataDeductionsSerializer(many=True)
     class Meta:
          model = PayrollRegularData
          fields = (
               'employee',
               'station',
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
               'payrollRegularDataDeduc_payrollRegularData'
          )
          read_only_fields = ('id', 'employee', 'station')


class PayrollRegularSerializer(serializers.ModelSerializer): 
     class Meta:
          model = PayrollRegular
          fields = ('id', 'name', 'description', 'process_date', 'updated_at')
          read_only_fields = ('id',)