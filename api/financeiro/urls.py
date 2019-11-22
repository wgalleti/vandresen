from rest_framework import routers
from financeiro.views import (
    FazendaViewSet,
    FornecedorViewSet,
    MovimentoViewSet,
    ContasPagarViewSet)

app_routes = routers.DefaultRouter()
app_routes.register('fazendas', FazendaViewSet)
app_routes.register('fornecedores', FornecedorViewSet)
app_routes.register('movimentos', MovimentoViewSet)
app_routes.register('contaspagar', ContasPagarViewSet)

urlpatterns = app_routes.urls
