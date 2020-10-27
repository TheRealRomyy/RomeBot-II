// Export the file then run it
module.exports.run = async (client, message, args) => {

    // Send to the channel of the message "Pong !" with the bot's ping
    message.channel.send("Pong ! ( " + client.ws.ping + "ms )");
    
}

// Set the name & aliases
module.exports.help = {
	name: "ping",
	aliases: ['latency']
}