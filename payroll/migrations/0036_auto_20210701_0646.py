# Generated by Django 3.1.5 on 2021-07-01 06:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payroll', '0035_payrollregulardatadeductions_priority_seq'),
    ]

    operations = [
        migrations.AddField(
            model_name='allowances',
            name='acronym',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
        migrations.AddField(
            model_name='deductions',
            name='acronym',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
        migrations.AddField(
            model_name='payrollregulardataallowances',
            name='acronym',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
        migrations.AddField(
            model_name='payrollregulardatadeductions',
            name='acronym',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='payrollregulardatadeductions',
            name='priority_seq',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AlterField(
            model_name='payrollregularmaintenance',
            name='deduc_priority_seq',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]