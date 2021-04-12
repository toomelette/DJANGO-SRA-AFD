from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now



class Department(models.Model):
    name = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, related_name='department_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='department_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name



class Division(models.Model):
    name = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, related_name='division_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='division_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name



class Employee(models.Model):
    SEX_TYPES = ( (1, 'MALE'), (2, 'FEMALE') )
    CIVIL_STATUS_TYPES = ( (1, 'SINGLE'), (2, 'MARRIED'), (3, 'WIDOW') )
    STATION_TYPES = ( (1, 'AFD'), (2, 'RD'), (3, 'RDE'), (4, 'PPSPD') )
    APPLICATION_STATUS_TYPES = ( (1, 'PERMANENT'), (2, 'CONTRACT OF SERVICE') )
    
    # Personal Information
    employee_id = models.CharField(max_length=20, unique=True)
    firstname = models.CharField(max_length=100, default="")
    middlename = models.CharField(max_length=100, default="")
    lastname = models.CharField(max_length=100, default="")
    suffixname = models.CharField(max_length=100, default="")
    fullname = models.CharField(max_length=200, default="")
    address_present = models.CharField(max_length=200, default="")
    address_permanent = models.CharField(max_length=200, default="")
    birthdate =  models.DateField(null=True)
    place_of_birth = models.CharField(max_length=200, default="")
    sex = models.IntegerField(choices=SEX_TYPES, default=0)
    civil_status = models.IntegerField(choices=CIVIL_STATUS_TYPES, default=0)
    tel_no = models.CharField(max_length=50, default="")
    cell_no = models.CharField(max_length=50, default="")
    email_address = models.EmailField(max_length=100, default="")
    spouse_name = models.CharField(max_length=200, default="")
    spouse_occupation = models.CharField(max_length=200, default="")
    no_of_children = models.PositiveIntegerField(default=0)
    height = models.CharField(max_length=20, default="")
    weight = models.CharField(max_length=20, default="")
    religion = models.CharField(max_length=100, default="")
    blood_type = models.CharField(max_length=20, default="")

    # Appointment Details
    position = models.CharField(max_length=200, default="")
    is_active = models.BooleanField(null=True)
    station = models.IntegerField(choices=STATION_TYPES, default=0)
    department =  models.CharField(max_length=20, default="")
    division =  models.CharField(max_length=20, default="")
    # department = models.ForeignKey(Department, related_name='employee_department', on_delete=models.PROTECT)
    # division = models.ForeignKey(Division, related_name='employee_division', on_delete=models.PROTECT)
    salary_grade = models.PositiveIntegerField(default=0)
    step_increment = models.PositiveIntegerField(default=0)
    application_status = models.IntegerField(choices=APPLICATION_STATUS_TYPES, default=0)
    tax_status = models.CharField(max_length=20, default="")
    monthly_salary = models.DecimalField(max_digits=13, decimal_places=2, default=0)
    item = models.IntegerField(default=0)
    level = models.CharField(max_length=20, default="")
    firstday_gov =  models.DateField(null=True)
    firstday_sra =  models.DateField(null=True)
    first_appointment =  models.DateField(null=True)
    last_appointment =  models.DateField(null=True)
    last_step_increment =  models.DateField(null=True)
    last_adjustment =  models.DateField(null=True)
    last_promotion =  models.DateField(null=True)
    original_appointment =  models.DateField(null=True)
    adjustment_date =  models.DateField(null=True)
    adjustment_date =  models.DateField(null=True)
    tin = models.CharField(max_length=50, default="")
    gsis = models.CharField(max_length=50, default="")
    philhealth = models.CharField(max_length=50, default="")
    pagibig = models.CharField(max_length=50, default="")
    sss = models.CharField(max_length=50, default="")

    created_by = models.ForeignKey(User, related_name='employee_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='employee_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.fullname



class EmployeeEducationalBackground(models.Model):
    employee = models.ForeignKey(Employee, db_column="employee_id", related_name='employeeEB_employee', on_delete=models.CASCADE)
    level = models.CharField(max_length=100, default="")
    school = models.CharField(max_length=200, default="")
    course = models.CharField(max_length=200, default="")
    date_from =  models.CharField(max_length=200, default="")
    date_to =  models.CharField(max_length=200, default="")
    units = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    graduate_year =  models.CharField(max_length=20, default="")
    scholarship =  models.CharField(max_length=200, default="")
    honor =  models.CharField(max_length=200, default="")



class EmployeeEligibility(models.Model):
    employee = models.ForeignKey(Employee, db_column="employee_id", related_name='employeeELIG_employee', on_delete=models.CASCADE)
    eligibility = models.CharField(max_length=200, default="")
    level = models.CharField(max_length=100, default="")
    rating = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    exam_place = models.CharField(max_length=200, default="")
    exam_date = models.DateField(null=True)
    license_no = models.CharField(max_length=50, default="")
    license_validity = models.DateField(null=True)



class EmployeeTrainings(models.Model):
    employee = models.ForeignKey(Employee, db_column="employee_id", related_name='employeeTRNG_employee', on_delete=models.CASCADE)
    title = models.CharField(max_length=200, default="")
    category = models.CharField(max_length=100, default="")
    date_from = models.DateField(null=True)
    date_to = models.DateField(null=True)
    hours = models.DecimalField(max_digits=5, decimal_places=2, default="")
    conducted_by = models.CharField(max_length=200, default="")
    venue = models.CharField(max_length=200, default="")
    remarks = models.CharField(max_length=200, default="")
    is_relevant = models.BooleanField(null=True)

    created_by = models.ForeignKey(User, related_name='employeeTRNG_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='employeeTRNG_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)



class EmployeeServiceRecords(models.Model):
    employee = models.ForeignKey(Employee, db_column="employee_id", related_name='employeeSR_employee', on_delete=models.CASCADE)
    seq = models.IntegerField(default=0)
    date_from = models.CharField(max_length=50, default="")
    date_to = models.CharField(max_length=50, default="")
    position = models.CharField(max_length=100, default="")
    appointment_status = models.CharField(max_length=50, default="")
    salary = models.DecimalField(max_digits=13, decimal_places=2, default=0)
    mode_of_payment = models.CharField(max_length=50, default="")
    station = models.CharField(max_length=50, default="")
    gov_serve = models.CharField(max_length=50, default="")
    psc_serve = models.CharField(max_length=50, default="")
    lwp = models.CharField(max_length=20, default="")
    sp_date = models.CharField(max_length=20, default="")
    status = models.CharField(max_length=100, default="")
    remarks = models.CharField(max_length=100, default="")

    created_by = models.ForeignKey(User, related_name='employeeSR_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='employeeSR_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)