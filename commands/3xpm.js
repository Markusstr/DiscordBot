const got = require('got');

exports.run = async (client,message,args) => {
    let participantsObject;
    let matchesObject;
    try {
        participantsObject = await getParticipants(client);
    }
    catch(getParticipantsError) {
        client.log(`GetParticipantsError: ${getParticipantsError}`);
    }
    let captainID;
    let teamID;
    try {
        captainID = participantsObject.find(team => team.participant.display_name.toLowerCase() === args.join(' ').toLowerCase()).participant.group_player_ids[0];
        teamID = participantsObject.find(team => team.participant.display_name.toLowerCase() === args.join(' ').toLowerCase()).participant.id;
    }
    catch(err) {
        if (args.join(' ') === '') {
            message.channel.send('Et antanut joukkueen nimeä!\nKomennon käyttö: !3xPM joukkue');
        }
        else {
            message.channel.send('Joukkuetta ' + args.join(' ') + ' ei löytynyt.');
        }
        return;
    }
    try {
        matchesObject = await getMatches(client);
    }
    catch(getMatchesError) {
        client.log(`GetMatchesError: ${getMatchesError}`);
    }
    let games = matchesObject.filter(game => game.match.player1_id === captainID || game.match.player2_id === captainID || game.match.player1_id === teamID || game.match.player2_id === teamID);

    let menneetpelit = games.filter(game => game.match.state === 'complete');
    let tulevatpelit = games.filter(game => game.match.state === 'open' || game.match.state === 'pending');

    let viesti = '**Menneet pelit:**\n';

    if (menneetpelit.length === 0) viesti = viesti.concat('Joukkueelle ei ole merkattu yhtään mennyttä peliä.');

    menneetpelit.forEach(peli => {

        let tiimi1 = participantsObject.find(osallistuja => osallistuja.participant.group_player_ids[0] === peli.match.player1_id || osallistuja.participant.id === peli.match.player1_id).participant;
        let tiimi2 = participantsObject.find(osallistuja => osallistuja.participant.group_player_ids[0] === peli.match.player2_id || osallistuja.participant.id === peli.match.player2_id).participant;

        let tiimi1lopputulos = 0, tiimi2lopputulos = 0;

        peli.match.scores_csv.split(',')
            .forEach(tulos => {
                let temp = tulos.split('-');
                let tiimi1tulos = Number(temp[0]);
                let tiimi2tulos = Number(temp[1]);
                tiimi1tulos > tiimi2tulos ? tiimi1lopputulos++ : tiimi2lopputulos++;
            });

        viesti = viesti.concat(`Round ${peli.match.round}: ${tiimi1.display_name} vs. ${tiimi2.display_name} ${tiimi1lopputulos}-${tiimi2lopputulos} (${peli.match.scores_csv})\n`);
    });

    viesti = viesti.concat('\n**Tulevat pelit:**\n');

    if (tulevatpelit.length === 0) viesti = viesti.concat('Joukkueelle ei ole merkattu yhtään tulevaa peliä.');

    tulevatpelit.forEach(peli => {


        //let tiimi1 = participantsObject.find(osallistuja => osallistuja.participant.group_player_ids[0] === peli.match.player1_id).participant;
        //let tiimi2 = participantsObject.find(osallistuja => osallistuja.participant.group_player_ids[0] === peli.match.player2_id).participant;
        let tiimi1 = participantsObject.find(osallistuja => osallistuja.participant.group_player_ids[0] === peli.match.player1_id || osallistuja.participant.id === peli.match.player1_id).participant;
        let tiimi2 = participantsObject.find(osallistuja => osallistuja.participant.group_player_ids[0] === peli.match.player2_id || osallistuja.participant.id === peli.match.player2_id).participant;

        let tiimi1lopputulos = 0, tiimi2lopputulos = 0;

        peli.match.scores_csv.split(',')
            .forEach(tulos => {
                let temp = tulos.split('-');
                let tiimi1tulos = Number(temp[0]);
                let tiimi2tulos = Number(temp[1]);
                tiimi1tulos > tiimi2tulos ? tiimi1lopputulos++ : tiimi2lopputulos++;
            });

        viesti = viesti.concat(`Round ${peli.match.round}: ${tiimi1.display_name} vs. ${tiimi2.display_name}\n`);

    });
    message.channel.send(viesti);
};

async function getParticipants(client) {
    try {
        let participants = await got(`https://${client.tokens.challongetoken}@api.challonge.com/v1/tournaments/3xPM9/participants.json`);
        try {
            let participantsObject = JSON.parse(participants.body);
            return participantsObject;
        }
        catch(participantsParseError) {
            client.log(`ParticipantsParseError: ${participantsParseError}`);
        }
    }
    catch(participantsError) {
        client.log(`ParticipantsError: ${participantsError}`);
    }
}

async function getMatches(client) {
    try {
        let matches = await got(`https://${client.tokens.challongetoken}@api.challonge.com/v1/tournaments/3xPM9/matches.json`);
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
    name: '3xpm'
};