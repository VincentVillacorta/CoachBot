const tmi = require('tmi.js');

const options = {
    options: {
        debug:true,
    },
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity:{
        username: 'CoachBot',
        password: 'oauth:xyj8jk8p6b5z6y5jzemaa1srs5tmfz'
    },
    channels: ['CoachBot_1'],
};

const client = new tmi.client(options);

client.connect();

client.on('connected',(address,port) => {
    client.action('CoachBot_1', 'CoachBot has arrived.')
});

client.on('chat', (channel,user,message,self) => {
    if(message === '!burpee'){
        client.action('CoachBot_1', `${client.identity.username} owes the chat 5 burpees.`);
    }
});