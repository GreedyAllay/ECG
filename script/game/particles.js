const particles = []

function handleParticles() {
    if(!config.performance.particles) {return}
    //physics and rendering
    let hasChangedContext = false
    for(let i = particles.length-1; i >= 0; i--) {
        const particle = particles[i]
        if(!particle.stalled) {
        particle.x += particle.xv
        particle.y += particle.yv
        }

        if(!particle.dead) {
            display.context.filter = "none";
        } else {
            hasChangedContext = true
            switch (particle.kani) {
                case "fade":
                    display.context.filter = `opacity(${1-particle.kanimationTime/10})`;
                    break;
                default:
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
                animateDeadParticle(particle, i)
                particle.stalled = true
            }
        }
        if(particle.gravity) {
            particle.yv += particle.gravity
        }
        if(particle.lt) {
            if(particle.time >= particle.lt) {
                animateDeadParticle(particle, i)
            }
        }
        particle.time++
    }
}


function animateDeadParticle(particle, i) {
    switch (particle.kani) {
        case "fade":
            if(typeof particle.kanimationTime == "undefined") {
                particle.kanimationTime = 0
                particle.dead = true
            } else {
                particle.kanimationTime++
            }
            if(particle.kanimationTime > 10) {
                particles.splice(i, 1)
            }
            break;
    
        default:
        particles.splice(i, 1)
            break;
    }
}

function animateParticle(particle, i) {
    switch (particle.ani) {
    case "grow":
        particle.w += 3
        particle.h += 3
        break;

    default:
        break;
}
}

function defineParticle(x, y, w, h, xv, yv, ghost, source, gravity, lifetime, animation, killanimation) {
    particles.push({
        x: x, y: y, w: w, h: h,
        xv: xv, yv: yv, ghost: ghost,
        source: source, gravity: gravity,
        lt: lifetime, time: 0, ani: animation, kani: killanimation
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
        "grow", "fade"
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