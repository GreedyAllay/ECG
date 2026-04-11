const element = (id) => document.getElementById(id)

const wait = (ms) => new Promise(r => setTimeout(r, ms))

const freeze = async (frames) => {
    const oldFrame = game.tick
    while(game.tick - oldFrame < frames) { 
        await wait(frameTime) 
    }
}