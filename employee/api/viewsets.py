
from employee.models import Employee

from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import connection

from .serializers import (
    EmployeeSerializer
)

from .pagination import (
    EmployeeListPagination
)



class EmployeeViewSet(viewsets.ModelViewSet):
    
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    pagination_class = EmployeeListPagination


    def __sort_field(self):
        field = '-updated_at'
        sort_field = self.request.GET.get('sort_field', None)
        sort_order = self.request.GET.get('sort_order', None)
        available_sort_fields = ["fullname", "first_name", "last_name", "is_active"]
        if sort_field:
            if sort_field in available_sort_fields:
                if sort_order == "desc":
                    field = "-"+sort_field
                else:
                    field = sort_field
        return field


    def list(self, request):
        search = request.GET.get('q', None)
        online_status = request.GET.get('os', None)
        su_status = request.GET.get('sus', None)     
        filter_conditions = Q()

        if search or online_status or su_status:
            if search:
                filter_conditions.add(Q(username__icontains=search) | Q(first_name__icontains=search) | Q(last_name__icontains=search), Q.AND)
            if online_status:
                filter_conditions.add(Q(is_active = online_status), Q.AND) 
            if su_status:
                filter_conditions.add(Q(is_superuser = su_status), Q.AND)
        
        # page = self.paginate_queryset(self.queryset.filter(filter_conditions).order_by(self.__sort_field()))
        page = self.paginate_queryset(self.queryset.filter(filter_conditions).order_by('fullname'))
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)








    
