# TASKS API

## Description
This API was created to practice and show some of my Node js learning. It is a CRUD API for tasks and it has a login and a registration form for users. 
The user has to register. Next, you need to log in to the page for a token to be generated automatically. This token is used to protect task routes.
Only authenticated users can create, delete, and update tasks. If you are not logged into the page, you cannot use task routes.

## Dependencies
Express
Mongoose
Dotenv
Cors
Bcrypt
JWT
Morgan
Nodemon -D

## Deployment
To deploy this API you have to do:
### `npm install`
This install all the package.json
### Create an account in `https://account.mongodb.com/`
### Create a database
### Create yor own enviroment variables for the token,user,password,dbname
### `npm run dev`
starts the project with nodemon


