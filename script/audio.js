//MY EARS



window.audio = {}

const song = "toaster-kubbi.mp3" //change la song here gng

const path = (name) => {
    return "../../assets/audio/" + name 
}


const introSongs = [
    path("music/start/lost-in-nothingness.mp3")
]

audio.intro = new Audio(introSongs[random(0, introSongs.length-1)])

audio.intro.volume = 0.25


audio.click0 = new Audio(`../../assets/audio/click0.wav`)
audio.click1 = new Audio(`../../assets/audio/click1.wav`)
audio.coolclick = new Audio(`../../assets/audio/coolclick.wav`)

audio.death_meow = new Audio(`../../assets/audio/meow-death.mp3`)
audio.death_meow_abyss = new Audio(`../../assets/audio/meow-death-abyss.mp3`)

audio.splash = new Audio(`../../assets/audio/splash.mp3`)
audio.impact = new Audio(`../../assets/audio/impact.wav`)
audio.fall = new Audio(`../../assets/audio/fall.wav`)
audio.land = new Audio(`../../assets/audio/land.ogg`)

audio.footstep0 = new Audio(`../../assets/audio/footstep0.wav`)
audio.footstep1 = new Audio(`../../assets/audio/footstep1.wav`)
audio.footstep2 = new Audio(`../../assets/audio/footstep2.wav`)

audio.jetpack = new Audio(`../../assets/audio/jetpack.wav`)

audio.trigger = new Audio(`../../assets/audio/trigger.wav`)

audio.pickup = new Audio(`../../assets/audio/pickup.ogg`)



document.addEventListener('click', () => {
    //sounds.song.play()
})

function playFootStep() {
    const selected = "footstep"+Math.round(random(0, 2))
    if(audio[selected].currentTime > 0) {
        audio[selected].pause()
        audio[selected].currentTime = 0
    }
    audio[selected].play()
}

function pickupSound() {
    audio.pickup.play()
}