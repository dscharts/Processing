var game =  new Phaser.Game(400, 490);

var state = {
    preload: function() {
        game.load.image('passaratcho', 'assets/bird.png');
        game.load.image('cano', 'assets/pipe.png');
        game.load.audio('jump', 'assets/jump.wav');
    },
    
    create: function() {
        this.soundJump = game.add.audio('jump');
        
        game.stage.backgroundColor = '#71c5cf';
        
        game.physics.startSystem(Phaser.Physics.ARCADE); 
        
        this.passaratcho = game.add.sprite(100, 120, 'passaratcho');
        
        game.physics.arcade.enable(this.passaratcho);
        
        this.passaratcho.body.gravity.y = 1000;
        
        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        space.onDown.add(this.jump, this);
        
        this.cano = game.add.group();
        
        this.timer = game.time.events.loop(1500, this.addCano, this);
        
        this.results = game.add.text(20,20,"0", {
            font: "30px Arial Black",
            fill: "#fff"
        });
        
        this.points = 0;
        
        this.passaratcho.anchor.setTo(-0.2, 0.5);
    },
    
    update: function() {
      
        if (this.passaratcho.y > 490 || this.passaratcho.y < -45) {
            this.deathAnimation();
        } 
        
        game.physics.arcade.overlap(this.passaratcho, this.cano, this.deathAnimation, null, this);
        
        if (this.passaratcho.angle < 20) {
            this.passaratcho.angle += 1;
        }
            
    },
    
    restartGame: function() {
        game.state.start('main');
    },
    
    jump: function() {
        if(this.passaratcho.alive) {
            this.passaratcho.body.velocity.y = -350;
        
            var animation = game.add.tween(this.passaratcho);
            animation.to({angle: -20}, 100);

            animation.start();
            this.soundJump.play();
        }
    },
    
    addSquare: function(x, y) {
        var square = game.add.sprite(x,y,'cano');
    
        this.cano.add(square);
    
        game.physics.arcade.enable(square);
    
        square.body.velocity.x = -200;
    
        square.checkWorldBounds = true;
        square.outOfBoundsKill = true;
    },

    addCano: function() {
        this.points += 1;
        this.results.text = this.points;
        
        var hole = Math.floor(Math.random() * 5) + 1;
        
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1)
                this.addSquare(400,10 + i*60);
},
    
    deathAnimation: function(){
        this.passaratcho.alive = false;
        
        game.time.events.remove(this.timer);
        
        this.cano.forEach(function(quad){
            quad.body.velocity.x = 0;
        }, this);
        
        this.finalStats();
    },
    
    finalStats: function() {
        this.results = game.add.text(200,200,this.points, {
            font: "70px Arial Black",
            fill: "#fff"
        });

    }
}

game.state.add('main', state);
game.state.start('main');