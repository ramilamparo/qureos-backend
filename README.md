# Running the app

Assuming you have node and npm installed, run the following commands

`npm install && npm run build && npm run start`

## Available Routes

**GET** /stock?date=${date}

- `${date}` is optional. If date is not specified, it uses the current date.
- `${date}` is a string that can be parsed into a date object. Ex. `2000/01/05` or `January 5, 2002`

# Testing the app

The code is written with tests using Jest. You may run the test using `npm run test`