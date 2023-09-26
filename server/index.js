//importing everything
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js'
import Pusher from 'pusher';
import cors from 'cors';
//app config
const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 9000;
}
//middleware -to make stuff go through
app.use(express.json());
app.use(cors());

//taken care of by cors 
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*'); //allow info coming from any endpoint
//     res.setHeader('Access-Control-Allow-Headers', '*'); //emit any headers
//     next(); 
// });
//DB config
const connection_url = 'mongodb+srv://1tav0:Legendary1010@cluster0.fyfqhue.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.set('strictQuery', false).connect(connection_url);

//pusher is used to make mongodb real time
const pusher = new Pusher({
    appId: "1536672",
    key: "e0b92a94f3c58692354c",
    secret: "b538a054f9e3b95a9053",
    cluster: "us2",
    useTLS: true
  });

//ChangeStream is going to listen and watch our application/database if theres a change it will trigger pusher
const db = mongoose.connection; //create mongoose connection
db.once('open', () => { //once we open the connection
    console.log('DB connected');

    const msgCollection = db.collection('messages'); //create a collection
    const changeStream = msgCollection.watch(); //create a changestream that watches the collection

    changeStream.on('change', (change) => {
        console.log(change);

        if (change.operationType == 'insert') { //if operation type of change variable we made above is insert
            const messageDetails = change.fullDocument; //we save all data from the doc that the change is a part of 
            pusher.trigger('messages', 'inserted', //we trigger pusher, messages becomes a channel
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received
                }
            );
        } else {
            console.log('Error triggering Pusher');
        }
    });
});

//API ROUTES
app.get('/', (req, res) => {
    res.status(200).send('hello World');
})

app.get('/messages/sync',(req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new',(req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data)
        }
    })
})

//listener
app.listen(port, ()=>console.log(`server has started on port: ${port}`))