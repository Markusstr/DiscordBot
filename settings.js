const fs = require('fs');
const log = require('./logger').log;

const defaultSettings = {
    volume: 0.5,
    serverName: undefined
};

const settingsDirectory = 'guild_settings/';

const cache = new Map();


function getSetting(guildid, settingname) {
    return cache.get(guildid)[settingname];
}

function setSetting(guildid, settingname, newvalue) {

    let filePath = `${settingsDirectory}settings-${guildid}.json`;

    let settings = cache.get(guildid);

    settings[settingname] = newvalue;

    fs.writeFile(filePath, JSON.stringify(settings), err => {
        if (err) log(err);
    });

}

function init(client) {
    let guilds = client.guilds.cache.array();

    guilds.forEach(guild => {
        // Tarkista löytyykö guild asetushakemistosta.

        let filePath = `${settingsDirectory}settings-${guild.id}.json`;

        fs.access(filePath, fs.constants.F_OK, (fileNotFoundError) => {
            
            if(fileNotFoundError) { // Tiedostoa ei ole olemassa, luodaan se ja täytetään oletusasetuksilla.
                let settings = Object.assign({}, defaultSettings); // Kopioidaan default asetukset uuteen tiedostoon.
                settings.serverName = guild.name;
                fs.writeFile(filePath, JSON.stringify(settings, null, 2), 'utf8', err => {
                    if (err) log(err);
                    log(`Luotiin asetustiedosto palvelimelle ${guild.name}!`);
            
                });
            } else {
                // Asetustiedosto palvelimelle löytyi
                fs.readFile(filePath, 'utf8', (err, file) => {
                    cache.set(guild.id, JSON.parse(file));
                });
            }

        });


    });
    
}

module.exports = { getSetting, setSetting, init };