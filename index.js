/*const tmi = require('tmi.js');

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

*/
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'database-coachbot.cogy1so7fjll.us-east-2.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: 'Megaman2498!'
});

connection.connect((err) => {
  if (err) console.error('error connecting: ', err);
  console.log('Connected!');
  connection.query(mysql, function (err, result) {
    var sql = "CREATE TABLE workouts (id INT AUTO_INCREMENT PRIMARY KEY, burpees VARINT(0), pushups(0), squats(0))";
        if (err) throw err;
        console.log("Workouts Table Created.");
    });
        
});

/*
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
});*/