from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from omdb.models import Visitor, VisitorViewHistory, VisitorReview, VisitorWatchList
from omdb.serializers import VisitorSerializer, VisitorViewHistorySerializer, VisitorReviewSerializer, VisitorWatchListSerializer
from omdb.paginations import CreationTimeBasedPagination


class VisitorViewSet(ModelViewSet):
    pass

class VisitorViewHistoryViewSet(ModelViewSet):
    pass

class VisitorReviewViewSet(ModelViewSet):
    pass

class VisitorWatchListViewSet(ModelViewSet):
    pass

