const got = require('got');

exports.run = async (client,message,args) => {
    let matchesObject;
    try {
        matchesObject = await getMatches(client);
    }
    catch(getParticipantsError) {
        client.log(`GetParticipantsError: ${getParticipantsError}`);
    }

    let games = matchesObject.filter(game => game.opponents.find(team => team.opponent.name === args.join(' ')));
    //games = games.filter(game => game.games.find(status => status.finished === false));
    games = games.reverse();
    games = games.filter(game => game.games.finished === 'false');
    let viesti = `Joukkueen ${args.join(' ')} tulevat pelit\n`;
    //var date;
    //date = new Date(game.begin_at);
    /*let i;
    for (i=0;i<games.length;i++) {
    }*/
    games.forEach(game => {
        let date = new Date(`${game.begin_at}`);
        let min = ('0'+date.getMinutes()).slice(-2);
        viesti = viesti.concat(`${game.name} - ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} klo ${date.getHours()}:${min}\n`);
    });
    message.channel.send(viesti);
};

async function getMatches(client) {
    try {
        let matches = await got(`https://api.pandascore.co/csgo/matches?token=${client.tokens.pandascore}`);
        try {
            let matchesObject = JSON.parse(matches.body);
            return matchesObject;

        }
        catch(matchesParseError) {
            client.log(`MatchesParseError: ${matchesParseError}`);
        }
    }
    catch(matchesError) {
        client.log(`MatchesError: ${matchesError}`);
    }
}

exports.help = {
    name: 'csgo'
};