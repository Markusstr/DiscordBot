let soundsources = require('../soundsources.json');


exports.run = async (client,message,args) => {

    let voiceConnection = message.guild.voiceConnection;
    if (!(voiceConnection && voiceConnection.speaking)) voiceConnection = await message.member.voiceChannel.join();// Jos botti ei ole kanavalla ja ei puhu.

    //client.voiceConnections.get(message.guild.id).playFile('Esimerkki.mp3');


    if (args[0].toLowerCase().includes('youtube')) {
        // TODO lisää youtubesta soittaminen
     
    } else {

        let source = args.join(' ').toLowerCase();

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

        

        /* dispatcher.once('end', () => {
            voiceConnection.disconnect();
        }); */

    //!play https://www.youtube.com/watch?v=dQw4w9WgXcQ
    //!play iskelmä
    }




    

    
};


exports.help = {
    name: 'play'
};
