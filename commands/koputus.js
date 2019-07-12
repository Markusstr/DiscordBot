const fs = require('fs');
const userCooldown = new Set();




async function koputa(client, message) {

    let VoiceChannel = message.guild.channels
        .filter(channel => channel.type === 'voice') // Suodatetaan vain äänikanavat
        .sort((a,b) => b.members.size-a.members.size) // Järjestetään laskevaan järjestykseen.
        .first(); // Otetaan ensimmäinen, tässä tapauksessa isoin.


    if(message.guild.voiceConnection.speaking) { // Jos botti on jo liittynyt kanavalle

        message.reply('Nyt on vähän kiire, kokeile myöhemmin uudelleen.');
        return;
    }

    if (VoiceChannel.full) {
        if (userCooldown.has(message.author.id)) {
            // Käyttäjällä on cooldown
            message.channel.send('Voit koputtaa kanavalle vain kerran 5 minuutissa. ' + message.author);

        } else {
            // Käyttäjällä ei ole cooldownia. Koputetaan!

            // Asetetaan cooldown
            userCooldown.add(message.author.id);
            setTimeout(() => {
                userCooldown.delete(message.author.id);
            }, 5*60000 );

            let connection = await VoiceChannel.join();
            //client.serverVariables.get(message.guild.id).isPlaying = true;

            let tiedostot = fs.readdirSync('./sounds/koputus/');
            if(tiedostot.length <= 0) {
                client.log('Ääniä ei löytynyt!');
                return;
            }
            let tiedosto = tiedostot[getRndInteger(0, tiedostot.length)];

            let dispatcher = connection.playFile(`./sounds/koputus/${tiedosto}`);


            dispatcher.once('end', () => {
                setTimeout(() => {
                    connection.disconnect();
                    //client.serverVariables.get(message.guild.id).isPlaying = false;
                }, 1000);
            });

            dispatcher.on('error', e => {
                // Catch any errors that may arise
                console.log(e);
            });

        }
    } else {
        // Kanava ei ole täynnä.

        if (VoiceChannel.members.size === 0) {
            message.reply('*Koputuksesi kaikuvat tyhjillä kanavilla...* Kaikki kanavat ovat tyhjiä.');
        } else {
            message.reply('Kanava ei ole täynnä, voit liittyä sinne itse.');
        }

    }
}

module.exports = { koputa };



/**
 * Generate random integer between given values.
 * @param {Number} min 
 * @param {Number} max 
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

