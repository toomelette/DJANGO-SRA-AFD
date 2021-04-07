from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now



class Department(models.Model):
    name = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, related_name='department_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='department_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)

    def __str__(self):
        return self.name



class Division(models.Model):
    name = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, related_name='division_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='division_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)

    def __str__(self):
        return self.name



class Employee(models.Model):
    SEX_TYPES = ( (1, 'MALE'), (2, 'FEMALE') )
    CIVIL_STATUS_TYPES = ( (1, 'SINGLE'), (2, 'MARRIED'), (3, 'WIDOW') )
    STATION_TYPES = ( (1, 'AFD'), (2, 'RD'), (3, 'RDE'), (3, 'PPSPD') )
    APPLICATION_STATUS_TYPES = ( (1, 'PERMANENT'), (2, 'CONTRACT OF SERVICE') )
    
    # Personal Information
    employee_id = models.CharField(max_length=20, unique=True)
    firstname = models.CharField(max_length=100)
    middlename = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    suffixname = models.CharField(max_length=100)
    fullname = models.CharField(max_length=200)
    address_present = models.CharField(max_length=200)
    address_permanent = models.CharField(max_length=200)
    birthdate =  models.DateField(blank=True, null=True)
    place_of_birth = models.CharField(max_length=200)
    sex = models.IntegerField(default=1, choices=SEX_TYPES)
    civil_status = models.IntegerField(default=1, choices=CIVIL_STATUS_TYPES)
    tel_no = models.CharField(max_length=50)
    cell_no = models.CharField(max_length=50)
    email_address = models.EmailField(max_length=100)
    spouse_name = models.CharField(max_length=200)
    spouse_occupation = models.CharField(max_length=200)
    no_of_children = models.PositiveIntegerField(default=0)
    height = models.CharField(max_length=20)
    weight = models.CharField(max_length=20)
    religion = models.CharField(max_length=100)
    blood_type = models.CharField(max_length=20, default="")

    # Appointment Details
    position = models.CharField(max_length=200)
    is_active = models.BooleanField(default=False)
    station = models.IntegerField(default=1, choices=STATION_TYPES)
    department =  models.CharField(max_length=20)
    division =  models.CharField(max_length=20)
    # department = models.ForeignKey(Department, related_name='employee_department', on_delete=models.PROTECT)
    # division = models.ForeignKey(Division, related_name='employee_division', on_delete=models.PROTECT)
    salary_grade = models.PositiveIntegerField(default=0)
    step_increment = models.PositiveIntegerField(default=0)
    application_status = models.IntegerField(default=1, choices=APPLICATION_STATUS_TYPES)
    tax_status = models.CharField(max_length=20)
    monthly_salary = models.PositiveIntegerField(default=0)
    item = models.IntegerField(default=0)
    level = models.CharField(max_length=20)
    firstday_gov =  models.DateField(blank=True, null=True)
    firstday_sra =  models.DateField(blank=True, null=True)
    first_appointment =  models.DateField(blank=True, null=True)
    last_appointment =  models.DateField(blank=True, null=True)
    last_step_increment =  models.DateField(blank=True, null=True)
    last_adjustment =  models.DateField(blank=True, null=True)
    last_promotion =  models.DateField(blank=True, null=True)
    original_appointment =  models.DateField(blank=True, null=True)
    adjustment_date =  models.DateField(blank=True, null=True)
    adjustment_date =  models.DateField(blank=True, null=True)
    
    # ID's
    tin = models.CharField(max_length=50)
    gsis = models.CharField(max_length=50)
    philhealth = models.CharField(max_length=50)
    pagibig = models.CharField(max_length=50)
    sss = models.CharField(max_length=50)

    created_by = models.ForeignKey(User, related_name='employee_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='employee_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)

    def __str__(self):
        return self.fullname



class EmployeeEducationalBackground(models.Model):
    employee = models.ForeignKey(Employee, db_column="employee_id", related_name='employeeEB_employee', on_delete=models.CASCADE)
    level = models.CharField(max_length=100)
    school = models.CharField(max_length=200)
    course = models.CharField(max_length=200)
    date_from =  models.CharField(max_length=200)
    date_to =  models.CharField(max_length=200)
    units = models.DecimalField(max_digits=5, decimal_places=2)
    graduate_year =  models.CharField(max_length=20)
    scholarship =  models.CharField(max_length=200)
    honor =  models.CharField(max_length=200)



class EmployeeEligibility(models.Model):
    employee = models.ForeignKey(Employee, db_column="employee_id", related_name='employeeELIG_employee', on_delete=models.CASCADE)
    eligibility = models.CharField(max_length=200)
    level = models.CharField(max_length=100)
    rating = models.DecimalField(max_digits=5, decimal_places=2)
    exam_place = models.CharField(max_length=200)
    exam_date = models.DateField(blank=True, null=True)
    license_no = models.CharField(max_length=50)
    license_validity = models.DateField(blank=True, null=True)



class EmployeeTrainings(models.Model):
    employee = models.ForeignKey(Employee, db_column="employee_id", related_name='employeeTRNG_employee', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    date_from = models.DateField(blank=True, null=True)
    date_to = models.DateField(blank=True, null=True)
    hours = models.DecimalField(max_digits=5, decimal_places=2)
    conducted_by = models.CharField(max_length=200)
    venue = models.CharField(max_length=200)
    remarks = models.CharField(max_length=200)
    is_relevant = models.BooleanField(default=False)

    created_by = models.ForeignKey(User, related_name='employeeTRNG_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='employeeTRNG_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)



class EmployeeServiceRecords(models.Model):
    employee = models.ForeignKey(Employee, db_column="employee_id", related_name='employeeSR_employee', on_delete=models.CASCADE)
    seq = models.IntegerField(default=0)
    date_from = models.CharField(max_length=50)
    date_to = models.CharField(max_length=50)
    position = models.CharField(max_length=100)
    appointment_status = models.CharField(max_length=50)
    salary = models.DecimalField(max_digits=13, decimal_places=2)
    mode_of_payment = models.CharField(max_length=50)
    station = models.CharField(max_length=50)
    gov_serve = models.CharField(max_length=50)
    psc_serve = models.CharField(max_length=50)
    lwp = models.CharField(max_length=20)
    sp_date = models.CharField(max_length=20)
    status = models.CharField(max_length=100)
    remarks = models.CharField(max_length=100)

    created_by = models.ForeignKey(User, related_name='employeeSR_created_by_user', on_delete=models.PROTECT)
    updated_by = models.ForeignKey(User, related_name='employeeSR_updated_by_user', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)