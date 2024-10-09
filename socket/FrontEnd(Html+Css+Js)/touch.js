const maxfrequency = 10;//Hz

let frequency = 0;
let amplitude = 0;

function send(){
    console.log("frequency: " + frequency + " amplitude: " + amplitude);
}

window.onload = function() {
    const el = document.getElementById("touchArea");
    const touch = document.getElementById("touch");
    el.addEventListener("touchstart", handleStart);
    el.addEventListener("touchmove", handleMove);
    el.addEventListener("touchend", handleEnd);
    el.addEventListener("touchcancel", handleCancel);

    function handleStart(event) {
        event.preventDefault();
        updateTouchPosition(event.touches[0]);
    }
    
    function handleMove(event) {
        event.preventDefault();
        updateTouchPosition(event.touches[0]);
    }

    function updateTouchPosition(touchEvent) {
        const relativeX = (touchEvent.clientX - el.offsetLeft) / el.offsetWidth;
        const relativeY = (touchEvent.clientY - el.offsetTop) / el.offsetHeight;
        // Clamp values to [0, 1]
        frequency = Math.max(0, Math.min(1, relativeX)) * maxfrequency;
        amplitude = 1-Math.max(0, Math.min(1, relativeY));
        if (touchEvent.clientX < el.offsetLeft || touchEvent.clientX > el.offsetLeft + el.offsetWidth ||
            touchEvent.clientY < el.offsetTop || touchEvent.clientY > el.offsetTop + el.offsetHeight) {
            // Handle touch move outside the "touchArea"
            return;
        }
        // Update the position of the "touch" element relative to the "touchArea"
        touch.style.left = (touchEvent.clientX - el.offsetLeft) + 'px';
        touch.style.top = (touchEvent.clientY - el.offsetTop) + 'px';
    }
    
    function handleEnd(event) {
        event.preventDefault();
        // Handle touch end event
    }
    
    function handleCancel(event) {
        event.preventDefault();
        // Handle touch cancel event
    }
    
    window.setInterval(send, 100);
}