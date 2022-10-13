import rl from 'readline-sync';

const setWheel = [50,60,70,80,90,100,200,300,400,500,1000,0,1];

function getRndmFromSet(set)
{
    let rndm = Math.floor(Math.random() * set.length);
    return set[rndm];
}

function spinTheWheel()
{
    return getRndmFromSet(setWheel);
}

console.log("Welcome to Wheel of Fortune!\n");
console.log("Every Spin costs $10. Please buy tickets to play the Game.\n");
console.log("Explain the Wheel\n");
console.log("Please enter your names!\n");

const player1name = rl.question ("What is player 1's name?\n");

let player1score = 0;
let player1ticketplan = "";
let player1ticketbalance = 0;
let player1prizemoney = 0;
let player1spinprizemoney=0;
let player1session = true;
let player1spinstatus="";

let player1choice = rl.question("Press B to Begin the Game, Q to Exit the Game\n");

while (player1session)
{

if(player1choice=="B")
{player1ticketplan=rl.question("Please Buy Tickets. Please enter one of the following Plans to begin the session...\nPress A for $50\nPress B for $100\nPress C $200\n");
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
else if(player1choice=="C")
{
    if(player1ticketbalance>0)
    {
        player1session=true;        
    }
}
else if(player1choice=="Q")
{
    player1session=false;
    break;
}

if(player1ticketbalance<=0)
{
    console.log("Sorry ! you went Bankrupt !You have Zero Balance. Please visit the Ticket window to play again.\n");
    player1session=false;
    break;
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
                console.log("OOpsie. Please try another spin...\n");
            }
            else if(player1spinprizemoney==1)
            {
                console.log("OOpsie. You went Bankrupt and lost all the money :C\n");
                player1prizemoney === 0;
            }
            else
            {
                console.log("Congratulations! \nYou have won $"+player1spinprizemoney+" with this spin.");
            }
            console.log("You have won total $"+player1prizemoney+" so far...");
            console.log("Your ticket balance is $"+player1ticketbalance);            
            console.log("You have "+player1ticketbalance/10+" Spins left. All the very best!");
            player1spinstatus="";
            player1spinprizemoney=0;
            break;                       
        }
        
    }
}


player1choice = rl.question("Do you want to continue? If Yes, Press C or press Q to Exit\n");
}
console.log("Thank you for visiting. Goodbye and have a nice day ahead!");