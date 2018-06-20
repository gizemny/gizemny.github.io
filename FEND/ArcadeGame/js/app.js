
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

var score = '';

Player.prototype.update = function () {
    if (Keys.down)  {
        this.y += 90;
        Keys.down = false;
    } else if (Keys.up) {
        this.y -= 90;
        Keys.up = false;
        score += 10;
    }
    if (Keys.right) {
        this.x += 100;
        Keys.right = false;
    } else if (Keys.left) {
        this.x -= 100;
        Keys.left = false;
    } 
    
    if (this.x > 400) {
        this.x = 400;
    } else if (this.x < 0) {
        this.x = 0;
    } else if (this.y > 400) {
        this.y = 400;
    } else if (this.y < 40) {
        this.win();
    }
};

Player.prototype.win = function () {
    allEnemies = [];
    player.x = 200;
    player.y = 400;
    swal({
        title: "Congrats!",
        text: "You won the game!",
        icon: "success",
        button: "Play Again!",
    }).then(function () {
        location.reload();
    });
}


Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

Player.prototype.handleInput = function (key) {
    if (key == 'up') {
        Keys.up = true;
    } else if (key == 'down') {
        Keys.down = true;
    } else if (key == 'left') {
        Keys.left = true;
    } else if (key == 'right') {
        Keys.right = true;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [];
player = new Player(200, 400);

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

(function eachEnemy(){
    var enemy = [];
    for (i = 0; i <= 75; i++) {
        eX = getRandomIntInclusive(1, 50) * (-101);
        eY = getRandomIntInclusive(1, 3) * (85) - 40;
        eS = getRandomIntInclusive(2, 4) * 20;
        enemy[i] = new Enemy(eX, eY, eS);
        allEnemies.push(enemy[i]); 
        }
})();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
