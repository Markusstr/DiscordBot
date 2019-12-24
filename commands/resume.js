exports.run = async (client,message,args) => {

    if (message.guild.voiceConnection.dispatcher) {
        message.guild.voiceConnection.dispatcher.resume();
    } else {
        message.reply('en tällä hetkellä soita missään.')
    }

};

exports.help = {
    name: 'resume'
};