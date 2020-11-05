from django.contrib import admin
from omdb.models import Visitor, VisitorViewHistory, VisitorReview, VisitorWatchList

@admin.register(Visitor)
class VisitorAdmin(admin.ModelAdmin):
    pass

@admin.register(VisitorViewHistory)
class VisitorViewHistoryAdmin(admin.ModelAdmin):
    pass

@admin.register(VisitorReview)
class VisitorReviewAdmin(admin.ModelAdmin):
    pass

@admin.register(VisitorWatchList)
class VisitorWatchListAdmin(admin.ModelAdmin):
    pass