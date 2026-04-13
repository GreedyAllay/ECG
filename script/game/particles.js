const particles = []

function handleParticles() {
    //physics and rendering
    let hasChangedContext = false
    for(let i = particles.length-1; i >= 0; i--) {
        const particle = particles[i]
        particle.x += particle.xv
        particle.y += particle.yv
        if(!particle.dead) {
            display.context.filter = "none";
        } else {
            hasChangedContext = true
            switch (particle.ani) {
                case "fade":
                    display.context.filter = `opacity(${1-particle.animationTime/10})`;
                    break;
            
                default:
                    break;
            }
            
        }

        drawImage(particle.x, particle.y, particle.w, particle.h, particle.source, 0)

        if(!particle.ghost) {
            if(checkParticleCollided(particle)) {
                if(particles.ani) {
                    if(particles) {

                    }
                } else {
                }
                particles.splice(i, 1)
            }
        }
        if(particle.gravity) {
            particle.yv += particle.gravity
        }
        if(particle.lt) {
            if(particle.time >= particle.lt) {
                    switch (particle.ani) {
                        case "fade":
                            if(typeof particle.animationTime == "undefined") {
                                particle.animationTime = 0
                                particle.dead = true
                            } else {
                                particle.animationTime++
                            }
                            display.context.style
                            if(particle.animationTime > 10) {
                                particles.splice(i, 1)
                            }
                            break;
                    
                        default:
                        particles.splice(i, 1)
                            break;
                    }
            }
        }
        particle.time++
    }
    if(hasChangedContext) {
        display.context.filter = "none";
    }
    
}

function animateDeadParticle(animation, time) {
}

function defineParticle(x, y, w, h, xv, yv, ghost, source, gravity, lifetime, animation) {
    particles.push({
        x: x, y: y, w: w, h: h,
        xv: xv, yv: yv, ghost: ghost,
        source: source, gravity: gravity,
        lt: lifetime, time: 0, ani: animation
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
        const size = random(10, 30)
        defineParticle(x+Math.sin(dir)*random(0, 10),
        y+Math.cos(dir)*random(0, 10),
        size, size, Math.sin(dir) * vel + random(-3, 3),
        Math.cos(dir) * vel + random(-3, 3), 0, "smoke", -.3, 20,
        "fade"
    )
        if(random(0, 10) < 5) {
            //defineParticle(x, y, 5, 20, Math.sin(dir) * vel + random(-3, 3), Math.cos(dir) * vel + random(-3, 3), 0, "firespark", -.3, 4)
        }
    }
}

function spawnRain(amount) {
    for(let i = 0; i < amount; i++) {
        defineParticle(random(-400, 400), random(-400, -220), 5, 20, 0, 10, 0, "rain", 1)
    }
}