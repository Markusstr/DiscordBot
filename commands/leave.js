
exports.run = async (client,message,args) => {

    if (message.guild.me.voice.connection.status === 0) {
        
        if (message.guild.me.voice.connection.dispatcher) {
            message.guild.me.voice.connection.dispatcher.end();
        }
        message.guild.me.voice.connection.disconnect();
    } else {
        message.reply('en ole millään äänikanavalla.');
    }

};


exports.help = {
    name: 'leave'
};
