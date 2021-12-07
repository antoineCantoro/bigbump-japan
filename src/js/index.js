import gsap from "gsap"
import ScrollTrigger from 'gsap/ScrollTrigger'
import imagesLoaded from "imagesloaded"
gsap.registerPlugin(ScrollTrigger);

// Reveal Overlay
let revealPage = function(){
    let tl = gsap.timeline();
        tl.to(".screen-overlay .overlay", {
            width: 0, duration: 1, ease: "power4.inOut"})
          .fromTo('.top-banner', {width: 0}, {width: "100%", duration:1, ease: "power3.out"}, "-=0.5")
          .from('h1', {y: 50, opacity:0, duration:1, rotation:10, transformOrigin:"left 0%", ease: "power4.out"}, "-=0.5")
          .from('.japanese-kanji img', {x:-20, opacity:0, duration:1, ease:"power2.out", stagger: .2}, "-=0.5")
          .from('.circle', {scale:0, duration: .5, stagger:0.2, ease:"power3.inOut"}, "-=1")
          .set(".screen-overlay", {display: "none", onComplete: function(){
            revealImages();
            appearSheetItems();
            updateCirclePosition();
          }})
}

// Reveal Images Animation when on screen
let revealImages = function(){
    let imagesItems = document.querySelectorAll(".hero picture")
    gsap.utils.toArray(imagesItems).forEach((item) => {

        let overlay = item.querySelector('.overlay');
        let image = item.querySelector('img');
        
        gsap.to(overlay, {
            width: 0,
            duration: 1,
            ease: "power4.out",
            delay:1,
            scrollTrigger: {
                trigger: item,
                start: "top bottom-=100px",
            }
        });
        gsap.from(image, {
            opacity: 0,
            scale: 1.2,
            duration: 1,
            delay: 0.5,

            ease: "power4.out",
            scrollTrigger: {
                trigger: item,
                start: "top bottom-=100px",
            }
        });
    });
}


// Reveal Item Animation when on screen
let appearSheetItems = function(){
    let sheetItems = document.querySelectorAll(".sheet-container li")
    gsap.utils.toArray(sheetItems).forEach((item) => {
        gsap.from(item, {
            y: -20,
            opacity:0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
                trigger: item,
                start: "top bottom-=100px",
            }
        });
    });
}


let appearText = function(classname) {
    gsap.utils.toArray(classname).forEach((item) => {
        gsap.from(item, {
            x: -20,
            opacity:0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
                trigger: item,
                start: "top bottom-=200px",
            }
        });
    });
}


let clientX = 0;
let clientY = 0;

function updateCirclePosition(){
    const circles = document.querySelectorAll('.circle')
    circles.forEach(function(item){
        console.log(item)
        item.style.transform = "translate(" + -clientX / 100 + "px," + -clientY / 100 + "px)";
    })

    requestAnimationFrame(updateCirclePosition)
}



// Wait Document Ready
document.addEventListener("DOMContentLoaded", function() {

    const cursor = document.querySelector('.custom-cursor');

    // When images are loaded
    imagesLoaded( document.querySelector('.hero'), function() {
        revealPage();
        appearText('.appear-left');

        window.addEventListener("mousemove", (e)=> {
            clientX = e.clientX
            clientY = e.clientY
        })
    });
   
});