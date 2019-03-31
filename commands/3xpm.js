const got = require('got');

exports.run = async (client,message,args) => {
    try {
        let participants = await got(`https://${client.tokens.challongetoken}@api.challonge.com/v1/tournaments/5520519/participants.json`);
        try {
            let participantsObject = JSON.parse(participants.body);
            let captainID = participantsObject.find(team => team.participant.display_name.toLowerCase() === args.join(' ').toLowerCase()).participant.group_player_ids[0];
            if (captainID === undefined) {
                message.channel.send('Joukkuetta ei löytynyt.');
            }
            else {
                try {
                    let matches = await got(`https://${client.tokens.challongetoken}@api.challonge.com/v1/tournaments/5520519/matches.json`);
                    try {
                        let matchesObject = JSON.parse(matches.body);
                        let games = matchesObject.filter(game => game.match.player1_id === captainID || game.match.player2_id === captainID);
                        //client.log(JSON.stringify(games,null,4));

                        let menneetpelit = games.filter(game => game.match.state === 'complete');
                        let tulevatpelit = games.filter(game => game.match.state === 'open');

                        let viesti = '**Menneet pelit:**\n';

                        menneetpelit.forEach(peli => {


                            let tiimi1 = participantsObject.find(osallistuja => osallistuja.participant.group_player_ids[0] === peli.match.player1_id).participant;
                            let tiimi2 = participantsObject.find(osallistuja => osallistuja.participant.group_player_ids[0] === peli.match.player2_id).participant;

                            let tiimi1lopputulos = 0;
                            let tiimi2lopputulos = 0;

                            // ['1-2', '4-3', '3-0']
                            peli.match.scores_csv.split(',')
                                .forEach(tulos => {
                                    let temp = tulos.split('-');
                                    let tiimi1tulos = Number(temp[0]);
                                    let tiimi2tulos = Number(temp[1]);
                                    tiimi1tulos > tiimi2tulos ? tiimi1lopputulos++ : tiimi2lopputulos++;
                                });

                            viesti = viesti.concat(`Round ${peli.match.round}: ${tiimi1.display_name} vs. ${tiimi2.display_name} ${tiimi1lopputulos}-${tiimi2lopputulos} (${peli.match.scores_csv})\n`);

                        });

                        message.channel.send(viesti);
                        
                    }
                    catch(matchesParseError) {
                        client.log(`Virhe ${matchesParseError}`);
                    }
                }
                catch(matchesError) {
                    client.log(`Virhe ${matchesError}`);
                }
            }
        }
        catch(participantsParseError) {
            client.log(`Virhe ${participantsParseError}`);
        }
    }
    catch(participantsError) {
        client.log(`Virhe ${participantsError}`);
    }
};

exports.help = {
    name: '3xpm'
};
