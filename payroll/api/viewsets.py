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
    PayrollRegularMaintenance,
    PayrollRegularDataAllowances, 
    PayrollRegularDataDeductions,
    MockDeductions,
)
from .pagination import (
    DeductionListPagination, 
    AllowanceListPagination, 
    PayrollRegularListPagination,
    PayrollRegularDataListPagination,
)
from .serializers import (
    DeductionSerializer, 
    AllowanceSerializer, 
    PayrollRegularSerializer,
    PayrollRegularDataSerializer,
    PayrollRegularMaintenanceSerializer,
    PayrollRegularMaintenanceFormCreateSerializer
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


    @action(methods=['get'], detail=False)
    def get_all(self, request):
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data, 200)



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


    @action(methods=['get'], detail=False)
    def get_all(self, request):
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data, 200)



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
                        for data_allow in data.payrollRegularDataAllow_payrollRegularData.all():
                            payroll_regular_data_allow_objs.append(
                                PayrollRegularDataAllowances(
                                    payroll_regular_data = payroll_regular_data_obj,
                                    allowance = data_allow.allowance,
                                    code = data_allow.code,
                                    name = data_allow.name,
                                    description = data_allow.description, 
                                    amount = data_allow.amount,
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
                Q(fullname__icontains=search) | 
                Q(employee_no__icontains=search) | 
                Q(position__icontains=search), Q.AND
            )
        page = self.paginate_queryset(self.queryset.filter(filter_conditions).order_by('id'))
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    
    def retrieve(self, request, pk=None):
        payroll_regular_data = get_object_or_404(self.queryset, id=pk)
        serializer = self.get_serializer(payroll_regular_data)
        return Response(serializer.data, 200)


    @action(methods=['get'], detail=False)
    def get_by_payroll_regular_id(self, request):
        payroll_regular_id = request.GET.get('pr_id', None)
        prd_queryset = self.queryset.filter(payroll_regular_id=payroll_regular_id)
        serializer = self.get_serializer(prd_queryset, many=True)
        return Response(serializer.data, 200)



class PayrollRegularMaintenanceViewSet(viewsets.ModelViewSet):
    queryset = PayrollRegularMaintenance.objects.all()
    serializer_class = PayrollRegularMaintenanceSerializer

    def list(self, request):
        payroll_regular_id = request.GET.get('pr_id', None)
        search = request.GET.get('q', None)
        filter_conditions = Q()
        if payroll_regular_id:
            filter_conditions.add(Q(payroll_regular_id=payroll_regular_id), Q.AND)
        if search:
            filter_conditions.add(
                Q(field__icontains=search) | 
                Q(employee_no__icontains=search) | 
                Q(remarks__icontains=search), Q.AND
            )
        serializer = self.get_serializer(self.queryset.filter(filter_conditions).order_by('id'), many=True)
        return Response(serializer.data, 200)


    def create(self, request):
        serializer = PayrollRegularMaintenanceFormCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({}, 200)



class TestViewSet(viewsets.ModelViewSet):
    queryset = MockAllowance.objects.all()
    
    def list(self, request):
    
        # payroll_regular_latest_cache = cache.keys('payroll_regular:latest:*')
        # if payroll_regular_latest_cache:
        #     print('Has values!!')
        # else:
        #     print('Has no values!!')


        # pr_queryset = PayrollRegular.objects.all()
        # pr = pr_queryset.get(id=39)
        # pr.delete()


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
        #     rda_objs = []
        #     for i in range(1, 11):
        #         if allow_list[i]['amount'] > 0:
        #             rda_objs.append(
        #                 PayrollRegularDataAllowances(
        #                     payroll_regular_data_id = allow_list[i]['payroll_id'],
        #                     allowance_id = allow_list[i]['allow_id'],
        #                     code = allow_list[i]['code'],
        #                     amount = allow_list[i]['amount'],
        #                 )
        #             )
        #     PayrollRegularDataAllowances.objects.bulk_create(rda_objs)


        # m_queryset = MockDeductions.objects.all()
        # for data_m in m_queryset:
        #     deduc_list = dict()
        #     deduc_list[1] = { 'code': 'd1', 'payroll_id': data_m.payroll_id, 'amount': data_m.d1, 'deduc_id':1  }
        #     deduc_list[2] = { 'code': 'd2', 'payroll_id': data_m.payroll_id, 'amount': data_m.d2, 'deduc_id': 2 }
        #     deduc_list[3] = { 'code': 'd3', 'payroll_id': data_m.payroll_id, 'amount': data_m.d3, 'deduc_id': 3 }
        #     deduc_list[4] = { 'code': 'd4', 'payroll_id': data_m.payroll_id, 'amount': data_m.d4, 'deduc_id': 4 }
        #     deduc_list[5] = { 'code': 'd5', 'payroll_id': data_m.payroll_id, 'amount': data_m.d5, 'deduc_id': 5 }
        #     deduc_list[6] = { 'code': 'd6', 'payroll_id': data_m.payroll_id, 'amount': data_m.d6, 'deduc_id':6  }
        #     deduc_list[7] = { 'code': 'd7', 'payroll_id': data_m.payroll_id, 'amount': data_m.d7, 'deduc_id':7  }
        #     deduc_list[8] = { 'code': 'd7oldbir', 'payroll_id': data_m.payroll_id, 'amount': data_m.d7oldbir, 'deduc_id': 57 }
        #     deduc_list[9] = { 'code': 'd8', 'payroll_id': data_m.payroll_id, 'amount': data_m.d8, 'deduc_id': 8 }
        #     deduc_list[10] = { 'code': 'd9', 'payroll_id': data_m.payroll_id, 'amount': data_m.d9, 'deduc_id': 9 }
        #     deduc_list[11] = { 'code': 'd10', 'payroll_id': data_m.payroll_id, 'amount': data_m.d10, 'deduc_id': 10 }
        #     deduc_list[12] = { 'code': 'd11', 'payroll_id': data_m.payroll_id, 'amount': data_m.d11, 'deduc_id':11  }
        #     deduc_list[13] = { 'code': 'd12', 'payroll_id': data_m.payroll_id, 'amount': data_m.d12, 'deduc_id': 12 }
        #     deduc_list[14] = { 'code': 'd13', 'payroll_id': data_m.payroll_id, 'amount': data_m.d13, 'deduc_id': 13 }
        #     deduc_list[15] = { 'code': 'd14', 'payroll_id': data_m.payroll_id, 'amount': data_m.d14, 'deduc_id': 14 }
        #     deduc_list[16] = { 'code': 'd15', 'payroll_id': data_m.payroll_id, 'amount': data_m.d15, 'deduc_id': 15 }
        #     deduc_list[17] = { 'code': 'd16', 'payroll_id': data_m.payroll_id, 'amount': data_m.d16, 'deduc_id': 16 }
        #     deduc_list[18] = { 'code': 'd17', 'payroll_id': data_m.payroll_id, 'amount': data_m.d17, 'deduc_id': 17 }
        #     deduc_list[19] = { 'code': 'd18', 'payroll_id': data_m.payroll_id, 'amount': data_m.d18, 'deduc_id':18  }
        #     deduc_list[20] = { 'code': 'd19', 'payroll_id': data_m.payroll_id, 'amount': data_m.d19, 'deduc_id':19  }
        #     deduc_list[21] = { 'code': 'd20', 'payroll_id': data_m.payroll_id, 'amount': data_m.d20, 'deduc_id': 20 }
        #     deduc_list[22] = { 'code': 'd21', 'payroll_id': data_m.payroll_id, 'amount': data_m.d21, 'deduc_id':  21}
        #     deduc_list[23] = { 'code': 'd22', 'payroll_id': data_m.payroll_id, 'amount': data_m.d22, 'deduc_id':  22}
        #     deduc_list[24] = { 'code': 'd23', 'payroll_id': data_m.payroll_id, 'amount': data_m.d23, 'deduc_id':  23}
        #     deduc_list[25] = { 'code': 'd24', 'payroll_id': data_m.payroll_id, 'amount': data_m.d24, 'deduc_id':  24}
        #     deduc_list[26] = { 'code': 'd25', 'payroll_id': data_m.payroll_id, 'amount': data_m.d25, 'deduc_id':  25}
        #     deduc_list[27] = { 'code': 'd26', 'payroll_id': data_m.payroll_id, 'amount': data_m.d26, 'deduc_id':  26}
        #     deduc_list[28] = { 'code': 'd27', 'payroll_id': data_m.payroll_id, 'amount': data_m.d27, 'deduc_id':  27}
        #     deduc_list[29] = { 'code': 'd28', 'payroll_id': data_m.payroll_id, 'amount': data_m.d28, 'deduc_id':  28}
        #     deduc_list[30] = { 'code': 'd29', 'payroll_id': data_m.payroll_id, 'amount': data_m.d29, 'deduc_id':  29}
        #     deduc_list[31] = { 'code': 'd30', 'payroll_id': data_m.payroll_id, 'amount': data_m.d30, 'deduc_id':  30}
        #     deduc_list[32] = { 'code': 'd31', 'payroll_id': data_m.payroll_id, 'amount': data_m.d31, 'deduc_id':  31}
        #     deduc_list[33] = { 'code': 'd32', 'payroll_id': data_m.payroll_id, 'amount': data_m.d32, 'deduc_id':  32}
        #     deduc_list[34] = { 'code': 'd33', 'payroll_id': data_m.payroll_id, 'amount': data_m.d33, 'deduc_id':  33}
        #     deduc_list[35] = { 'code': 'd34', 'payroll_id': data_m.payroll_id, 'amount': data_m.d34, 'deduc_id':  34}
        #     deduc_list[36] = { 'code': 'd35', 'payroll_id': data_m.payroll_id, 'amount': data_m.d35, 'deduc_id':  35}
        #     deduc_list[37] = { 'code': 'd36', 'payroll_id': data_m.payroll_id, 'amount': data_m.d36, 'deduc_id':  36}
        #     deduc_list[38] = { 'code': 'd37', 'payroll_id': data_m.payroll_id, 'amount': data_m.d37, 'deduc_id':  37}
        #     deduc_list[39] = { 'code': 'd38', 'payroll_id': data_m.payroll_id, 'amount': data_m.d38, 'deduc_id':  38}
        #     deduc_list[40] = { 'code': 'd39', 'payroll_id': data_m.payroll_id, 'amount': data_m.d39, 'deduc_id':  39}
        #     deduc_list[41] = { 'code': 'd40', 'payroll_id': data_m.payroll_id, 'amount': data_m.d40, 'deduc_id':  40}
        #     deduc_list[42] = { 'code': 'd41', 'payroll_id': data_m.payroll_id, 'amount': data_m.d41, 'deduc_id':  41}
        #     deduc_list[43] = { 'code': 'd42', 'payroll_id': data_m.payroll_id, 'amount': data_m.d42, 'deduc_id':  42}
        #     deduc_list[44] = { 'code': 'd43', 'payroll_id': data_m.payroll_id, 'amount': data_m.d43, 'deduc_id':  43}
        #     deduc_list[45] = { 'code': 'd44', 'payroll_id': data_m.payroll_id, 'amount': data_m.d44, 'deduc_id':  44}
        #     deduc_list[46] = { 'code': 'd45', 'payroll_id': data_m.payroll_id, 'amount': data_m.d45, 'deduc_id':  45}
        #     deduc_list[47] = { 'code': 'd46', 'payroll_id': data_m.payroll_id, 'amount': data_m.d46, 'deduc_id':  46}
        #     deduc_list[48] = { 'code': 'd47', 'payroll_id': data_m.payroll_id, 'amount': data_m.d47, 'deduc_id':  47}
        #     deduc_list[49] = { 'code': 'd48', 'payroll_id': data_m.payroll_id, 'amount': data_m.d48, 'deduc_id':  48}
        #     deduc_list[50] = { 'code': 'd49', 'payroll_id': data_m.payroll_id, 'amount': data_m.d49, 'deduc_id':  49}
        #     deduc_list[51] = { 'code': 'd50', 'payroll_id': data_m.payroll_id, 'amount': data_m.d50, 'deduc_id':  50}
        #     deduc_list[52] = { 'code': 'd51', 'payroll_id': data_m.payroll_id, 'amount': data_m.d51, 'deduc_id':  51}
        #     deduc_list[53] = { 'code': 'd52', 'payroll_id': data_m.payroll_id, 'amount': data_m.d52, 'deduc_id':  52}
        #     deduc_list[54] = { 'code': 'd53', 'payroll_id': data_m.payroll_id, 'amount': data_m.d53, 'deduc_id':  53}
        #     deduc_list[55] = { 'code': 'd54', 'payroll_id': data_m.payroll_id, 'amount': data_m.d54, 'deduc_id':  54}
        #     deduc_list[56] = { 'code': 'd55', 'payroll_id': data_m.payroll_id, 'amount': data_m.d55, 'deduc_id':  55}
        #     deduc_list[57] = { 'code': 'd56', 'payroll_id': data_m.payroll_id, 'amount': data_m.d56, 'deduc_id':  56}
        #     print(data_m.payroll_id)
        #     md_objs = [];
        #     for i in range(1, 58):
        #         if deduc_list[i]['amount'] > 0:
        #             md_objs.append(
        #                 PayrollRegularDataDeductions(
        #                     payroll_regular_data_id = deduc_list[i]['payroll_id'],
        #                     deduction_id = deduc_list[i]['deduc_id'],
        #                     code = deduc_list[i]['code'],
        #                     amount = deduc_list[i]['amount'],
        #                 )
        #             )
        #     PayrollRegularDataDeductions.objects.bulk_create(md_objs)

        return Response({'status': 'success!!'}, 200)
