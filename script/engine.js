let level = [];

//you need to add 1 or 2 to make it actually reach the desired number cause i used settimeout
let targetFramerate = 32

const instantStart = true

let frameTime = (1/targetFramerate)*1000
let keys= []

const player = { 
    x: 0, y: 0, w: 0, h: 0, mirror: false, xv: 0, yv: 0, ox: -40, oy: -20, hbx: 0, hby: 0,
    //1100
    againstWall: false,
    onFloor: false,
    isSneaking: false,
    isRunning: false,
    isFlying: false,
    canFly: false,
    againstCeiling: false,
    dead: false,
    allowFly: true,
    animation: 'idle',
    texture: 'idle0',
    floorTime: 0,
    airTime: 0,
    flyingTime: 0,
    sneakingTime: 0,
    death: { x: 0, y: 0 }
}

window.game = {
    frame: 0,
    started: false,
    running: false,
    renderHitBoxes: false,
    renderObjectIDs: false,
    fpsTarget: 31,
    editor: false,
    drawTriggers: false
}

window.world = {
    waterHeight: 0,
    minHeight: 200
}

window.config = {
    performance: {
        shaders: false,
        particles: true,
    }
}

window.cheats = {
    jump: 1,
    sprint: 1,
    fly: false
}

//fps counter code
const fpsc = {}
fpsc.filterStrength = 20
fpsc.frameTime = 0
fpsc.lastLoop = new Date,
fpsc.thisLoop

resetPlayerHitbox()

let lastError = ""

document.title = "evil cat game by Axolay" //very evil dont remove credit pls im beg this took too long to make

try {
    loadLevel(0)
} catch (error) {
    lastError = error
}


game.tick = () => {
    //gaym code here :3
    try {
        if(player.dead) {
            setCamera(0-player.death.x - player.w/2, 0-player.death.y  - player.h/2, 1)
        } else {
            setCamera(0-player.x - player.w/2, 0-player.y  - player.h/2, 1)
        }
        clearScreen()
        handleControls()
        handlePhysics()
        gameLogic()
        renderObjects()
        handleParticles()
        renderPlayer()
        renderWater()
        drawHitboxes()
        drawTriggers()
        checkTriggers()

        renderEditor()
        
        
    } catch (error) {
        lastError = error
    }

    //check framerate
    const thisFrameTime = (fpsc.thisLoop=new Date) - fpsc.lastLoop;
    fpsc.frameTime+= (thisFrameTime - fpsc.frameTime) / fpsc.filterStrength;
    fpsc.lastLoop = fpsc.thisLoop;

    if(lastError) {
        drawText(5, 80, lastError, "#ff0000", 30)
    }

    drawText(5, 40, (1000/fpsc.frameTime).toFixed(0), "#000000")
    drawText(5, 120, player.animation, "#000000")
    drawText(5, 180, game.frame, "#000000")

    drawText(5, 230, Math.round(player.x))
    drawText(5, 260, Math.round(player.y))

    drawText(10, 300, camera.initialZoom)

}

game.start = () => {
    if(!game.started) {
        game.started = true
    } else {
        throw "engineError: game is already running"
        return }

    element('menu').style.display = 'none';
    (async()=> {
        setCamera(0-player.x - player.w/2, 0-player.y  - player.h/2, 0)
        await wait(1000);
        element('menu').remove();
    })();
    (async()=>{
        while(1) {
            game.tick()
            await wait(frameTime)
        }
    })()
}

window.onload = () => { if(instantStart) game.start(); } 
//auto start so u dont have to hear the menu song 10 billion times a second when debugging like a loser

game.pause = () => {
    game.running = false
    display.canvas.filter = "brightness(.5)"
    console.log("game paused")
}
game.resume = () => {
    game.running = true
    display.canvas.filter = "brightness(1)"
    console.log("resuming game")
}

const mouse = {}
addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
})

const set = {
    water: (height) => {
        world.waterHeight = height
    }
}


//function AABB(x1, y1, w1, h1, x2, y2, w2, h2) { (x1, y1, w1, h1, x2, y2, w2, h2) <= Math.abs(x1 - x2) <= ((w1 / 2) + (w2 / 2)) && Math.abs(y1-y2)<=((h1 / 2) + (h2 / 2)) }


