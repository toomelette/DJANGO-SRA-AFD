from rest_framework.routers import DefaultRouter
from authentication.api.viewsets import RouteViewSet, SubrouteViewSet, UserViewSet
from employee.api.viewsets import StationViewSet, PlantillaViewSet, EmployeeViewSet, EmployeeEducationalBackgroundViewSet

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

urlpatterns = router.urls