from rest_framework.routers import DefaultRouter
from authentication.api.viewsets import RouteViewSet, SubrouteViewSet, UserViewSet
from employee.api.viewsets import (
    StationViewSet, 
    PlantillaViewSet, 
    EmployeeViewSet, 
    EmployeeEducationalBackgroundViewSet, 
    EmployeeEligibilityViewSet
)
from payroll.api.viewsets import (
    DeductionViewSet, 
    AllowanceViewSet, 
    TemplateViewSet, 
    TemplateDataViewSet, 
    TestViewSet
)

router = DefaultRouter()

#authentication
router.register('user', UserViewSet, basename='user')
router.register('route', RouteViewSet, basename='route')
router.register('subroute', SubrouteViewSet, basename='subroute')

#employee
router.register('station', StationViewSet, basename='station')
router.register('plantilla', PlantillaViewSet, basename='plantilla')
router.register('employee', EmployeeViewSet, basename='employee')
router.register('employee_educ_bg', EmployeeEducationalBackgroundViewSet, basename='employee_educ_bg')
router.register('employee_elig', EmployeeEligibilityViewSet, basename='employee_elig')

#payroll
router.register('deduction', DeductionViewSet, basename='deduction')
router.register('allowance', AllowanceViewSet, basename='allowance')
router.register('template', TemplateViewSet, basename='template')
router.register('template_data', TemplateDataViewSet, basename='template_data')

router.register('test', TestViewSet, basename='test')

urlpatterns = router.urls