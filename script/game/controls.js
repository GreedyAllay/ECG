function handleControls() {
    if(checkKey("r")) { location.reload() }
    //if(checkKey("s") && (player.onFloor && player.animation != "accident")) { player }
    //if(checkKey("a")) { player.xv -= 4 }
    //if(checkKey("d")) { player.xv += 4 }
    //if(checkKey("w") && player.onFloor) { player.yv -= 8;}



    if(checkKey("s") && player.onFloor && player.animation != "accident") {
        player.isSneaking = true
        setHitboxCrouching(player.mirror)
        if(checkKey("a") || checkKey("d")) {
            player.animation = "crouch"
        } else {
            player.animation = "sit"
        }
    } else  {
        resetPlayerHitbox()
        if(!(player.animation == "fall" || player.animation == "accident")||player.onFloor && player.floorTime > 5) { //coyote time
            player.animation = "idle"
            player.isRunning = false
        }
        player.isSneaking = false
        if(checkKey("w")) {
            if(player.onFloor || (!player.onFloor && player.airTime < 5)) {
                player.yv = -10
                player.animation = "jump"
            } else {
                if(player.canFly) {
                    player.isFlying = true
                    player.animation = 'fly'
                    player.yv = player.yv -= 1.4
                    rocketSmoke(player.x - (player.mirror ? -15 : 6), player.y+45, 0, 5, 5)
                } else {
                    player.isFlying = false
                }
            }
        } else {
            player.isFlying = false
            if(player.onFloor) {
                if(checkKey("a") || checkKey("d")) {
                    if(player.isSneaking) {
                        player.animation = "crouch"
                        player.w = 50
                        player.h = 40
                        player.oy = -50
                    } else {
                        player.isRunning = true
                        if(player.againstWall) {
                            if(player.animation != "accident") {
                                player.animation = "idle"
                            }
                        } else {
                            player.animation = "run"
                        }
                    }
                } else {
                    if(!(player.animation == 'fall' || player.animation == 'accident')) {
                        player.animation = "idle"
                    }
                }
            }
        }
    }


    if(checkKey("a")) {
        player.mirror = true
        if(player.isSneaking) {
            player.xv = -2.5 
        } else {
            player.xv = -10
        }
    }
    if(checkKey("d")) {
        player.mirror = false
        if(player.isSneaking) {
            player.xv = 2.5 
        } else {
            player.xv = 10
        }
    }
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