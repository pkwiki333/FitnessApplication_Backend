# Examenopdracht Web Services

> Schrap hierboven wat niet past

- Student: Quinten Van Wiele (pkwiki333 op Github)
- Studentennummer: 202184153
- E-mailadres: quinten.vanwiele@student.hogent.be

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

## Opstarten

> Schrijf hier hoe we de applicatie starten (.env bestanden aanmaken, commando's om uit te voeren...)

1. typ het commando 'yarn install' in de terminal
2. Maak een .env bestand in de root van het project.
3. Vervoledig het .env.De delen tussen <> moeten worden aangepast. De dingen die er in moeten zijn:

- NODE_ENV=development
- DATABASE_URL = "mysql://<db username>:<db password>@localhost:3306/<db name>?connection_limit=5&socket_timeout=3"
- AUTH_JWKS_URI = <auth0 profile>.well-known/jwks.json
- AUTH_AUDIENCE = <auth0 audience>
- AUTH_ISSUER = <auth0 issuer>
- AUTH_USER_INFO = <auth 0 profile url>/userinfo

4. Voer het commando 'yarn install' in de terminal in om de server te starten.

## Testen

> Schrijf hier hoe we de testen uitvoeren (.env bestanden aanmaken, commando's om uit te voeren...)

1. voer de stappen van opstarten uit.
2. Maak een .env.test bestand in de root van het project.
3. Vervoledig het .env.test de dingen die er in moeten zijn:

- NODE_ENV=development
- DATABASE_URL = "mysql://<db username>:<db password>@localhost:3306/<db name>?connection_limit=5&socket_timeout=3"
- AUTH_JWKS_URI = <auth0 profile>.well-known/jwks.json
- AUTH_AUDIENCE = <auth0 audience>
- AUTH_ISSUER = <auth0 issuer>
- AUTH_USER_INFO = <auth 0 profile url>/userinfo
- AUTH_TEST_USER_USER_ID = <auth id test user>
- AUTH_TEST_USER_USERNAME = <test user username>
- AUTH_TEST_USER_PASSWORD = <test user password>
- AUTH_TOKEN_URL = =<Auth0 domain>/oauth/token
- AUTH_CLIENT_ID = <clientId>
- AUTH_CLIENT_SECRET = <Client secret Auth0>

4. Voer het commando 'npx cypress run' uit in de terminal om de testen te starten.
