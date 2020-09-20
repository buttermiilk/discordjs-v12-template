/* Identification */
const Discord = require('discord.js');
const Client = new Discord.Client();
const settings = require('./settings.json');
const fs = require('fs');
const data = require('quick.db');
const express = require('express');
const app = express();

let prefix = settings.prefix;

/* Listens */
app.get("/", (req, res) => {
  res.send("I Logged!");
});

/* Event Loader */
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`${eventName} is loaded for events.`);
    Client.on(eventName, event.bind(null, Client));
  });
});

/* Commands Loader */
Client.commands = new Discord.Collection();
Client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./commands/${file}`);
    let cmdFileName = file.split(".")[0];
    Client.commands.set(cmd.help.name, cmd);
    console.log(`${cmdFileName} is loaded.`);
    if (cmd.help.aliases) {
      cmd.help.aliases.forEach(alias => {
        Client.aliases.set(alias, cmd.help.name);
      });
    };
  });
});

/* Ready */
Client.on("ready", () => {
  console.log(`${Client.user.tag} is online.`);
  Client.user.setActivity(`${prefix}help`);
  Client.user.setStatus(`idle`)
});

/* Login */
Client.login(settings.key); //Discord: lewis#8996

/* ------------------------------------------------------------------------------ */
/* Commands in Main File */
Client.on("message", message => {
  if (message.content.toLowerCase() === 'hi') return message.reply(`${message.author.username} Hi!`)
});

//->...
