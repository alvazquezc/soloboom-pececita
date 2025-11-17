# soloboom-pececita v2

Scraper corregido para leer correctamente las columnas del leaderboard de SoloBoom.

### Instrucciones:

1. Sube este contenido a un repositorio GitHub (nombre sugerido: soloboom-pececita).
2. En Railway → Create New Project → Deploy from GitHub Repo.
3. Railway instalará Node y ejecutará el servidor automáticamente.
4. Tu endpoint será:
   https://<tu-dominio>.up.railway.app/api/pececita

### Cambios v2
- Ajuste de columnas reales:
  - posición: td[0]
  - nombre: td[2]
  - LP: td[10]
