# Django React Crud

## Commands:

_Make sure you have docker and docker compose installed and running_

- Run `make up` in the root folder of the project to build and start the container
- Run `make down` in the root folder of the project to stop the container
- Run `make rm` in the root folder of the project to remove the container

## Setup:

Inside the backend projects in a folder called utils there is a file called crypt, inside it there is a function that will generate a public and private key pair which are required to be set in the .env files. This keys are used to encrypt the password so it don't travel in plain text through the web.

## Urls:

- Django will be available at `localhost:8000`
- React is available at `localhost:3000`

## User CRUD:

Go to `localhost:3000/`, there you will see the login page and the option to create an account. After creating an account you are able to login into the app, the first page receives you with your name and presents you 3 options: Edit, Delete or Logout.
