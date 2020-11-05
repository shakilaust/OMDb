from django.urls import reverse
from rest_framework import status
from django.test import TestCase, RequestFactory
from rest_framework.test import APIClient
from omdb.models import Visitor, VisitorViewHistory, VisitorReview, VisitorWatchList
from omdb.views import VisitorViewSet
from rest_framework.test import APIRequestFactory
import json

class VisitorTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.visitor = Visitor.objects.create(username='shakil')
        self.visitor_first_history = VisitorViewHistory.objects.create(visitor=self.visitor, imdb_id='t1231')
        self.visitor_second_history = VisitorViewHistory.objects.create(visitor=self.visitor, imdb_id='t1232')
        self.visitor_first_review = VisitorReview.objects.create(visitor=self.visitor, imdb_id='t1231', review='good one')
        self.visitor_first_review = VisitorReview.objects.create(visitor=self.visitor, imdb_id='t1232', review='bad one')
        self.visitor_watching = VisitorWatchList.objects.create(visitor=self.visitor, imdb_id='t1232')
    
    def test_visitor_creation(self):
        client = APIClient()
        data = json.dumps({'username': 'dd23edwd'})
        response = client.post('/api/visitors/', data=data, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Visitor.objects.count(), 2)
        self.assertEqual(Visitor.objects.get(username='shakil').username, 'shakil')
    
    def test_recent_watch(self):
        client = APIClient()
        request = self.factory.get('/api/visitors/recent_watch/?username=shakil')
        response = VisitorViewSet.as_view({'get': 'recent_watch'})(request)
        self.assertEqual(response.data[0]['imdb_id'], 't1232')
        self.assertEqual(response.data[1]['imdb_id'], 't1231')