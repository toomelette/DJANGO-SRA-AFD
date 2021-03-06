# Generated by Django 3.1.5 on 2021-04-16 00:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('station', models.CharField(blank=True, max_length=20, null=True)),
                ('plantilla', models.CharField(blank=True, max_length=20, null=True)),
                ('employee_id', models.CharField(max_length=20, unique=True)),
                ('firstname', models.CharField(default='', max_length=100)),
                ('middlename', models.CharField(default='', max_length=100)),
                ('lastname', models.CharField(default='', max_length=100)),
                ('suffixname', models.CharField(blank=True, default='', max_length=100)),
                ('fullname', models.CharField(default='', max_length=200)),
                ('address_present', models.CharField(blank=True, default='', max_length=200)),
                ('address_permanent', models.CharField(blank=True, default='', max_length=200)),
                ('birthdate', models.DateField(blank=True, null=True)),
                ('place_of_birth', models.CharField(blank=True, default='', max_length=200)),
                ('sex', models.IntegerField(choices=[(0, 'N/A'), (1, 'MALE'), (2, 'FEMALE')], default=0)),
                ('civil_status', models.IntegerField(choices=[(0, 'N/A'), (1, 'SINGLE'), (2, 'MARRIED'), (3, 'WIDOW')], default=0)),
                ('tel_no', models.CharField(blank=True, default='', max_length=50)),
                ('cell_no', models.CharField(blank=True, default='', max_length=50)),
                ('email_address', models.EmailField(blank=True, default='', max_length=100)),
                ('spouse_name', models.CharField(blank=True, default='', max_length=200)),
                ('spouse_occupation', models.CharField(blank=True, default='', max_length=200)),
                ('no_of_children', models.PositiveIntegerField(default=0)),
                ('height', models.CharField(blank=True, default='', max_length=20)),
                ('weight', models.CharField(blank=True, default='', max_length=20)),
                ('religion', models.CharField(blank=True, default='', max_length=100)),
                ('blood_type', models.CharField(blank=True, default='', max_length=20)),
                ('position', models.CharField(blank=True, default='', max_length=200)),
                ('is_active', models.BooleanField(default=None, null=True)),
                ('salary_grade', models.PositiveIntegerField(default=0)),
                ('step_increment', models.PositiveIntegerField(default=0)),
                ('application_status', models.IntegerField(choices=[(0, 'N/A'), (1, 'PERMANENT'), (2, 'CONTRACT OF SERVICE')], default=0)),
                ('tax_status', models.CharField(blank=True, default='', max_length=20)),
                ('monthly_salary', models.DecimalField(decimal_places=2, default=0, max_digits=13)),
                ('level', models.CharField(default='', max_length=20)),
                ('firstday_gov', models.DateField(null=True)),
                ('firstday_sra', models.DateField(null=True)),
                ('first_appointment', models.DateField(null=True)),
                ('last_appointment', models.DateField(null=True)),
                ('last_step_increment', models.DateField(null=True)),
                ('last_adjustment', models.DateField(null=True)),
                ('last_promotion', models.DateField(null=True)),
                ('original_appointment', models.DateField(null=True)),
                ('adjustment_date', models.DateField(null=True)),
                ('tin', models.CharField(blank=True, default='', max_length=50)),
                ('gsis', models.CharField(blank=True, default='', max_length=50)),
                ('philhealth', models.CharField(blank=True, default='', max_length=50)),
                ('pagibig', models.CharField(blank=True, default='', max_length=50)),
                ('sss', models.CharField(blank=True, default='', max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='employee_created_by_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Station',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('station_id', models.CharField(max_length=20, unique=True)),
                ('name', models.CharField(default='', max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='station_created_by_user', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='station_updated_by_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Plantilla',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('station', models.CharField(blank=True, max_length=20, null=True)),
                ('plantilla_id', models.CharField(max_length=20, unique=True)),
                ('title', models.CharField(max_length=200)),
                ('salary_grade', models.PositiveIntegerField(default=0)),
                ('step_increment', models.PositiveIntegerField(default=0)),
                ('monthly_salary', models.DecimalField(decimal_places=2, default=0, max_digits=13)),
                ('required_eligibility', models.CharField(max_length=200)),
                ('required_education', models.CharField(max_length=200)),
                ('appointment_status', models.IntegerField(choices=[(1, 'PERMANENT'), (2, 'CO-TERMINUS')], default=0)),
                ('appointment_date', models.DateField(null=True)),
                ('promotion_date', models.DateField(null=True)),
                ('is_open', models.BooleanField(default=False)),
                ('plantilla_date', models.DateField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='plantilla_created_by_user', to=settings.AUTH_USER_MODEL)),
                ('station_link', models.ForeignKey(db_column='station_id', default=None, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='plantilla_station', to='employee.station')),
                ('updated_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='plantilla_updated_by_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='EmployeeTrainings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='', max_length=200)),
                ('category', models.CharField(default='', max_length=100)),
                ('date_from', models.DateField(null=True)),
                ('date_to', models.DateField(null=True)),
                ('hours', models.DecimalField(decimal_places=2, default='', max_digits=5)),
                ('conducted_by', models.CharField(default='', max_length=200)),
                ('venue', models.CharField(default='', max_length=200)),
                ('remarks', models.CharField(default='', max_length=200)),
                ('is_relevant', models.BooleanField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='employeeTRNG_created_by_user', to=settings.AUTH_USER_MODEL)),
                ('employee', models.ForeignKey(db_column='employee_id', on_delete=django.db.models.deletion.CASCADE, related_name='employeeTRNG_employee', to='employee.employee')),
                ('updated_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='employeeTRNG_updated_by_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='EmployeeServiceRecords',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('seq', models.IntegerField(default=0)),
                ('date_from', models.CharField(default='', max_length=50)),
                ('date_to', models.CharField(default='', max_length=50)),
                ('position', models.CharField(default='', max_length=100)),
                ('appointment_status', models.CharField(default='', max_length=50)),
                ('salary', models.DecimalField(decimal_places=2, default=0, max_digits=13)),
                ('mode_of_payment', models.CharField(default='', max_length=50)),
                ('station', models.CharField(default='', max_length=50)),
                ('gov_serve', models.CharField(default='', max_length=50)),
                ('psc_serve', models.CharField(default='', max_length=50)),
                ('lwp', models.CharField(default='', max_length=20)),
                ('sp_date', models.CharField(default='', max_length=20)),
                ('status', models.CharField(default='', max_length=100)),
                ('remarks', models.CharField(default='', max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='employeeSR_created_by_user', to=settings.AUTH_USER_MODEL)),
                ('employee', models.ForeignKey(db_column='employee_id', on_delete=django.db.models.deletion.CASCADE, related_name='employeeSR_employee', to='employee.employee')),
                ('updated_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='employeeSR_updated_by_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='EmployeeEligibility',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('eligibility', models.CharField(default='', max_length=200)),
                ('level', models.CharField(default='', max_length=100)),
                ('rating', models.DecimalField(decimal_places=2, default=0, max_digits=5)),
                ('exam_place', models.CharField(default='', max_length=200)),
                ('exam_date', models.DateField(null=True)),
                ('license_no', models.CharField(default='', max_length=50)),
                ('license_validity', models.DateField(null=True)),
                ('employee', models.ForeignKey(db_column='employee_id', on_delete=django.db.models.deletion.CASCADE, related_name='employeeELIG_employee', to='employee.employee')),
            ],
        ),
        migrations.CreateModel(
            name='EmployeeEducationalBackground',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.CharField(default='', max_length=100)),
                ('school', models.CharField(default='', max_length=200)),
                ('course', models.CharField(default='', max_length=200)),
                ('date_from', models.CharField(default='', max_length=200)),
                ('date_to', models.CharField(default='', max_length=200)),
                ('units', models.DecimalField(decimal_places=2, default=0, max_digits=5)),
                ('graduate_year', models.CharField(default='', max_length=20)),
                ('scholarship', models.CharField(default='', max_length=200)),
                ('honor', models.CharField(default='', max_length=200)),
                ('employee', models.ForeignKey(db_column='employee_id', on_delete=django.db.models.deletion.CASCADE, related_name='employeeEB_employee', to='employee.employee')),
            ],
        ),
        migrations.AddField(
            model_name='employee',
            name='plantilla_link',
            field=models.ForeignKey(db_column='plantilla_id', default=None, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='employee_plantilla', to='employee.plantilla', unique=True),
        ),
        migrations.AddField(
            model_name='employee',
            name='station_link',
            field=models.ForeignKey(db_column='station_id', default=None, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='employee_station', to='employee.station'),
        ),
        migrations.AddField(
            model_name='employee',
            name='updated_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='employee_updated_by_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
