//dont you dare forget one or it will be very sad

//hello here you can add textures. you should totally go to game/animations.js first tho

//if you just came from there, hear me out

//you first add the textures to the textures folder under assets
//then you name them correctly, if you are planning on using a single texture for an animation, name it the name of the animation
//we always use animations, even for stationary player textures.
//otherwise, name them name0, name1... respectively.
//then make sure to NOT forget adding them to the LoadTextures() function otherwise the engine will be very, very, very unhappy.

//you're welcome please give me a star on github


loadTextures(
    [
    "rotate0.svg",
    "smoke0.svg",
    "smoke1.svg",
    "rain.svg",
    "firespark.svg",
    "stem.svg",
    "leaves.svg",
    "hydrant.svg",
    "foliage/flower.svg",
    "gear.svg",
    "tutorialkey.svg",
    "fire.svg",
    "blood.svg",
    "key.svg",
    "jetpack.svg",
    "sword.svg",
    "bloodvignette.svg",
    "foliage/grass0.svg",
    "foliage/grass1.svg",
    "foliage/grass2.svg",
    "foliage/grass3.svg",
    "rock.svg",
    "glitter.svg",
    "warn.svg",
    "water.svg",
    "rockcave.svg",
    "calico/head.svg"
], 

"assets/textures"

)


function loadTextures(textures, path) {
    textures.forEach(asset => {
        loadImage(`${path}/${asset}`, asset.split('.')[0])
    })
}

function loadJetCatTextures() {
    const path = "assets/textures/calico/new/"
    loadTextures([
    "attack0.svg",
    "attack1.svg",
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
    "jump.svg",
    "land.svg",
    "fly0.svg",
    "fly1.svg",
    "sit.svg",
    "accident.svg",
    "fall.svg",
    "dead.svg",
    "deadwall.svg",
    ], path)
}

function loadCatTextures() {
    const path = "assets/textures/calico/normal/"
    loadTextures([
    "attack0.svg",
    "attack1.svg",
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
    "jump.svg",
    "land.svg",
    "fly0.svg",
    "fly1.svg",
    "sit.svg",
    "accident.svg",
    "fall.svg",
    "dead.svg",
    "deadwall.svg",
    "freefall.svg",
    "standup0.svg",
    "standup1.svg",
    "standup2.svg",
    "standup3.svg",
    "standup4.svg",
    ], path)
}

loadCatTextures()