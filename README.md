
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

Here is a simple table that summarizes the provided API endpoints:

Here is the updated table that includes the endpoints for academic semesters, courses, and offered courses:

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


This table now includes the endpoints for managing academic semesters, courses, and offered courses alongside the previous user, student, faculty, and admin endpoints.

This table organizes the API endpoints into groups (Users, Students, Faculty, Admin) and shows the HTTP methods associated with each endpoint.


## Validation

All the creation and updating is validated using either Zod to ensure data integrity.

## Error Handling

The application uses custom error handling to provide meaningful error messages. Errors are logged and sent in a consistent format to the client.

## Conclusion

This project is developed a robust backend application using TypeScript, Express.js, and Mongoose for MongoDB.. The focus on proper data modeling, validation, and CRUD operations ensures that the application is scalable, maintainable, and adheres to best practices for modern web development. This will also provide hands-on experience with key technologies and demonstrate proficiency in building and managing a RESTful API for educational platforms or similar applications.
