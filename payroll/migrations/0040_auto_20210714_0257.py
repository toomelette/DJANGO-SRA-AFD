# Generated by Django 3.1.5 on 2021-07-14 02:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('payroll', '0039_auto_20210714_0255'),
    ]

    operations = [
        migrations.RenameField(
            model_name='allowances',
            old_name='acount_code',
            new_name='account_code',
        ),
        migrations.RenameField(
            model_name='deductions',
            old_name='acount_code',
            new_name='account_code',
        ),
        migrations.RenameField(
            model_name='payrollregulardataallowances',
            old_name='acount_code',
            new_name='account_code',
        ),
        migrations.RenameField(
            model_name='payrollregulardatadeductions',
            old_name='acount_code',
            new_name='account_code',
        ),
        migrations.RenameField(
            model_name='payrollregularmaintenance',
            old_name='acount_code',
            new_name='account_code',
        ),
    ]
