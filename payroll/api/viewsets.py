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
        page = self.paginate_queryset(self.queryset.filter(filter_conditions).order_by('id'))
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)