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
    MockAllowance, 
    PayrollRegular, 
    PayrollRegularData,
    PayrollRegularDataAllowances, 
    PayrollRegularDataDeductions,
    MockDeductions,
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

        payroll_regular_latest = self.queryset.prefetch_related(
            'payrollRegularData_payrollRegular',
            'payrollRegularData_payrollRegular__payrollRegularDataDeduc_payrollRegularData', 
            'payrollRegularData_payrollRegular__payrollRegularDataAllow_payrollRegularData'
        ).latest('created_by')
        
        try:
            payroll_regular_obj = PayrollRegular()
            payroll_regular_obj.process_date = datetime.date.today()
            payroll_regular_obj.description = payroll_regular_latest.description
            payroll_regular_obj.remarks = payroll_regular_latest.remarks
            payroll_regular_obj.created_by_id = request.user.id
            payroll_regular_obj.updated_by_id = request.user.id
            payroll_regular_obj.save()

            if payroll_regular_latest.payrollRegularData_payrollRegular:
                payroll_regular_data_deduc_objs = []
                payroll_regular_data_allow_objs = []

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

                    if data.payrollRegularDataDeduc_payrollRegularData: 
                        for data_deduc in data.payrollRegularDataDeduc_payrollRegularData.all():
                            payroll_regular_data_deduc_objs.append(
                                PayrollRegularDataDeductions(
                                    payroll_regular_data = payroll_regular_data_obj,
                                    deduction = data_deduc.deduction,
                                    code = data_deduc.code,
                                    name = data_deduc.name,
                                    description = data_deduc.description,
                                    amount = data_deduc.amount,
                                )
                            )

                    if data.payrollRegularDataAllow_payrollRegularData: 
                        for data_deduc in data.payrollRegularDataAllow_payrollRegularData.all():
                            payroll_regular_data_allow_objs.append(
                                PayrollRegularDataAllowances(
                                    payroll_regular_data = payroll_regular_data_obj,
                                    allowance = data_deduc.allowance,
                                    code = data_deduc.code,
                                    name = data_deduc.name,
                                    description = data_deduc.description, 
                                    amount = data_deduc.amount,
                                )
                            )
                
                PayrollRegularDataDeductions.objects.bulk_create(payroll_regular_data_deduc_objs)
                PayrollRegularDataAllowances.objects.bulk_create(payroll_regular_data_allow_objs)

            return Response({'id':payroll_regular_obj.id}, 200)
        
        except:

            return Response(500)

    
    def retrieve(self, request, pk=None):
        payroll_regular = get_object_or_404(self.queryset, id=pk)
        serializer = self.get_serializer(payroll_regular)
        return Response(serializer.data, 200)



class PayrollRegularDataViewSet(viewsets.ModelViewSet):
    queryset = PayrollRegularData.objects.all()
    serializer_class = PayrollRegularDataSerializer
    pagination_class = PayrollRegularDataListPagination

    def list(self, request):
        payroll_regular_id = request.GET.get('pr_id', None)
        search = request.GET.get('q', None)
        filter_conditions = Q()
        if payroll_regular_id:
            filter_conditions.add(Q(payroll_regular_id=payroll_regular_id), Q.AND)
        if search:
            filter_conditions.add(
                Q(fullname__icontains=search) | Q(position__icontains=search), Q.AND
            )
        page = self.paginate_queryset(self.queryset.filter(filter_conditions).order_by('id'))
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    
    def retrieve(self, request, pk=None):
        payroll_regular_data = get_object_or_404(self.queryset, id=pk)
        serializer = self.get_serializer(payroll_regular_data)
        return Response(serializer.data, 200)



class TestViewSet(viewsets.ModelViewSet):
    queryset = MockAllowance.objects.all()
    
    def list(self, request):
    
        # payroll_regular_latest_cache = cache.keys('payroll_regular:latest:*')
        # if payroll_regular_latest_cache:
        #     print('Has values!!')
        # else:
        #     print('Has no values!!')
        pr_queryset = PayrollRegular.objects.all()
        pr = pr_queryset.get(id=29)
        pr.delete()
        # m_queryset = MockAllowance.objects.all()

        # for data_m in m_queryset:
        #     allow_list = dict()
        #     allow_list[1] = { 'code': 'allow1', 'payroll_id': data_m.payroll_id, 'amount': data_m.allow1, 'allow_id': 1 }
        #     allow_list[2] = { 'code': 'allow2', 'payroll_id': data_m.payroll_id, 'amount': data_m.allow2, 'allow_id': 2 }
        #     allow_list[3] = { 'code': 'allow3', 'payroll_id': data_m.payroll_id, 'amount': data_m.allow3, 'allow_id': 3 }
        #     allow_list[4] = { 'code': 'allow4', 'payroll_id': data_m.payroll_id, 'amount': data_m.allow4, 'allow_id': 4 }
        #     allow_list[5] = { 'code': 'allow5', 'payroll_id': data_m.payroll_id, 'amount': data_m.allow5, 'allow_id': 5 }
        #     allow_list[6] = { 'code': 'allow6', 'payroll_id': data_m.payroll_id, 'amount': data_m.allow6, 'allow_id': 6 }
        #     allow_list[7] = { 'code': 'allow7', 'payroll_id': data_m.payroll_id, 'amount': data_m.allow7, 'allow_id': 7 }
        #     allow_list[8] = { 'code': 'allow8', 'payroll_id': data_m.payroll_id, 'amount': data_m.allow8, 'allow_id': 8 }
        #     allow_list[9] = { 'code': 'allow9', 'payroll_id': data_m.payroll_id, 'amount': data_m.allow9, 'allow_id': 9 }
        #     allow_list[10] = { 'code': 'allow10', 'payroll_id': data_m.payroll_id, 'amount': data_m.allow10, 'allow_id': 10 }

        #     for i in range(1, 11):
        #         if allow_list[i]['amount'] > 0:
        #             try:
        #                 rda = PayrollRegularDataAllowances()
        #                 rda.payroll_regular_data_id = allow_list[i]['payroll_id']
        #                 rda.allowance_id = allow_list[i]['allow_id']
        #                 rda.code = allow_list[i]['code']
        #                 rda.amount = allow_list[i]['amount']
        #                 rda.save()
        #                 print(allow_list[i]['code'])
        #                 print('Success!')
        #             except:
        #                 print('Error!')
    
        return Response({'status': 'success!!'}, 200)
