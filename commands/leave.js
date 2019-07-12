
exports.run = async (client,message,args) => {

    if (message.guild.voiceConnection) {
        message.guild.voiceConnection.disconnect();
    } else {
        message.reply('en ole millään äänikanavalla.');
    }

};


exports.help = {
    name: 'leave'
};
