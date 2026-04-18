const defineLevel = () => {
    const skipIntro = false

    spawn.bush(-200, 70, 2)

    spawn.tree(150, 0, 1)

    spawn.bush(100, 70, 4)

    spawn.flowers(0, 80, 3)

    spawn.flowers(220, 80, 9)

    spawn.gears(0, -100)

    define.gear(0, -100, 100)



    //spawn.bush(500, -30, 1)
    //spawn.bush(450, 0, 1)
    //spawn.bush(400, 30, 1)

    define.object(1000, -300, 900, 800, "#373737", 1)

    //too tired to explain all this man just go dfind it out urself
    define.object(1000, -600, 500, 1000, "#373737", 1)




    //ground
    define.object(-500, 100, 1200, 200, '#61471b', 0)
    define.object(-500, 100, 1200, 10, '#267126', 0)

    define.object(-600, -400, 300, 1000, '#61471b', 0)

    //first jumps
    define.object(600, 50, 1000, 300, "#5b5b5b")

    define.object(1000, -600, 300, 500, "#5b5b5b")

    //annoying ass crawl
    //define.object(1200, -550, 300, 500, "#5b5b5b")


    define.object(800, 0, 800, 500, "#5b5b5b") //part before you have to fly up to the thing

    define.object(1850, -200, 1000, 700, "#5b5b5b") //ledge you have to fly up to






    spawn.hydrant(0, 54)

    define.text(-200, -50, 30, 'evil cat game', 'Archivo Black', '#ffffff')
    define.text(-130, -25, 20, 'by Axolay', 'Archivo', '#e7e7e7')

    define.text(-8, 135, 15, 'move', "Archivo Black", "#ffffff")
    spawn.keyboard(-15, 150, "a")
    spawn.keyboard(15, 150, "d")

    define.text(500, 135, 15, 'jump', "Archivo Black", "#ffffff")
    spawn.keyboard(510, 150, "w")

    define.text(1075, 30, 15, 'sneak', "Archivo Black", "#ffffff")
    spawn.keyboard(1050, 40, "s")
    define.text(1080, 55, 15, "+", "Archivo", "#ffffff")
    spawn.keyboard(1095, 40, "a")
    spawn.keyboard(1125, 40, "d")

    define.text(1700, -100, 15, 'fly', "Archivo Black", "#ffffff")
    spawn.keyboard(1660, -80, "w")

    define.text(1690, -65, 15, "+", "Archivo", "#ffffff")
    spawn.keyboard(1705, -80, "a")
    spawn.keyboard(1735, -80, "d")

    define.text(1690, -35, 15, '(hold)', "Archivo", "#ffffff")


    //define.trigger(0, 0, 100, 100, "alert('sex')", "pulse", "9999")

    define.trigger(1300, -100, 100, 100, `
        player.allowFly = true;
        loadJetCatTextures();
        removeListItem(level, 62);
        pickupSound();
        `, "pulse", 2)
    //define.trigger(386, 2, 100, 100, `killPlayer()`, "pulse", 2)

    define.image(1300, -64, 150, 150, 90, "jetpack", 1)

    player.allowFly = false
    set.water(0)

    if(!skipIntro) {

        camera.follow = false;
        player.animation = "freefall";
        player.canMove = false;
        player.y = -500
        camera.y = 0;
        audio.fall.volume = 0.2
        audio.fall.play();

        (async() => {
            while(1) {
                if(player.onFloor) {
                    audio.impact.volume = .3
                    audio.impact.play()
                    player.animation = "dead"
                    spawnBloodSplash(player.x, player.y+50, 100)
                    spawnBloodPool(player.x, player.y, 5)
                    await wait(2000)
                    player.animation = "standup"
                    await wait(2000)
                    player.animation = "idle"
                    camera.follow = true
                    player.canMove = true
                    return
                }
                await wait(1)
            }
        })()


    }

}

