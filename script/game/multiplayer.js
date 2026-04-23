const multiplayer = {
    address = "",
}

multiplayer.start = (address) => {
    alert(address)
}

multiplayer.onConnect = () => {
    game.start()
}

