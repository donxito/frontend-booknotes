# Mini Book Club (Frontend Client)

This is the Mini Book Club Frontend (React App) repo.

- Deployed live version: [Live demo](https://minibookclub.netlify.app)


## Description

This project is a gift for my wife and her book reading club. My Mini Book Club is a place where you can share notes of your favourite books and also ratings. It allows logged-in users to manage all the books, authors and notes that they own in the database doing full CRUD. Anonymous users can see the books, authors and notes.

Mini Book Club is a Full-stack application using the MERN stack (MongoDB, Express, React, and Node.JS)
This repository contains the backend code for the server of this application. It is a RESTful API built with ExpressJS, MongoDB, and Mongoose.


## Features

- Book Listing: Display a list of books you have read.
- Adding New Entries: Add new book entries with details such as ISBN, title, author, description, review, and rating.
- Review Update: Update book reviews.
- Book Deletion: Delete books along with associated notes.
- Notes: View, add, update and delete notes for each book.


## Technical details:

- SPA frontend, built with React, consisting of multiple views and implementing all CRUD actions.
- Include sign-up, log-in, and log-out functionality with encrypted passwords and authorization (logged-in users can do additional things).

- REST API backend built with ExpressJS, MongoDB, and Mongoose.
- REST API backend with routes that perform all CRUD actions for two models (books and authors).
- Backend validation and centralized error handling the REST API.

## Express Server Setup
- The server setup is implemented using Express.js, and the configuration is defined in the index.js file.

## API Interaction

- When submitting a new book entry, cover images are fetched from the Open Library Covers API using Axios. A fetchAndSaveCover function fetches the images and saves them to the project folder.


## Backend

- Backend live server: [Backend live server](https://bookclub-api.adaptable.app)

- Backend server repo: [Backend Server Repo](https://github.com/donxito/backend-booknotes)

## Instructions
To run on your computer, follow these steps:
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Create a `.env` file with the following environment variables:
    - `PORT=<your-port>` (5005)
    - `ORIGIN=http:/http://localhost:5173/`
    - `TOKEN_SECRET=<your-token-secret>`
4. Run the application: `node server.js`.


## Environment variables

### Hosted on your localhost:

Add the following environment variables in `.env` files:

#### Server

- `PORT=<your-port>` (5005)
- `ORIGIN=http:/http://localhost:5173/`
- `TOKEN_SECRET=<your-token-secret>`


#### Client

- `VITE_APP_URL=http://localhost:5005`


### Creating your own deployment

#### Backend using adaptable.io

- `TOKEN_SECRET=<your-token-secret>`
- `MONGODB_URI=mongodb+srv://<your-mongodb-atlas-password-+-name-of-db>`
- `ORIGIN=<your-netlify-app-domain>`


#### Frontend using netlify.app

- `CI=false` (required for SPA applications deployed on this service to redirect requests to index.html)
- `VITE_API_URL=<your-adaptable-app-domain>`

## Screenshots

<img width="2051" alt="Screenshot 2024-04-24 at 17 57 24" src="https://github.com/donxito/frontend-booknotes/assets/96595540/029680eb-c547-4af4-9137-498763d1b7e7">

<img width="914" alt="Screenshot 2024-04-24 at 18 25 25" src="https://github.com/donxito/frontend-booknotes/assets/96595540/1b39dbe2-0e3d-478c-9a00-24abb4fadf0e">



