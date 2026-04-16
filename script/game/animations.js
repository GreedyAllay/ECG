let controller;

async function defineAnimation(name, frames, speed, loop) {
    if(player.animation != name) return //works
        player.texture = name+0 //wroks
        if(frames <= 1) return //wroks
    for(let i = 0; i < frames; i++) {
        player.texture = name+i
        for(let i = 0; i < speed * 100; i++) {
            if(player.animation != name) {break}
            await wait(10)
        }
        if(player.animation != name) return
    }
    if(!loop) {
        while(player.animation != name) await wait(1)
    }
}

async function runAnimations() {
    while(1) {
        for(let i = 0; i < 2; i++) {
            await defineAnimation("idle", 2, .7, 1)
            await defineAnimation("run", 6, .1, 1)
            await defineAnimation("jump", 1, .1, 1)
            await defineAnimation("fly", 2, .1, 1)
            await defineAnimation("fall", 1, .1, 1)
            await defineAnimation("land", 1, .1, 1)
            await defineAnimation("accident", 0, .1, 1)
            await defineAnimation("crouch", 4, .2, 1)
            await defineAnimation("sit", 0, .1, 1)
            await defineAnimation("rotate", 0, .1, 0)
            await defineAnimation("attack", 2, .2, 0)
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
