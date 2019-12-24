let soundsources = require('../soundsources.json');
let ytdl = require('ytdl-core');


exports.run = async (client,message,args) => {

    if (!args[0]) {
        message.reply('mitä mun pitäisi soittaa?');
        return;
    }

    let voiceConnection = message.guild.voiceConnection;
    if (!(voiceConnection && voiceConnection.speaking)) {
        if (!message.member.voiceChannel) {
            message.reply('minne mie liityn? Et ole millään kanavalla.');
            return;
        }
        voiceConnection = await message.member.voiceChannel.join(); // Jos botti ei ole kanavalla ja ei puhu.
    }

    //client.voiceConnections.get(message.guild.id).playFile('Esimerkki.mp3');

    // Voice connection soittaa tällä hetkellä jotain. Lopetetaan se.
    voiceConnection.dispatcher && voiceConnection.dispatcher.end();

    if (args[0].toLowerCase().includes('youtube.com') || args[0].toLowerCase().includes('youtu.be')) {

        let ytStream = ytdl(args[0], {
            filter: 'audioonly'
        });

        let dispatcher = voiceConnection.playStream(ytStream, {
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

        let dispatcher;
        if (sound.local) {
            dispatcher = voiceConnection.playFile(sound.path);
        } else {
            dispatcher = voiceConnection.playArbitraryInput(sound.path);
        }

        dispatcher.setVolume(client.settings.getSetting(message.guild.id, 'volume'));


        //!play https://www.youtube.com/watch?v=dQw4w9WgXcQ
        //!play iskelmä
    }

    
};


exports.help = {
    name: 'play'
};
