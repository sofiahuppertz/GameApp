from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpRequest

# Create your views here.
def pong(request, mode):

  if (mode == "practice"):

    return render(request, "game/pong.html")
  
  elif (mode == "tournament"):

    return HttpResponse("Online mode selected.")
  
  return HttpResponse("Invalid mode selected.")


def playmode(request):

  if request.method == "POST":
    
    mode = request.POST.get("mode")
    if mode == "practice":
      return redirect("pong", mode="practice")
    elif mode == "tournament":
      return redirect("pong", mode="tournament")
    
  elif request.method == "GET": 
    
    return render(request, "game/playmode.html")
  
  return HttpResponse("Invalid request method.")