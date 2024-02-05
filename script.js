const platformImg = new Image()
platformImg.src = './img/platform.png'


const smallplatformImg = new Image()
smallplatformImg.src = './img/platformSmallTall.png'


const bgImg = new Image()
bgImg.src = './img/background.png'

const hills = new Image()
hills.src = './img/hills.png'


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = 1024
canvas.height = 576

const gravity = 0.5


// creation of the player class
class Player {
    constructor() {
        this.speed = 5
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30


    }


    draw() {
        c.fillStyle = 'red '
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }


    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x


        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        }


    }
}



// creation of the background class
class Background {
    constructor(x, y, img) {
        this.position = {
            x,
            y
        }
        this.image = img

    }


    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}


// creation of the hills class
class Hills {
    constructor(x, y, img) {
        this.position = {
            x,
            y
        }
        this.image = img

    }


    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

// creation of the platform class
class Platform {
    constructor(x, y, img) {
        this.position = {
            x,
            y
        }
        this.image = img
        this.width = platformImg.width
        this.height = platformImg.height
    }


    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}




// creation of player
let player = new Player()

// creation of background
let backgroundImg = new Background(-1, -1, bgImg)


// creation of hills
let hillImg = new Background(-1, -1, hills)

// creation of the platforms [platform array]
let platforms = [new Platform(-1, 455, platformImg),
new Platform(platformImg.width * 2 - 580 - 3, 455, platformImg),
new Platform(platformImg.width * 3 - 580 + 150, 455, platformImg),
]




const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrolloffset = 0


// function which runs the whole game
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    backgroundImg.draw()

    hillImg.draw()

    player.update()

    
   
    platforms.forEach((platform) => {
        platform.draw()
    })


    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    }
    else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrolloffset === 0 && player.position.x > 0)) {
        player.velocity.x = -player.speed
    }
    else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrolloffset += player.speed
            platforms.forEach((platform) => {
                platform.position.x -= player.speed
            })
            backgroundImg.position.x -= 3
            hillImg.position.x -= 4



        }

        else if (keys.left.pressed && scrolloffset > 0) {
            scrolloffset -= player.speed
            platforms.forEach((platform) => {
                platform.position.x += player.speed
            })
            backgroundImg.position.x += 3
            hillImg.position.x += 4

        }
    }


    // platform collision detection
    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }

    })


    // win scenario
    if (scrolloffset > 11000) {
        console.log('you win')
    }

    // loose scenario
    if (player.position.y > canvas.height) {
        console.log('you loose')
        
    }


}


// event listeners for the player's movement according to the keys 
// on keydown 
addEventListener('keydown', ({ keyCode }) => {

    switch (keyCode) {
        case 87:
            // console.log('UP')
            player.velocity.y -= 20
            break;
        case 65:
            // console.log('LEFT')
            keys.left.pressed = true
            break;
        case 83:
            // console.log('DOWN')
            break;
        case 68:
            // console.log('RIGHT')
            keys.right.pressed = true
            break;
    }
})


// event listeners for the keyup for the player
addEventListener('keyup', ({ keyCode }) => {

    switch (keyCode) {
        case 87:
            // console.log('UP')
            player.velocity.y -= 0
            break;
        case 65:
            // console.log('LEFT')
            keys.left.pressed = false
            break;
        case 83:
            // console.log('DOWN')
            break;
        case 68:
            // console.log('RIGHT')
            keys.right.pressed = false
            break;
    }
})




// calling the animate function to run the game
animate()