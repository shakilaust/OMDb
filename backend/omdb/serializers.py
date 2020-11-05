from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist
from omdb.models import Visitor, VisitorViewHistory, VisitorReview, VisitorWatchList



class VisitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitor
        fields = ('id','username')

    def validate(self, data):
        username = data.get('username')
        print('username', username)
        already_taken = Visitor.objects.filter(username=username).exists()
        print('already_taken', already_taken)
        if username:
            raise serializers.ValidationError("username is already taken")
        return data




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