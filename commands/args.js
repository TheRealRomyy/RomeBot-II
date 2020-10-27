// Export the file then run it
module.exports.run = async (client, message, args) => {

    // If there is no args 0 send to the channel : "There is no args !"
    if(!args[0]) return message.channel.send("There is no args !")

    /* Send to the channel : "Your first arg is:" with the first args 
    and "Your args were :" with all args (with the discord markdown) */
    message.channel.send("__Your first arg is:__ **" + args[0] + "** \n__Your args were:__ **" + args.join(" ") + "**");
    
    
}

// Set the name & aliases
module.exports.help = {
	name: "args",
	aliases: []
}