from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.
class User(models.Model):
  name = models.CharField(max_length=50)
  password = models.CharField(max_length=50)

  def __str__(self):
    return self.name


class Tournament(models.Model):
  date = models.DateTimeField(auto_now_add=True)
  name = models.CharField(max_length=50)
  players = models.ManyToManyField(User)
  winner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='winner')

  def clean(self):
    super().clean()
    if self.players.count() < 2:
      raise ValidationError("A tournament must have at least 2 players")
    if self.players.count()  > 4:
      raise ValidationError("A tournament must have less than 4 players")
    
  def __str__(self):
    return self.name


class Match(models.Model):

  tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
  players = models.ManyToManyField(User, through='Player')

  def __str__(self):
    players = self.players.all()

    if players.count() == 2:
      player1, player2 = players
      return f"{player1} vs {player2}"
    else:
      return f"{players.count()} players"
    
  def clean(self):
    super().clean()
    if self.players.count() != 2:
      raise ValidationError("A match must have exactly 2 players")
    

class Player(models.Model):
  match = models.ForeignKey(Match, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  points = models.IntegerField(default=0)
  is_winner = models.BooleanField(default=False)

  def __str__(self):
    return f"{self.user} in {self.match}"


class Meta:
  unique_together = [('match', 'user'), ('match', 'is_winner')]




