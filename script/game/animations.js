//anime~ ...ation

//ok


let controller;

async function defineAnimation(name, frames, speed, loop) {
    if(player.animation != name) return //works
    if(frames === 0) {
        player.texture = name //wroks
    } else {
        player.texture = name+0 //wroks
    }
        if(frames <= 1) return //wroks
    for(let i = 0; i < frames; i++) {
        player.texture = name+i
        for(let j = 0; j < speed * 100; j++) {
            if(player.animation != name) {break}
            await wait(10)
        }
        if(player.animation != name) return
    }
    if(!loop) {
        while(player.animation === name) await wait(1);
    }
}

async function runAnimations() {
    while(1) {
        for(let i = 0; i < 2; i++) {
            await defineAnimation("idle", 2, .7, 1)
            await defineAnimation("run", 6, .1, 1)
            await defineAnimation("jump", 0, .1, 1)
            await defineAnimation("fly", 1, .1, 1)
            await defineAnimation("fall", 0, .1, 1)
            await defineAnimation("land", 0, .1, 1)
            await defineAnimation("accident", 0, .1, 1)
            await defineAnimation("crouch", 4, .2, 1)
            await defineAnimation("sit", 0, .1, 1)
            await defineAnimation("rotate", 0, .1, 0)
            await defineAnimation("attack", 2, .2, 0)
            await defineAnimation("freefall", 0, 0, 0)
            await defineAnimation("dead", 0, 0, 0)
            await defineAnimation("standup", 5, 0.2, 0)
            while(player.dead) {
                await defineDeathAnimation()
                await wait(1)
            }
            await wait(1)
        }

    }
}
runAnimations()

async function defineDeathAnimation() {
    if(player.againstWall) {
        player.texture = "deadwall"

    } else {
        player.texture = "dead"
    }
}
