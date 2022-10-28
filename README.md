 # Información general


*Agregar la conexión a tu BD en el archivo .env

***
## Rutas

### Login:
>**POST** - localhost:4001/api/auth/login     - Se envian datos en el body { }          


### Users:
>**POST** - localhost:4001/api/users     - Se envian datos en el body { }          
>
>**GET** - localhost:4001/api/users?desde=0&limite=3 
>
>**PUT** - localhost:4001/api/users/:id     - Se envian datos en el body {}
>
>**DELETE**  - localhost:4001/api/users/:id

### Categories:
>**POST** - localhost:4001/api/categories   - Se envian datos en el body { }         
>
>**GET** - localhost:4001/api/categories?desde=0&limit=4
>
>**GET** - localhost:4001/api/categories/:id
>
>**PUT** - localhost:4001/api/categories/:id  - Se envian datos en el body { }         
>
>**DELETE**  - localhost:4001/api/categories/:id


### Products:
>
>**GET** - localhost:4001/api/products?desde=0&limit=4
>
>**GET** - localhost:4001/api/products/:id
>
>**PUT** - localhost:4001/api/products/:id  - Se envian datos en el body { }         
>
>**DELETE**  - localhost:4001/api/products/:id

