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
  host: 'database-coachbot.cogy1so7fjll.us-east-2.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: 'Megaman2498!',
  database: 'coachbotDB'
});

connection.connect((err) => {
    if (err) console.error('error connecting: ', err);
    console.log('Connected!');
    connection.query("CREATE TABLE IF NOT EXISTS workouts (pushups INT(4), burpees INT(4), squats INT(4))", function (err, result) {
        if (err) throw err;
        console.log("Workouts Table Created.");
        });
    connection.query("INSERT IGNORE INTO workouts (pushups, burpees, squats) VALUES ('0','0','0')", function (err, result) {
        if (err) throw err;
        console.log("Workouts set to 0.");
        });
});


client.on('chat', (channel,user,message,self) => {
    if(message === '!burpee'){
        connection.query("UPDATE workouts SET burpees = burpees + 1", function (err, result) {
            if (err) throw err;
            console.log("One burpee added");
        });
        connection.query("SELECT burpees FROM workouts", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            client.action('CoachBot_1', `${options.channels[0]} owes the chat ${result[0].burpees} burpees.`);
            return result;
          });
    }
});

client.on('chat', (channel,user,message,self) => {
    if(message === '!pushup'){
        connection.query("UPDATE workouts SET pushups = pushups + 1", function (err, result) {
            if (err) throw err;
            console.log("One pushup added");
        });
        connection.query("SELECT pushups FROM workouts", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            client.action('CoachBot_1', `${options.channels[0]} owes the chat ${result[0].pushups} pushups.`);
            return result;
          });
    }
});

client.on('chat', (channel,user,message,self) => {
    if(message === '!squat'){
        connection.query("UPDATE workouts SET squats = squats + 1", function (err, result) {
            if (err) throw err;
            console.log("One squat added");
        });
        connection.query("SELECT squats FROM workouts", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            client.action('CoachBot_1', `${options.channels[0]} owes the chat ${result[0].squats} squats.`);
            return result;
          });
    }
});

client.on('chat', (channel,user,message,self) => {
    if(message === '!runit'){
        connection.query("SELECT burpees FROM workouts", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            client.action('CoachBot_1', `${options.channels[0]} will now do ${result[0].burpees} burpees.`);
            return result;
          });
        connection.query("SELECT pushups FROM workouts", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            client.action('CoachBot_1', `${options.channels[0]} will now do ${result[0].pushups} pushups.`);
            return result;
          });
        connection.query("SELECT squats FROM workouts", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            client.action('CoachBot_1', `${options.channels[0]} will now do ${result[0].squats} squats.`);
            return result;
          });

        client.action('CoachBot_1', `All workouts have been reset.`);

        connection.query("UPDATE workouts SET burpees = 0", function (err, result) {
            if (err) throw err;
        });
        connection.query("UPDATE workouts SET pushups = 0", function (err, result) {
            if (err) throw err;
        });
        connection.query("UPDATE workouts SET squats = 0", function (err, result) {
            if (err) throw err;
        });

    }
});
