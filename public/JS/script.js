// Smooth scrolling

const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
});



// Animation follow the mouse 

var timeoutId; // Declare the timeoutId variable outside the functions

function makeMouseShrink() {
    var xScale = 1;
    var yScale = 1;
    var xPrev = 0;
    var yPrev = 0;
    var minObj = document.querySelector('.minObj');

    window.addEventListener("mousemove", function (detail) {
        xScale = gsap.utils.clamp(0.8, 1.2, detail.clientX - xPrev);
        yScale = gsap.utils.clamp(0.8, 1.2, detail.clientY - yPrev);

        xPrev = detail.clientX;
        yPrev = detail.clientY;

        minObj.style.transform = `translate(${detail.clientX}px, ${detail.clientY}px) scale(${xScale}, ${yScale})`;

        clearTimeout(timeoutId); // Clear the previous timeout
        timeoutId = setTimeout(function () {
            minObj.style.transform = `translate(${detail.clientX}px, ${detail.clientY}px) scale(1)`;
        }, 100); // Reset the object after 100ms of no movement
    });
}

makeMouseShrink();


// Animation on load

function firstPageAnimation() {
    var tl = gsap.timeline();

    tl.from("#navbar", {
        y: "-10",
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to('.activeDown', {
            y: "0",
            duration: 1.5,
            ease: Expo.easeInOut,
            delay: -1,
            stagger: .2
        })
        .from('.downBtn', {
            y: "-10",
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut
        })
}

firstPageAnimation();



// Animtion on load image while hovering the box div
document.querySelectorAll('.big-head').forEach(function (element) {
    var rotate = 0
    var differentRotate = 0;
    element.addEventListener('mousemove', function (details) {

        var difference = details.clientY - element.getBoundingClientRect().top;
        differentRotate = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(element.querySelector('img'), {
            opacity: 1,
            ease: Power3,
            top: difference,
            left: details.clientX,
            rotate: gsap.utils.clamp(-15, 15, differentRotate)
        })
    })
});

document.querySelectorAll('.big-head').forEach(function (element) {
    element.addEventListener('mouseleave', function (details) {
        gsap.to(element.querySelector('img'), {
            opacity: 0,
            ease: Power3,
        })
    })
});

// Function to update the time display
function updateTime() {
    const now = new Date();
    const timeDisplay = document.getElementById("timeDisplay");

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const formattedTime = `${hours}:${padZero(minutes)}:${padZero(seconds)}`;
    timeDisplay.textContent = formattedTime;
}

// Function to pad single digits with a leading zero
function padZero(num) {
    return (num < 10 ? "0" : "") + num;
}

// Update the time every second
setInterval(updateTime, 1000);

// Initial call to populate time on page load
updateTime();


//Creating responsive navbar
let openBtn = document.querySelector('#openBtn');
let closeBtn = document.querySelector('#closeBtn');
let menu = document.querySelector('.menu');

openBtn.addEventListener('click', () => {
    closeBtn.style.display = 'block';
    openBtn.style.display = 'none';
    menu.classList.remove('menu-dragDown');
})

closeBtn.addEventListener('click', () => {
    openBtn.style.display = 'block';
    closeBtn.style.display = 'none';
    menu.classList.add('menu-dragDown');
})


// Get the <ul> element by its ID
let menuList = document.getElementById('menu-list');
let menuLinks = menuList.querySelectorAll('a');

// Add a click event listener to each <a> tag using forEach
menuLinks.forEach(link => {
    link.addEventListener('click', event => {
        menu.classList.add('menu-dragDown');
    });
});
