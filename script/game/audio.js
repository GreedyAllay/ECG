window.audio = {}

const song = "toaster-kubbi.mp3" //change la song here gng

audio.song = new Audio(`../../assets/audio/${song}`) 
audio.click0 = new Audio(`../../assets/audio/click0.wav`)
audio.click1 = new Audio(`../../assets/audio/click1.wav`)

audio.death_meow = new Audio(`../../assets/audio/meow-death.mp3`)
audio.death_meow_abyss = new Audio(`../../assets/audio/meow-death-abyss.mp3`)



document.addEventListener('click', () => {
    //sounds.song.play()
})
