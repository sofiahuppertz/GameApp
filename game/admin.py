from django.contrib import admin

# Register your models here.
from .models import User, Tournament, Match, Player


admin.site.register(User)
admin.site.register(Tournament)
admin.site.register(Match)
admin.site.register(Player)
