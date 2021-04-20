from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from employee.models import Employee, Station, Plantilla


class StationListSerializer(serializers.ModelSerializer): 
     class Meta:
          model = Station
          fields = ('id', 'station_id', 'name')


class PlantillaListSerializer(serializers.ModelSerializer): 
     class Meta:
          model = Plantilla
          fields = (
               'id', 
               'plantilla_id', 
               'employee_name', 
               'position', 
               'salary_grade', 
               'step_increment',
               'monthly_salary',
               'orig_monthly_salary',
               'eligibility',
               'education',
               'appointment_status',
               'appointment_date',
               'promotion_date',
               'is_open',
               'plantilla_date',
          )


class EmployeeListSerializer(serializers.ModelSerializer):
     station_link = StationListSerializer(read_only=True, many=False)
     class Meta:
          model = Employee
          fields = ('id', 'employee_id', 'fullname', 'position', 'is_active', 'station_link')


class EmployeeCreateSerializer(serializers.ModelSerializer): 
     class Meta:
          model = Employee
          fields = (
               # Personal Details
               "firstname",
               "middlename",
               "lastname",
               "suffixname",
               "address_present",
               "address_permanent",
               "birthdate",
               "place_of_birth",
               "sex",
               "civil_status",
               "tel_no",
               "cell_no",
               "email_address",
               "spouse_name",
               "spouse_occupation",
               "no_of_children",
               "height",
               "weight",
               "religion",
               "blood_type",
               # Appointment Details
               "employee_id",
               "position",
               "is_active",
               "station",
               "plantilla_item",
               "salary_grade",
               "step_increment",
               "application_status",
               "tax_status",
               "monthly_salary",
               "firstday_gov",
               "firstday_sra",
               "first_appointment",
               "last_appointment",
               "last_step_increment",
               "last_adjustment",
               "last_promotion",
               "original_appointment",
               "adjustment_date",
               "adjustment_date",
               "tin",
               "gsis",
               "philhealth",
               "pagibig",
               "sss",
          )


class EmployeeBulkDeleteSerializer(serializers.Serializer):
    ids = serializers.ListField(child=serializers.IntegerField(min_value=1))


    