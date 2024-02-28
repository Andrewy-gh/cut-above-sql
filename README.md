# Cut Above SQL

Server side application for the Cut Above Barbershop using a Postgres Database and Sequelize ORM. Schema validating through Joi and Celebrate libraries.
Full stack repo [here](https://github.com/Andrewy-gh/cut-above-barbershop)

**Link to project:** https://cutabove.fly.dev

![alt tag](https://github.com/Andrewyithub/cut-above-barbershop/assets/17731837/35958cd0-07e1-44e3-a0b3-2be928c285a6)

## How It's Made:

**Backend:** Node.js, Express, Postgres, Sequelize, Joi, Celebrate

## How To Run

1. Fill out environment variables in `.env.example` and change to `.env`

2. Run `npm run dev`

## Lessons Learned.

[How to extract Celebrate error messages for use in my custom error handler.](https://stackoverflow.com/a/56865784)

[How to handle multiple validation errors and log them all into the error handler](https://github.com/arb/celebrate#modes)

How to [prevent](https://github.com/arb/celebrate#celebrateschema-joioptions-opts) a [validated date](https://github.com/hapijs/joi/blob/master/API.md#anyvalidatevalue-options) to be cast into an [ISO Date String](https://joi.dev/api/?v=17.12.0#date) which would have caused time zone issues.
