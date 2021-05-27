import json
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
                Q(name__icontains=search) | Q(description__icontains=search) | Q(process_date__icontains=search), Q.AND
            )
        page = self.paginate_queryset(self.queryset.filter(filter_conditions).order_by('-updated_at'))
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)



# class PayrollRegularDataViewSet(viewsets.ModelViewSet):
#     queryset = PayrollRegularData.objects.all()
#     serializer_class = PayrollRegularDataSerializer
#     pagination_class = PayrollRegularDataListPagination

#     def list(self, request):
#         template_id = request.GET.get('ti', None)
#         search = request.GET.get('q', None)
#         filter_conditions = Q()
#         if template_id:
#             filter_conditions.add(Q(template_id=template_id), Q.AND)
#         page = self.paginate_queryset(self.queryset.filter(filter_conditions).order_by('-updated_at'))
#         serializer = self.get_serializer(page, many=True)
#         return self.get_paginated_response(serializer.data)



# class TestViewSet(viewsets.ModelViewSet):
#     queryset = PayrollData.objects.all()
#     serializer_class = PayrollDataSerializer
#     pagination_class = PayrollDataListPagination

#     def list(self, request):
#         td = PayrollData.objects.all()
#         st = Station.objects.all()
#         for data_td in td:
#             try:
#                 st_obj = st.get(station_id=data_td.station_no)
#                 td_obj = td.get(id=data_td.id)
#                 td_obj.station = st_obj
#                 td_obj.save()
#                 print(td_obj.fullname)
#                 print(st_obj.name)
#             except:
#                 print('Error!!')
#         return Response({'status':'Success!!'}, 200)
