# Aplication to learn and pratice ddd-pattern and Clean Architecture(design of code)

## Local development

- **Do not required node/npm on host**. Installs `node_modules` in the container image so local development don't problem of bind-mounting witch local source code. Add local host `node_modules` for not a problem with IDEs
- **Edit source code in host while run in container**. The docker-compose.yaml uses bind-mount of host source code into container

## Started

To build custom local image:

- Runing `docker compose build`
- If changing `package.json` you need to rebuild custom local image or run `docker compose up --build`

To run the project:

- Execute `docker compose up -d`

To execute the unit-tests:

- Execute `docker compose exec supremo_ddd_app npm test`, It will:
- Run a process `npm test` in the container.

To connect into de container:

- Run `docker exec -it supremo_ddd_patterns bash`
- If it is inside container run `npm test`

To down container:

- Execute `docker compose down`
