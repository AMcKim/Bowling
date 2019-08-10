var $ = function(id) {
    return document.getElementById(id);
};

window.onload = function () {
    $("begin").onclick = StartGame;
    //document.getElementById("#begin").onclick = StartGame;
    //StartGame();
};

var score = 0;
var doubleFrame = [0,0];
var lastFrame = [0,0];
var currentFrame = [0,0];
//msg = "";

function StartGame() {
    //let msg = '';
    score = 0;
    doubleFrame = [0,0];
    lastFrame = [0,0];
    currentFrame = [0,0];

    for (i = 1; i < 11; i++)
    {
        $("bonus").innerHTML = "";

        Bowl1(i);
        
        Score(doubleFrame, lastFrame, currentFrame);

        ShowScore(score);

        doubleFrame[0] = lastFrame[0];
        doubleFrame[1] = lastFrame[1];

        lastFrame[0] = currentFrame[0];
        lastFrame[1]= currentFrame[1];
        
    }
    if (IsDouble(doubleFrame, lastFrame) === true) {
        //Double logic here
        Bowl1("Extra frame");
        score += 20 + (currentFrame[0] + currentFrame[1]);
    }
    else if (IsStrike(lastFrame) === true) {
        //Strike logic here
        Bowl1("Extra frame");
        score += (currentFrame[0] + currentFrame[1]);
    }
    else if (IsSpare(lastFrame, 10) === true) {
        Bowl2("Extra frame");
        score += currentFrame[1];
    }
    else {
        //End of game logic
    }
    $('finalScore').innerHTML = "Final score = " + score;
}

function Bowl1(i) {

    currentFrame[0] = parseInt(prompt("Frame " + i + " Bowl 1"));

    if (currentFrame[0] === 10) {
        currentFrame[1] = 0;
        $('frame').innerHTML = i;
        $('bowl').innerHTML = 1;
        $('frameScore').innerHTML = 10;
        $("bonus").innerHTML = "STRIKE!";

        //msg = "Waiting for strike bonus";

        return;
    }
    else {
        Bowl2(i, currentFrame[0]);
    }
}

function Bowl2(i, bowl1) {
    currentFrame[1] = parseInt(prompt("Frame " + i + " Bowl 2"));
        
        if (bowl1 + currentFrame[1] === 10) {
            $('frameScore').innerHTML = 10;
            $("bonus").innerHTML = "SPARE!";
           // msg = "Waiting for spare bonus";
        }
        $('bowl').innerHTML = 2;
        return;
}

function Score(doubleFrame, lastFrame, currentFrame) {
    if (IsDouble(doubleFrame, lastFrame) === true) {
        score += 20 + currentFrame[0];
    }
    else if (IsStrike(lastFrame) === true) {
        score += (currentFrame[0] + currentFrame[1]) * 2;
    }
    else if (IsSpare(lastFrame) === true){
        score += (currentFrame[0] * 2) + currentFrame[1];
    }
    else {
        score += currentFrame[0] + currentFrame[1];
    }
   
    return score;
}

function IsDouble(doubleFrame, lastFrame) {
    if (doubleFrame[0] === 10 && lastFrame[0] === 10) 
    {
        return true;
    }
    else
    {
        return false;
    }
}
    
function IsStrike(lastFrame) {
    if (lastFrame[0] === 10)
    {
        return true;
    }
    else {
        return false;
    }
}
    
function IsSpare(lastFrame) {
    if (lastFrame[0] + lastFrame[1] === 10) {
        return true;
    }
    else {
        return false;
    }
}
    
function BonusBowls(b) {
    let bonus = 0;
    for (i=0; i < b; i++) {
        bowl = parseInt(prompt("Bowl for bonus " + (i + 1)));
        bonus += bowl;
    }
    return bonus;
}

function ShowScore(score) {
    //$("score").innerHTML = score;
    $("#score").innerHTML(score);
}