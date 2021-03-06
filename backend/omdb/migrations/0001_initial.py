# Generated by Django 3.1 on 2020-11-05 15:42

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Visitor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(editable=False, max_length=30, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='VisitorWatchList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imdb_id', models.CharField(max_length=30)),
                ('currently_watching', models.BooleanField(default=True)),
                ('visitor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='omdb.visitor')),
            ],
        ),
        migrations.CreateModel(
            name='VisitorViewHistory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imdb_id', models.CharField(max_length=30)),
                ('last_visit', models.DateTimeField()),
                ('visitor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='omdb.visitor')),
            ],
        ),
        migrations.CreateModel(
            name='VisitorReview',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imdb_id', models.CharField(max_length=30)),
                ('review', models.TextField()),
                ('created_at', models.DateField(default=django.utils.timezone.now)),
                ('visitor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='omdb.visitor')),
            ],
        ),
    ]
