let soundsources = require('../soundsources.json');
let ytdl = require('ytdl-core');


exports.run = async (client,message,args) => {

    if (!args[0]) {
        message.reply('mitä mun pitäisi soittaa?');
        return;
    }

    let voiceConnection = message.guild.me.voice; // Botin VoiceState
    if (!(voiceConnection && voiceConnection.speaking)) {
        if (!message.member.voice.channelID) { // Komennon suorittajan VoiceState
            message.reply('minne mie liityn? Et ole millään kanavalla.');
            return;
        }
        voiceConnection = await message.member.voice.channel.join(); // Jos botti ei ole kanavalla ja ei puhu.
    }

    // Jos voice connection soittaa tällä hetkellä jotain. Lopetetaan se.
    voiceConnection.dispatcher && voiceConnection.dispatcher.end();

    if (args[0].toLowerCase().includes('youtube.com') || args[0].toLowerCase().includes('youtu.be')) {

        let ytStream = ytdl(args[0], {
            filter: 'audioonly'
        });

        let dispatcher = voiceConnection.play(ytStream, {
            seek: 0,
            volume: 1
        });

        dispatcher.setVolume(client.settings.getSetting(message.guild.id, 'volume'));
     
    } else {
        // Muu kuin youtube.
        let source = args.join(' ').toLowerCase();

        // Yritetään etsiä ääntä valikoimasta.
        let sound = soundsources.find(sound => sound.name.toLowerCase() === source);

        if (!sound) {
            message.reply('pyytämääsi ääntä/lähdettä ei löytynyt listasta.');
            return;
        }

        let dispatcher = voiceConnection.play(sound.path);

        dispatcher.setVolume(client.settings.getSetting(message.guild.id, 'volume'));

    }

    
};


exports.help = {
    name: 'play'
};
