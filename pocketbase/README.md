After launching:
http://127.0.0.1:8090 - API
http://localhost:8093/_/ - Admin dashboard UI

First superused login requires hidden URL, which can be gotten with:
docker logs pocketbase
--> (!) Launch the URL below in the browser if it hasn't been open already to create your first superuser account:
The URL is http://0.0.0.0_8090/_/... replace the start with http://localhost:8093/_/ not match the host path