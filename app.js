let gameSeq = [];
let userSeq = [];
let btns = [".card1", ".card2", ".card3", ".card4"];
let started = false;
let level = 0;
let h3 = document.querySelector("h3");

document.addEventListener("keydown", function() {
    if (!started) {
        console.log("Game is Started");
        started = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 500);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    level++;
    h3.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(randColor);
    gameSeq.push(randColor);
    console.log("Game Sequence: ", gameSeq);
    setTimeout(function() {
        btnFlash(randBtn);
    }, 500);
}

function checkAns() {
    let idx = userSeq.length - 1;
    if (userSeq[idx] === gameSeq[idx]) {
        console.log("Correct sequence so far...");
        if (userSeq.length === gameSeq.length) {
            setTimeout(function() {
                userSeq = [];
                levelUp();
            }, 1000);
        }
    } else {
        h3.innerText = `Game Over! Press Any Key to Restart`;
        console.log("Wrong sequence, game over");
        document.querySelector("body").style.backgroundColor = "#f5b7b1";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "";
        }, 150);
        startOver();
    }
}

function btnPress() {
    console.log("Btn was pressed");
    let btn = this;
    userFlash(btn);
    let userColor = "." + btn.getAttribute("class").split(" ")[0];
    userSeq.push(userColor);
    console.log("User Sequence: ", userSeq);
    checkAns();
}

let allBtns = document.querySelectorAll(".card");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function startOver() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
