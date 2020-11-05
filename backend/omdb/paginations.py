from rest_framework.pagination import CursorPagination
class CreationTimeBasedPagination(CursorPagination):
    ordering = '-created_at'