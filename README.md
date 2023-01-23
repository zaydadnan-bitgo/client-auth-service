# Client Auth Service
The Client Auth Service is responsible for providing  Identity and Access Management for BitGo Developer accounts to generate oauth clients within Keycloak for signing in with BitGo. 



# Local Development 

### Prerequisites
- docker
- docker compose
- Java
- Maven

Start the keycloak instance by first running the [identity-service](https://github.com/BitGo/identity-service) in local development  
Keycloak should be now running at http://localhost:8000

Then, start the client-auth-service: 
```shell
npm run dev 
```

Requests can be made and verified in the admin console of keycloak 
