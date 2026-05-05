const express = require('express');
const app = express;
const Events = require('../models/Events');

app.get('/', async (req, res) => {  
        const events = await Events.find().sort({ createdAt: -1 });
        res.render('events/index', { events });
        res.status(500).render('error',);   
});
app.get('/new', (req, res) => {
    res.render('events/new', { events: new Events() });
});

app.post('/', async (req, res) => {
    const events = new Events(req.body); 
        await events.save();
        res.redirect(`/events/${events._id}`);
        res.status(400).render('events/new');

});
app.get('/:id', async (req, res) => { 
        const events = await Events.findById(req.params.id);    
        res.render('events/show', { events });        
    
});
app.get('/:id/edit', async (req, res) => {
        const events = await Events.findById(req.params.id);
        res.render('events/edit', { events });
        res.status(500).render('error',);
});
app.put('/:id', async (req, res) => {
   
        const events = await Events.findById(req.params.id);
        delete req.body.title;
    
        await events.save();
        res.redirect(`/events/${events._id}`);
});
app.delete('/:id', async (req, res) => {
        const events = await Events.findByIdAndDelete(req.params.id);     
        res.redirect('/events');
    
});
module.exports = app;