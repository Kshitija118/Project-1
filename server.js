//import rl from readline-sync
import express from 'express';
const app = express();
const PORT = 4000;
app.use=express.text;
const setWheel = [50,60,0,0,0,70,80,90,100,200,300,400,0,0,500,1000,1,-1,-1,-1];

function getRndmFromSet(setWheel)
{
    let rndm = Math.floor(Math.random() * setWheel.length);
    return setWheel[rndm];
}


app.get("/wheel",(request,response) => {
    let player1spinprizemoney = getRndmFromSet (setWheel);   
    console.log (player1spinprizemoney);
    response.send( `${player1spinprizemoney}`);
   
});

app.listen(PORT,function(){
    console.log(`Listening on Port ${PORT}`);
});

app.get("/welcome",(request,response) => {
       response.send("Welcome to the World of Gambling !!\n\ Please buy tickets to play the Game\n\ As you play , your score will increase with the prize money!!");
    });

    // below needs to be commented
        app.get("/playerChoice", (request, response) => {
            let playerChoice = request.query.choice;
           // let answer = getAnswer(playerChoice);
            response.send(
              
                `Press "B" to Begin the Game, "Q" to Exit the Game
            Send your choice to 
            http://localhost:4001/playerChoice?choice=<yourChoice>`
            );
          });
