//controllo

//what

function handleControls() {
    if(checkKey("r")) { location.reload() }
}

//key logging (the good one)
addEventListener('keydown', (e) => { keys.push(e.key) }); addEventListener('keyup', (e) => { keys = keys.filter(k => k !== e.key); })

function checkKey(key) {
    return keys.includes(key)
}

//ugly ass key detection i am very sorry
document.addEventListener('keypress', (e) => {
    if(e.key == "1") {
        game.renderHitBoxes = !game.renderHitBoxes
    }
    if(e.key == "2") {
        game.renderObjectIDs = !game.renderObjectIDs
    }
    if(e.key == "3") {
        killPlayer()
    }
    if(e.key == "4") {
        game.editor = !game.editor
        player.canDie = !game.editor
    }
    if(e.key == "5") {
        game.drawTriggers = !game.drawTriggers
    }
    if(e.key == "/") {
        openConsole()
    }
    if(game.editor) {
        if(e.key == "-") {
            camera.initialZoom /= 1.1
            resize()
        }
        if(e.key == "=") {
            camera.initialZoom *= 1.1
            resize()
        }        
    }

})

//i stole this from some on;line website
window.addEventListener("gamepadconnected", (e) => {
  const gp = navigator.getGamepads()[e.gamepad.index];
  console.log(
    "Gamepad connected at index %d: %s. %d buttons, %d axes.",
    gp.index,
    gp.id,
    gp.buttons.length,
    gp.axes.length,
  );
});

function defineOnScreenControl(x, y, w, h, icon, key) {
    //sooooooo being used right now
}