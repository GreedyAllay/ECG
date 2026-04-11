function loadLevel(id) {
    level = []
    if(typeof id == "undefined") {
        //fallback level
        defineObject(0, 300, 1000, 200, '#000000', 0)
        console.error(`id is empty`)
        //text to say it errored
    } else {
        const url = `../levels/defineLevel${id}.js`
        defineObject(0, 300, 1000, 200, '#000000', 0)
        return
        fetch(url)
            .then(r => r.text())
            .then(d => {
                console.log(d)
                eval(d)
            })
            .catch(error => {
                console.error(`error loading level from ${url}: ${error.message}`)
                defineObject(0, 300, 1000, 200, '#000000', 0)
            });
        }
    }