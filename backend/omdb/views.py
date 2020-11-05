from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from omdb.models import Visitor, VisitorViewHistory, VisitorReview, VisitorWatchList
from omdb.serializers import VisitorSerializer, VisitorViewHistorySerializer, VisitorReviewSerializer, VisitorWatchListSerializer
from omdb.paginations import CreationTimeBasedPagination


class OmdbAPIView(APIView):
    
    @action(detail=False, method=['post'])
    def create_visitor(self, request):
        serializer = VisitorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    @action(detail=False, method=['post'])
    def review(self, request, *args, **kwargs):
        serializer = VisitorReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=False, method=['post'])
    def marked_recent_watch(self, request, *args, **kwargs):
        serializer = VisitorViewHistorySerializer(data=request.data)
         if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    
    @action(detail=False)
    def recent_watch(self, request, *args, **kwargs):
        visitor = request.data.get('visitor', None)
        imdb_id = request.data.get('imdb_id', None)
        query_set = VisitorViewHistory.objects.filter(visitor=visitor, imdb_id=imdb_id).order_by('-created_at')
        serializer = VisitorViewHistorySerializer(query_set, many=True)
        return Response(serializer.data)

    
    @action(detail=False, method=['post'])
    def update_watch_list(self, request, *args, **kwargs):
        serializer = VisitorViewHistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False)
    def watch_list(self, request, *args, **kwargs):
        visitor = request.data.get('visitor', None)
        imdb_id = request.data.get('imdb_id', None)
        query_set = VisitorWatchListSerializer.objects.filter(visitor=visitor, imdb_id=imdb_id, currently_watching=True)
        serializer = VisitorViewHistorySerializer(query_set, many=True)
        return Response(serializer.data)



    
    
    





