import rl from 'readline-sync';
//import fetch from 'node-fetch';
import express from 'express';

const setWheel = [50,60,0,0,0,70,80,90,100,200,300,400,0,0,500,1000,1,-1,-1,-1];
const app = express();
const PORT = 4000;

app.listen (4000, () =>
console.log('Listening on port 4000'),
);

app.get('/',(req,res) => {
res.send('Hello World!');
});

function getRndmFromSet(set)
{
    let rndm = Math.floor(Math.random() * set.length);
    return set[rndm];
}

function spinTheWheel()
{
    return getRndmFromSet(setWheel);
}


console.log("Welcome to the World of Gambling!\n");
console.log("Every Spin costs $10. Please buy tickets to play the Game.\n");
console.log("As you play, your score will increase with your prize money\n");
//console.log("Please enter your names!\n");

const player1name = rl.question ("Please enter your name!\n");

let player1score = 0;
let player1ticketplan = "";
let player1ticketbalance = 0;
let player1prizemoney = 0;
let player1spinprizemoney=0;
let player1session = true;
let player1spinstatus="";

let player1choice = rl.question(`Hello ${player1name}! Press "B" to Begin the Game, "Q" to Exit the Game\n`);

while (player1session)
{

    if(player1choice=="B")
    {
        player1ticketplan=rl.question("Please Buy Tickets. Please enter one of the following Plans to begin the session...\nPress A for $50\nPress B for $100\nPress C $200\n");
        switch (player1ticketplan) 
        {
            case "A":
                player1ticketbalance=50;
                break;
            case "B":
                player1ticketbalance=100;
                break;
            case "C":
                player1ticketbalance=200;
                break;
            default:
                player1ticketbalance=0;
                break;
        }
    }
    
    else if(player1choice=="Q")
    {
        player1session=false;
        break;
    }
    else
    {
        player1choice = rl.question(`Hello ${player1name}! Wrong Option pressed. \n Press "B" to Begin the Game, "Q" to Exit the Game\n`);
        continue;
    }
    
    if(player1ticketbalance<=0)
    {
        console.log("Sorry ! Your Ticket Balance is Zero now.");
        player1session=true;
        player1choice ="B";
    }
    else
    {
        while (player1spinstatus!="S") 
        {
            player1spinstatus = rl.question("Press S to spin the wheel\n");
            if(player1spinstatus=="S")
            {
                player1ticketbalance=player1ticketbalance-10;
                player1spinprizemoney = spinTheWheel();
                player1prizemoney = player1prizemoney + player1spinprizemoney;
                if(player1spinprizemoney==0)
                {
                    console.log("OOpsie. No Win in this spin !Please try another spin...\n");
                }
                else if(player1spinprizemoney==-1)
                {
                    console.log("OOpsie. You went Bankrupt and lost all the money :C\n");
                    player1prizemoney = 0;
                }
                else
                {
                    console.log("Congratulations! \nYou have won $"+player1spinprizemoney+" with this spin.");
                }
                console.log("You have won total $"+player1prizemoney+" so far...");
                console.log("Your ticket balance is $"+player1ticketbalance);            
                console.log("You have "+player1ticketbalance/10+" Spins left.\n");
                
                player1spinstatus="";
                player1spinprizemoney=0;
                if(player1ticketbalance<=0)
                {
                    break;    
                }                                       
            }        
        }
    }
    if(player1ticketbalance<=0)
    {
        console.log("Sorry ! Your Ticket Balance is Zero now.");
        player1session=true;
        player1choice = rl.question("Do you want to continue? If Yes, Press B to Buy Tickets; otherwise press Q to Exit\n");           
    }           
}
console.log(`Thank you for visiting. Goodbye and have a nice day ahead ${player1name}!`);