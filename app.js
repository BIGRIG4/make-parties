// Initialize express
const express = require('express');
const app = express();

// require handlebars
var exphbs = require('express-handlebars');

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');

// Tell our app to send the "hello world" message to our home page

app.get('/', (req, res) => {
  res.render('home', { msg: 'Handlebars are Cool!' });
});


// Render the "home" layout for the main page and send the following msg
// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
