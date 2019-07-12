exports.run = async (client,message,args) => {

    if (message.guild.voiceConnection) {
        message.reply('olen jo äänikanavalla!');
        
    } else {
        message.member.voiceChannel.join();
    }

};

exports.help = {
    name: 'join'
};