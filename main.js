// Import discord.js
const Discord = require("discord.js");

// Import module fs
const fs = require("fs");

// Import my file "config.json"
const config = require("./config.json");

// Create a client with Discord.js
const client = new Discord.Client();

// Create a collection command
client.commands = new Discord.Collection();

// Create a collection aliases
client.aliases = new Discord.Collection();

// Say in console "Starting..."
console.log("Starting...");

// Read all files in the "commands" file
fs.readdir("./commands/", (err, files) => {

    // If there is an error log it and stop the code
    if(err) return console.log(err);

    // Get all files who end with ".js"
    let jsfile = files.filter(f => f.split(".").pop() === "js");

    // If there is no commands log "There is no commands !"
    if(jsfile.length <= 0) return console.error("There is no commands !")
    
    // For each "jsfile"
    jsfile.forEach((f, i) =>{
        // Get the file
        let file = require(`./commands/${f}`);

        // Log "Commands: file was succesfully loaded"
        console.log(`Commands: ${f} was succesfully loaded !`);

        // Set in the collection "commands" the file and his name
        client.commands.set(file.help.name, file);

        // For each aliases
        file.help.aliases.forEach(alias => { 
        
        // Set in the collection aliases
        client.aliases.set(alias, file.help.name);
    });
  });
});

// Read all files in the "events" file
fs.readdir("./events/", (err, files) => {

    // If there is an error log it and stop the code
    if(err) return console.log(err);

    // Get all files who end with ".js"
    let jsfile = files.filter(f => f.split(".").pop() === "js");

    // If there is no events log "There is no events !"
    if(jsfile.length <= 0) return console.error("There is no events !")
    
    // For each "jsfile"
    jsfile.forEach((file) =>{
        
        // Get the file
        const event = new(require(`./events/${file}`))(client);

        // Get the name of the event
        const eventName = file.split(".")[0];

        // Log "Events: file was succesfully loaded"
        console.log(`Events: ${file} was succesfully loaded !`);

        // Run the event when he is call
        client.on(eventName, (...args) => event.run(...args));

        // Delete cache
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

// Connect this client with the token in the config file
client.login(config.token);