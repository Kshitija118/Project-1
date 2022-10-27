import rl from 'readline-sync';
import fetch from 'node-fetch';
import chalk from 'chalk';

let player1score = 0;
let player1ticketplan = "";
let player1ticketbalance = 0;
let player1prizemoney = 0;
let player1name;
let player1choice;
let player1spinprizemoney=0;
let player1session = true;
let player1spinstatus="";

function welcome (){
    console.log(chalk.green("Welcome to the World of Gambling!\n"));
    console.log(chalk.green("Every Spin costs $10. Please buy tickets to play the Game.\n"));
    console.log(chalk.green("As you play, your score will increase with your prize money\n"));
};

function askName (){
    const player1name = rl.question (chalk.red("Please enter your name!\n"));
    return player1name;
};

function choice (player1name){
   let player1choice = rl.question(`Hello ${player1name}! Press "B" to Begin the Game, "Q" to Exit the Game\n`);
   return player1choice;
};




function exit (){
    console.log(chalk.greenBright(`Thank you for visiting. Goodbye and have a nice day ahead ${player1name}!`));
};


async function getRndmFromSet ()
{
    const response = await fetch('http://localhost:4000/wheel');
    player1spinprizemoney = await response.text();
    return player1spinprizemoney;
}

welcome ();
player1name = askName ();
player1choice = choice (player1name);
//console.log(player1spinprizemoney);

while (player1session)
{

    if(player1choice=="B")
    {
        player1ticketplan=rl.question(chalk.blue("Please Buy Tickets. Please enter one of the following Plans to begin the session...\nPress A for $50\nPress B for $100\nPress C $200\n"));
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
                player1spinprizemoney = Number(await getRndmFromSet());
                
                player1prizemoney = player1prizemoney + player1spinprizemoney;
                player1ticketbalance=player1ticketbalance-10;
                                            
                if(player1spinprizemoney==0)
                {
                    console.log(chalk.red("OOpsie. No Win in this spin !Please try another spin...\n"));
                }
                else if(player1spinprizemoney==-1)
                {
                    console.log(chalk.red("Oh No !!. You went Bankrupt and lost all the money :C\n"));
                    player1prizemoney = 0;
                }
                else
                {
                    console.log(player1spinprizemoney);
                    console.log(chalk.blue(chalk.green(`Congratulations! \nYou have won ${player1spinprizemoney} with this spin.\n`)));
                    
                }
                console.log(chalk.blue(`You have won total ${player1prizemoney} so far...`));
                console.log(chalk.blue("Your ticket balance is $"+player1ticketbalance));            
                console.log(chalk.blue("You have "+player1ticketbalance/10+" Spins left.\n"));
                
                player1spinstatus="";
                //player1spinprizemoney=0;
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

exit (player1name);


