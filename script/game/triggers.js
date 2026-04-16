function checkTriggers() {
    level.forEach(trigger => {
        if(trigger.type == 3) {
            if(AABB(player.x, player.y, player.w, player.h, trigger.x, trigger.y, trigger.w, trigger.h)) {
                if(!trigger.uses) trigger.uses = 1;
                
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
        }
    });
}