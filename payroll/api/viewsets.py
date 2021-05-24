import json

from payroll.models import Deductions, Allowances, Template, TemplateData, TemplateDataDeductions, Mock
from employee.models import Employee, Station
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .pagination import DeductionListPagination, AllowanceListPagination
from .serializers import DeductionSerializer, AllowanceSerializer



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
            allowance.amount = serializer.data['amount']
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
            allowance.amount = serializer.data['amount']
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



class TemplateViewSet(viewsets.ModelViewSet):
    queryset = Template.objects.all()

    def list(self, request):
        tdd_queryset = TemplateDataDeductions.objects.all()
        m_queryset = Mock.objects.all()

        for data_m in m_queryset:
            deduc_list = dict()
            deduc_list.update({ 'd1' : data_m.d1 })
            deduc_list.update({ 'd2' : data_m.d2 })
            print(deduc_list)
            

            
        return Response({"status":"Success"}, 200)
