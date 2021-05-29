import json
import datetime
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from employee.models import Employee, Station
from payroll.models import (
    Deductions, 
    Allowances, 
    PayrollRegular, 
    PayrollRegularData, 
    PayrollRegularDataDeductions,
    Mock
)
from .pagination import (
    DeductionListPagination, 
    AllowanceListPagination, 
    PayrollRegularListPagination,
    PayrollRegularDataListPagination
)
from .serializers import (
    DeductionSerializer, 
    AllowanceSerializer, 
    PayrollRegularSerializer,
    PayrollRegularDataSerializer
)



class DeductionViewSet(viewsets.ModelViewSet):
    queryset = Deductions.objects.all()
    serializer_class = DeductionSerializer
    pagination_class = DeductionListPagination

    def list(self, request):
        search = request.GET.get('q', None)
        filter_conditions = Q()
        if search:
            filter_conditions.add(Q(code__icontains=search) | Q(name__icontains=search), Q.AND)
        page = self.paginate_queryset(self.queryset.filter(filter_conditions).order_by('-updated_at'))
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)


    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            deduction = Deductions()
            deduction.code = serializer.data['code']
            deduction.name = serializer.data['name']
            deduction.description = serializer.data['description']
            deduction.created_by_id = request.user.id
            deduction.updated_by_id = request.user.id
            deduction.save()
            return Response({"id":deduction.id}, 201)
        except:
            return Response({}, 500)


    def retrieve(self, request, pk=None):
        deduction = get_object_or_404(self.queryset, id=pk)
        serializer = self.get_serializer(deduction)
        return Response(serializer.data, 200)
        

    def update(self, request, pk=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            deduction = get_object_or_404(self.queryset, id=pk)
            deduction.code = serializer.data['code']
            deduction.name = serializer.data['name']
            deduction.description = serializer.data['description']
            deduction.updated_by_id = request.user.id
            deduction.save()
            return Response({'id':deduction.id}, 201)
        except:
            return Response({}, 500)


    def destroy(self, request, pk=None):
        try:
            deduction = get_object_or_404(self.queryset, id=pk)
            deduction.delete()
            return Response({}, 200)
        except:
            return Response({}, 500)



class AllowanceViewSet(viewsets.ModelViewSet):
    queryset = Allowances.objects.all()
    serializer_class = AllowanceSerializer
    pagination_class = AllowanceListPagination

    def list(self, request):
        search = request.GET.get('q', None)
        filter_conditions = Q()
        if search:
            filter_conditions.add(Q(code__icontains=search) | Q(name__icontains=search), Q.AND)
        page = self.paginate_queryset(self.queryset.filter(filter_conditions).order_by('-updated_at'))
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)


    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            allowance = Allowances()
            allowance.code = serializer.data['code']
            allowance.name = serializer.data['name']
            allowance.description = serializer.data['description']
            allowance.created_by_id = request.user.id
            allowance.updated_by_id = request.user.id
            allowance.save()
            return Response({"id":allowance.id}, 201)
        except:
            return Response({}, 500)


    def retrieve(self, request, pk=None):
        allowance = get_object_or_404(self.queryset, id=pk)
        serializer = self.get_serializer(allowance)
        return Response(serializer.data, 200)
        

    def update(self, request, pk=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            allowance = get_object_or_404(self.queryset, id=pk)
            allowance.code = serializer.data['code']
            allowance.name = serializer.data['name']
            allowance.description = serializer.data['description']
            allowance.updated_by_id = request.user.id
            allowance.save()
            return Response({'id':allowance.id}, 201)
        except:
            return Response({}, 500)


    def destroy(self, request, pk=None):
        try:
            allowance = get_object_or_404(self.queryset, id=pk)
            allowance.delete()
            return Response({}, 200)
        except:
            return Response({}, 500)



class PayrollRegularViewSet(viewsets.ModelViewSet):
    queryset = PayrollRegular.objects.all()
    serializer_class = PayrollRegularSerializer
    pagination_class = PayrollRegularListPagination

    def list(self, request):
        search = request.GET.get('q', None)
        filter_conditions = Q()
        if search:
            filter_conditions.add(
                Q(description__icontains=search) | Q(remarks__icontains=search) | Q(process_date__icontains=search), Q.AND
            )
        page = self.paginate_queryset(self.queryset.filter(filter_conditions).order_by('-updated_at'))
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)


    @action(methods=['post'], detail=False)
    def create_generate_from_last(self, request):
        
        # Store Payroll Regular
        payroll_regular_latest = self.queryset.latest('created_by')
        payroll_regular_obj = PayrollRegular()
        payroll_regular_obj.process_date = datetime.date.today()
        payroll_regular_obj.description = payroll_regular_latest.description
        payroll_regular_obj.remarks = payroll_regular_latest.remarks
        payroll_regular_obj.created_by_id = request.user.id
        payroll_regular_obj.updated_by_id = request.user.id
        payroll_regular_obj.save()

        # Store Payroll Regular Data
        if payroll_regular_latest.payrollRegularData_payrollRegular:
            for data in payroll_regular_latest.payrollRegularData_payrollRegular.all():
                payroll_regular_data_obj = PayrollRegularData()
                payroll_regular_data_obj.payroll_regular = payroll_regular_obj
                payroll_regular_data_obj.employee = data.employee
                payroll_regular_data_obj.station = data.station
                payroll_regular_data_obj.employee_no = data.employee_no
                payroll_regular_data_obj.station_no = data.station_no
                payroll_regular_data_obj.paygroup = data.paygroup
                payroll_regular_data_obj.fullname = data.fullname
                payroll_regular_data_obj.position = data.position
                payroll_regular_data_obj.salary_grade = data.salary_grade
                payroll_regular_data_obj.step_increment = data.step_increment
                payroll_regular_data_obj.monthly_salary = data.monthly_salary
                payroll_regular_data_obj.plantilla_item = data.plantilla_item
                payroll_regular_data_obj.status = data.status
                payroll_regular_data_obj.is_atm = data.is_atm
                payroll_regular_data_obj.atm_account_no = data.atm_account_no
                payroll_regular_data_obj.tin = data.tin
                payroll_regular_data_obj.gsis = data.gsis
                payroll_regular_data_obj.philhealth = data.philhealth
                payroll_regular_data_obj.pagibig = data.pagibig
                payroll_regular_data_obj.sss = data.sss
                payroll_regular_data_obj.created_by_id = request.user.id
                payroll_regular_data_obj.updated_by_id = request.user.id
                payroll_regular_data_obj.save()

                # Store Payroll Regular Data Deductions
                if data.payrollRegularDataDeduc_payrollRegularData: 
                    for data_deduc in data.payrollRegularDataDeduc_payrollRegularData.all():
                        payroll_regular_data_deduc_obj = PayrollRegularDataDeductions()
                        payroll_regular_data_deduc_obj.payroll_regular_data = payroll_regular_data_obj
                        payroll_regular_data_deduc_obj.deduction = data_deduc.deduction
                        payroll_regular_data_deduc_obj.code = data_deduc.code
                        payroll_regular_data_deduc_obj.name = data_deduc.name
                        payroll_regular_data_deduc_obj.description = data_deduc.description
                        payroll_regular_data_deduc_obj.amount = data_deduc.amount
                        payroll_regular_data_deduc_obj.save()

        return Response({"status":"success!!!"}, 200)



# class PayrollRegularDataViewSet(viewsets.ModelViewSet):
#     queryset = PayrollRegularData.objects.all()
#     serializer_class = PayrollRegularDataSerializer
#     pagination_class = PayrollRegularDataListPagination

#     def list(self, request):
#         payroll_id = request.GET.get('ti', None)
#         search = request.GET.get('q', None)
#         filter_conditions = Q()
#         if payroll_id:
#             filter_conditions.add(Q(payroll_id=payroll_id), Q.AND)
#         page = self.paginate_queryset(self.queryset.filter(filter_conditions).order_by('-updated_at'))
#         serializer = self.get_serializer(page, many=True)
#         return self.get_paginated_response(serializer.data)



# class TestViewSet(viewsets.ModelViewSet):
    
#     prd = PayrollRegularData.objects.all()
#     emp = Employee.objects.all()

#     for data_prd in prd:
#         try:
#             emp_obj = emp.get(employee_id=data_prd.employee_no)
#             prd_obj = prd.get(id=data_prd.id)
#             prd_obj.employee = emp_obj
#             prd_obj.save()
#             print(prd_obj.fullname)
#             print(st_obj.name)
#         except:
#             print('Error!!')
