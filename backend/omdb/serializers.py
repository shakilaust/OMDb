from rest_framework import serializers
from omdb.models import Visitor, VisitorViewHistory, VisitorReview, VisitorWatchList

class VisitorSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Visitor
        fields = ('username',)


class VisitorViewHistorySerializer(serializers.ModelSerializer):
    class Meta: 
        model = VisitorViewHistory
        fields = ('visitor','imdb_id', 'last_visit')


class VisitorReviewSerializer(serializers.ModelSerializer):
    class Meta: 
        model = VisitorReview
        fields = ('visitor','imdb_id', 'created_at', 'review')


class VisitorWatchListSerializer(serializers.ModelSerializer):
    class Meta: 
        model = VisitorWatchList
        fields = ('visitor','imdb_id', 'currently_watching')