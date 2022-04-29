from django.contrib import admin
from django.urls import path
from dfs_app import views

urlpatterns = [
    path('<slug:tab>/<int:id>', views.get_record, name = 'view_products'),
    path('<slug:tab>', views.get_table, name = 'view_products'),
    # path('insert', views.insert_rec, name = 'insert_rec')
]