window.multiplayer = {
    socket: null
}

multiplayer.connect = async(address) => {
    alert(`connecting to ${address}...`);

    //thu bluutoot dievaice is riedi two pel
    multiplayer.socket = await new WebSocket(address)


    //thu blootoot dievaice, has connectidas sooccesfoolley
    multiplayer.socket.onopen = () => {
        alert("wow i think have a connection with your mommy")
    }

    multiplayer.socket.onclose = () => {
        alert("bye little server D:")
    }

    multiplayer.socket.onmessage = (messgae) => {
        alert(messgae.data)
    }

}