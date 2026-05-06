const defineLevel = () => {
    const gridSize = 18
    for(let i = 0; i < 100; i++) {
        define.object(i*gridSize, 100, gridSize, gridSize)
        define.image(i*gridSize, 100, gridSize, gridSize, 90, "grass")
        define.image(i*gridSize, 100 + gridSize, gridSize, gridSize, 90, "grass")
    }

    players.allowFly = true

}