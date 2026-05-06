let level = [];

//you need to add 1 or 2 to make it actually reach the desired number cause i used settimeout

const setup = {}
let targetFramerate = 32

const instantStart = true

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
        layers: false,
        background: false,
        culling: true
    },
    gameplay: {
        gore: true,
        pixelate: false,
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
            setCamera(0-player.death.x - player.w/2, 0-player.death.y  - player.h/2, 0)
        } else {
            setCamera((0-player.x - player.w/2 ) - player.xv*0, (0-player.y - player.h/2) - player.yv*0 , 0)
        }
        limitCamPos()


        clearScreen()
        handleControls() //fine
        handlePhysics()
        gameLogic() //somewhat haevy

        multiplayer.tick()
        simulateMultiplayers()
        
        renderBackgroundLayer()

        renderObjects() //super heavy (-60 fps) culprit
        renderWater()
        renderWaterReflections() // -60 fps
        renderStains() // depends
        handleParticles() //also depends
        renderPlayer() //fine
        renderForegroundLayer() //fine somehow
        drawHitboxes()
        checkTriggers() //fine
        drawTriggers() //fine
        renderMultiplayers() //fine
        renderEditor() //fine

        if(checkKey("Tab")) {
            renderPlayerList()
        }



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
        //drawText(5, 80, lastError, "#ff0000", 30)
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

game.start = (args = {}) => {
    if(!args) {
        args = {}
    }
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
    audio.intro.pause()
    if(config.performance.fpsLimit) {
        (async()=>{
            while(1) {
                game.tick()
                await wait(1) //frametime
            }
        })()
    } else {
        requestAnimationFrame(game.tick)
    }
    
    if(!args.noLevel) {
        defineLevel()
    }

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

//const mouse = {}
//addEventListener('mousemove', (e) => {
//    mouse.screen.x = (e.clientX / display.canvas.width) * size.defaultHeight / camera.z
//    mouse.screen.y = (e.clientY / display.canvas.height) * size.defaultHeight
//
//    mouse.world.x = (e.clientX / display.canvas.width) * size.defaultHeight / camera.z
//    mouse.world.y = (e.clientY / display.canvas.height) * size.defaultHeight
//})

const set = {
    water: (height) => {
        world.waterHeight = height
    }
}


//function AABB(x1, y1, w1, h1, x2, y2, w2, h2) { (x1, y1, w1, h1, x2, y2, w2, h2) <= Math.abs(x1 - x2) <= ((w1 / 2) + (w2 / 2)) && Math.abs(y1-y2)<=((h1 / 2) + (h2 / 2)) }

level.forEach(obj => {
    if(AABB(obj.x, obj.y, obj.w, obj.y, mouse.x, mouse.y, 0, 0)) {
        level.splice(i, 1)
    }
    
});

function criticalError(title, message) {
    const warn = document.createElement('iframe')
    warn.src= `/screens/message/index.html?title=${title}&message=${message}&close=true`
    warn.id = "message"
    document.body.appendChild(warn)
}

function fullScreenMessage(title, message) {
    const warn = document.createElement('iframe')
    warn.src= `/screens/message/index.html?title=${title}&message=${message}&close=false`
    warn.id = "message"
    document.body.appendChild(warn)
}

function closeFullscreenMessage() {
    element("message").remove()
}

//criticalError("message", "description")

// Source - https://stackoverflow.com/a/77170999
// Posted by Kaiido, modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-27, License - CC BY-SA 4.0

const hasHWA = (() => {
  // create a test function for both "default" drawing and forced software
  const test = (force=false) => {
    // Firefox (at lest on macOS) doesn't accelerate OffscreenCanvas
    const canvas = document.createElement("canvas");
    // willReadFrequently will force software rendering
    const ctx = canvas.getContext("2d", { willReadFrequently: force });
    ctx.moveTo(0, 0),
    ctx.lineTo(120, 121); // HWA is bad at obliques
    ctx.stroke();
    return ctx.getImageData(0, 0, 200, 200).data.join();
  };
  // check that both return different results
  return test(true) !== test(false);
})();

config.performance.background = hasHWA;