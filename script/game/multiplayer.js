window.multiplayer = {
    socket: null,
    username: "gary"
}

let lastPlayerData = null
let players = {

}

multiplayer.connect = async(address) => {
    const {socket, username} = multiplayer
    console.log(`connecting to ${address}...`);
    game.multiplayer = true

    //thu bluutoot dievaice is riedi two pel
    multiplayer.socket = await new WebSocket(address)


    //thu blootoot dievaice, has connectidas sooccesfoolley
    multiplayer.socket.onopen = () => {
        console.log("wow i think have a connection with your mommy")
        game.start()
        multiplayer.socket.send(JSON.stringify({type: "join", username: username}))
    }

    multiplayer.socket.onclose = () => {
        console.log("bye little server D:")
        alert("server closed")
        location.reload()
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
            default:
                break;
        }
    }

}

multiplayer.tick = () => {
    if(!game.multiplayer) {return}
    const {socket, username} = multiplayer
    const {x, y, xv, yv, mirror, texture, ox, oy} = player

    const tx = { player: 
        {
            x: Math.round(x + ox),
            y: Math.round(y + oy),
            xv: Math.round(xv),
            yv: Math.round(yv),
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

function simulateMultiplayers() {
    //extrapolate and interpolate the positions by locally like kinda simulating it yubtil u get a new packet
}

function addChatMessage(message) {
    alert(message)
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