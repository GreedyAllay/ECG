const editorobjects = []
function renderEditor() {
    if(game.editor) {
        editorobject.x = 0-camera.x + (mouse.x - display.canvas.width / 2) / camera.z;
        editorobject.y = 0-camera.y + (mouse.y - display.canvas.height / 2) / camera.z;
        const x = editorobject.x
        const y = editorobject.y
        drawObjectWF(x, y, editorobject.width, editorobject.height, "#cf1b1b")

        if(checkKey("ArrowLeft")) {
            editorobject.width -= 10
        }
        if(checkKey("ArrowRight")) {
            editorobject.width += 10
        }
        if(checkKey("ArrowUp")) {
            editorobject.height -= 10
        }
        if(checkKey("ArrowDown")) {
            editorobject.height += 10
        }
    }
}

addEventListener("mousedown", (e) => {
    if(game.editor) {
        editorobjects.push(`define.object(${Math.round(editorobject.x)}, ${Math.round(editorobject.y)}, ${editorobject.width}, ${editorobject.height}, '#742cbb', 0)`)
        define.object(editorobject.x, editorobject.y, editorobject.width, editorobject.height, "#742cbb")
    }
})