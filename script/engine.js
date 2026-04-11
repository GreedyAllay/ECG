let level = [];

//you need to add 1 or 2 to make it actually reach the desired number cause i used settimeout
let targetFramerate = 32

const frameTime = (1/targetFramerate)*1000
let keys= []

//dont you dare forget one or it will be very sad
const loadTextures = [
    "idle0.svg",
    "idle1.svg",
    "run0.svg",
    "run1.svg",
    "run2.svg",
    "run3.svg",
    "run4.svg",
    "run5.svg",
    "crouch0.svg",
    "crouch1.svg",
    "crouch2.svg",
    "crouch3.svg",
    "jump0.svg",
    "land0.svg",
    "fly0.svg",
    "sit0.svg",
    "accident0.svg",
    "fall0.svg",
]
loadTextures.forEach(asset => {
    loadImage(`assets/textures/${asset}`, asset.split('.')[0])
})

const player = { x: 0, y: 0, w: 0, h: 0, mirror: false, xv: 0, yv: 0,
    againstWall: false,
    onFloor: false,
    isSneaking: false,
    isRunning: false,
    isFlying: false,
    canFly: false,
    againstCeiling: false,
    animation: 'idle',
    texture: 'idle0',
    floorTime: 0,
    airTime: 0,
    flyingTime: 0,
    sneakingTime: 0
}

window.game = {
    tick: 0,
    started: false,
    running: false,
    renderHitBoxes: false,
    fpsTarget: 31
}

//fps counter code
const fpsc = {}
fpsc.filterStrength = 20
fpsc.frameTime = 0
fpsc.lastLoop = new Date,
fpsc.thisLoop

resetPlayerHitbox()
loadLevel(0)

let lastError = ""

document.title = "evil cat game by Axolay" //very evil dont remove credit pls im beg this took too long to make

game.start = () => {
    if(!game.started) {
        game.started = true
    } else {
        throw "engineError: game is already running"
        return }

    element('menu').style.display = 'none';
    (async()=> {
        await wait(1000);
        element('menu').remove();
    })();
    (async()=>{
        while(1) {
            //gaym code here :3
            try {
                setCamera(0-player.x, 0-player.y, 1)
                clearScreen()
                handleControls()
                handlePhysics()
                renderPlayer()
                gameLogic()
                renderObjects()
                drawHitboxes()                
            } catch (error) {
                lastError = error
            }

            //check framerate
            const thisFrameTime = (fpsc.thisLoop=new Date) - fpsc.lastLoop;
            fpsc.frameTime+= (thisFrameTime - fpsc.frameTime) / fpsc.filterStrength;
            fpsc.lastLoop = fpsc.thisLoop;

            if(lastError) {
                drawText(5, 80, lastError, "#ff0000")
            }

            drawText(5, 40, (1000/fpsc.frameTime).toFixed(0), "#000000")
            drawText(5, 120, player.animation, "#000000")
            drawText(5, 180, game.tick, "#000000")

            await wait(frameTime)
        }
    })()
}

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


//function AABB(x1, y1, w1, h1, x2, y2, w2, h2) { (x1, y1, w1, h1, x2, y2, w2, h2) <= Math.abs(x1 - x2) <= ((w1 / 2) + (w2 / 2)) && Math.abs(y1-y2)<=((h1 / 2) + (h2 / 2)) }


