
from employee.models import Employee

from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import connection

from .pagination import EmployeeListPagination
from .serializers import (
    EmployeeListSerializer,
    EmployeeCreateSerializer
)
from employee.utils import (
    validate_int_helper, 
    validate_decimal_helper
)



class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeListSerializer
    pagination_class = EmployeeListPagination


    def __sort_field(self):
        field = '-updated_at'
        sort_field = self.request.GET.get('sort_field', None)
        sort_order = self.request.GET.get('sort_order', None)
        available_sort_fields = ["firstname", "lastname"]
        if sort_field:
            if sort_field in available_sort_fields:
                if sort_order == "desc":
                    field = "-"+sort_field
                else:
                    field = sort_field
        return field


    def list(self, request):
        search = request.GET.get('q', None)
        is_active = request.GET.get('ia', None)    
        filter_conditions = Q()

        if search or is_active:
            if search:
                filter_conditions.add(Q(fullname__icontains=search) | Q(employee_id__icontains=search) | Q(position__icontains=search), Q.AND)
            if is_active:
                filter_conditions.add(Q(is_active = is_active), Q.AND)

        page = self.paginate_queryset(self.queryset.filter(filter_conditions).order_by(self.__sort_field()))
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)


    def create(self, request):
        serializer = EmployeeCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        employee = Employee()
        # Personal Details
        employee.firstname = serializer.data['firstname']
        employee.middlename = serializer.data['middlename']
        employee.lastname = serializer.data['lastname']
        employee.suffixname = serializer.data['suffixname']
        employee.address_present = serializer.data['address_present']
        employee.address_permanent = serializer.data['address_permanent']
        employee.birthdate = serializer.data['birthdate']
        employee.place_of_birth = serializer.data['place_of_birth']
        employee.sex = validate_int_helper(serializer.data['sex'], 0)
        employee.civil_status = validate_int_helper(serializer.data['civil_status'], 0)
        employee.tel_no = serializer.data['tel_no']
        employee.cell_no = serializer.data['cell_no']
        employee.email_address = serializer.data['email_address']
        employee.spouse_name = serializer.data['spouse_name']
        employee.spouse_occupation = serializer.data['spouse_occupation']
        employee.no_of_children = validate_int_helper(serializer.data['no_of_children'], 0)
        employee.height = serializer.data['height']
        employee.weight = serializer.data['weight']
        employee.religion = serializer.data['religion']
        employee.blood_type = serializer.data['blood_type']
        # Appointment Details
        employee.employee_id = serializer.data['employee_id']
        employee.position = serializer.data['position']
        employee.is_active = serializer.data['is_active']
        employee.salary_grade = validate_int_helper(serializer.data['salary_grade'], 0)
        employee.step_increment = validate_int_helper(serializer.data['step_increment'], 0)
        employee.application_status = validate_int_helper(serializer.data['application_status'], 0)
        employee.tax_status = serializer.data['tax_status']
        employee.monthly_salary = validate_decimal_helper(serializer.data['monthly_salary'], 0)
        employee.firstday_gov = serializer.data['firstday_gov']
        employee.firstday_sra = serializer.data['firstday_sra']
        employee.first_appointment = serializer.data['first_appointment']
        employee.last_appointment = serializer.data['last_appointment']
        employee.last_step_increment = serializer.data['last_step_increment']
        employee.last_adjustment = serializer.data['last_adjustment']
        employee.last_promotion = serializer.data['last_promotion']
        employee.original_appointment = serializer.data['original_appointment']
        employee.adjustment_date = serializer.data['adjustment_date']
        employee.adjustment_date = serializer.data['adjustment_date']
        employee.tin = serializer.data['tin']
        employee.gsis = serializer.data['gsis']
        employee.philhealth = serializer.data['philhealth']
        employee.pagibig = serializer.data['pagibig']
        employee.sss = serializer.data['sss']
        employee.created_by_id = request.user.id
        employee.updated_by_id = request.user.id
        employee.save()

        return Response({}, 201)








    
