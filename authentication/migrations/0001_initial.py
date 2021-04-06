# Generated by Django 3.1.5 on 2021-01-19 05:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Route',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=10)),
                ('name', models.CharField(max_length=100)),
                ('nav_name', models.CharField(max_length=100)),
                ('url', models.CharField(max_length=100)),
                ('url_name', models.CharField(max_length=100)),
                ('icon', models.CharField(max_length=50)),
                ('is_menu', models.BooleanField(default=False)),
                ('is_dropdown', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Subroute',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_nav', models.BooleanField(default=False)),
                ('name', models.CharField(max_length=100)),
                ('nav_name', models.CharField(max_length=100)),
                ('url', models.CharField(max_length=100)),
                ('url_name', models.CharField(max_length=100)),
                ('route', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authentication.route')),
            ],
        ),
    ]
