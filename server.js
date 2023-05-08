#!/usr/bin/env node

import minimist from "minimist";
import express from 'express';
import { play_game } from "./lib/rpsls.js";

const port = minimist(process.argv.slice(2)).port || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Get the root endpoint of your app
app.get('/app', function(req, res) {
    res.status(200).send("200 OK");
});

//Play RPS
app.get('/app/rps', function(req, res) {
    res.status(200).send(play_game()).end();
});

//Play RPSLS
app.get('/app/rpsls', function(req, res) {
    res.status(200).send(play_game());
});

//Play RPS against an opponent (URLEncoded data body)
app.get('/app/rps/play', function(req, res) {
    res.status(200).send(play_game(req.query.shot));
});

//Play RPSLS against an opponent (URLEncoded data body)
app.get('/app/rpsls/play', function(req, res) {
    res.status(200).send(play_game(req.query.shot));
});

//Play RPS against an opponent (JSON data body)
app.post('/app/rps/play', function(req, res) {
    res.status(200).send(play_game(req.body.shot));
});

//Play RPSLS against an opponent (JSON data body)
app.post('/app/rpsls/play', function(req, res) {
    res.status(200).send(play_game(req.body.shot));
});

//Play RPS against an opponent (parameter endpoint)
app.get('/app/rps/play/:shot', function(req, res) {
    res.status(200).send(play_game(req.params.shot));
});

//Play RPSLS against an opponent (parameter endpoint)
app.get('/app/rpsls/play/:shot', function(req, res) {
    res.status(200).send(play_game(req.params.shot));
});

//Call a nonexistent endpoint
app.get('*', function(req, res){
    res.status(404).send('404 NOT FOUND');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
