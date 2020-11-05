from django.db import models
from django.utils import timezone

class Visitor(models.Model):
    username = models.CharField(max_length=30, editable=False, unique=True)


class VisitorViewHistory(models.Model):
    visitor = models.ForeignKey(Visitor, on_delete=models.CASCADE)
    imdb_id = models.CharField(max_length=30)
    last_visit = models.DateTimeField()


class VisitorReview(models.Model):
    visitor = models.ForeignKey(Visitor, on_delete=models.CASCADE)
    imdb_id = models.CharField(max_length=30)
    review = models.TextField()
    created_at = models.DateField(default=timezone.now)


class VisitorWatchList(models.Model):
    visitor = models.ForeignKey(Visitor, on_delete=models.CASCADE)
    imdb_id = models.CharField(max_length=30)
    currently_watching = models.BooleanField(default=True)








