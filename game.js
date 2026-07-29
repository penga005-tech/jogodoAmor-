let player;
let ground;
let cursors;
let score = 0;
let scoreText;
let finalFoto;
let quizAberto = false;


let monsters;
let hearts;
let obstacles;

let jumpButton;
let attackButton;

const config = {

    type: Phaser.AUTO,

    width: 960,
    height: 540,

    parent: "game",

    scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
},

    physics: {

        default: "arcade",

        arcade: {

            gravity: {
                y: 900
            },

            debug: false
        }

    },


    scene: {

        preload,
        create,
        update

    }

};


const game = new Phaser.Game(config);



// CARREGAR IMAGENS
function preload(){

    this.load.image(
        "ela",
        "assets/ela.png"
    );


    this.load.image(
        "monstro",
        "assets/monstro.png"
    );


    this.load.image(
        "coracao",
        "assets/coracao.png"
    );

  this.load.image(
    "fundo",
    "assets/fundo.png"
   );

  this.load.image(
    "obstaculo",
    "assets/obstaculo.png"
);

this.load.image(
    "eu",
    "assets/eu.png"
);

}


// CRIAR O JOGO
function create(){

    // Criar grupo dos corações
    hearts = this.physics.add.group({
    maxSize: 20
});

 hearts.children.iterate(function(heart){
    heart.setActive(true);
});


    // Fundo
    this.add.image(
    2500,
    270,
    "fundo"
)
.setDisplaySize(
    5000,
    540
);



    // Chão
    ground = this.physics.add.staticGroup();


    let chão = ground.create(
    2500,
    520,
    null
);

chão.setDisplaySize(
    5000,
    40
);

chão.refreshBody();

chão.setVisible(false);



    // Personagem dela
    player = this.physics.add.sprite(
        150,
        350,
        "ela"
    );


    // tamanho da foto
    player.setScale(0.07);



    // física
    player.setCollideWorldBounds(true);

   // tamanho do mundo
  this.physics.world.setBounds(
    0,
    0,
    5000,
    540
);




// limite da câmera
this.cameras.main.setBounds(
    0,
    0,
    5000,
    540
);


// câmera seguindo a personagem
this.cameras.main.startFollow(player);


    // câmera seguindo a personagem
    this.cameras.main.startFollow(player);

    this.cameras.main.setRoundPixels(true);

    this.cameras.main.setZoom(1);



    // colisão com chão
    this.physics.add.collider(
        player,
        ground
    );


// Criar obstáculos
obstacles = this.physics.add.staticGroup();


let pedra1 = obstacles.create(
    1000,
    450,
    "obstaculo"
);

pedra1.setScale(0.1);
pedra1.refreshBody();



let pedra2 = obstacles.create(
    2200,
    450,
    "obstaculo"
);

pedra2.setScale(0.1);
pedra2.refreshBody();



let pedra3 = obstacles.create(
    3500,
    450,
    "obstaculo"
);

pedra3.setScale(0.1);
pedra3.refreshBody();

// colisão com obstáculos
this.physics.add.collider(
    player,
    obstacles
);


// Criar monstros
monsters = this.physics.add.group();


let monstro = monsters.create(
    700,
    420,
    "monstro"
);

let monstro2 = monsters.create(
    1500,
    420,
    "monstro"
);

monstro2.setScale(0.25);


let monstro3 = monsters.create(
    2800,
    420,
    "monstro"
);

monstro3.setScale(0.25);


let monstro4 = monsters.create(
    4000,
    420,
    "monstro"
);

monstro4.setScale(0.25);


monstro.setScale(0.35);

monstro.setVelocityX(-100);

monstro.setCollideWorldBounds(true);

// Foto dele no final da fase

finalFoto = this.physics.add.sprite(
    4700,
    420,
    "eu"
);

finalFoto.setScale(0.12);

finalFoto.body.allowGravity = false;
finalFoto.setImmovable(true);

this.physics.add.collider(
    monsters,
    ground
);



// colisão com ela
this.physics.add.collider(
    player,
    monsters,
    bateuNoMonstro,
    null,
    this
);

// colisão do coração com monstros
this.physics.add.collider(
    hearts,
    monsters,
    acertouMonstro,
    null,
    this
);



    // botão de pulo

jumpButton = this.add.text(
    100,
    450,
    "⬆️",
    {
        fontSize: "70px",
        backgroundColor: "#ffffff",
        padding: 10
    }
)
.setInteractive();

jumpButton.setScrollFactor(0);



jumpButton.on(
    "pointerdown",
    function(){

        if(player.body.touching.down){

            player.setVelocityY(-550);

        }

    }
);



// botão de ataque

attackButton = this.add.text(
    800,
    450,
    "❤️",
    {
        fontSize: "60px",
        backgroundColor: "#ffffff",
        padding: 10
    }
)
.setInteractive();





attackButton.on(
    "pointerdown",
    function(){

        let heart = hearts.create(
            player.x + 100,
            player.y,
            "coracao"
        );


        heart.setScale(0.05);

        heart.setDepth(5);

        heart.body.allowGravity = false;

        heart.setVelocityX(600, 0);

        heart.setCollideWorldBounds(false);

    }
);



    // Pontuação
    scoreText = this.add.text(
        20,
        20,
        "Pontos: 0",
        {
            fontSize: "28px",
            fill: "#ffffff"
        }
    );

scoreText.setScrollFactor(0);


attackButton.setScrollFactor(0);

this.physics.add.overlap(
    player,
    finalFoto,
    () => finalDoJogo(this),
    null
);
 
}



// ATUALIZAÇÃO
function update(){





    // anda automaticamente
    player.setVelocityX(180);





    // pontos
    score += 1;


    scoreText.setText(
        "Pontos: " + score
    );

}



// QUANDO BATE NO MONSTRO
function bateuNoMonstro(player, monstro){

    score -= 50;


    scoreText.setText(
        "Pontos: " + score
    );


}



// QUANDO O CORAÇÃO ACERTA O MONSTRO
function acertouMonstro(coracao, monstro){

    coracao.destroy();

    monstro.destroy();


    score += 100;


    scoreText.setText(
        "Pontos: " + score
    );

}



// FINAL
function finalDoJogo(scene){

    if (quizAberto) return;
    quizAberto = true;

    player.setVelocityX(0);
    player.body.moves = false;

    scene.cameras.main.stopFollow();

    scene.add.rectangle(
        480,
        270,
        960,
        540,
        0x000000,
        0.85
    )
    .setScrollFactor(0)
    .setDepth(100);

    scene.add.image(360,180,"ela")
        .setScale(0.08)
        .setScrollFactor(0)
        .setDepth(101);

    scene.add.image(600,180,"eu")
        .setScale(0.08)
        .setScrollFactor(0)
        .setDepth(101);

    scene.add.text(
    480,
    180,
    "❤️",
    {
        fontSize: "70px",
        fill: "#ffffff"
    }
)
.setOrigin(0.5)
.setScrollFactor(0)
.setDepth(102);

    scene.add.text(
        480,
        320,
        "Parabéns!\nVocê chegou até mim.\nEu te amo! ❤️",
        
            {
    fontSize: "32px",
    fill: "#ffffff",
    align: "center"
}
        
    )
    .setOrigin(0.5)
    .setScrollFactor(0)
    .setDepth(102);

}
