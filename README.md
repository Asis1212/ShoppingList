# ShoopingList App

In the project, there are two folders: one for the frontend and one for the backend.
The frontend is written using React and TypeScript.
The backend is written using Node.js, TypeScript, and the Sequelize ORM library.

I have set up the connection to SQL Server using Docker because I am developing on a Mac, and this is the only way to do it along with Azure. A docker-compose.yaml file is attached to explain how to set it up.

Additionally, a .env file is attached so you can connect to the existing database during runtime.

_To run the frontend, do the following:_

#### cd frontend
#### npm start

_To run the backend, do the following:_

#### cd backend
#### npm run dev

It is recommended to run the backend first and then the frontend.
