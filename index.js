const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

let prefix = config.prefix;

//status


//joins
client.on("ready", () => {
    console.log("Estoy listo!");
    //status
    client.user.setStatus('online');
    client.user.setActivity(`moderar a ${client.users.size} personas.`)
});

client.on("guildMemberAdd", async member => {
    let welcomeChannel = member.guild.channels.find(`name`, "moderacion");
    if(!welcomeChannel) return;
    welcomeChannel.send(`**${member}** se ha unido al servidor.`);
    //send a dm
    member.send(`¡¡Hola ${member}, bienvenido a GRERIETE!! Recuerda leer las normas del servidor y pasarlo bien.`).catch(O_o=>{welcomeChannel.send("El usuario no tiene los DM activados.")});
});
//end of joins

//leaves
client.on("guildMemberRemove", async member => {
    let welcomeChannel = member.guild.channels.find(`name`, "moderacion");
    if (!welcomeChannel) return;
    welcomeChannel.send(`**${member}** ha abandonado el servidor.`);
});
//end of leaves

client.on("message", (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;

    switch (command) {
        case "ping":
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("No puedes usar este comando")
            let ping = Math.floor(message.client.ping);
            message.channel.send("Pong!, " + ping + "ms");
            break;
        case "back":
            let texto = args.join(" ");

            if (!texto) return message.channel.send('Escriba algo que repetir');
            message.channel.send(texto);  
            break;
        case "info":
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("No puedes usar este comando")
            var server = message.guild;

            const embed = new Discord.RichEmbed()
                .setThumbnail(server.iconURL)
                .setAuthor(server.name, server.iconURL)
                .addField('ID: ', server.id, true)
                .addField('Region: ', server.region, true)
                .addField('Creado el ', server.joinedAt.toDateString(), true)
                .addField('Dueño del Servidor: ', server.owner.user.tag + ' (' + server.owner.user.id + ')', true)
                .addField('Miembros: ', server.memberCount, true)
                .addField('Roles: ', server.roles.size, true)
                .setColor(0x8cb33e)

            message.channel.send({ embed });
            break;
        case "dm":
            let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
            if (!dUser) return message.channel.send("No encuentro al usuario")
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No puedes usar este comando")
            let dMessage = args.join(" ").slice(22);
            if (dMessage.length < 1) return message.reply('Debes poner un mensaje')

            dUser.send(`${dUser} Un admin de Greriete te envia esto: ${dMessage}`)

            message.react('✅')

            message.author.send(`${message.author} Has mandado un mensaje a ${dUser}`)
            break;
        case "user":
            
         }
    
        } 
   
    
);



client.login(config.token);