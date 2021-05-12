from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from employee.models import Employee, Station, Plantilla, EmployeeEducationalBackground, EmployeeEligibility


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


class EmployeeEducationalBackgroundListSerializer(serializers.ModelSerializer):
     class Meta:
          model = EmployeeEducationalBackground
          fields = ('employee_id', 'level', 'school', 'course', 'date_from', 'date_to', 'units', 'graduate_year', 'scholarship', 'honor',)


class EmployeeEligibilityListSerializer(serializers.ModelSerializer):
     class Meta:
          model = EmployeeEducationalBackground
          fields =  ('employee_id', 'eligibility', 'level', 'rating', 'exam_place', 'exam_date', 'license_no', 'license_validity')


class EmployeeListSerializer(serializers.ModelSerializer):
     station_link = StationListSerializer(many=False)
     class Meta:
          model = Employee
          fields = ('id', 'employee_id', 'fullname', 'position', 'is_active', 'station_link')


class EmployeeCreateFormSerializer(serializers.ModelSerializer):
     class Meta:
          model = Employee
          fields = (
               # Personal Details"
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


class EmployeeUpdatePersonalDetailsFormSerializer(serializers.ModelSerializer):
     class Meta:
          model = Employee
          fields = (
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
          )


class EmployeeUpdateAppointmentDetailsFormSerializer(serializers.ModelSerializer):
     class Meta:
          model = Employee
          fields = (
               "employee_id",
               "position",
               "is_active",
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
          extra_kwargs = {
               'employee_id': {
                    'validators': [],
               }
          }


class EmployeeDetailsSerializer(serializers.ModelSerializer):
     employeeEB_employee = EmployeeEducationalBackgroundListSerializer(many=True)
     employeeTRNG_employee = EmployeeEligibilityListSerializer(many=True)
     class Meta:
          model = Employee
          fields = (
               # Personal Details
               "fullname",
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
               "employeeEB_employee",
               "employeeTRNG_employee"
          )


class EmployeeBulkDeleteSerializer(serializers.Serializer):
    ids = serializers.ListField(child=serializers.IntegerField(min_value=1))

    