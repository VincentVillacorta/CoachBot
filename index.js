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
    client.action('CoachBot_1', 'CoachBot has arrived.');
});


const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'sql308.epizy.com',
  user: 'epiz_26164688',
  password: 'yctLPhSWoB8x',
  database: 'epiz_26164688_CoachBotDB'
});

connection.connect((err) => {
  if (err) console.error('error connecting: ', err);
  console.log('Connected!');
});


client.on('chat', (channel,user,message,self) => {
    if(message === '!burpees'){
        connection.query(mysql, function (err, result) {
        var sql = "INSERT INTO burpees (count) VALUES (2)";
            if (err) throw err;
            console.log("One burpee added");
        });
        var count = connection.query("SELECT count FROM burpees", function (err, result, fields) {
            if (err) throw err;
            return result;
          });

        client.action('CoachBot_1', `${options.identity.username} owes the chat ${count} burpees.`);
    }
});