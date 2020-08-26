dragElement(document.getElementById("myDiv"))


// MARK: Defines function for moving DIV elements
function dragElement(element) {
    // 1. Init x/y coords
    let pos1 = 0, pos2 = 0, pos3 = 0
    
    // Make the whole element draggable
    if (document.getElementById(element.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(element.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event
        e.preventDefault()
        // Get mouse position on click
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        // Call drag function whenever mouse moves
        document.onmousemove = elementDrag
    }

    function elementDrag(e) {
        e = e || window.event
        e.preventDefault()
        // Calculate new cursor position
        pos1 = pos3 - e.clientX 
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        // Set the element's new positon
        element.style.top = (element.offsetTop - pos2) + "px"
        element.style.left = (element.offsetLeft - pos1) + "px"
        console.log(pos1, pos2)
    }

    function closeDragElement() {
        document.onmouseup = null
        document.onmousemove = null
    }
}