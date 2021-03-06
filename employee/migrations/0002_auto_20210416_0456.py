# Generated by Django 3.1.5 on 2021-04-16 04:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='plantilla',
            old_name='required_education',
            new_name='education',
        ),
        migrations.RenameField(
            model_name='plantilla',
            old_name='required_eligibility',
            new_name='eligibility',
        ),
        migrations.AddField(
            model_name='plantilla',
            name='employee_name',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AddField(
            model_name='plantilla',
            name='orig_monthly_salary',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=13),
        ),
        migrations.AlterField(
            model_name='plantilla',
            name='appointment_status',
            field=models.IntegerField(choices=[(1, 'PERMANENT'), (2, 'CO-TERMINUS'), (3, 'PRESIDENT APPOINTEE')], default=0),
        ),
    ]
