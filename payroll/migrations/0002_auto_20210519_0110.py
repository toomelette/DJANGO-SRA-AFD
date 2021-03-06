# Generated by Django 3.1.5 on 2021-05-19 01:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('employee', '0016_auto_20210515_0912'),
        ('payroll', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Allowances',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=50, unique=True)),
                ('name', models.CharField(default='', max_length=200)),
                ('description', models.CharField(blank=True, default='', max_length=200)),
                ('amount', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=13)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='payrollAllowances_created_by_user', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='payrollAllowances_updated_by_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Payroll',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('employee_no', models.CharField(default='', max_length=20)),
                ('station_no', models.CharField(default='', max_length=20)),
                ('fullname', models.CharField(default='', max_length=20)),
                ('position', models.CharField(default='', max_length=200)),
                ('salary_grade', models.PositiveIntegerField(default=0)),
                ('step_increment', models.PositiveIntegerField(default=0)),
                ('monthly_salary', models.DecimalField(decimal_places=2, default=0, max_digits=13)),
                ('effective_date', models.DateField(null=True)),
                ('plantilla_item', models.CharField(default='', max_length=20)),
                ('paygroup', models.IntegerField(choices=[(0, 'N/A'), (1, 'Male'), (2, 'Female')], default=0)),
                ('status', models.IntegerField(choices=[(0, 'N/A'), (1, 'REGULAR'), (2, 'COS')], default=0)),
                ('is_atm', models.BooleanField(default=None, null=True)),
                ('atm_account_no', models.BooleanField(default=None, null=True)),
                ('tin', models.CharField(blank=True, default='', max_length=50)),
                ('gsis', models.CharField(blank=True, default='', max_length=50)),
                ('philhealth', models.CharField(blank=True, default='', max_length=50)),
                ('pagibig', models.CharField(blank=True, default='', max_length=50)),
                ('sss', models.CharField(blank=True, default='', max_length=50)),
                ('process_date', models.DateField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='payrollPayroll_created_by_user', to=settings.AUTH_USER_MODEL)),
                ('employee', models.ForeignKey(db_column='employee_id', on_delete=django.db.models.deletion.PROTECT, related_name='payrollPayroll_employee', to='employee.employee')),
                ('station', models.ForeignKey(db_column='station_id', on_delete=django.db.models.deletion.PROTECT, related_name='payrollPayroll_station', to='employee.station')),
                ('updated_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='payrollPayroll_updated_by_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Template',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('employee_no', models.CharField(default='', max_length=20)),
                ('station_no', models.CharField(default='', max_length=20)),
                ('fullname', models.CharField(default='', max_length=20)),
                ('position', models.CharField(default='', max_length=200)),
                ('salary_grade', models.PositiveIntegerField(default=0)),
                ('step_increment', models.PositiveIntegerField(default=0)),
                ('monthly_salary', models.DecimalField(decimal_places=2, default=0, max_digits=13)),
                ('effective_date', models.DateField(null=True)),
                ('plantilla_item', models.CharField(default='', max_length=20)),
                ('paygroup', models.IntegerField(choices=[(0, 'N/A'), (1, 'Male'), (2, 'Female')], default=0)),
                ('status', models.IntegerField(choices=[(0, 'N/A'), (1, 'REGULAR'), (2, 'COS')], default=0)),
                ('is_atm', models.BooleanField(default=None, null=True)),
                ('atm_account_no', models.BooleanField(default=None, null=True)),
                ('tin', models.CharField(blank=True, default='', max_length=50)),
                ('gsis', models.CharField(blank=True, default='', max_length=50)),
                ('philhealth', models.CharField(blank=True, default='', max_length=50)),
                ('pagibig', models.CharField(blank=True, default='', max_length=50)),
                ('sss', models.CharField(blank=True, default='', max_length=50)),
                ('process_date', models.DateField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='payrollTemplate_created_by_user', to=settings.AUTH_USER_MODEL)),
                ('employee', models.ForeignKey(db_column='employee_id', on_delete=django.db.models.deletion.PROTECT, related_name='payrollTemplate_employee', to='employee.employee')),
                ('station', models.ForeignKey(db_column='station_id', on_delete=django.db.models.deletion.PROTECT, related_name='payrollTemplate_station', to='employee.station')),
                ('updated_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='payrollTemplate_updated_by_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterField(
            model_name='deductions',
            name='code',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='deductions',
            name='created_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='payrollDeductions_created_by_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='deductions',
            name='updated_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='payrollDeductions_updated_by_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='TemplateDeductions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=50)),
                ('name', models.CharField(blank=True, default='', max_length=200)),
                ('description', models.CharField(blank=True, default='', max_length=200)),
                ('amount', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=13)),
                ('deduction', models.ForeignKey(db_column='deduction_id', on_delete=django.db.models.deletion.PROTECT, related_name='payrollTD_deduction', to='payroll.deductions')),
                ('template', models.ForeignKey(db_column='template_id', on_delete=django.db.models.deletion.CASCADE, related_name='payrollTD_template', to='payroll.template')),
            ],
        ),
        migrations.CreateModel(
            name='TemplateAllowances',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=50)),
                ('name', models.CharField(blank=True, default='', max_length=200)),
                ('description', models.CharField(blank=True, default='', max_length=200)),
                ('amount', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=13)),
                ('allowance', models.ForeignKey(db_column='allowance_id', on_delete=django.db.models.deletion.PROTECT, related_name='payrollTA_allowance', to='payroll.allowances')),
                ('template', models.ForeignKey(db_column='template_id', on_delete=django.db.models.deletion.CASCADE, related_name='payrollTA_template', to='payroll.template')),
            ],
        ),
        migrations.CreateModel(
            name='PayrollDeductions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=50)),
                ('name', models.CharField(blank=True, default='', max_length=200)),
                ('description', models.CharField(blank=True, default='', max_length=200)),
                ('amount', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=13)),
                ('deduction', models.ForeignKey(db_column='deduction_id', on_delete=django.db.models.deletion.PROTECT, related_name='payrollPD_deduction', to='payroll.deductions')),
                ('payroll', models.ForeignKey(db_column='payroll_id', on_delete=django.db.models.deletion.CASCADE, related_name='payrollPD_payroll', to='payroll.payroll')),
            ],
        ),
        migrations.CreateModel(
            name='PayrollAllowances',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=50)),
                ('name', models.CharField(blank=True, default='', max_length=200)),
                ('description', models.CharField(blank=True, default='', max_length=200)),
                ('amount', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=13)),
                ('allowance', models.ForeignKey(db_column='allowance_id', on_delete=django.db.models.deletion.PROTECT, related_name='payrollPA_allowance', to='payroll.allowances')),
                ('payroll', models.ForeignKey(db_column='payroll_id', on_delete=django.db.models.deletion.CASCADE, related_name='payrollPA_payroll', to='payroll.payroll')),
            ],
        ),
    ]
