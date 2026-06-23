from rest_framework import viewsets
from .models import MarketListing
from .serializers import MarketListingSerializer

class MarketListingViewSet(viewsets.ModelViewSet):
    queryset = MarketListing.objects.all().order_by('-created_at')
    serializer_class = MarketListingSerializer
