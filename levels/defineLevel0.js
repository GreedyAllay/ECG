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

define.object(1000, -300, 3000, 500, "#373737", 1)

define.object(600, 50, 1000, 200, "#5b5b5b")
define.object(800, 0, 1000, 200, "#5b5b5b")


define.object(1000, -600, 300, 500, "#5b5b5b")
define.object(1200, -550, 300, 500, "#5b5b5b")

define.object(-500, 100, 10000, 200, '#61471b', 0)
define.object(-500, 100, 10000, 10, '#267126', 0)

define.object(-600, -400, 300, 1000, '#61471b', 0)


spawn.hydrant(0, 54)

define.text(-200, -50, 30, 'evil cat game', 'Archivo Black', '#ffffff')
define.text(-130, -25, 20, 'by Axolay', 'Archivo', '#e7e7e7')

define.text(-8, 135, 15, 'move', "Archivo Black", "#ffffff")
spawn.key(-15, 150, "a")
spawn.key(15, 150, "d")

define.text(500, 135, 15, 'jump', "Archivo Black", "#ffffff")
spawn.key(510, 150, "w")

define.text(1075, 30, 15, 'sneak', "Archivo Black", "#ffffff")
spawn.key(1050, 40, "s")
define.text(1080, 55, 15, "+", "Archivo", "#ffffff")
spawn.key(1095, 40, "a")
spawn.key(1125, 40, "d")