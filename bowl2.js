var $ = function(id) {
    return document.getElementById(id);
};

window.onload = function () {
    $("begin").onclick = StartGame;
    //document.getElementById("#begin").onclick = StartGame;
    //StartGame();
};

var score = 0;
var bowl1 = [];
var bowl2 = [];
var lastFrame = [];

function StartGame() {
    
    for (i = 0; i < 10; i++)
    {
        //let frameScore = 0;
        $('frame').innerHTML = i;
        Bowl1(i);

        GetFrameScore();

        ShowScore(score);
    }

    LastFrameBonus(i, bowl1, bowl2);
}

function Bowl1(i) {
    //first bowl of frame
    $('bowl').innerHTML = 1;

    let firstBowl = parseInt(prompt("Frame " + (i + 1).toString() + " Bowl 1"));
    bowl1.push(firstBowl);

    //if first bowl of frame is a strike, push 0 to second bowl and go to next frame
    //if not a strike ask for second bowl of frame
    if (firstBowl === 10) {
        bowl2.push(0);
        
        //$('frameScore').innerHTML = 10;
        $("bonus").innerHTML = "STRIKE!";

        //msg = "Waiting for strike bonus";
        return;
    }
    else {
        Bowl2(i);
    }
}

function Bowl2(i) {
    //second bowl of frame
    $('bowl').innerHTML = 2;

    let secondBowl = parseInt(prompt("Frame " + (i + 1).toString() + " Bowl 2"));
        
        if (bowl1[i - 1] + secondBowl === 10) {
            $("bonus").innerHTML = "SPARE!";
        }
        

        bowl2.push(secondBowl);
        return;
}

//determine if bowler has earned bonuses
function GetFrameScore() {

    let frameScore = 0;

    if (IsDouble(i, bowl1)) {
        frameScore = bowl1[i] + 20;
    }

    else if (IsStrike(i, bowl1)) {
        frameScore = bowl1[i] + bowl2[i] + 10;
    }

    else if (IsSpare(i, bowl1, bowl2)) {
        framescore = bowl1[i] + bowl1[i] + bowl2[i];
    }

    else {
        frameScore = bowl1[i] + bowl2[i];
    }

    score += frameScore;
    
    alert("Framescore = " + frameScore.toString());
}

//check two previous frames.  If both are strikes return true.
function IsDouble(i, bowl1) {
    if (bowl1[i - 1] === 10 && bowl1[i -2] === 10)
    {
        return true;
    }
    else 
    {
        return false;
    }
}

//check previous frame.  If strike, return true
function IsStrike(i, bowl1) {
    if (bowl1[i - 1] === 10) {
        return true;
    }
    else {
        return false;
    }
}

//check both bowls of previous frame for spare
function IsSpare(i, bowl1, bowl2) {
    if (bowl1[i - 1] + bowl2[i - 1] === 10) {
        return true;
    }
    else {
        return false;
    }
}

//check that pins bowled in this frame is greater than or equal to 0
//or less than or equal to 10
function IsValidBowl(i, bowl1, bowl2) {
    let pins = bowl1[i] + bowl2[i];
    if (pins >= 0 && pins <= 10) {
        return true;
    }
    else {
        return false;
    }
}

//display current score in score input box
function ShowScore(score) {
    $("score").innerHTML = score;
    //$("#score").innerHTML(score);
}

//check for double, strike, or spare to determine if extra bowls are necessary for bonus
function LastFrameBonus(i, bowl1, bowl2) {
    
    if (IsDouble(i, bowl1)) {
        Bowl1("Extra Frame");
    }
    else if (IsStrike(i, bowl1)) {
        Bowl1("Extra Frame");
    }
    else if (IsSpare(i, bowl1, bowl2)) {
        Bowl2("Extra Frame");
    }
    else {
        alert("Game Over");
        alert("Final Score = " + score.toString());
    }
}