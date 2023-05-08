#!/usr/bin/env node

import minimist from "minimist";
import express from 'express';
import { play_game } from "./lib/rpsls";

const port = minimist(process.argv.slice(2)).port || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/app', function(req, res) {
    res.status(200).send("200 OK");
});

app.get('/app/rps', function(req, res) {
    res.status(200).send(play_game());
});

app.get('/app/rpsls', function(req, res) {
    res.status(200).send(play_game());
});

app.get('/app/rps/play', function(req, res) {
    res.status(200).send(play_game(req.query.shot));
});

app.get('/app/rpsls/play', function(req, res) {
    res.status(200).send(play_game(req.query.shot));
});

app.post('/app/rps/play', function(req, res) {
    res.status(200).send(play_game(req.body.shot));
});

app.post('/app/rpsls/play', function(req, res) {
    res.status(200).send(play_game(req.body.shot));
});

app.get('/app/rps/play/:shot', function(req, res) {
    res.status(200).send(play_game(req.params.shot));
});

app.get('/app/rpsls/play/:shot', function(req, res) {
    res.status(200).send(play_game(req.params.shot));
});

app.get('*', function(req, res){
    res.status(404).send('404 NOT FOUND');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
