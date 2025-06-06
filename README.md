# Configuración docker

Para correr los contenedores de docker, hay que usar los siguientes comandos:

Para montarlo (solo se ejecuta una vez)

```bash
docker compose up
```
si sale algun error, ponerle sudo para darle permisos.

## Luego de la primera vez ejecutar este
```
sudo docker compose up --build
```

En caso de tener algun error, como en mi caso, porque no se instalaron los paquetes de npm
```bash
sh: next not found
```

Ejecutar los siguientes comandos:
```bash
docker compose exec frontend sh
npm install
```

