const fs = require('fs');
const log = require('./logger').log;

const defaultSettings = {
    volume: 0.5,
    serverName: undefined
};

const settingsDirectory = 'guild_settings/';



function getSetting(guildid, settingname) {
    // TODO hae asetus
}

function setSetting(guildid, settingname, newvalue) {
    fs.writeFile('tiedostonimi', (data, err) => {
        if (err) log(err);

        log(data);

    });
}

function init(client) {
    let guilds = client.guilds.array();

    guilds.forEach(guild => {
        // Tarkista löytyykö guild asetushakemistosta.

        fs.access(`${settingsDirectory}settings-${guild.id}.json`, fs.constants.F_OK, (fileNotFoundError) => {
            
            if(fileNotFoundError) { // Tiedostoa ei ole olemassa, luodaan se ja täytetään oletusasetuksilla.
                let settings = Object.assign({}, defaultSettings);
                settings.serverName = guild.name;
                fs.writeFile(`${settingsDirectory}settings-${guild.id}.json`, JSON.stringify(settings, null, 2), 'utf8', err => {
                    if (err) log(err);
                    log(`Luotiin asetustiedosto palvelimelle ${guild.name}!`);
            
                });
            }

        });


    });
    
}

module.exports = { getSetting, setSetting, init };