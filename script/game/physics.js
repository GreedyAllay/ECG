function handlePhysics() {
    const collisionRes = 10
    player.againstWall = checkPlayerCollided((player.mirror ? -1 : 1), 0)
    for(let i = 0; i < collisionRes; i++) {
        if(checkPlayerCollided()) {
            player.x += 0-player.xv/collisionRes
            player.xv = 0
            player.againstWall = true
            break
        } else {
            player.x += player.xv/collisionRes
        }
    }
    player.onFloor = checkPlayerCollided(0, 1)
    player.againstCeiling = false
    let yCol = false
    for(let i = 0; i < collisionRes; i++) {
        yCol = checkPlayerCollided()
        if(yCol) {
            player.y += 0-player.yv/collisionRes
            player.yv = 0
            if(checkPlayerCollided(0, 1)) {
                player.onFloor = true
                player.againstCeiling = true
            }
            break
        } else {
            player.y += player.yv/collisionRes
        }
    }
    if(yCol) {
        player.yv = 0
    } else {
        player.yv += 1
    }
    if(player.onFloor) {
        player.xv /= 1.5

    } else {
        player.xv /= 1.5 //can be changed to 1.3 or 1.1 but would be annoying

    }

}

//AABB
function checkPlayerCollided(ox, oy) {
    ox = ox ?? 0; oy = oy ?? 0
    ox += player.hbx; oy += player.hby
    let collided = false
    level.forEach(object => {
        if(!object.ghost) {
            if(AABB(player.x+ox, player.y+oy, player.w, player.h, object.x, object.y, object.w, object.h)) {
                collided = true
                return
            }
        }

    })
    return collided
}

function resetPlayerHitbox() { 
    const memory = {
        x: player.x, y: player.y,
        w: player.w, h: player.h,
    }
    player.w = 15;
    player.h = 70;
    player.ox = -40
    player.oy = -20
    player.hbx = 0
    player.hby = 0
    let i = 1;
    while(checkPlayerCollided(0, i)) {
        i--
    } 
    player.y = player.y ?? 0
    player.y += i
}

function setHitboxCrouching (mirror) {
    player.w = 50
    player.h = 40
    player.oy = -50
    player.yv = 100
    if(mirror) {
        player.hbx = -30
    } else {
        player.hbx = 0
    }
    let i = 1;
    return
    if(checkPlayerCollided(1, 1)) {
        while(checkPlayerCollided(i, 1)) {
            i++
        }
        player.x += i
    }
    i = 1;
    if(checkPlayerCollided(-1, 1)) {
        while(checkPlayerCollided(i, 1)) {
            i--
        }
        player.x += i
    }
}

function AABB(x1, y1, w1, h1, x2, y2, w2, h2) {
    //its so smoll yet so incredibly powerful and painful to do holy crap this took forever i stole it from my c++ game
    if (x1 < w2 + x2 &&
        y1 < y2 + h2 &&
        w1 + x1 > x2 &&
        y1 + h1 > y2
        ) return true;

    return false;
}