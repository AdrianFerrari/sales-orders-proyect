# Sales Orders

Is an app of a fictional Shoe Shop that query the database for all its sales history using:

- Vite-Express for its front and backend.
- Postgresql for the database.
- PgAdmin for managing the database.
- Joi for validating query requests.

It's designed to be use in a single docker container with 'docker-compose up --build' in any machine and the corresponding env variables.
The postgres database is initialized with a .sql file in the root directory.
The app itself can be run outside the container with the 'dev' script and it will connect to the database on the corresponding exposed port on the container, for debugging and development purposes.

## Usage

You can filter the list adding conditions to the query on the frontend and sending them to the backend through url query parameters, the backend will query the backend and send the response to the frontend.

## Screenshot

<div>
    <img src="./public/screenshot1.png" /> 
</div>
