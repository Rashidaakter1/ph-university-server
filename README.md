
# University Server

## Objective

Develop a Node.js Express application using TypeScript as the programming language, integrating MongoDB with Mongoose for university management. Ensure data integrity through validation using Zod.

## Links

- [university-server](https://phuni-server.vercel.app/)
- [university-management](https://phuni-frontend.vercel.app/auth/signin)



## Tech Stack

**Server:** 
Node.js, MongoDB, TypeScript, Mongoose




## Run Locally

Clone the project

```bash
 https://github.com/Rashidaakter1/university-server.git
```

Go to the project directory

```bash
  cd university-server
```

Install dependencies

```bash
  npm install
```

Start the server with development

```bash
  npm run start:dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=5000` 

`NODE_ENV=production`

`DATABASE__URL=<your-mongodb-connection-string>`

`DEFAULT__PASSWORD=<your-default-password>`

`BCRYPT__SALTROUND=<number>`

`JWT__ACCESS__TOKEN=<your-jwt-access-token>`

`JWT__ACCESS__EXPIRERS__IN=<your-access-expiry-time>`

`JWT__REFRESH__TOKEN=<your-jwt-refresh-token>`

`JWT__REFRESH__EXPIRERS__IN=<your-refresh-expiry-time>`

`RESET__UI__LINK=<your-localhost>`

`SUPER__ADMIN__PASSWORD=<your-default-password>`

## Data Models
 ![erdiagram](https://github.com/user-attachments/assets/f4439a5e-1e1c-4ed9-80a7-0596ae8d7724)

## API Reference

### Users's API Endpoints

#### Create a new student.

```http
  POST /api/v1/users/create-student
```
#### Create a new faculty.

```http
  POST /api/v1/users/create-faculty
```
#### Create a new admin.

```http
  POST /api/v1/users/create-admin
```

### Students API Endpoints

#### Retrieve all student 

```http
  GET /api/v1/students
```
#### Retrieve a student 

```http
  GET /api/v1/students/:id
```
#### Update a student 

```http
  GET /api/v1/students/:id
```
#### Delete a student 

```http
  GET /api/v1/students/:id
```
### Students API Endpoints

#### Retrieve all student 

```http
  GET /api/v1/students
```
#### Retrieve a student 

```http
  GET /api/v1/students/:id
```
#### Update a student 

```http
  PATCH /api/v1/students/:id
```
#### Delete a student 

```http
  DELETE /api/v1/students/:id
```
### Faculty API Endpoints

#### Retrieve all faculty 

```http
  GET /api/v1/faculty
```
#### Retrieve a faculty 

```http
  GET /api/v1/faculty/:id
```
#### Update a faculty 

```http
  PATCH /api/v1/faculty/:id
```
#### Delete a faculty 

```http
  DELETE /api/v1/faulty/:id
```
### Admin API Endpoints

#### Retrieve all admin 

```http
  GET /api/v1/admin
```
#### Retrieve a admin 

```http
  GET /api/v1/admin/:id
```
#### Update a admin 

```http
  PATCH /api/v1/admin/:id
```
#### Delete a admin 

```http
  DELETE /api/v1/admin/:id
```

### Review's API Endpoints

#### Add a new review 

```http
  POST /api/reviews
```

#### Retrieve all review 

```http
  GET /api/reviews
```





## Validation

All the creation and updating is validated using either Zod to ensure data integrity.

## Error Handling

The application uses custom error handling to provide meaningful error messages. Errors are logged and sent in a consistent format to the client.

## Conclusion

This project is developed a robust backend application using TypeScript, Express.js, and Mongoose for MongoDB.. The focus on proper data modeling, validation, and CRUD operations ensures that the application is scalable, maintainable, and adheres to best practices for modern web development. This will also provide hands-on experience with key technologies and demonstrate proficiency in building and managing a RESTful API for educational platforms or similar applications.
