// Define windows at bottom

// MARK: Defines function for moving DIV elements
function dragElement(element) {
    // 1. Init x/y coords
    let pos1 = 0, pos2 = 0, pos3 = 0
    
    // TODO: make mouse drag passing screen boundaries impossible
    // Make the whole element draggable
    if (document.getElementById(element.id + "Header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(element.id + "Header").onmousedown = dragMouseDown;
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
    }

    function closeDragElement() {
        document.onmouseup = null
        document.onmousemove = null
    }
}

// MARK: Resize function

function resizeRight(e) {
    let mousePosition = e.x
    panel.style.width = parseInt(mousePosition - panel.offsetLeft) + "px"
}

let oldX
let oldWidth
function resizeLeft(e) {
    let mousePosition = e.x
    panel.style.left = mousePosition + "px"
    panel.style.width = oldWidth - (mousePosition - oldX) + "px"
    console.log(panel.offsetLeft)
}

function resizeWindowListener(element) {
    // Window drag resize
    const borderSize = 4
    
    // Mousedown listener
    panel.addEventListener("mousedown", function(e) {
        // Define elements x/y dimensions
        const elementWidth = element.offsetWidth
        const elementHeight = element.offsetHeight
        // Define borders by side
        if(e.offsetX > (elementWidth - 4)) {
            document.addEventListener("mousemove", resizeRight, false)

        } else if (e.offsetX < borderSize) {
            oldX = e.x
            oldWidth = element.offsetWidth
            document.addEventListener("mousemove", resizeLeft, false)
            
        } else if (e.offsetY > (elementHeight - 4)) {
            console.log(e.y + " bottom border") 

        } else if (e.offsetY < borderSize ) {
            console.log(e.x + " top border")

        }
    }, false)

    // Mouseup end function
    panel.addEventListener("mouseup", function() {
        document.removeEventListener("mousemove", resizeRight, false)
    }, false)
    panel.addEventListener("mouseup", function() {
        document.removeEventListener("mousemove", resizeLeft, false)
    }, false)
    panel.addEventListener("mouseup", function() {
        document.removeEventListener("mousemove", resizeRight, false)
    }, false)
    panel.addEventListener("mouseup", function() {
        document.removeEventListener("mousemove", resizeRight, false)
    }, false)
}

// Defines panel to modify
const panel = document.getElementById("myDiv")

function dragWindowListener(element) {
    // TODO: Fix selecter cursor
    if (element.offsetX < 4 && element.offsetX > (element.offsetWidth - 4)) {
        element.style.cursor = "ew-resize"
    }

    // If mouse on border run resize, if mouse in header let user 
    // drag window
    element.addEventListener("mousedown", function(e) {
        if (e.offsetX > 5 && e.offsetX < (element.offsetWidth - 5)) {
            dragElement(element)
        } else {
            resizeWindowListener(panel)
        }
    })
}
dragWindowListener(panel)

