import rest_framework as filters
from .models import Orden
import django_filters 

class OrdenFilter(django_filters.FilterSet):
    start_date = django_filters.DateTimeFilter(field_name='fecha', lookup_expr='gte')
    end_date = django_filters.DateTimeFilter(field_name='fecha', lookup_expr='lte')

    class Meta:
        model = Orden
        fields = ['start_date', 'end_date','cliente']