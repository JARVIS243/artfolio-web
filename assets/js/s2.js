/* ===============================
   SCROLL REVEAL
================================ */

const reveals = document.querySelectorAll(".reveal");


const revealObserver = new IntersectionObserver(
(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},
{
    threshold:0.15
});


reveals.forEach(el=>{
    revealObserver.observe(el);
});





/* ===============================
   MOBILE REVEAL
================================ */

const mobileReveal =
document.querySelectorAll(".mobile-reveal");


const mobileObserver =
new IntersectionObserver(

entries=>{

entries.forEach(entry=>{


    if(entry.isIntersecting){

        entry.target.classList.add("active");

    }


});

},
{
threshold:.15
}

);



mobileReveal.forEach(el=>{
    mobileObserver.observe(el);
});





/* ===============================
   SCROLL PROGRESS
================================ */


const progressBar =
document.getElementById("scroll-progress");



window.addEventListener(
"scroll",
()=>{


if(!progressBar) return;



const scrollTop =
document.documentElement.scrollTop;



const scrollHeight =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;



const progress =
(scrollTop / scrollHeight) * 100;



progressBar.style.width =
progress + "%";


});





/* ===============================
   BACK TO TOP
================================ */


const backBtn =
document.getElementById("backToTop");



if(backBtn){


window.addEventListener(
"scroll",
()=>{


backBtn.classList.toggle(
"show",
window.scrollY > 400
);


});



backBtn.addEventListener(
"click",
()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


});


}







/* ===============================
   ART CARD 3D EFFECT
================================ */


document
.querySelectorAll(".art-card")
.forEach(card=>{


card.addEventListener(
"mousemove",
e=>{


const rect =
card.getBoundingClientRect();



const x =
e.clientX - rect.left;



const y =
e.clientY - rect.top;



const rotateX =
((y / rect.height)-0.5) * -10;



const rotateY =
((x / rect.width)-0.5) * 10;



card.style.transform =
`
perspective(700px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
`;



});




card.addEventListener(
"mouseleave",
()=>{


card.style.transform =
"";


});



});







/* ===============================
   MOBILE LIGHTBOX SWIPE
================================ */


let touchStartX = 0;



const lightbox =
document.getElementById("lightbox");



const lightboxImg =
lightbox?.querySelector("img");



if(lightbox && lightboxImg){



lightbox.addEventListener(
"touchstart",
e=>{


touchStartX =
e.touches[0].clientX;


});





lightbox.addEventListener(
"touchend",
e=>{


const touchEndX =
e.changedTouches[0].clientX;



if(Math.abs(touchEndX-touchStartX)<50)
return;



let index =
window.currentIndex || 1;



if(touchEndX < touchStartX)
index++;


else
index--;



if(index<1)
index=TOTAL_IMAGES;



if(index>TOTAL_IMAGES)
index=1;



window.currentIndex=index;



lightboxImg.src =
`${IMAGE_PATH}img${index}.jpg`;



});


}







/* ===============================
   CINEMATIC INTRO SESSION
================================ */


const intro =
document.getElementById("intro");



if(intro){


if(
sessionStorage.getItem("introPlayed")
){


intro.remove();


}

else{


sessionStorage.setItem(
"introPlayed",
"true"
);


}

}







/* ===============================
   PAGE TRANSITION
================================ */


const transition =
document.getElementById(
"page-transition"
);



if(transition){


document
.querySelectorAll("a")
.forEach(link=>{


link.addEventListener(
"click",
e=>{


if(
link.target === "_blank" ||
link.href.includes("#")
)
return;



e.preventDefault();



transition.classList.add(
"active"
);



setTimeout(
()=>{

window.location.href =
link.href;

},
500
);



});


});


}
