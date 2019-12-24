
exports.run = async (client,message,args) => {

    if (message.guild.voiceConnection) {
        
        if (message.guild.voiceConnection.dispatcher) {
            message.guild.voiceConnection.dispatcher.end();
        }
        message.guild.voiceConnection.disconnect();
    } else {
        message.reply('en ole millään äänikanavalla.');
    }

};


exports.help = {
    name: 'leave'
};
