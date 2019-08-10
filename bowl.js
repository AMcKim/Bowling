var $ = function(id) {
    return document.getElementById(id);
};

var score = 0;
var doubleFrame = [0, 0];
var lastFrame = [0, 0];
var currentFrame = [0, 0];

window.onload = function () {
    $("begin").onclick = StartGame;
    //document.getElementById("#begin").onclick = StartGame;
    //StartGame();
};



function StartGame() {
    //let msg = '';
    for (i = 1; i < 10; i++)
    {
        $("bonus").innerHTML = "";

        Bowl1(i);
        if (IsDouble(lastFrame, doubleFrame) === true) {
            score += ((lastFrame[0] * 2) + (currentFrame[1] * 2));
        }
        else if(IsStrike(lastFrame) === true) {
            score += (currentFrame[0] + currentFrame[1]) * 2;
        }
        else if(IsSpare(lastFrame) === true) {
         score += (currentFrame[0] * 2) + currentFrame[1];
        }
        else {
            score += currentFrame[0] + currentFrame[1];
        }
        //IsValid(currentFrame[0], currentFrame[1]);

        $("score").innerHTML = score;
        doubleFrame[0] = lastFrame[0];
        doubleFrame[1] = lastFrame[1];

        lastFrame[0] = currentFrame[0];
        lastFrame[1] = currentFrame[1];
    }

    /* if (IsStrike(lastFrame) === true)
    {
        BonusBowls(2);
    }
    else if(IsSpare(lastFrame) === true)
    {
        BonusBowls(1);
    }
    else {
        bonus = 0;
    }
    score += bonus; */

    $('bowl').innerHTML = "Final score = " + score;
}

function Bowl1(i) {

    currentFrame[0] = parseInt(prompt("Frame " + i + " Bowl 1"));

    if (currentFrame[0] === 10) {
        $("bonus").innerHTML = "STRIKE!";
        return;
    }
    else {
        Bowl2(i, currentFrame[0]);
    }
}

function Bowl2(i, bowl1) {
    currentFrame[1] = parseInt(prompt("Frame " + i + " Bowl 2"));
        
        if (bowl1 + currentFrame[1] === 10) {
            $("bonus").innerHTML = "SPARE!";
        }
        return;
    }


/* function IsValid(bowl1, bowl2) {
let frameScore = bowl1 + bowl2;
if (frameScore < 0 || frameScore >10 ) {
let msg = "You knocked down " + frameScore + " pins this frame.....interesting.";
console.log(msg);
return;
}
else {
let msg = "You knocked down " + frameScore + " pins this frame."
console.log(msg);
return;
}
} */

function IsDouble(lastFrame, doubleFrame) {
    if (lastFrame[0] === 10 && doubleFrame[0] === 10) 
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