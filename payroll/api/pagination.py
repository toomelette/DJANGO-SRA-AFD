from rest_framework.pagination import PageNumberPagination

class DeductionListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'

class AllowanceListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'

class TemplateListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'

class TemplateDataListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'