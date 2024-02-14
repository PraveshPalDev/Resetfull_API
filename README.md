# Express API Documentation

## Introduction

This project is an Express.js API that provides endpoints for managing user data.

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the server using `npm run dev`.

## Endpoints

### GET /

- Description: Displays a welcome message.
- Response: "Welcome to server"

### GET /users

- Description: Retrieves a list of users as HTML.
- Response: Returns a list of users in HTML format.

### GET /api/users

- Description: Retrieves a list of users as JSON.
- Response: Returns a list of users in JSON format.

### GET /api/users/:id

- Description: Retrieves a user by ID.
- Parameters:
  - id: User ID
- Response: Returns user data matching the provided ID.

### GET /api/user

- Description: Retrieves a user by ID using query parameters.
- Parameters:
  - id: User ID
- Response: Returns user data matching the provided ID.

### POST /api/users

- Description: Creates a new user.
- Request Body: JSON object containing user data.
- Response: Returns a success message upon successful creation.

### PUT /api/users

- Description: Updates an existing user.
- Request Body: JSON object containing user data.
- Response: Returns a success message upon successful update.

### PATCH /api/users

- Description: Partially updates an existing user.
- Request Body: JSON object containing updated user data.
- Response: Returns a success message upon successful update.

### DELETE /api/users/:id

- Description: Deletes a user by ID.
- Parameters:
  - id: User ID
- Response: Returns a success message upon successful deletion.

## Examples

```bash
# Retrieve list of users
curl http://localhost:4000/api/users

# Retrieve user by ID
curl http://localhost:4000/api/users/1

# Create new user
curl -X POST -H "Content-Type: application/json" -d '{"first_name":"John","last_name":"Doe"}' http://localhost:4000/api/users

# Update user
curl -X PUT -H "Content-Type: application/json" -d '{"id":1, "first_name":"Jane"}' http://localhost:4000/api/users

# Delete user by ID
curl -X DELETE http://localhost:4000/api/users/1
```
