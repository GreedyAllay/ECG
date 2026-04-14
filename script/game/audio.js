window.sounds = {}

const song = "toaster-kubbi.mp3" //change la song here gng

sounds.song = new Audio(`../../assets/audio/${song}`) 
sounds.click0 = new Audio(`../../assets/audio/click0.wav`)
sounds.click1 = new Audio(`../../assets/audio/click1.wav`)


document.addEventListener('click', () => {
    //sounds.song.play()
})
