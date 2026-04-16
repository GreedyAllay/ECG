const stepHeight = -20

const maxFlyingTime = 10 //do 100 for funsies, 10 is default

const movementSpeed = 15 //10 is default

function gameLogic() {
    game.frame++

    if(checkKey("s") && player.onFloor && player.animation != "accident") {
        if(player.dead) return;
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
        if(player.dead) return;
            if(player.onFloor || (!player.onFloor && player.airTime < 5)) {
                player.yv = -10
                player.animation = "jump"
            } else {
                if(player.canFly) {
                    player.isFlying = true
                    player.animation = 'fly'
                    player.yv = player.yv -= 1.4
                    rocketSmoke(player.x - (player.mirror ? -15 : 6), player.y+35, 0, 5, 5)
                } else {
                    player.isFlying = false
                }
            }
        } else {
            player.isFlying = false
            if(player.onFloor) {
                if(checkKey("a") || checkKey("d")) {
                    if(player.dead) return;
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
        if(player.dead) return;
        player.mirror = true
        if(player.isSneaking && false) {
            player.xv = -2.5
        } else {
            player.xv = 0-movementSpeed
        }
    }
    if(checkKey("d")) {
        if(player.dead) return;
        player.mirror = false
        if(player.isSneaking && false) {
            player.xv = 2.5 
        } else {
            player.xv = movementSpeed
        }
    }

    let maxflytime = maxFlyingTime
    if(game.editor || cheats.fly) {
        maxflytime = 99999
    } else {
        if(player.allowFly) {
            maxflytime = maxFlyingTime
        } else {
            maxflytime = 0
        }        
    }

    if(player.isFlying) {
        player.flyingTime++
        if(player.flyingTime> maxflytime ) {
            player.isFlying = false
            player.canFly = false
        }
    }
    if(player.onFloor) {
        player.flyingTime = 0
        player.canFly = true
        player.isFlying = false
        player.airTime = 0
        player.floorTime++
    } else {
        player.airTime++
        player.floorTime = 0
        if(!((player.animation == "jump" || player.animation == "fly")||player.animation == "accident")) {
            player.animation = "fall"
        }
    }
    if(player.isSneaking && player.onFloor) {
        if(!checkPlayerCollided(player.mirror ? -30 : 30, 1)) {
            if(player.sneakingTime > 3) {
                player.isSneaking = false
                player.animation = "accident"
                player.floorTime = 0
                player.xv = player.mirror ? -15 : 15
            }
        }
    }
    if(player.isSneaking) {
        player.sneakingTime++
    } else {
        player.sneakingTime = 0
    }
    if(player.againstWall) {
        if(player.isRunning) {
            if(!checkPlayerCollided(player.mirror ? -1 : 1, stepHeight)) {
                player.x += player.mirror ? -1 : 1
                player.y += stepHeight
                player.yv = 100
            }
        }
    }

    if(player.y > world.minHeight && !player.dead) {
        killPlayer("abyss")
    }
}

function killPlayer(cause) {
    player.dead = true
    player.death.x = player.x
    player.death.y = player.y

    switch (cause) {
        case "abyss":
        audio.death_meow_abyss.play()
        player.animation = "accident"
        
            break;
    
        default:
        audio.death_meow.play()
        player.animation = "dead"
        spawnBloodSplash(player.x, player.y, 20)
        if(player.onFloor) {
            spawnBloodPool(player.x, player.y, 5)
        }
        break;
    }
}