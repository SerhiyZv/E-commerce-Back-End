// Import modules
const express = require('express');
const routes = require('./routes');
const sequelize = require("sequelize");


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Launch server to begin listening for requests
// Update to force: false before deploying to production
sequelize.sync({ force: false}).then(() => {
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
