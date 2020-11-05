from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from omdb.models import Visitor, VisitorViewHistory, VisitorReview, VisitorWatchList
from omdb.serializers import VisitorSerializer, VisitorViewHistorySerializer, VisitorReviewSerializer, VisitorWatchListSerializer
from omdb.paginations import CreationTimeBasedPagination
from datetime import datetime


class VisitorViewSet(viewsets.ModelViewSet):
    queryset = Visitor.objects.all()
    serializer_class = VisitorSerializer
    permission_classes = (permissions.AllowAny, )

    def _ensure_visitor(self, username):
       
        if username is None:
            raise ValidationError('username is required')

        obj, created = Visitor.objects.get_or_create(username=username)
        return obj


    def create(self, request, *args, **kwargs):
        username = request.data.get('username', None)
        if username is None:
            return Response("username is required", status=status.HTTP_400_BAD_REQUEST)
        already_taken = Visitor.objects.filter(username=username).exists()
        if already_taken:
            return Response("username is already taken", status=status.HTTP_400_BAD_REQUEST)
        
        Visitor.objects.create(username=username)

        return Response({"username": username }, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def set_review(self, request, *args, **kwargs):
        username = request.data.get('username', None)
        visitor = self._ensure_visitor(username)
        serializer = VisitorReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
    @action(detail=False, permission_classes=[permissions.AllowAny])
    def recent_watch(self, request, *args, **kwargs):
        username = request.query_params.get('username', None)
        visitor = self._ensure_visitor(username)
        query_set = VisitorViewHistory.objects.filter(visitor=visitor).order_by('-last_visit')
        serializer = VisitorViewHistorySerializer(query_set, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def update_recent_watch(self, request, *args, **kwargs):
        username = request.data.get('username', None)
        visitor = self._ensure_visitor(username)
        imdb_id = request.data.get('imdb_id', None)
        if imdb_id is None:
            return Response({'imdb_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        obj, created = VisitorViewHistory.objects.update_or_create(visitor=visitor, imdb_id=imdb_id)
        serializer = VisitorViewHistorySerializer(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def update_watch_list(self, request, *args, **kwargs):
        username = request.data.get('username', None)
        visitor = self._ensure_visitor(username)
        data = {
            'visitor': visitor,
            'visitor': visitor,
            'imdb_id': request.data.get('imdb_id'),
            'last_visit': datetime.now(),
        }
        
        serializer = VisitorViewHistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, permission_classes=[permissions.AllowAny])
    def watch_list(self, request, *args, **kwargs):
        username = request.query_params.get('username', None)
        visitor = self._ensure_visitor(username)
        imdb_id = request.query_params.get('imdb_id', None)
        if imdb_id is None:
            return Response({'imdb_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        query_set = VisitorWatchListSerializer.objects.filter(visitor=visitor, imdb_id=imdb_id, currently_watching=True)
        serializer = VisitorViewHistorySerializer(query_set, many=True)
        return Response(serializer.data)

