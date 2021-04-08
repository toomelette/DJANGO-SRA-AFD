
from employee.models import Employee

from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import connection

from .pagination import EmployeeListPagination
from .serializers import (
    EmployeeSerializer
)




class EmployeeViewSet(viewsets.ModelViewSet):
    
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
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








    
