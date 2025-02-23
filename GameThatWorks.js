const movementSpeed = 5;
const wallThickness = 3;
var backgroundColour;

var scene;

function setup() {
    cnv = new Canvas(windowWidth, windowHeight);
    player = new Sprite(windowWidth/2, windowHeight/2, 100, 100, "k");  
    player.color = 'cyan';

    roof = 		new Sprite(windowWidth/2,   windowHeight,	windowWidth,	wallThickness,	"s");
	floor = 	new Sprite(windowWidth/2, 	0,  			windowWidth,	wallThickness,	"s");
	rightWall = new Sprite(windowWidth, 	windowHeight/2,	wallThickness,	windowWidth, 	"s");
	leftWall = 	new Sprite(0,				windowHeight/2,	wallThickness,	windowWidth,	"s");

    scene = 'menu';
}

function draw() {
    if (scene == 'game') { gameScreen() }
    if (scene == 'menu') { menuScreen() }
}

function menuScreen() {
    allSprites.visible = false;
    background('cyan');

    textSize(50);
    fill("#FFFFFF");
    textAlign('center');
    text("Press 'Space' to begin!", windowWidth/2, windowHeight/2);

    if (kb.pressing('space')) { scene = 'game' }
}

function gameScreen() {
    background('#FFFFFF');
    allSprites.visible = true;

    // Player movement
    if (kb.pressing('W')) { player.vel.y = -movementSpeed; }
    else if (kb.pressing('S')) { player.vel.y = movementSpeed; }
    else { player.vel.y = 0 }

    if (kb.pressing('A')) { player.vel.x = -movementSpeed; }
    else if (kb.pressing('D')) { player.vel.x = movementSpeed; }
    else { player.vel.x = 0 }
}