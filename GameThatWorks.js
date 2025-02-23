const movementSpeed = 5;
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
}

function newCoin() {
    coin = new Sprite(random(0, windowWidth), random(0, windowHeight), 40);
    coins.add(coin);
}

function menuScreen() {
    allSprites.visible = false;
    background('cyan');

    textSize(50);
    fill("#FFFFFF");
    textAlign('center');
    text("Press 'Space' to begin!", windowWidth/2, windowHeight/2);

    if (kb.pressing('space')) {
        scene = 'game'
        newCoin()
    }
}

var counter = 0;
function gameScreen() {
    background('#FFFFFF');
    allSprites.visible = true;

    textAlign('left');
    fill(0, 0, 0);
    textSize(30);
    text('Score: ' + score, 20, 40);

    counter ++;
    if (counter > 200) {
        counter = 0;
        newCoin();
    }

    // Player movement
    if (kb.pressing('W')) { player.vel.y = -movementSpeed; }
    else if (kb.pressing('S')) { player.vel.y = movementSpeed; }
    else { player.vel.y = 0 }

    if (kb.pressing('A')) { player.vel.x = -movementSpeed; }
    else if (kb.pressing('D')) { player.vel.x = movementSpeed; }
    else { player.vel.x = 0 }
}