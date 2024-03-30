# Virtual Library
Project for Databases course at AGH UST.

## Authors:
- Marcin Żurawel
- Kuba Świątek

## Key features:
- browsing and renting resources from the library
- admin panel for managing rentals and pending shipment requests

## Technologies:
MongoDB (MongoDB Atlas, Mongoose.js), Node.js (TypeScript, Express, JWT, bcrypt.js), React (TypeScript, Chakra UI)

## Database Schema:
We used a NoSQL database, so our schema took form of 3 MongoDB collections:
### Rental
```js
{
    _id: string,
    clientId: User_id,
    productId: Product_id,
    productName: string,
    quantity: number,
    isPending: boolean,
    address: { street: string, zipCode: string, city: string },
    borrowDate?: Date,
    dueDate?: Date,
    returnDate?: Date,
    fine?: number,
    ifProlonged?: boolean,
}
```
### User
```js
{
    _id: string,
    username: string,
    password: string,
    role: "admin" | "user",
}
```
### Product
```js
{
    _id: string,
    name: string,
    description?: string,
    quantity: number,
    imageUrl?: string,
}
```
## API endpoints

# Virtual Library
Project for Databases course at AGH UST

## Authors:
- Marcin Żurawel
- Kuba Świątek

## Key features:
- browsing and renting resources from the library
- admin panel for managing rentals and pending shipment requests

## Technologies:
MongoDB (MongoDB Atlas, Mongoose.js), Node.js (TypeScript, Express, JWT, bcrypt.js), React (TypeScript, Chakra UI)

## Database Schema:
We used a NoSql database, so our schema took form of 3 MongoDB collections:
### Rental
```js
{
    _id: string,
    clientId: User_id,
    productId: Product_id,
    productName: string,
    quantity: number,
    isPending: boolean,
    address: { street: string, zipCode: string, city: string },
    borrowDate?: Date,
    dueDate?: Date,
    returnDate?: Date,
    fine?: number,
    ifProlonged?: boolean,
}
```
### User
```js
{
    _id: string,
    username: string,
    password: string,
    role: "admin" | "user",
}
```
### Product
```js
{
    _id: string,
    name: string,
    description?: string,
    quantity: number,
    imageUrl?: string,
}
```
## API endpoints

### Rentals

<details>
 <summary><code>GET /rentals/fines</code></summary>

#### Get fines information.

##### Parameters

None

##### Privilages

- Admin

##### Responses

| HTTP Status  | Content-Type        | Response Body          |
|--------------|---------------------|------------------------|
| 200          | `application/json`  | Array of fine objects  |
| 401          | `application/json`  | `{ "message": "Unauthorized!" }` |
| 403          | `application/json`  | `{ "message": "No token provided!" }` |
| 403          | `application/json`  | `{ "message": "Unauthorized: no admin privileges" }` |

</details>

<details>
 <summary><code>GET /rentals/pending</code></summary>

#### Retrieve pending rentals.

##### Parameters

None

##### Privilages

- Admin

##### Responses

| HTTP Status  | Content-Type        | Response Body          |
|--------------|---------------------|------------------------|
| 200          | `application/json`  | Array of rental objects |
| 401          | `application/json`  | `{ "message": "Unauthorized!" }` |
| 403          | `application/json`  | `{ "message": "No token provided!" }` |
| 403          | `application/json`  | `{ "message": "Unauthorized: no admin privileges" }` |

</details>


<details>
 <summary><code>GET /rentals</code></summary>

#### Retrieve all rentals.

##### Parameters

None

##### Privilages

- User

##### Responses

| HTTP Status  | Content-Type        | Response Body          |
|--------------|---------------------|------------------------|
| 200          | `application/json`  | Array of rental objects |
| 403          | `application/json`  | `{ "message": "No token provided!" }` |
| 401          | `application/json`  | `{ "message": "Unauthorized!" }` |
| 404          | `application/json`  | `{ "error": "Rental not found." }` |

</details>

<details>
 <summary><code>GET /rentals/:id</code></summary>

#### Retrieve a rental by ID.

##### Parameters

| Name  | Type      | Description            |
|-------|-----------|------------------------|
| `id`  | String    | ID of the rental       |

##### Privilages

- User

##### Responses

| HTTP Status  | Content-Type        | Response Body          |
|--------------|---------------------|------------------------|
| 200          | `application/json`  | Rental object          |
| 403          | `application/json`  | `{ "message": "No token provided!" }` |
| 401          | `application/json`  | `{ "message": "Unauthorized!" }` |
| 404          | `application/json`  | `{ "error": "Rental not found." }` |

</details>

<details>
 <summary><code>POST /rentals</code></summary>

#### Add a new rental.

##### Parameters

| Name           | Type      | Description           |
|----------------|-----------|-----------------------|
| `userId`       | String    | ID of the user renting |
| `productId`    | String    | ID of the product being rented |
| `rentalDate`   | String    | Date of rental         |
| `returnDate`   | String    | Date of return         |

##### Privilages

- User

##### Responses

| HTTP Status  | Content-Type        | Response Body          |
|--------------|---------------------|------------------------|
| 201          | `application/json`  | Created rental object  |
| 403          | `application/json`  | `{ "message": "No token provided!" }` |
| 401          | `application/json`  | `{ "message": "Unauthorized!" }` |
| 400          | `application/json`  | `{ "error": "Insufficient quantity available for the product." }` |
| 404          | `application/json`  | `{ "error": "Product not found." }` |

</details>

<details>
 <summary><code>PUT /rentals/:id</code></summary>

#### Update a rental by ID.

##### Parameters

| Name           | Type      | Description           |
|----------------|-----------|-----------------------|
| `id`           | String    | ID of the rental      |
| `userId`       | String    | Updated ID of the user renting |
| `productId`    | String    | Updated ID of the product being rented |
| `rentalDate`   | String    | Updated date of rental |
| `returnDate`   | String    | Updated date of return |

##### Privilages

- User

##### Responses

| HTTP Status  | Content-Type        | Response Body          |
|--------------|---------------------|------------------------|
| 200          | `application/json`  | Updated rental object  |
| 403          | `application/json`  | `{ "message": "No token provided!" }` |
| 401          | `application/json`  | `{ "message": "Unauthorized!" }` |
| 404          | `application/json`  | `{ "error": "Rental not found." }` |

</details>

<details>
 <summary><code>DELETE /rentals/:id</code></summary>

#### Delete a rental by ID.

##### Parameters

| Name  | Type      | Description            |
|-------|-----------|------------------------|
| `id`  | String    | ID of the rental       |

##### Privilages

- User

##### Responses

| HTTP Status  | Content-Type        | Response Body          |
|--------------|---------------------|------------------------|
| 200          | `application/json`  | Success message        |
| 403          | `application/json`  | `{ "message": "No token provided!" }` |
| 401          | `application/json`  | `{ "message": "Unauthorized!" }` |
| 404          | `application/json`  | `{ "error": "Rental not found." }` |

</details>

### User

<details>
 <summary><code>POST /user/signup</code></summary>

#### User Registration

##### Parameters

| Name      | Type      | Description          |
|-----------|-----------|----------------------|
| `username`| String    | User's username     |
| `password`| String    | User's password     |

##### Privilages

- User

##### Responses

| HTTP Status  | Content-Type        | Response Body          |
|--------------|---------------------|------------------------|
| 200          | `application/json`  | Object of the registered user |

</details>

<details>
 <summary><code>POST /user/signin</code></summary>

#### User Login

##### Parameters

| Name      | Type      | Description          |
|-----------|-----------|----------------------|
| `username`| String    | User's username     |
| `password`| String    | User's password     |

##### Privilages

- User

##### Responses

| HTTP Status  | Content-Type        | Response Body          |
|--------------|---------------------|------------------------|
| 200          | `application/json`  | Object of the logged-in user |

</details>

<details>
 <summary><code>GET /user/rentals</code></summary>

#### Get User Rentals

##### Parameters

None

##### Privilages

- User

##### Responses

| HTTP Status  | Content-Type        | Response Body          |
|--------------|---------------------|------------------------|
| 200          | `application/json`  | Array of user's rental objects |
| 403          | `application/json`  | `{ "message": "No token provided!" }` |
| 401          | `application/json`  | `{ "message": "Unauthorized!" }` |

</details>

### Products

<details>
 <summary><code>GET /products</code></summary>

#### Retrieve all products.

##### Parameters

None

##### Privilages

- User

##### Responses

| HTTP Status  | Content-Type        | Response Body          |
|--------------|---------------------|------------------------|
| 200          | `application/json`  | Array of product objects |
| 404          | `application/json`  | `{ "error": "Product not found." }` |

</details>

<details>
 <summary><code>POST /products</code></summary>

#### Add a new product.

##### Parameters

| Name           | Type      | Description           |
|----------------|-----------|-----------------------|
| `name`         | String    | Name of the product   |
| `description`  | String    | Description of the product |
| `quantity`     | Number    | Quantity of the product |
| `imageUrl`     | String    | URL of the product image |

##### Privilages

- Admin

##### Responses

| HTTP Status  | Content-Type        | Response Body          |
|--------------|---------------------|------------------------|
| 201          | `application/json`  | Created product object |
| 403          | `application/json`  | `{ "message": "No token provided!" }` |
| 401          | `application/json`  | `{ "message": "Unauthorized!" }` |
| 404          | `application/json`  | `{ "error": "Product not found." }` |

</details>

<details>
 <summary><code>GET /products/:id</code></summary>

#### Retrieve a product by ID.

##### Parameters

| Name  | Type      | Description            |
|-------|-----------|------------------------|
| `id`  | String    | ID of the product      |

##### Privilages

- User

##### Responses

| HTTP Status  | Content-Type        | Response Body          |
|--------------|---------------------|------------------------|
| 200          | `application/json`  | Product object         |
| 403          | `application/json`  | `{ "message": "No token provided!" }` |
| 401          | `application/json`  | `{ "message": "Unauthorized!" }` |
| 404          | `application/json`  | `{ "error": "Product not found." }` |

</details>

<details>
 <summary><code>PUT /products/:id</code></summary>

#### Update a product by ID.

##### Parameters

| Name           | Type      | Description           |
|----------------|-----------|-----------------------|
| `id`           | String    | ID of the product     |
| `name`         | String    | Updated name of the product |
| `description`  | String    | Updated description of the product |
| `quantity`     | Number    | Updated quantity of the product |
| `imageUrl`     | String    | Updated URL of the product image |

##### Privilages

- Admin

##### Responses

| HTTP Status  | Content-Type        | Response Body          |
|--------------|---------------------|------------------------|
| 200          | `application/json`  | Updated product object |
| 403          | `application/json`  | `{ "message": "No token provided!" }` |
| 401          | `application/json`  | `{ "message": "Unauthorized!" }` |
| 404          | `application/json`  | `{ "error": "Product not found." }` |

</details>

<details>
 <summary><code>DELETE /products/:id</code></summary>

#### Delete a product by ID.

##### Parameters

| Name  | Type      | Description            |
|-------|-----------|------------------------|
| `id`  | String    | ID of the product      |

##### Privilages

- Admin

##### Responses

| HTTP Status  | Content-Type        | Response Body          |
|--------------|---------------------|------------------------|
| 200          | `application/json`  | Success message        |
| 403          | `application/json`  | `{ "message": "No token provided!" }` |
| 401          | `application/json`  | `{ "message": "Unauthorized!" }` |
| 404          | `application/json`  | `{ "error": "Product not found." }` |

</details>


## Tour
After opening the app we are redirected to the authorization page.\
![image](https://github.com/mrcxmrj/rental/assets/22504559/5772d0e9-c1fb-441b-b467-5565ecb0d621)\
Successful sign up results in a new record being created in the database. We can also see the password being properly hashed.\
![image](https://github.com/mrcxmrj/rental/assets/22504559/999421bd-c0db-4ce9-a4e0-07c5ed920c99)\
After logging in, a personal homepage is being displayed, where we can view our current rentals.\
![image](https://github.com/mrcxmrj/rental/assets/22504559/0380dd72-aac2-4f62-95d8-e44f781d3f57)\
We just created our account, so no rentals are being shown. Let's head to the Collection page and make our first rental! We're true fantasy connoisseurs, so we pick J.R.R. Tolkien's Silmarillion.\
![image](https://github.com/mrcxmrj/rental/assets/22504559/9d2d95a5-b40f-45a9-ae76-2e758bf81195)\
We can then specify the quantity.\
![image](https://github.com/mrcxmrj/rental/assets/22504559/7bb173e6-ccef-4053-9cd0-3186d34ddd37)\
Finally we can see our rental is succesfully displayed on the homepage.\
![image](https://github.com/mrcxmrj/rental/assets/22504559/b6936ccf-29f4-46e2-bf67-81e387120e5e)\
If we log in as an admin, we can view a special panel displaying incoming orders, and enabling us to confirm successful shipments.\
![image](https://github.com/mrcxmrj/rental/assets/22504559/d42a92d2-dedb-4ac7-8fc5-9ee71b0bf7ad)
