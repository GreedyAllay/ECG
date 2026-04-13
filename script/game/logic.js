const stepHeight = -20


function gameLogic() {
    game.frame++
    if(player.isFlying) {
        player.flyingTime++
        if(player.flyingTime>10) {
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
}