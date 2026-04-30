const audio = window.parent.audio
const buttons = document.querySelectorAll('.customOption')
buttons.forEach((element, i) => {
    element.addEventListener('pointerdown', () => {
        audio.click0.play()
        audio.click1.pause()
        audio.click1.currentTime = 0
    })
    element.addEventListener('pointerup', () => {
        audio.click0.pause()
        audio.click1.play()
        audio.click0.currentTime = 0
    })
    element.addEventListener('click', () => {
        buttonClick(i, element)
    })
});

element("levels").addEventListener("click", () => {
    
})

let serverList = []

loadServerList()

loadServers()

function loadServerList() {
    const data = localStorage.getItem("servers")
    serverList = data ? JSON.parse(data) : []
}

function saveServerList() {
    localStorage.setItem("servers", JSON.stringify(serverList))
}

function syncServerList() {
    serverList = localStorage.getItem("servers")
    if(!serverList) {
        serverList = []
    }
}

function addCustomServer(address) {
    serverList.push(address)
    saveServerList()
    addServer(address)
}

function loadServers() {
    addServer("wss://evilserver.cattiesworld.nl/", 1) //yeyy secure server shit so it works in fucking netlify so nice
    const hr = document.createElement("hr")
    serverList.forEach(s => {
        addServer(s)
    })
}


//addCustomServer()

//addServer("ws://localhost:6969")
//addServer("ws://192.168.178.195:6969")

//saveServerList()


const servers = document.querySelectorAll('.serverItem')
servers.forEach((element, i) => {
    element.addEventListener('pointerdown', () => {
        audio.click0.play()
        audio.click1.pause()
        audio.click1.currentTime = 0
    })
    element.addEventListener('pointerup', () => {
        audio.click0.pause()
        audio.click1.play()
        audio.click0.currentTime = 0
    })
});

//oh my fucking god its like so late i can barely see well
//why the hell am i doing this i really wanna finish it but damn my eyes hurt

function addServer(address, official) {
    const server  = document.createElement("div")
    const serverName = document.createElement("p")
    const serverDesc = document.createElement("p")
    const serverAddress = document.createElement("p")
    const status = document.createElement("div")
    const count = document.createElement("p")
    if(official) {
        const badge = document.createElement("div")
        badge.textContent = "official"
        badge.className = "badge"
        server.appendChild(badge)
    }
    server.className = "serverItem"
    serverName.className = "serverName"
    serverDesc.className = "serverDesc"
    serverAddress.className = "serverAddress"
    status.className = "serverStatus"
    count.textContent = `-/-`
    count.className = `serverCount`

    serverName.textContent = "evil cat server"
    serverDesc.textContent = address
    serverAddress.textContent = address

    status.setAttribute("online", "false")
    status.title = "offline"

    server.appendChild(serverName)
    server.appendChild(serverDesc)
    server.appendChild(count)
    //server.appendChild(serverAddress)
    server.appendChild(status)

    server.addEventListener("click",async(e) => {
        if(!server.hasAttribute("selected")) {
            document.querySelectorAll('.serverItem').forEach(el => {
                el.removeAttribute("selected")
            })
            document.querySelectorAll('.serverDesc').forEach(el => {
                el.removeAttribute("selected")
            }) 
            server.setAttribute("selected", "")
            serverDesc.setAttribute("selected", "")

            addServerProperties(server, address, official, checkAvailability)    
        }

    })

    async function checkAvailability() {
        status.setAttribute("online", "false")
        serverName.textContent = "pinging..."
        status.title = "pinging..."
        serverDesc.textContent = address
        let hasFound = false;
        (async() => {
            await wait(4000)
            if(!hasFound) {
                serverName.textContent = "server offline"
                serverDesc.textContent = "unknown host"
                status.title = "offline"
                status.setAttribute("online", "offline")
            }
        })()
        const data = await parent.queryServer(address)
        hasFound = true

        serverName.textContent = data.name
        serverDesc.textContent = data.motd
        count.textContent = `${data.count}/${data.max}`
        status.setAttribute("online", "true")
        status.title = "online!"
    }

    checkAvailability()
    

    element("levels").appendChild(server)
}

async function buttonClick(id, el) {
    switch (id) {
        case 0:
            window.location.href = "../start"
            break;
        case 1:
            const ip = prompt("enter server address (often looks like: ws://<ip>:6969)")
                addCustomServer(ip)
            break;
        case 2:
            //direct connection stuff
            let username = "gary"
            let name = prompt("enter a username")
            if(name) {
                username = name
            }
            parent.multiplayer.username = username
            await parent.multiplayer.connect(prompt("server address") ?? "ws://localhost:6969")
            break;
        default:
            break;
    }
}

function removeServerProps() {
    const oldprops = document.querySelectorAll("#serverOptions")
    oldprops.forEach(el => {
        el.remove()
    })

}

function addServerProperties(serverItem, address, official, checkAvailability) {
    removeServerProps()
    const options = [
        "join",
        "edit",
        "delete",
        "reload"
    ]

    const properties = document.createElement("div")
    properties.id = "serverOptions"
    for(let i = 0; i < options.length; i++) {
        if(!(official && (i === 2) || (i === 1))) {
            const property = document.createElement("div")
            property.className = "serverOption"
            property.textContent = options[i]
            properties.appendChild(property)
            property.addEventListener('click', (e) => {
                switch(property.textContent) {
                    case "join":
                        audio.coolclick.play()
                        parent.multiplayer.username = prompt("enter a username (or leave empty)") || "gary"
                        parent.fullScreenMessage("connecting", `connecting to ${address}...`)
                        parent.multiplayer.connect(address)
                    break;
                    case "edit":

                    break;

                    case "reload":
                        checkAvailability()
                    break;

                    case "delete":
                    serverItem.remove()
                    serverList.forEach((item, i) => {
                        serverList.splice(i, 1)
                    })
                    saveServerList()
                }
                
            })                    
            }

    }
    serverItem.appendChild(properties)
}

if(!parent.config.performance.background) {
    document.querySelector("#background").id = "noBg"
}

addEventListener("keydown", (e) => {
    if(e.key === "Escape") {
        window.location.href = "../start"
    }
})