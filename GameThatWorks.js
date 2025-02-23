const movementSpeed = 10;
const wallThickness = 3;
var backgroundColour;

var scene;

var score = 0;

function setup() {
    cnv = new Canvas(windowWidth, windowHeight);
    player = new Sprite(windowWidth/2, windowHeight/2, 100, 100, "k");  
    player.color = 'cyan';

    coins = new Group()

    roof = 		new Sprite(windowWidth/2,   windowHeight,	windowWidth,	wallThickness,	"s");
	floor = 	new Sprite(windowWidth/2, 	0,  			windowWidth,	wallThickness,	"s");
	rightWall = new Sprite(windowWidth, 	windowHeight/2,	wallThickness,	windowWidth, 	"s");
	leftWall = 	new Sprite(0,				windowHeight/2,	wallThickness,	windowWidth,	"s");

    scene = 'menu';

    function deleteCoin(collider1, collider2) {
		// Delete the alien which was hit
		collider2.remove();
        score ++;
	}

	player.collides(coins, deleteCoin);
}

function draw() {
    if (scene == 'game') { gameScreen() }
    if (scene == 'menu') { menuScreen() }
    if (scene == 'finished') { finishedScreen() }
}

function newCoin() {
    coin = new Sprite(random(0, windowWidth), random(0, windowHeight), 40);
    coin.color = 'yellow';
    coins.add(coin);
    coins.timeRemaining = 5*60;
}

function menuScreen() {
    allSprites.visible = false;
    background('cyan');

    textSize(80);
    fill("#FFFFFF");
    textAlign('center');
    text("Game that works!", windowWidth/2, windowHeight/2 - 50);

    textSize(40);
    text("Press 'Space' to begin!", windowWidth/2, windowHeight/2 + 20);

    if (kb.pressing('space')) {
        scene = 'game';
        score = 0;
        timer = 20;
        newCoin();
    }
}

function finishedScreen() {
    background('cyan');
    allSprites.visible = false;

    textSize(35);
    fill("#FFFFFF");
    textAlign('center');
    text("Game Finished!", windowWidth/2, windowHeight/2 - 50);
    text("Final Score: " + score, windowWidth/2, windowHeight/2 - 10);

    text("Press 'Esc' to return to menu", windowWidth/2, windowHeight/2 + 60);

    if (kb.pressing('escape')) {
        scene = 'menu';
    }
}

var timer;

function gameScreen() {
    background('#FFFFFF');
    allSprites.visible = true;

    textAlign('left');
    fill(0, 0, 0);
    textSize(30);
    text('Score: ' + score, 20, 40);

    textAlign('right');
    text('Time Remaining: ' + timer, windowWidth-20, 40);

    if (frameCount % 120 == 0) {
        counter = 0;
        newCoin();
    }

    for (var i = 0; i < coins.length; i++) {
        cache

        if (coins[i].spawnTime + 50 < millis()) {
            coins[i].remove()  
        }
    }
    
    if (frameCount % 60 == 0) {
        timer --;
    }

    if (timer <= 0) {
        scene = 'finished';
        coins.removeAll();
    }

    // Player movement
    if (kb.pressing('W')) { player.vel.y = -movementSpeed; }
    else if (kb.pressing('S')) { player.vel.y = movementSpeed; }
    else { player.vel.y = 0 }

    if (kb.pressing('A')) { player.vel.x = -movementSpeed; }
    else if (kb.pressing('D')) { player.vel.x = movementSpeed; }
    else { player.vel.x = 0 }
}