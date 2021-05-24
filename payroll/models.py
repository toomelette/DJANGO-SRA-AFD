from django.db import models
from django.contrib.auth.models import User
from employee.models import Employee, Station


class Deductions(models.Model):
    code = models.CharField(max_length=50, default="")
    name = models.CharField(max_length=200, default="")
    description = models.CharField(max_length=200, default="", blank=True)
    created_by = models.ForeignKey(User, related_name='deductions_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='deductions_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class Allowances(models.Model):
    code = models.CharField(max_length=50, default="")
    name = models.CharField(max_length=200, default="")
    description = models.CharField(max_length=200, default="", blank=True)
    amount = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    created_by = models.ForeignKey(User, related_name='allowances_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='allowances_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class Template(models.Model):
    process_date = models.DateField(null=True)
    created_by = models.ForeignKey(User, related_name='template_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='template_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class TemplateData(models.Model):
    PAYGROUP_TYPES = ( (0,'N/A'), (1,'Pay with ATM'), (2,'Pay with Check'), (3,'COS') )
    STATUS_TYPES = ( (0,'N/A'), (1,'REGULAR'), (2,'COS') )
    template = models.ForeignKey(Template, db_column="template_id", related_name='templateData_template', on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, db_column="employee_id", related_name='templateData_employee', null=True, on_delete=models.PROTECT)
    station = models.ForeignKey(Station, db_column="station_id", related_name='templateData_station', null=True, on_delete=models.PROTECT)
    employee_no = models.CharField(max_length=20, default="")
    station_no = models.CharField(max_length=20, default="")
    paygroup = models.IntegerField(choices=PAYGROUP_TYPES, default=0)
    fullname = models.CharField(max_length=200, default="")
    position = models.CharField(max_length=200, default="")
    salary_grade = models.PositiveIntegerField(default=0)
    step_increment = models.PositiveIntegerField(default=0)
    monthly_salary = models.DecimalField(max_digits=13, decimal_places=2, default=0)
    plantilla_item = models.CharField(max_length=20, default="")
    status = models.IntegerField(choices=STATUS_TYPES, default=0)
    is_atm = models.BooleanField(null=True, default=None)
    atm_account_no = models.CharField(max_length=50, default="")
    tin = models.CharField(max_length=50, default="", blank=True)
    gsis = models.CharField(max_length=50, default="", blank=True)
    philhealth = models.CharField(max_length=50, default="", blank=True)
    pagibig = models.CharField(max_length=50, default="", blank=True)
    sss = models.CharField(max_length=50, default="", blank=True)
    created_by = models.ForeignKey(User, related_name='templateData_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='templateData_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class TemplateDataDeductions(models.Model):
    template_data = models.ForeignKey(TemplateData, db_column="template_data_id", related_name='templateDataDeduc_templateData', on_delete=models.CASCADE)
    deduction = models.ForeignKey(Deductions, db_column="deduction_id", related_name='templateDataDeduc_deduction', on_delete=models.PROTECT)
    code = models.CharField(max_length=50)
    name = models.CharField(max_length=200, default="", blank=True)
    description = models.CharField(max_length=200, default="", blank=True)
    amount = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)


class TemplateDataAllowances(models.Model):
    template_data = models.ForeignKey(TemplateData, db_column="template_data_id", related_name='templateDataAllow_templateData', on_delete=models.CASCADE)
    allowance = models.ForeignKey(Allowances, db_column="allowance_id", related_name='templateDataAllow_allowance', on_delete=models.PROTECT)
    code = models.CharField(max_length=50)
    name = models.CharField(max_length=200, default="", blank=True)
    description = models.CharField(max_length=200, default="", blank=True)
    amount = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)


class Payroll(models.Model):
    process_date = models.DateField(null=True)
    created_by = models.ForeignKey(User, related_name='payroll_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='payroll_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class PayrollData(models.Model):
    PAYGROUP_TYPES = ( (0,'N/A'), (1,'Pay with ATM'), (2,'Pay with Check'), (3,'COS') )
    STATUS_TYPES = ( (0,'N/A'), (1,'REGULAR'), (2,'COS') )
    payroll = models.ForeignKey(Payroll, db_column="payroll_id", related_name='payrollData_payroll', on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, db_column="employee_id", related_name='payrollData_employee', on_delete=models.PROTECT)
    station = models.ForeignKey(Station, db_column="station_id", related_name='payrollData_station', on_delete=models.PROTECT)
    employee_no = models.CharField(max_length=20, default="")
    station_no = models.CharField(max_length=20, default="")
    paygroup = models.IntegerField(choices=PAYGROUP_TYPES, default=0)
    fullname = models.CharField(max_length=200, default="")
    position = models.CharField(max_length=200, default="")
    salary_grade = models.PositiveIntegerField(default=0)
    step_increment = models.PositiveIntegerField(default=0)
    monthly_salary = models.DecimalField(max_digits=13, decimal_places=2, default=0)
    plantilla_item = models.CharField(max_length=20, default="")
    status = models.IntegerField(choices=STATUS_TYPES, default=0)
    is_atm = models.BooleanField(null=True, default=None)
    atm_account_no = models.CharField(max_length=50, default="")
    tin = models.CharField(max_length=50, default="", blank=True)
    gsis = models.CharField(max_length=50, default="", blank=True)
    philhealth = models.CharField(max_length=50, default="", blank=True)
    pagibig = models.CharField(max_length=50, default="", blank=True)
    sss = models.CharField(max_length=50, default="", blank=True)
    created_by = models.ForeignKey(User, related_name='payrollData_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='payrollData_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class PayrollDataDeductions(models.Model):
    payroll_data = models.ForeignKey(PayrollData, db_column="payroll_data_id", related_name='payrollDataDeduc_payrollData', on_delete=models.CASCADE)
    deduction = models.ForeignKey(Deductions, db_column="deduction_id", related_name='payrollDataDeduc_deduction', on_delete=models.PROTECT)
    code = models.CharField(max_length=50)
    name = models.CharField(max_length=200, default="", blank=True)
    description = models.CharField(max_length=200, default="", blank=True)
    amount = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)


class PayrollDataAllowances(models.Model):
    payroll_data = models.ForeignKey(PayrollData, db_column="payroll_data_id", related_name='payrollDataAllow_payrollData', on_delete=models.CASCADE)
    allowance = models.ForeignKey(Allowances, db_column="allowance_id", related_name='payrollDataAllow_allowance', on_delete=models.PROTECT)
    code = models.CharField(max_length=50)
    name = models.CharField(max_length=200, default="", blank=True)
    description = models.CharField(max_length=200, default="", blank=True)
    amount = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)


class Mock(models.Model):
    template_id = models.CharField(max_length=50)
    d1 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d2 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d3 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d4 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d5 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d6 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d7 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d7oldbir = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d8 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d9 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d10 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d11 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d12 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d13 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d14 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d15 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d16 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d17 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d18 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d19 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d20 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d21 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d22 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d23 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d24 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d25 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d26 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d27 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d28 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d29 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d30 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d31 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d32 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d33 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d34 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d35 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d36 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d37 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d38 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d39 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d40 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d41 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d42 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d43 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d44 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d45 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d46 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d47 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d48 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d49 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d50 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d51 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d52 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d53 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d54 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d55 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    d56 = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)


