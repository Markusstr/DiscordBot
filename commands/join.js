exports.run = async (client,message,args) => {

    if (message.guild.me.voice.connection) {
        message.reply('olen jo äänikanavalla!');
    } else {
        if (message.member.voice.channelID) {
            message.member.voice.channel.join();
        } else {
            message.reply('minne mie liityn? Et ole millään kanavalla.');
        }
    }

};

exports.help = {
    name: 'join'
};