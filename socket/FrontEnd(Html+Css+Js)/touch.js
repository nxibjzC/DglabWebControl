const maxfrequency = 10;//Hz

let rawfrequency = 0;
let amplitude = 0;

let nextduration = 0;

function shock(){
    amplitudedg = amplitude * 100;
    frequencydg = 10 + rawfrequency * 230;
    str = Math.floor(frequencydg).toString(16).padStart(2,'0').repeat(4) + Math.floor(amplitudedg).toString(16).padStart(2,'0').repeat(4);
    str = str.toUpperCase();
    const time = 0.1;
    const msg1 = `A:["${str}"]`;
    const msg2 = `B:["${str}"]`;
    const dataA = { type: "clientMsg", message: msg1, time: time, channel: "A" }
    const dataB = { type: "clientMsg", message: msg2, time: time, channel: "B" }
    sendWsMsg(dataA)
    sendWsMsg(dataB)
}

function send(){
    // console.log("frequency: " + frequency + " amplitude: " + amplitude);
    shock();
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
        rawfrequency = 1-Math.max(0, Math.min(1, relativeX));
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