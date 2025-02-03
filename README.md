Node.js RESTful API with Express & MongoDB

Project Overview

This project is a RESTful API built using Node.js, Express, and MongoDB to manage user information. It supports CRUD operations, secure authentication with bcrypt, and image uploading using Multer. API testing is performed using Postman.

Tech Stack

Backend: Node.js, Express.js, MongoDB, Mongoose

Authentication: bcrypt for secure password storage

File Handling: Multer for image uploads

Testing: Postman for API verification

Features & Endpoints

1. User Management APIs

POST /user/create: Creates a new user with full name, email, and password. Validates input and encrypts the password.

PUT /user/edit: Updates a user's full name and password (email cannot be updated). Ensures user exists before updating.

DELETE /user/delete: Deletes a user by their email.

GET /user/getAll: Retrieves all users' full names and emails (excluding passwords).

2. Image Upload API

POST /user/uploadImage: Uploads an image (JPEG, PNG, or GIF only). Uses Multer for file handling. Saves file path in the database.

3. API Testing with Postman

Start the server: Run npm start.

Test Endpoints: Open Postman and send requests to test user creation, updates, deletions, retrievals, and image uploads.

Validate Responses: Ensure API responses include correct HTTP status codes and error handling messages.

4. Security Measures

Password Encryption: All passwords are hashed using bcrypt.

Input Validation: Ensures required fields are properly formatted.

File Format Restriction: Only JPEG, PNG, and GIF files can be uploaded.

Environment Variables: Sensitive data is stored securely in .env.

