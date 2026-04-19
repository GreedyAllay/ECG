const particles = []

function handleParticles() {
    if(!config.performance.particles) {return}
    //physics and rendering
    let hasChangedContext = false
    for(let i = particles.length-1; i >= 0; i--) {
        const particle = particles[i]
        const {x, y, w, h, source} = particle
        if(!particle.stalled) {
            particle.x += particle.xv * DT
            particle.y += particle.yv * DT
        }
        if(!particle.dead) {
            if(config.performance.transparency) {
                display.context.filter = "none";
            }
        } else {
            hasChangedContext = true
            switch (particle.kani) {
                case "fade":
                    if(config.performance.transparency) {
                        display.context.filter = `opacity(${1-particle.kanimationTime/10})`;
                    }
                    break;
            }
        }
        animateParticle(particle, i)

        drawImage(particle.x, particle.y, particle.w, particle.h, particle.source, 0)

        if(hasChangedContext) {
            display.context.filter = "none";
        }
        if(!particle.ghost) {
            if(checkParticleCollided(particle)) {
                particle.dead = true
                animateDeadParticle(particle, i, true)
                particle.stalled = true
            }
        }
        if(particle.gravity) {
            particle.yv += particle.gravity * DT
        }
        if(particle.lt) {
            if(floor(particle.time) >= particle.lt) {
                animateDeadParticle(particle, i)
            }
        }
        particle.time += DT
    }
}


function animateDeadParticle(particle, i, onFloor) {
    const {x, y, w, h, source} = particle
    switch (particle.kani) {
        case "fade":
            if(typeof particle.kanimationTime == "undefined") {
                particle.kanimationTime = 0
                particle.dead = true
            } else {
                particle.kanimationTime += DT
            }
            if(floor(particle.kanimationTime) > 10) {
                particles.splice(i, 1)
            }
            break;
    
        default:
            particle.dead = true
            particles.splice(i, 1)
            break;
    }
    if(particle.stains && onFloor) {
        //oh noes! we fell on the floor!
        //ugh for gods sake, i have to extrapolate the position to predict where it would have been
        //if your stupid screen wouldn't have had like 2 billion hertz
        //due to the nature of physics in computers
        //the higher framerate means the higher collision checks
        //if you go really fast it often skips collisions and gets inside of objects
        //we actually want that this time but oh boy you HAD to have 180 hertz huh
        const antiDT = (1/20) / DT
        defineStain(x + particle.xv * antiDT, y + particle.yv * antiDT, w, h, source)
    }
}

function animateParticle(particle, i) {
    switch (particle.ani) {
    case "grow":
        particle.w += 3 * DT
        particle.h += 3 * DT
        break;

    default:
        break;
}
}

function spawnBloodWater(x, y, amount) {
    return
    if(!config.gameplay.gore) return;
    for(let i = 0; i < amount; i++) {
        defineParticle(x, y, 10, 10, random(-5, 5), random(-5, 5), 0, "blood", 0, 100, "", "fade", true)
    }
}

function bloodStab(x, y, amount) {
    if(!config.gameplay.gore) return;
    const dir = player.mirror ? -1 : 1
    for(let i = 0; i < amount; i++) {
        defineParticle(x, y, 10, 10, random(5 * dir, 15 * dir), random(-5, 5), 0, "blood", 1, 100, "", "fade", true)
    }
}

function spawnFluidSplash(x, y, amount, source) {
    if(!config.gameplay.gore) return;
    const dir = player.mirror ? -1 : 1
    for(let i = 0; i < amount; i++) {
    const size = random(3, 10)
        defineParticle(x, y, size, size, random(-10, 10), random(-10, 10), 0, source, 1, 100, "", "", true)
    }
}

function spawnBloodShed() {}

function defineParticle(x, y, w, h, xv, yv, ghost, source, gravity, lifetime, animation, killanimation, stains) {
    particles.push({
        x: x, y: y, w: w, h: h,
        xv: xv, yv: yv, ghost: ghost,
        source: source, gravity: gravity,
        lt: lifetime, time: 0, ani: animation, kani: killanimation,
        stains: stains,
    })
}

function checkParticleCollided(particle) {
    let collided = false
    level.forEach(object => {
        if(!object.ghost) {
            if(AABB(particle.x, particle.y, particle.w, particle.h, object.x, object.y, object.w, object.h)) {
                collided = true
                return
            }
        }

    })
    return collided
}

function smoke(x, y, dir, vel, amount) {
    for(let i = 0; i < amount; i++) {
        defineParticle(x, y, 20, 20, 0, 0, 0, "smoke", -.3)
    }
}

function rocketSmoke(x, y, dir, vel, amount) {
    for(let i = 0; i < amount; i++) {
        const size = random(10, 50)
        defineParticle((x-size/2)+Math.sin(dir)*random(0, 10),
        (y-size/2)+Math.cos(dir)*random(0, 10),
        size, size, Math.sin(dir) * vel + random(-3, 3),
        Math.cos(dir) * vel + random(-3, 3), 0, "smoke1", -.3, 20,
        "grow", "fade", false
    )
        if(random(0, 10) < 5) {
        }
    }
    vel *= 2
    return
    for(let i = 0; i < amount; i++) {
        const size = random(3, 20)
        defineParticle((x-size/2)+Math.sin(dir)*random(0, 10),
        (y-size/2)+Math.cos(dir)*random(0, 10),
        size, size, Math.sin(dir) * vel + random(-3, 3),
        Math.cos(dir) * vel + random(-3, 3), 0, "fire", 0, 5,
        "", "fade",
        )
        if(random(0, 10) < 5) {
        }
    }
}

function spawnRain(amount) {
    for(let i = 0; i < amount; i++) {
        defineParticle(random(-400, 400), random(-400, -220), 5, 20, 0, 10, 0, "rain", 1)
    }
}

function smoothFluids() {
    particles.forEach(particle => {
        level.forEach(object => {
            //this is gonna be shit for performance probably, might need to use a web worker to not create too much overhead
        });
    });
}

function spawnConfetti(x, y, amount) {
    for(let i = 0; i < amount; i++) {
        defineParticle(x, y, 10, 10, random(-5, 5), random(-5, 5), 0, "glitter", 1, 100, "", "", 1)
    }
}