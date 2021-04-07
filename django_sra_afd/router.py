from authentication.api.viewsets import RouteViewSet, SubrouteViewSet, UserViewSet
from employee.api.viewsets import EmployeeViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

#authentication
router.register('user', UserViewSet, basename='user')
router.register('route', RouteViewSet, basename='route')
router.register('subroute', SubrouteViewSet, basename='subroute')

#employee
router.register('employee', EmployeeViewSet, basename='employee')

urlpatterns = router.urls