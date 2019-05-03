// Initialize express
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const bodyParser = require('body-parser');







// require handlebars
var exphbs = require('express-handlebars');

// Use "main" as our default layout
app.use(bodyParser.urlencoded({ extended: true }));
const models = require('./db/models');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');
var events = [
  { title: "I am your first event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "I am your second event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "I am your third event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" }
]

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));


app.post('/events', (req, res) => {
  console.log(req.body);
})

app.post('/events', (req, res) => {
  models.Event.create(req.body).then(event => {
    res.redirect(`/`);
  }).catch((err) => {
    console.log(err)
  });
})

// Tell our app to send the "hello world" message to our home page

app.get('/', (req, res) => {
  res.render('home', { msg: 'Handlebars are Cool!' });
});

app.get('/', (req, res) => {
  models.Event.findByPk(req.params.id).then((event) => {
    res.render('events-show', { event: event })
  }).catch((err) => {
    console.log(err.message);
  })
})
app.get('/events/:id', (req, res) => {
  res.send('I\'m an event')
});

app.get('/events/:id/edit', (req, res) => {
  models.Event.findByPk(req.params.id).then((event) => {
    res.render('events-edit', { event: event });
  }).catch((err) => {
    console.log(err.message);
  })
});


// INDEX
app.get('/', (req, res) => {
  res.render('events-index', { events: events });
})

app.get('/events', (req, res) => {
  res.render('events-index', { events: events });
})

app.get('/events/new', (req, res) => {
  res.render('events-new', {});
})


// Render the "home" layout for the main page and send the following msg
// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
