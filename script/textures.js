//dont you dare forget one or it will be very sad
const loadTextures = [
    "idle0.svg",
    "idle1.svg",
    "run0.svg",
    "run1.svg",
    "run2.svg",
    "run3.svg",
    "run4.svg",
    "run5.svg",
    "crouch0.svg",
    "crouch1.svg",
    "crouch2.svg",
    "crouch3.svg",
    "jump0.svg",
    "land0.svg",
    "fly0.svg",
    "sit0.svg",
    "accident0.svg",
    "fall0.svg",
    "rotate0.svg",
    "smoke.svg",
    "rain.svg",
    "firespark.svg",
    "stem.svg",
    "leaves.svg",
    "hydrant.svg",
    "flower.svg",
]
loadTextures.forEach(asset => {
    loadImage(`assets/textures/${asset}`, asset.split('.')[0])
})