const stepHeight = -20

const maxFlyingTime = 10 //do 100 for funsies, 10 is default

const movementSpeed = 10 //10 is default

const editorFlyingSpeed = 5

let footstepPlayed = false

//i am deeply sorry to you for combining the controls with the logic,
// i just didn't know what the heck to do
function gameLogic() {
    game.frame += DT

    if(player.isRunning && player.onFloor) {
        player.runningTime += DT
    } else {
        player.runningTime = 0
    }

    if(player.dead) {
        player.isRunning = false
    }

    if(player.canMove) {
        if(checkKey(" ") || floor(player.attackTime) > 0) {
            player.attackTime += DT
            setAnimation("attack", 1)
            if(floor(player.attackTime) > 10) {
                if(!player.dead) {
                    setAnimation("idle")
                }
                player.attackTime = 0
            }
        } else {
        if(checkKey("s") && player.onFloor && player.animation != "accident") {
                if(player.dead) return;
                player.isSneaking = true
                setHitboxCrouching(player.mirror)
                if(checkKey("a") || checkKey("d")) {
                    setAnimation("crouch")
                } else {
                    setAnimation("sit")
                }
            } else  {
                resetPlayerHitbox()
                if((!(player.animation == "fall" || player.animation == "accident")||player.onFloor && floor(player.floorTime) > 5) && player.animation !== "dead" ) { //coyote time
                    
                    setAnimation("idle")
                    player.isRunning = false
                }
                player.isSneaking = false
                if(checkKey("w")) {
                if(player.dead) return;
                    if(player.onFloor || (!player.onFloor && floor(player.airTime) < 5)) {
                        player.yv = -10
                        setAnimation("jump")
                    } else {
                        if(player.canFly) {
                            player.isFlying = true
                            setAnimation("fly")
                            if(game.editor) {
                                player.yv -= editorFlyingSpeed * DT
                            } else {
                                player.yv -= 1.4 * DT
                            }
                            rocketSmoke(player.x - (player.mirror ? -15 : 6), player.y+35, 0, 5, Math.round(5*DT))
                        } else {
                            if(!game.editor) {
                                player.isFlying = false
                            }
                        }
                    }
                } else {
                    player.isFlying = false
                    if(player.onFloor) {
                        if(checkKey("a") || checkKey("d")) {
                            if(player.dead) return;
                            if(player.isSneaking) {
                                setAnimation("crouch")
                                player.w = 50
                                player.h = 40
                                player.oy = -50
                            } else {
                                player.isRunning = true
                                if(player.againstWall) {
                                    if(player.animation != "accident" && player.animation != "dead") {
                                        setAnimation("idle")
                                    }
                                } else {
                                    setAnimation("run")
                                }
                            }
                        } else {
                            if(!(player.animation == 'fall' || player.animation == 'accident' || player.animation == "dead")) {
                                setAnimation("idle")
                            }
                        }
                    }
                }
            }     
            if(checkKey("s")) {
                if(game.editor && player.allowFly) {
                    player.yv += 5
                }
            }   
        }

        
        let movespeed = movementSpeed
        if(game.editor) {
            movespeed *= 1.5
        }

        if(checkKey("a")) {
            if(player.dead) return;
            player.mirror = true
            if(player.isSneaking) {
                player.xv = -2.5
            } else {
                player.xv = 0-movespeed
            }
        }
        if(checkKey("d")) {
            if(player.dead) return;
            player.mirror = false
            if(player.isSneaking) {
                player.xv = 2.5 
            } else {
                player.xv = movespeed
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
            if(audio.jetpack.currentTime == 0 || floor(audio.jetpack.currentTime) > audio.jetpack.duration - 1) {
                audio.jetpack.play()
            }
            const a = audio.jetpack.currentTime * 10
            const vol = a > 1 ? 1 : a
            audio.jetpack.volume = vol
            player.flyingTime += DT
            if(player.flyingTime> maxflytime ) {
                player.isFlying = false
                player.canFly = false
            }
        } else {
            audio.jetpack.pause()
            audio.jetpack.currentTime = 0
        }
        if(player.onFloor) {
            if(player.airTime > 0) {
                audio.land.volume = .2
                audio.land.currentTime = 0
                audio.land.play()
            }
            player.flyingTime = 0
            if(player.allowFly) {
                player.canFly = true
            }
            player.isFlying = false
            player.airTime = 0
            player.floorTime += DT
        } else {
            player.airTime += DT
            player.floorTime = 0
            if(!((player.animation == "jump" || player.animation == "fly")||player.animation == "accident")) {
                setAnimation("fall")
            }
        }
        if(player.isSneaking && player.onFloor) {
            if(!checkPlayerCollided(player.mirror ? -30 : 30, 1)) {
                if(player.sneakingTime > 3) {
                    player.isSneaking = false
                    setAnimation("accident")
                    player.floorTime = 0
                    player.xv = player.mirror ? -15 : 15
                }
            }
        }
        if(player.isSneaking) {
            player.sneakingTime += DT
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


    if(player.y > world.minHeight && !player.dead) {
        killPlayer("abyss")
    }

    if(player.isRunning && !player.againstWall) {
        const floorRun = player.runningTime % 10
        if(floorRun > 0 && floorRun < 1 && !footstepPlayed) {
            playFootStep()
            footstepPlayed = true
        } else {
            footstepPlayed = false
        }
    }
}

function killPlayer(cause) {
    if(!player.canDie) return;
    player.dead = true
    player.death.x = player.x
    player.death.y = player.y

    switch (cause) {
        case "abyss":
        audio.death_meow_abyss.play()
        audio.splash.play()
        setAnimation("accident")
        spawnFluidSplash(player.x, player.y+50, 100, "water")
        spawnBloodWater(player.x, player.y, 100)
            break;
        default:
        audio.death_meow.play()
        setAnimation("dead", 1)
         spawnFluidSplash(player.x, player.y+50, 100, "blood")
        if(player.onFloor) {
            spawnBloodPool(player.x, player.y, 5)
        }
        break;
    }
}

function setAnimation(animation, force) {
    if(!force) {
        if(player.animation == "accident") return;
        if(player.animation == "freefall") return;
        if(player.animation == "standup") return;
    }
    player.animation = animation
}