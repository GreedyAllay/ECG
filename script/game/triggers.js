function checkTriggers() {
    level.forEach(trigger => {
        if(trigger.type == 3) {
            if(AABB(player.x, player.y, player.w, player.h, trigger.x, trigger.y, trigger.w, trigger.h)) {
                if(!trigger.uses) trigger.uses = 1;

                if(!(trigger.trtype == "pulse" && trigger.active) || trigger.trtype == "repeat") {
                    trigger.active = true
                    if(game.drawTriggers) {
                        audio.trigger.play()
                    }
                    if(trigger.uses < trigger.maxUses) {
                        console.log("triggered")
                        trigger.uses++

                        eval(trigger.action)
                        if(trigger.uses) {
                        } else {
                            trigger.uses = 1    
                        }                    
                    } else {
                        console.log("too many uses")
                    }
                }



            } else {
                trigger.active = false
                if(game.drawTriggers) {
                    audio.trigger.pause()
                    audio.trigger.currentTime = 0
                }
            }
        }
    });
}