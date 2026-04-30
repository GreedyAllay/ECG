window.multiplayer = {
    socket: null,
    username: "gary",
    address: null
}

let lastPlayerData = null
let players = {

}

multiplayer.connect = async(address) => {
    multiplayer.address = address
    //element("chat").hidden = false
    const {socket, username} = multiplayer
    //const address = "ws://192.168.178.45:6969"
    //const address = "ws://localhost:6969" //change this to your host's ip in case you want to test it with other dievaices
    //multiplayer.address = prompt("enter server address")
    console.log(`connecting to ${multiplayer.address}...`);
    game.multiplayer = true

    //thu bluutoot dievaice is riedi two pel
    multiplayer.socket = await new WebSocket(multiplayer.address)


    //thu blootoot dievaice, has connectidas sooccesfoolley
    multiplayer.socket.onopen = () => {
        closeFullscreenMessage()
        console.log("wow i think have a connection with your mommy")
        game.start({noLevel: true})
        multiplayer.socket.send(JSON.stringify({type: "join", username: username}))
    }

    //powah awf
    multiplayer.socket.onclose = () => {
        console.log("bye little server D:")
        criticalError("server closed", "the host was shutdown")
        //location.reload()
    }

    multiplayer.socket.onmessage = (message) => {
        const rx = JSON.parse(message.data)
        const {type} = rx
        console.log(type)
        switch (type) { //clean ass packet system for first time socketer
            case "update":
                const {players: serverPlayers} = rx
                players = serverPlayers
                break;
            case "chat":
                const {message} = rx
                addChatMessage(message)
                break;
            case "level":
                const {data} = rx
                eval(data + ";defineLevel()")
                break;
            case "msg":
                const {msg} = rx
                (async() => {
                    //alert(`message from remote server:\n${rx.msg}`)
                    criticalError(msg)
                    multiplayer.socket.close()
                    game.multiplayer = false
                })()
                break;
            case "edit":
                const {change, object} = rx
                switch(change) {
                    case "add": 
                    const {x, y, w, h} = object
                    define.object(x, y, w, h)
                    break;
                }
            break;
            default:
                console.log("whats this? " + JSON.stringify(rx))
                break;
        }
    }

}

//WHYT IS THIS SUCH A PEEEEYYNN IN DA ASS
multiplayer.tick = async() => {
    if(!game.multiplayer) {return}

    await wait(50);
    
    const {socket, username} = multiplayer
    const {x, y, xv, yv, mirror, w, h, texture, ox, oy, sneaking} = player

    const tx = { player: 
        {
            x: Math.round(x),
            y: Math.round(y),
            xv: Math.round(xv),
            yv: Math.round(yv),
            ox: ox, oy: oy,
            w: w,
            h: h,
            sneaking: sneaking,
            mirror: mirror,
            texture: texture,
        },
        username: multiplayer.username,
        type: "update"
    }

    if(lastPlayerData != tx) {
        multiplayer.socket.send(JSON.stringify(tx))
        lastPlayerData = tx
    }

}



async function queryServer(address) {
    return new Promise(async (resolve, reject) => {
        try {
            resolve((await fetch("http://" + address.split("ws://")[1] + "/query")).json())
        } catch (err) {}
    })
}

function simulateMultiplayers() {
    //extrapolate and interpolate the positions by locally like kinda simulating it yubtil u get a new packet
}

function addChatMessage(message) {
    console.log("[CHAT] " + message)
}

function sendGlobalChat(message) {
    const tx = {
        type: "chat", message: message
    }
    multiplayer.socket.send(JSON.stringify(tx))
}

addEventListener("keypress", (e) => {
    switch(e.key) {
        case "t":
        sendGlobalChat(`${multiplayer.username}: ${prompt("chat")}`)
        break;
    }
})
