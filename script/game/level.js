function loadLevel(id) {
    level = []
    if(typeof id == "undefined") {
        //fallback level
        define.object(0, 300, 1000, 200, '#000000', 0)
        throw (`id is empty`)
        //text to say it errored
    } else {
        const url = `../levels/defineLevel${id}.js`
        fetch(url)
            .then(r => r.text())
            .then(d => {
                console.log(`loaded level:\n\n${d}`)
                eval(d)
            })
            .catch(error => {
                throw `error loading level from ${url}: ${error.message}`
                define.object(0, 300, 1000, 200, '#000000', 0)
            });
        }

    }