
from employee.models import Employee, Station, Plantilla

from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import connection

from .pagination import EmployeeListPagination
from .serializers import (
    StationListSerializer,
    PlantillaListSerializer,
    EmployeeListSerializer,
    EmployeeCreateSerializer,
    EmployeeBulkDeleteSerializer
)



class StationViewSet(viewsets.ModelViewSet):
    queryset = Station.objects.all()
    serializer_class = StationListSerializer


    @action(methods=['get'], detail=False)
    def get_all(self, request):
        station_queryset = Station.objects.all()
        serializer = self.get_serializer(station_queryset, many=True)
        return Response(serializer.data, 200)



class PlantillaViewSet(viewsets.ModelViewSet):
    queryset = Plantilla.objects.all()
    serializer_class = PlantillaListSerializer


    @action(methods=['get'], detail=False)
    def get_all_open_by_station(self, request):
        station = request.GET.get('s')    
        filter_conditions = Q()
        plantilla_queryset = []
        if station != "":
            filter_conditions.add(Q(station=station), Q.AND)
            filter_conditions.add(Q(is_open=1), Q.AND)
            plantilla_queryset = Plantilla.objects.all().filter(filter_conditions)
        serializer = self.get_serializer(plantilla_queryset, many=True)
        return Response(serializer.data, 200)



class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeListSerializer
    pagination_class = EmployeeListPagination


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


    def create(self, request):
        serializer = EmployeeCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        employee = Employee()
        station = Station.objects.get(station_id=serializer.data['station'])
        # Personal Details
        employee.firstname = serializer.data['firstname'].upper()
        employee.middlename = serializer.data['middlename'].upper()
        employee.lastname = serializer.data['lastname'].upper()
        employee.fullname = self.__set_fullname(serializer)
        employee.suffixname = serializer.data['suffixname']
        employee.address_present = serializer.data['address_present']
        employee.address_permanent = serializer.data['address_permanent']
        employee.birthdate = serializer.data['birthdate']
        employee.place_of_birth = serializer.data['place_of_birth']
        employee.sex = serializer.data['sex']
        employee.civil_status = serializer.data['civil_status']
        employee.tel_no = serializer.data['tel_no']
        employee.cell_no = serializer.data['cell_no']
        employee.email_address = serializer.data['email_address']
        employee.spouse_name = serializer.data['spouse_name']
        employee.spouse_occupation = serializer.data['spouse_occupation']
        employee.no_of_children = serializer.data['no_of_children']
        employee.height = serializer.data['height']
        employee.weight = serializer.data['weight']
        employee.religion = serializer.data['religion']
        employee.blood_type = serializer.data['blood_type']
        # Appointment Details
        employee.employee_id = serializer.data['employee_id'] 
        employee.position = serializer.data['position'].upper()
        employee.is_active = serializer.data['is_active']
        employee.station = serializer.data['station']
        employee.station_link = station
        employee.plantilla_item = serializer.data['plantilla_item']
        employee.salary_grade = serializer.data['salary_grade']
        employee.step_increment = serializer.data['step_increment']
        employee.application_status = serializer.data['application_status']
        employee.tax_status = serializer.data['tax_status']
        employee.monthly_salary = serializer.data['monthly_salary']
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
        return Response({"id":employee.id}, 201)


    @action(methods=['delete'], detail=False)
    def bulk_destroy(self, request):
        serializer = EmployeeBulkDeleteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ids = serializer.data['ids']
        for data in ids:
            employee = self.queryset.get(id=data)
            if employee:
                employee.delete()
        return Response({}, 200)


    def __set_fullname(self, serializer):
        lastname = serializer.data['lastname'].upper()
        firstname = serializer.data['firstname'].upper()
        middlename = serializer.data['middlename'].upper()
        suffixname = serializer.data['suffixname']
        return lastname+", "+firstname+" "+suffixname+" "+middlename[0]


    def __set_level(self, value):
        return value


    # @action(methods=['GET'], detail=False)
    # def test(self, request):
        
    #     employees = Employee.objects.all()
    #     stations = Station.objects.all()

    #     for data_e in employees:
    #         for data_s in stations:
    #             if data_e.station == data_s.station_id:
    #                 station = stations.get(id=data_s.id)
    #                 employee = employees.get(id=data_e.id)
    #                 employee.station_link = station
    #                 employee.save()
    #                 print(employee.fullname)
    #                 print("DOne!!")

    #     return Response({}, 200)









    
