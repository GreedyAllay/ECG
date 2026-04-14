function handleControls() {
    if(checkKey("r")) { location.reload() }
    //if(checkKey("s") && (player.onFloor && player.animation != "accident")) { player }
    //if(checkKey("a")) { player.xv -= 4 }
    //if(checkKey("d")) { player.xv += 4 }
    //if(checkKey("w") && player.onFloor) { player.yv -= 8;}

}

//key logging (the good one)
addEventListener('keydown', (e) => { keys.push(e.key) }); addEventListener('keyup', (e) => { keys = keys.filter(k => k !== e.key); })

function checkKey(key) {
    return keys.includes(key)
}

document.addEventListener('keypress', (e) => {
    if(e.key == "1") {
        game.renderHitBoxes = !game.renderHitBoxes
    }
})