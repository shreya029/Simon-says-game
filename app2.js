let gameseq=[];
let userseq=[];

let btns = ["yellow","red","green","purple"];

let started = false;
let level = 0;
let highScore = 0;
let h2 = document.querySelector("h2");
let highScoreDisplay = document.getElementById("high-score"); // Display the high score

// Check if there's a saved high score in localStorage
if (localStorage.getItem("highScore")) {
    highScore = parseInt(localStorage.getItem("highScore"));
    highScoreDisplay.innerText = highScore; // Display the high score on page load
}


document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game is started");
        started = true;
        levelUp();
    }
   //console.log("game started");
    });
function gameFlash(btn) {
        btn.classList.add("flash");
        setTimeout(function() {
            btn.classList.remove("flash");
        }, 250);
    }
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
    btn.classList.remove("userflash");
        }, 250);
    }
    
function levelUp(){
    userseq = [];
    level++;
    h2.innerText = `level ${level}`;
    //random btn choose
    let randIdx = Math.floor(Math.random()*3);
    let randcolor = btns[randIdx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
   // console.log(randIdx);
    //console.log(randcolor);
    //console.log(randbtn);
    gameFlash(randbtn);
}

function checkAns(idx){
    //console.log("curr state :",level);
    //let idx = level-1;
    if(userseq[idx]==gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerHTML = `game over your score was <b>${level}</b><br> press any key to start game.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
    
}
function btnpress(){
    console.log(this);
    let btn = this;//btn se confuse nhi hona bcz those are individually playing their roles in the functio
    userFlash(btn);

   userColor =btn.getAttribute("id");
   userseq.push(userColor);
   //console.log(userColor);
   checkAns(userseq.length-1);
}
let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}
function reset(){
    started = false;
     level = 0;
     gameseq = [];
     userseq = [];

}