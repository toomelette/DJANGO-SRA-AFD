from django.db import models
from django.contrib.auth.models import User
from employee.models import Employee, Station


class Deductions(models.Model):
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200, default="")
    description = models.CharField(max_length=200, default="", blank=True)
    created_by = models.ForeignKey(User, related_name='deductions_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='deductions_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class Allowances(models.Model):
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200, default="")
    description = models.CharField(max_length=200, default="", blank=True)
    created_by = models.ForeignKey(User, related_name='allowances_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='allowances_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class Template(models.Model):
    PAYGROUP_TYPES = ( (0,'N/A'), (1,'Male'), (2,'Female') )
    STATUS_TYPES = ( (0,'N/A'), (1,'REGULAR'), (2,'COS') )
    employee = models.ForeignKey(Employee, db_column="employee_id", related_name='payrollTemplate_employee', on_delete=models.PROTECT)
    employee_no = models.CharField(max_length=20, default="")
    station = models.ForeignKey(Station, db_column="station_id", related_name='payrollTemplate_station', on_delete=models.PROTECT)
    station_no = models.CharField(max_length=20, default="")
    fullname = models.CharField(max_length=20, default="")
    position = models.CharField(max_length=200, default="")
    salary_grade = models.PositiveIntegerField(default=0)
    step_increment = models.PositiveIntegerField(default=0)
    monthly_salary = models.DecimalField(max_digits=13, decimal_places=2, default=0)
    effective_date =  models.DateField(null=True)
    plantilla_item = models.CharField(max_length=20, default="")
    paygroup = models.IntegerField(choices=PAYGROUP_TYPES, default=0)
    status = models.IntegerField(choices=STATUS_TYPES, default=0)
    is_atm = models.BooleanField(null=True, default=None)
    atm_account_no = models.BooleanField(null=True, default=None)
    tin = models.CharField(max_length=50, default="", blank=True)
    gsis = models.CharField(max_length=50, default="", blank=True)
    philhealth = models.CharField(max_length=50, default="", blank=True)
    pagibig = models.CharField(max_length=50, default="", blank=True)
    sss = models.CharField(max_length=50, default="", blank=True)
    process_date = models.DateField(null=True)
    created_by = models.ForeignKey(User, related_name='template_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='template_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class TemplateDeductions(models.Model):
    template = models.ForeignKey(Template, db_column="template_id", related_name='payrollTD_template', on_delete=models.CASCADE)
    deduction = models.ForeignKey(Deductions, db_column="deduction_id", related_name='payrollTD_deduction', on_delete=models.PROTECT)
    code = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=13, decimal_places=2, default=0, blank=True)
    name = models.CharField(max_length=200, default="", blank=True)
    description = models.CharField(max_length=200, default="", blank=True)


class TemplateAllowances(models.Model):
    template = models.ForeignKey(Template, db_column="template_id", related_name='payrollTA_template', on_delete=models.CASCADE)
