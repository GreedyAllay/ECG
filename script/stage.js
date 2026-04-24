//ts is kinda important ngl
const display = {
    canvas: element('canvas'),
    context: undefined,
}
const camera = {
    x: 0,
    y: 0,
    z: 4,
    initialZoom: 1.5,
    xv: 0,
    yv: 0,
    oldZoom: undefined,
    follow: true
}
const size = {
    screenScale: 70,
    defaultHeight: 640,
    screenWidth: undefined,
    screenHeight: undefined,
    oldWidth: undefined,
    oldHeight: undefined,
    defaultHeightNumber: undefined,
}
const textures = {}
display.context = display.canvas.getContext('2d')

//the original aspect ratio that we actually kinda expected
size.screenWidth = size.screenScale * 16
size.screenHeight = size.screenScale * 9

//but you were stupid enough to have 67:21 ratio and my nice code
//takes ur ugly ass ratio and makes it work. I know, i'm nice, thank me later.
//ppossibly might have stolen this code from past me who coded something similar in c++
//so he might hate me for that idk actually I can't speak to him unfortunately

size.oldWidth = size.screenWidth
size.oldHeight = size.screenHeight
size.defaultHeightNumber = camera.initialZoom / size.defaultHeight
camera.oldZoom = camera.initialZoom

addEventListener('resize', () => {
    resize()
})

resize()

const clearScreen = () => {
    display.context.clearRect(0, 0, display.canvas.width, display.canvas.height)
}

//javascript bullshit once again
const font = new FontFace('Archivo', 'url(assets/fonts/archivo.ttf)')
const font1 = new FontFace('Archivo Black', 'url(assets/fonts/archivoblack.ttf)')
font.load().then((loaded) => {
    document.fonts.add(loaded)
})
font1.load().then((loaded) => {
    document.fonts.add(loaded)
})

function preDrawObject(x, y, w, h) {
    display.context.beginPath()
    display.context.rect(
        screenToWorldX(x), //(x - w / 2) for center
        screenToWorldY(y), //(y - h / 2)
        w * camera.z, h * camera.z)
}

function drawObject(x, y, w, h, color) {
    display.context.fillStyle = color
    preDrawObject(x, y, w, h)
    display.context.fill()
}

function drawObjectWF(x, y, w, h, color) {
    display.context.lineWidth = 1*camera.z
    display.context.strokeStyle = color
    preDrawObject(x, y, w, h)
    display.context.stroke()
}

function loadImage(source, name) {
    try {
        const texture = document.createElement('img')
        texture.src = source
        textures[name] = texture
    } catch (error) {
        throw "networkError: failed to load image: "+ error
    }

}

function drawText(x, y, text, color, size, camera, font, align) {
    size = size ?? 48
    font = font ?? "Archivo"
    if(!display.context.textAlign) {
        display.context.textAlign = "left"
    } else {
        display.context.textAlign = align
    }
    if(camera) {
        x = screenToWorldX(x)
        y = screenToWorldY(y)
    }
    display.context.fillStyle = color
    display.context.font = `${size}px ${font}`
    display.context.fillText(text, x, y)
}

function drawImage(x, y, w, h, source, mirror, auto, flip, screenspace) {
    //inverse rendering code by jwklong
    if(!textures[source] || !textures[source].complete) { throw("engineError: tried to draw unloaded image"); return}

    const width = textures[source].width/100
    const height = textures[source].height/100
    //auto = false

    x = screenspace ? x : screenToWorldX(x)
    y = screenspace ? y : screenToWorldY(y)

    if(!auto) auto = false
    if(auto) {
        w *= width * camera.z
        h *= height * camera.z
    } else {
        w *= camera.z
        h *= camera.z
    }


    if (mirror || flip) {
    display.context.save()
        display.context.translate(mirror ? w : 0, flip ? h : 0)
        display.context.scale(mirror ? -1 : 1, flip ? -1 : 1)
        if(mirror) {
            x *= mirror ? -1 : 1
        }
        if(flip) {
            y *= flip ? -1 : 1
        }
    }
    display.context.drawImage(textures[source], x, y, w, h)
    if(mirror || flip) {
        display.context.restore()
    }
}

function screenToWorldX(x) {
    return (x + camera.x) * camera.z + size.screenWidth / 2;
}

function screenToWorldY(y) {
    return (y + camera.y) * camera.z + size.screenHeight / 2;
}

function setCamera(x, y, s) {
    if(!camera.follow) return;
    const smoothness = 5;
    const damping = 100;
    if (s) {
        x = x - camera.x;
        y = y - camera.y;
        camera.xv += x;
        camera.yv += y;
        camera.x += (x / smoothness) * DT;
        camera.y += (y / smoothness) * DT;
        camera.xv = camera.xv / damping;
        camera.yv = camera.yv / damping;
    }
    else {
        camera.x = x;
        camera.y = y;
    }
}

function trackPosition(x, y) {
    setCamera(((0 - playerX) - x / 2), ((0 - playerY) - y / 2), true);
}

function resize() {
    //handle different screen sizes at least on paper lets see if it works gng
    //i stole this code from my c++ game
    
    display.canvas.width = Math.floor(window.innerWidth)
    display.canvas.height = Math.floor(window.innerHeight)

    size.screenWidth = display.canvas.width
    size.screenHeight = display.canvas.height

    if (size.oldWidth != size.screenWidth || camera.oldZoom != camera.initialZoom) {
        size.defaultHeightNumber = camera.initialZoom / size.defaultHeight;
        camera.z = size.screenHeight * size.defaultHeightNumber;
        size.oldWidth = size.screenHeight;
        camera.oldZoom = camera.initialZoom;
    }
}

const playTrigger = element('play')
playTrigger.addEventListener('click', ()=> {
    playTrigger.remove()
    game.start()
})

function openMenu(name) {
    const menu = document.createElement('div')
    
    document.body.appendChild()
}

