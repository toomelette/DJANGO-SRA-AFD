from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from employee.models import Employee


class EmployeeListSerializer(serializers.Serializer): 
     id = serializers.IntegerField(read_only=True)
     employee_id = serializers.CharField(read_only=True)
     fullname = serializers.CharField(read_only=True)
     position = serializers.CharField(read_only=True)
     is_active = serializers.BooleanField(read_only=True)


class EmployeeCreateSerializer(serializers.Serializer): 

    # Personal Information
    firstname = serializers.CharField(max_length=100)
    middlename = serializers.CharField(max_length=100)
    lastname = serializers.CharField(max_length=100)
    suffixname = serializers.CharField(max_length=100, allow_blank=True)
    address_present = serializers.CharField(max_length=200, allow_blank=True)
    address_permanent = serializers.CharField(max_length=200, allow_blank=True)
    birthdate =  serializers.DateField(input_formats=["yyyy-mm-dd"], format="yyyy-mm-dd", allow_null=True)
    place_of_birth = serializers.CharField(max_length=200, allow_blank=True)
    sex = serializers.IntegerField(min_value=1, max_value=2, allow_null=True)
    civil_status = serializers.IntegerField(min_value=1, max_value=3, allow_null=True)
    tel_no = serializers.CharField(max_length=50, allow_blank=True)
    cell_no = serializers.CharField(max_length=50, allow_blank=True)
    email_address = serializers.EmailField(max_length=100, allow_blank=True)
    spouse_name = serializers.CharField(max_length=200, allow_blank=True)
    spouse_occupation = serializers.CharField(max_length=200, allow_blank=True)
    no_of_children = serializers.IntegerField(min_value=0, allow_null=True)
    height = serializers.CharField(max_length=20, allow_blank=True)
    weight = serializers.CharField(max_length=20, allow_blank=True)
    religion = serializers.CharField(max_length=100, allow_blank=True)
    blood_type = serializers.CharField(max_length=20, allow_blank=True)

    # Appointment Details
    employee_id = serializers.CharField(max_length=20, validators=[UniqueValidator(queryset=Employee.objects.all())])
    position = serializers.CharField(max_length=200, allow_blank=True)
    is_active = serializers.BooleanField(allow_null=True)
    # station = serializers.IntegerField(min_value=1, max_value=3, allow_null=True)
    # department = serializers.ForeignKey(Department, related_name='employee_department', on_delete=serializers.PROTECT)
    # division = serializers.ForeignKey(Division, related_name='employee_division', on_delete=serializers.PROTECT)
    salary_grade = serializers.IntegerField(min_value=0, allow_null=True)
    step_increment = serializers.IntegerField(min_value=0, allow_null=True)
    application_status = serializers.IntegerField(min_value=1, max_value=2, allow_null=True)
    tax_status = serializers.CharField(max_length=20, allow_blank=True)
    monthly_salary = serializers.DecimalField(min_value=0, max_digits=13, decimal_places=2, allow_null=True)
    # item = serializers.IntegerField(default=0)
    firstday_gov =  serializers.DateField(input_formats=["yyyy-mm-dd"], format="yyyy-mm-dd", allow_null=True)
    firstday_sra =  serializers.DateField(input_formats=["yyyy-mm-dd"], format="yyyy-mm-dd", allow_null=True)
    first_appointment =  serializers.DateField(input_formats=["yyyy-mm-dd"], format="yyyy-mm-dd", allow_null=True)
    last_appointment =  serializers.DateField(input_formats=["yyyy-mm-dd"], format="yyyy-mm-dd", allow_null=True)
    last_step_increment =  serializers.DateField(input_formats=["yyyy-mm-dd"], format="yyyy-mm-dd", allow_null=True)
    last_adjustment =  serializers.DateField(input_formats=["yyyy-mm-dd"], format="yyyy-mm-dd", allow_null=True)
    last_promotion =  serializers.DateField(input_formats=["yyyy-mm-dd"], format="yyyy-mm-dd", allow_null=True)
    original_appointment =  serializers.DateField(input_formats=["yyyy-mm-dd"], format="yyyy-mm-dd", allow_null=True)
    adjustment_date =  serializers.DateField(input_formats=["yyyy-mm-dd"], format="yyyy-mm-dd", allow_null=True)
    adjustment_date =  serializers.DateField(input_formats=["yyyy-mm-dd"], format="yyyy-mm-dd", allow_null=True)
    tin = serializers.CharField(max_length=50, allow_blank=True)
    gsis = serializers.CharField(max_length=50, allow_blank=True)
    philhealth = serializers.CharField(max_length=50, allow_blank=True)
    pagibig = serializers.CharField(max_length=50, allow_blank=True)
    sss = serializers.CharField(max_length=50, allow_blank=True)



    