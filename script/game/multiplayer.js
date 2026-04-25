window.multiplayer = {
    socket: null,
    username: "gary",
    address: null
}

let lastPlayerData = null
let players = {

}

multiplayer.connect = async(aaa) => {
    //element("chat").hidden = false
    const {socket, username} = multiplayer
    //const address = "ws://192.168.178.45:6969"
    //const address = "ws://localhost:6969" //change this to your host's ip in case you want to test it with other dievaices
    multiplayer.address = prompt("enter server address")
    console.log(`connecting to ${multiplayer.address}...`);
    game.multiplayer = true

    //thu bluutoot dievaice is riedi two pel
    multiplayer.socket = await new WebSocket(multiplayer.address)


    //thu blootoot dievaice, has connectidas sooccesfoolley
    multiplayer.socket.onopen = () => {
        console.log("wow i think have a connection with your mommy")
        game.start({noLevel: true})
        multiplayer.socket.send(JSON.stringify({type: "join", username: username}))
    }

    //powah awf
    multiplayer.socket.onclose = () => {
        console.log("bye little server D:")
        alert("server closed")
        //location.reload()
    }

    multiplayer.socket.onmessage = (message) => {
        const rx = JSON.parse(message.data)
        const {type} = rx
        console.log(type)
        switch (type) {
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
                (async() => {
                    alert(`message from remote server:\n${rx.msg}`)
                })()
            default:
                break;
        }
    }

}

//WHYT IS THIS SUCH A PEEEEYYNN IN DA ASS
multiplayer.tick = () => {
    if(!game.multiplayer) {return}
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

    if(checkKey("Tab")) {
        renderPlayerList()
    }

}

async function queryServer(address) {

    return new Promise ((resolve, reject) => {
    const websocket = new WebSocket(address)

    let output = ""


    websocket.onopen = async() => {
        websocket.send(JSON.stringify({type: "query"}))
    }

        websocket.onmessage = (message) => {
        const rx = JSON.parse(message.data)
        const {type} = rx
        console.log(rx)

        if(type === "query") {
           resolve(rx)
        } else {
            reject()
            //resolve({name: "unknown server address", motd: "ok"})
        }

        websocket.close()
    }

    websocket.onerror = (error) => {
        reject(error)
    }
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