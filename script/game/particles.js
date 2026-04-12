const particles = []

function handleParticles() {
    //physics and rendering
    let i = 0;
    for(const particle of particles) {
        particle.x += particle.xv
        particle.y += particle.yv
        drawImage(particle.x, particle.y, particle.w, particle.h, particle.source, 0)
        if(!particle.ghost) {
            if(checkParticleCollided(particle)) {
                particles.splice(i, 1)
            }
        }
        if(particle.gravity) {
            particle.yv += particle.gravity
        }
        if(particle.lifetime) {
            if(particle.time >= particle.lifetime) {
                particles.splice(i, 1)
            }
        }        
        particle.time++
    }
}

function defineParticle(x, y, w, h, xv, yv, ghost, source, gravity, lifetime) {
    particles.push({
        x: x, y: y, w: w, h: h,
        xv: xv, yv: yv, ghost: ghost,
        source: source, gravity: gravity,
        lifetime: lifetime, time: 0
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
        defineParticle(x+Math.sin(dir)*random(0, 10), y+Math.cos(dir)*random(0, 10), size, size, Math.sin(dir) * vel + random(-3, 3), Math.cos(dir) * vel + random(-3, 3), 0, "smoke", -.3, 10)
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