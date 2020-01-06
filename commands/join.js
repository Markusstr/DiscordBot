exports.run = async (client,message,args) => {

    if (message.guild.voiceConnection) {
        message.reply('olen jo äänikanavalla!');
    } else {
        if (message.member.voiceChannel) {
            message.member.voiceChannel.join();
        } else {
            message.reply('minne mie liityn? Et ole millään kanavalla.');
        }
    }

};

exports.help = {
    name: 'join'
};