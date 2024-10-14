
# University Server

## Objective

The University Server is a robust Node.js Express application built with TypeScript and MongoDB, designed for managing various university operations. The use of Mongoose for seamless MongoDB integration, coupled with Zod for data validation, ensures the integrity of the system and its data flow. The API is well-structured and provides endpoints for managing users, students, faculty, admins, academic semesters, semester registrations, academic departments, courses, offered courses, enrolled courses, and authentication.



Key features include:

- User Management: Separate endpoints to handle the creation, updating, and deletion of students, faculty, and admins.
- Course Management: Full CRUD operations for courses, along with faculty assignments and retrieval of enrolled/offered courses.
- Academic Management: Handling academic semesters and departments, with endpoints for registering semesters and managing academic faculties.
- Authentication: Secure login, token refresh, password management, and JWT-based authentication.
- Data Validation: Zod is used to ensure that all data is validated before it is saved to the database, maintaining high data integrity.
- Error Handling: Custom error-handling mechanisms ensure that any issues are logged and communicated consistently to the client.


To run this project locally, clone the repository, install the necessary dependencies, and configure the environment variables. This project stands as a reliable and scalable solution for managing university data efficiently, maintaining both security and flexibility.


## Links

- [university-server](https://phuni-server.vercel.app/)
- [university-management](https://phuni-frontend.vercel.app/auth/signin)
- [POSTMAN COLLECTION](./university-server.postman_collection.json)

Description: This is a postman collection of all the API endpoints.Download this, and import it in your postman if you needed.

- <a href="./university-server.postman_collection.json" target="_blank">Postman collection</a> 



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

`CLOUDINARY__CLOUD__NAME=<your-cloud-name>`

`CLOUDINARY__API__KEY=<your-cloudinary-api>`

`CLOUDINARY__API__SECRET=<your-cloudinary-secret>`


## Data Models
 ![erdiagram](https://github.com/user-attachments/assets/f4439a5e-1e1c-4ed9-80a7-0596ae8d7724)

## API Reference

Here is the table that includes the api endpoints for all the services:

| **API Type**       | **Action**                      | **Method** | **Endpoint**                         |
|--------------------|---------------------------------|------------|--------------------------------------|
| **Users**          | Create a new student            | POST       | `/api/v1/users/create-student`       |
|                    | Create a new faculty            | POST       | `/api/v1/users/create-faculty`       |
|                    | Create a new admin              | POST       | `/api/v1/users/create-admin`         |
| **Students**       | Retrieve all students           | GET        | `/api/v1/students`                   |
|                    | Retrieve a student              | GET        | `/api/v1/students/:id`               |
|                    | Update a student                | PATCH      | `/api/v1/students/:id`               |
|                    | Delete a student                | DELETE     | `/api/v1/students/:id`               |
| **Faculty**        | Retrieve all faculty            | GET        | `/api/v1/faculty`                    |
|                    | Retrieve a faculty              | GET        | `/api/v1/faculty/:id`                |
|                    | Update a faculty                | PATCH      | `/api/v1/faculty/:id`                |
|                    | Delete a faculty                | DELETE     | `/api/v1/faculty/:id`                |
| **Admin**          | Retrieve all admins             | GET        | `/api/v1/admin`                      |
|                    | Retrieve an admin               | GET        | `/api/v1/admin/:id`                  |
|                    | Update an admin                 | PATCH      | `/api/v1/admin/:id`                  |
|                    | Delete an admin                 | DELETE     | `/api/v1/admin/:id`                  |
| **Academic Semester** | Retrieve all semesters         | GET        | `/api/v1/academic-semester`          |
|                    | Retrieve a semester             | GET        | `/api/v1/academic-semester/:id`      |
|                    | Create a new semester           | POST       | `/api/v1/academic-semester/create-academic-semester`          |
|                    | Update a semester               | PATCH      | `/api/v1/academic-semester/:id`      |
|                    | Delete a semester               | DELETE     | `/api/v1/academic-semester/:id`      |
| **Semester Registration** | Retrieve all semesters  registration       | GET        | `/api/v1/semester-registrations`          |
|                    | Retrieve a semester   registration          | GET        | `/api/v1/semester-registrations/:id`      |
|                    | Create a new semester registration          | POST       | `/api/v1/semester-registrations/create-semester-registration`          |
|                    | Update a semester registration              | PATCH      | `/api/v1/semester-registrations/:id`      |
|                    | Delete a semester  registration             | DELETE     | `/api/v1/semester-registrations/:id`      |
| **Academic Faculty** | Retrieve all academic Faculty         | GET        | `/api/v1/academic-faculty`          |
|                    | Retrieve a academic Faculty             | GET        | `/api/v1/academic-faculty/:id`      |
|                    | Create a new academic Faculty           | POST       | `/api/v1/academic-faculty/create-academic-faculty`          |
|                    | Update a academic Faculty               | PATCH      | `/api/v1/academic-faculty/:id`      |
|                    | Delete a academic Faculty               | DELETE     | `/api/v1/academic-faculty/:id`      |
| **Academic Dept** | Retrieve all academic Dept         | GET        | `/api/v1/academic-dept`          |
|                    | Retrieve a academic Dept             | GET        | `/api/v1/academic-dept/:id`      |
|                    | Create a new academic Dept           | POST       | `/api/v1/academic-dept/create-academic-dept`          |
|                    | Update a academic Dept               | PATCH      | `/api/v1/academic-dept/:id`      |
|                    | Delete a academic Dept               | DELETE     | `/api/v1/academic-dept/:id`      |
| **Course**         | Retrieve all courses            | GET        | `/api/v1/courses`                    |
|                    | Retrieve a course               | GET        | `/api/v1/courses/:id`                |
|                    | Create a new course             | POST       | `/api/v1/courses`                    |
|                    | Update a course                 | PATCH      | `/api/v1/courses/:id`                |
|                    | Delete a course                 | DELETE     | `/api/v1/courses/:id`                |
|                    |  Assign faculties                 | PUT     | `/api/v1/courses/:id/assign-faculties`                |
|                    | Get faculties                 | GET     | `/api/v1/courses/:id/get-faculties`                |
|                    | Remove faculties                 | DELETE     | `/api/v1/courses/:id/remove-faculties`                |
| **Offered Course**  | Retrieve all offered courses    | GET        | `/api/v1/offered-courses`            |
|                    | Retrieve an offered course      | GET        | `/api/v1/offered-courses/:id`        |
|                    | Create a new offered course     | POST       | `/api/v1/offered-courses/create-offered-course`            |
|                    | Update an offered course        | PATCH      | `/api/v1/offered-courses/:id`        |
|                    | Delete an offered course        | DELETE     | `/api/v1/offered-courses/:id`        |
|                    | Get my offered courses        | DELETE     | `/api/v1/offered-courses/my-offered-courses`        |
| **Enrolled Course**  | Retrieve all enrolled courses    | GET        | `/api/v1/enrolled-course`            |
|                    | Retrieve an enrolled course      | GET        | `/api/v1/enrolled-course/my-enrolled-course`        |
|                    | Create a new enrolled course     | POST       | `/api/v1/enrolled-course/create-enrolled-course`            |
|                    | Update an enrolled course        | PATCH      | `/api/v1/enrolled-course/update-enrolled-course`        |
| **Auth**  | Auth login | POST        | `/api/v1/auth/login`            |
|                    | Change password | POST        | `/api/v1/auth/change-password`        |
|                    | Refresh token     | POST       | `/api/v1//auth/refresh-token`            |
|                    | Forget password | POST      | `/api/v1/auth/forget-password`        |
|                    | Reset password | POST     | `/api/v1/auth/reset-password`        |



This table organizes the API endpoints into groups (Users, Students, Faculty, Admin ,academic semesters, semester registration,academic faculty, academic dept, enrolled course, courses,auth and offered courses) and shows the HTTP methods associated with each endpoint.


## Conclusion

This project is developed a robust backend application using TypeScript, Express.js, and Mongoose for MongoDB. The focus on proper data modeling, validation, and CRUD operations ensures that the application is scalable, maintainable, and adheres to best practices for modern web development. This will also provide hands-on experience with key technologies and demonstrate proficiency in building and managing a RESTful API for educational platforms or similar applications.
