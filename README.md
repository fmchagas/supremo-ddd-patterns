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


# Domain Events
- "Use um evento de domínio para capturar uma ocorrência de algo que aconteceu no domínio" Vernon, Vaughn. Implementing DDD

- "A essência de um evento de domíno é que você o usa para capturar coisas que podem desencadear uma mudança no estado do aplicativo que você está desenvolvendo..."
Fowler, Martin. Domain Event

- Todo envento deve ser representado em uma ação realizada no passado. UserCreated, OrderCreated, OrderPlaced, OrderPaid, OrderInvoiced, OrderDelivered

## Quando utilizar

Normalmento utilizamos quando queremos notificar outros Bounded Context de uma mudança de estado.

## Componentes

- Event: Tem data e hora e o que aconteuceu
- Handler: Executa o processamento quando um evento é chamado(posso ter varios handles para um evento, Ex: evento Cria usuário handler Enviar email, handler Cadastra no CRM, handler Envia para mensageria)
- Event Dispatcher: Responsável por armazenar e executar os handlers de um evento quando ele for disparado(registro todos os eventos e quais os handles do evento e posso notificar e os handles quando evento é disparado)

### Dinâmica
- Criar um `Event Dispatcher`
- criar um `Evento`
- criar um `Handler` para `Evento`
- Registrar o `Evento`, juntamente com o `Handler` no `Event Disátcher`
- Disparanto um evento, é só executar o método `notify/dispatcher/send` do `Event Dispatcher` e todos os `Handlers` registrado no evento serão executados


# Modulos em contexto DDD - Como modularizar minha APP?
- Serve como container nomeados para classes e objetos de domínio
- Nomear adequadamente, pois modulos não são compartimentos de armazenamento anêmicos ou genéricos
- Respeitar a liguagem Universal(ubíquo) - modulos devem gritar o que está fazendo/o que é, ou seja modulo não representa o nome do projeto, empresa, marca
- Um ou mais agregados devem estar juntos se fazem sentido
- Organizar pelo domínio/subdomínio(contexto) e não pelo tipo de objetos(ou camada)
- Devem respeitar a mesma divisão quando estão em camadas diferentes
- Pense em `contexto delimitado(bounded context)` dentro dele os `modulos(pacotes)`, então varios `modulos(pacotes)` podem compor um único contexto delimitado