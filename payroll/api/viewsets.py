import json

from payroll.models import Deductions
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .pagination import DeductionListPagination
from .serializers import DeductionListSerializer



class DeductionViewSet(viewsets.ModelViewSet):
    queryset = Deductions.objects.all()
    serializer_class = DeductionListSerializer
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