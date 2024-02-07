const platformImg = new Image()
platformImg.src = './img/platform.png'

const winflagImg = new Image()
winflagImg.src = './img/winflag.png'


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


// creation of the win flag
class Winflag {
    constructor(x, y, img) {
        this.position = {
            x,
            y
        }
        this.image = img
        this.width = 200
        this.height = 300
    }


    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
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
// creation of smallplatform class
class Smallplatform {
    constructor(x, y, img) {
        this.position = {
            x,
            y
        }
        this.image = img
        this.width = smallplatformImg.width
        this.height = smallplatformImg.height
    }


    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}


// creation of player
let player = new Player()

// creation of background
let backgroundImg = new Background(-1, -1, bgImg)


// creation of background
let winflag = new Winflag(11000, 165, winflagImg)


// creation of hills
let hillImg = new Background(-1, -1, hills)

// creation of the platforms [platform array]
let platforms = [new Platform(-1, 455, platformImg),
new Platform(platformImg.width * 2 - 580 - 3, 455, platformImg),
new Platform(platformImg.width * 3 - 580 + 150, 455, platformImg),
new Platform(platformImg.width * 4 - 580 + 150, 375, platformImg),
new Platform(platformImg.width * 6 - 300, 455, platformImg),
new Platform(platformImg.width * 7 - 302, 455, platformImg),
new Platform(platformImg.width * 9 - 302, 455, platformImg),
new Platform(platformImg.width * 10 - 100, 500, platformImg),
new Platform(platformImg.width * 13, 455, platformImg),
new Platform(platformImg.width * 14 + 200, 455, platformImg),
new Platform(platformImg.width * 18 + 150, 455, platformImg),
new Platform(platformImg.width * 19 - 3 + 150, 455, platformImg),
new Platform(platformImg.width * 20 - 5 + 150, 455, platformImg),
]

// creation of the smallplatforms [smallplatform array]
let smallplatforms = [new Smallplatform(platformImg.width * 5 - 580 + 150, 200, smallplatformImg),
new Smallplatform(platformImg.width * 7 - 302, 175, smallplatformImg),
new Smallplatform(platformImg.width * 8 - 302, 100, smallplatformImg),
new Smallplatform(platformImg.width * 11, 100, smallplatformImg),
new Smallplatform(platformImg.width * 12, 200, smallplatformImg),
new Smallplatform(platformImg.width * 16 - 100, 200, smallplatformImg),
new Smallplatform(platformImg.width * 17, 200, smallplatformImg),
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
    winflag.draw()
    player.update()

    platforms.forEach((platform) => {
        platform.draw()
    })
    smallplatforms.forEach((smallplatform) => {
        smallplatform.draw()
    })




    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    }
    else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrolloffset === 0 && player.position.x > 0)) {
        player.velocity.x = -player.speed
    }
    else {
        player.velocity.x = 0

        if (keys.right.pressed && scrolloffset < 11050) {
            scrolloffset += player.speed
            platforms.forEach((platform) => {
                platform.position.x -= player.speed
            })
            smallplatforms.forEach((smallplatform) => {
                smallplatform.position.x -= player.speed
            })
            backgroundImg.position.x -= 3
            hillImg.position.x -= 4
            winflag.position.x -= player.speed


        }

        else if (keys.left.pressed && scrolloffset > 0) {
            scrolloffset -= player.speed
            platforms.forEach((platform) => {
                platform.position.x += player.speed
            })
            smallplatforms.forEach((smallplatform) => {
                smallplatform.position.x += player.speed
            })
            backgroundImg.position.x += 3
            hillImg.position.x += 4
            winflag.position.x += player.speed

        }
    }


    // platform collision detection
    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }

    })
    // samllplatform collision detection
    smallplatforms.forEach((smallplatform) => {
        if (player.position.y + player.height <= smallplatform.position.y && player.position.y + player.height + player.velocity.y >= smallplatform.position.y && player.position.x + player.width >= smallplatform.position.x && player.position.x <= smallplatform.position.x + smallplatform.width) {
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

    console.log(scrolloffset)
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