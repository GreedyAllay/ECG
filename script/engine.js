let level = [];

//you need to add 1 or 2 to make it actually reach the desired number cause i used settimeout
let targetFramerate = 32

const instantStart = false

const instantMultiplayer = false

let frameTime = (1/targetFramerate)*1000
let keys= []

let DT = (1/60) * 30

window.player = { 
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
    allowFly: false,
    canDie: true,
    canMove: true,
    wallJumped: false,
    lastWallJumpSide: undefined,
    attackTime: 0,
    animation: 'idle',
    texture: 'idle0',
    floorTime: 0,
    airTime: 0,
    flyingTime: 0,
    sneakingTime: 0,
    runningTime: 0,
    death: { x: 0, y: 0 },
    wallJumpTime: 0,
}

window.game = {
    frame: 0,
    started: false,
    running: false,
    renderHitBoxes: false,
    renderObjectIDs: false,
    editor: false,
    drawTriggers: false,
    isMultiplayer: false
}

window.world = {
    waterHeight: 0,
    minHeight: 200,
    environment: "grassy",
    useReflections: true,
}

window.config = {
    performance: {
        shaders: false,
        reflections: true,
        particles: true,
        transparency: false,
        fpsLimit: false,
    },
    gameplay: {
        gore: true,
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

let framerate = 0

resetPlayerHitbox()

let lastError = ""

document.title = "evil cat game by Axolay" //very evil dont remove credit pls im beg this took too long to make

try {
    loadLevel(0)
} catch (error) {
    lastError = error
}

//most likely the ugliest part of code in the entire game
game.tick = async() => {
    //gaym code here :3
    const now = performance.now()
    DT = (now - lastUpdate); DT /= 1000; DT *= 30; DT = Math.min(DT, 2)

    lastUpdate = now


    try {
        if(player.dead) {
            setCamera(0-player.death.x - player.w/2, 0-player.death.y  - player.h/2, 1)
        } else {
            setCamera((0-player.x - player.w/2 ) - player.xv*0, (0-player.y - player.h/2) - player.yv*0 , 1)
        }

        multiplayer.tick()

        clearScreen()
        handleControls()
        handlePhysics()
        gameLogic()
        
        renderBackgroundLayer()
        renderWater()
        renderObjects()
        renderWaterReflections()
        renderStains()
        handleParticles()
        renderPlayer()
        renderForegroundLayer()
        drawHitboxes()
        checkTriggers()
        drawTriggers()

        simulateMultiplayers()

        renderMultiplayers()



        renderEditor()        
        
    } catch (error) {
        console.error(error)
        lastError = error
    }

    //check framerate
    const thisFrameTime = (fpsc.thisLoop=new Date) - fpsc.lastLoop;
    fpsc.frameTime+= (thisFrameTime - fpsc.frameTime) / fpsc.filterStrength;
    fpsc.lastLoop = fpsc.thisLoop;

    framerate = (1000/fpsc.frameTime).toFixed(0)

    if(lastError) {
        drawText(5, 80, lastError, "#ff0000", 30)
    }

    drawText(5, 40, framerate, "#000000")
    //drawText(5, 120, player.animation, "#000000")
    //drawText(5, 180, game.frame, "#000000")



    if(game.editor) {
        drawText(5, 230, "x: " + Math.round(player.x))
        drawText(5, 270, "y: " + Math.round(player.y))

        drawText(5, 310, "z: " + camera.initialZoom)

        drawText(5, 140, "editor mode")
    }

    if(!config.performance.fpsLimit) {
        requestAnimationFrame(game.tick)
    }

}

let lastUpdate = performance.now()

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
    if(config.performance.fpsLimit) {
        (async()=>{
            while(1) {
                game.tick()
                await wait(frameTime)
            }
        })()
    } else {
        requestAnimationFrame(game.tick)
    }
    defineLevel()

}

game.startMP = (address) => {
    game.isMultiplayer = true,
    multiplayer.address = address
    //multiplayer.start()
}

game.reset = () => {
    game.isRunning
}

window.onload = () => { if(instantStart) { if(instantMultiplayer) { multiplayer.connect("ws://localhost:6969");} else {game.start()} } }
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


if(config.performance.pixelate) {
    display.canvas.className = "pixelated"
}

level.forEach(obj => {
    if(AABB(obj.x, obj.y, obj.w, obj.y, mouse.x, mouse.y, 0, 0)) {
        level.splice(i, 1)
    }
    
});

function criticalError(title, message) {
    document.location.href = `screens/error`
}