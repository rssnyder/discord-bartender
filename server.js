const express = require('express');
const fs = require('fs');
const Discord = require('discord.js');
const app = express();

// GAE
app.get('/', (req, res) => {
  res.send('Hello from App Engine! -Riley');
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

// Setup discord connections
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Bring in all command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
}

// Read bot config
const { prefix, token } = require('./config.json');

client.once('ready', () => {
        console.log('Ready!');
});

client.login(token);

client.on('message', message => {
        // Only bot commands, from humans
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        console.log(`command: ${message.content}`)

        // Create array with command details
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        // Check if command exists
        if (!client.commands.has(command)) {
                message.reply(" what kind of bar do you think this is?")
                return
        }

        try {
                client.commands.get(command).execute(message, args);
        } catch (error) {
                console.error(error);
                message.reply(` sorry I am about to clock out`);
        }
});
