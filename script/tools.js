const element = (id) => document.getElementById(id)

const wait = (ms) => new Promise(r => setTimeout(r, ms))

const freeze = async (frames) => {
    const oldFrame = game.frame
    while(game.frame - oldFrame < frames) { 
        await wait(frameTime) 
    }
}

const random = (min, max) => {
    return Math.random() * (max - min) + min;
}