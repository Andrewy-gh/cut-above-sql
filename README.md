# Cut Above SQL

Server side application for the Cut Above Barbershop using a Postgres Database and Sequelize ORM. Schema validating through Joi and Celebrate libraries.

## How It's Made:

**Backend:** Node.js, Express, Postgres, Sequelize, Joi, Celebrate

## How To Run

1. Fill out environment variables in `.env.example` and change to `.env`

2. Run `npm run dev`

## Lessons Learned.

[How to extract Celebrate error messages for use in my custom error handler.](https://stackoverflow.com/a/56865784)

[How to handle multiple validation errors and log them all into the error handler](https://github.com/arb/celebrate#modes)
