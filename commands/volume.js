exports.run = async (client,message,args) => {

    if (message.guild.voiceConnection.dispatcher == undefined) return message.reply('en soita millään kanavalla.');

    let newvolume = (parseInt(args[0])/100);
    if (isNaN(newvolume)) {
        message.reply('komentosi oli virheellinen.');
        return;
    }
    
    if (newvolume < 0 || newvolume > 1) {
        message.reply('äänenvoimakkuus voi olla vain väliltä 0-100');
        return;
    }

    message.guild.voiceConnection.dispatcher.setVolume(newvolume);
    client.settings.setSetting(message.guild.id, 'volume', newvolume);

};

exports.help = {
    name: 'volume'
};