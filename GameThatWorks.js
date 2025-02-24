const movementSpeed = 10;
const coinTimer = 7;
var backgroundColour;

var scene;

var score = 0;
var highScore = score;

function setup() {
    cnv = new Canvas(windowWidth, windowHeight);
    player = new Sprite(windowWidth/2, windowHeight/2, 100, 100, "k");  
    player.color = 'cyan';

    coins = new Group()
    scene = 'menu';

    function deleteCoin(collider1, collider2) {
		// Delete the alien which was hit
		collider2.remove();
        score ++;
	}

	player.collides(coins, deleteCoin);
}

function startGame() {
    scene = 'game';
    score = 0;
    coinDelay = 100;
    newCoin();
}

function draw() {
    if (scene == 'game') { gameScreen() }
    if (scene == 'menu') { menuScreen() }
    if (scene == 'finished') { finishedScreen() }
}

function newCoin() {
    coin = new Sprite(random(0, windowWidth), random(0, windowHeight), 40);
    coin.color = 'yellow';
    coin.spawnTime = millis();

    coins.add(coin);
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

    textSize(20);
    textAlign('left');
    text("High Score: " + highScore, 10, 30);

    if (kb.pressing('space')) { startGame(); }
}

function finishedScreen() {
    background('cyan');
    allSprites.visible = false;

    textSize(45);
    fill("#FFFFFF");
    textAlign('center');
    text("Game Over!", windowWidth/2, windowHeight/2 - 75);
    textSize(25);
    text("Final Score: " + score, windowWidth/2, windowHeight/2 - 15);
    textSize(22.5);
    text("High Score: " + highScore, windowWidth/2, windowHeight/2 + 15);

    textSize(20);
    text("Press 'Esc' to return to menu", windowWidth/2, windowHeight/2 + 70);
    text("Press 'Space' to replay", windowWidth/2, windowHeight/2 + 95);

    if (kb.pressing('escape')) { scene = 'menu'; }
    if (kb.pressing('space')) { startGame(); }
}

var coinDelay;

function gameScreen() {
    background('#FFFFFF');
    allSprites.visible = true;

    textAlign('left');
    fill(0, 0, 0);
    textSize(30);
    text('Score: ' + score, 20, 40);

    console.log(coinDelay);

    if (frameCount % coinDelay == 0) {
        newCoin();
    }

    if (frameCount % 40 == 0 && coinDelay > 40) {
        coinDelay --;
    }

    for (var i = 0; i < coins.length; i++) {
        coin = coins[i];

        if (coin.spawnTime + coinTimer*1000 < millis()) {
            scene = 'finished';
            coins.removeAll();
            
            if (score > highScore) {
                highScore = score;
            }

            continue;
        }

        fill(230, 230, 230);
        rect(coin.x - 20, coin.y + 35, 40, 13);

        fill(0, 255, 0);
        rect(coin.x - 20, coin.y + 35, (1 - (millis() - coin.spawnTime)/(coinTimer*1000)) * 40, 13);
    }
    

    // Player movement
    if (kb.pressing('W') && player.y > 50 ) { player.vel.y = -movementSpeed; }
    else if (kb.pressing('S') && player.y < windowHeight - 50 ) { player.vel.y = movementSpeed; }
    else { player.vel.y = 0 }

    if (kb.pressing('A') && player.x > 50 ) { player.vel.x = -movementSpeed; }
    else if (kb.pressing('D') && player.x < windowWidth - 50 ) { player.vel.x = movementSpeed; }
    else { player.vel.x = 0 }

}