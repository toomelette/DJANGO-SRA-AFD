# Generated by Django 3.1.5 on 2021-05-20 02:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payroll', '0003_gsispolicies_payrollgsispolicies_templategsispolicies'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deductions',
            name='code',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.DeleteModel(
            name='PayrollGsisPolicies',
        ),
    ]
