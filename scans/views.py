from rest_framework import viewsets
from .models import Scan, Detection
from .serializers import ScanSerializer, DetectionSerializer

class ScanViewSet(viewsets.ModelViewSet):
    queryset = Scan.objects.all().order_by('-scan_date')
    serializer_class = ScanSerializer

class DetectionViewSet(viewsets.ModelViewSet):
    queryset = Detection.objects.all()
    serializer_class = DetectionSerializer
