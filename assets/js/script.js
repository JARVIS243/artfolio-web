/* ===============================
   IMAGE CONFIG
================================ */

const TOTAL_IMAGES = 40;
const IMAGE_PATH = "assets/images/";


/* ===============================
   GALLERY LOADER
================================ */

const gallery = document.getElementById("gallery");

if (gallery) {

    const isIndexPage =
        location.pathname.endsWith("index.html") ||
        location.pathname === "/" ||
        location.pathname === "";


    const start = 1;
    const end = isIndexPage ? 3 : TOTAL_IMAGES;


    for (let i = start; i <= end; i++) {


        const artCard = document.createElement("div");

        artCard.className = "art-card reveal";


        artCard.innerHTML = `

            <img 
            src="${IMAGE_PATH}img${i}.jpg"
            loading="lazy"
            alt="Artwork ${i}"
            >

            <div class="overlay">
                Artwork ${i}
            </div>

        `;


        artCard.addEventListener(
            "click",
            () => openLightbox(i)
        );


        gallery.appendChild(artCard);


        // reveal animation delay
        setTimeout(() => {

            artCard.classList.add("active");

        }, i * 80);


    }

}



/* ===============================
   LIGHTBOX SYSTEM
================================ */


let currentIndex = 1;


const lightbox = document.createElement("div");

lightbox.id = "lightbox";


lightbox.innerHTML = `

    <span class="close-btn">
        &times;
    </span>

    <span class="nav prev">
        &#10094;
    </span>


    <img src="" alt="Artwork Preview">


    <span class="nav next">
        &#10095;
    </span>

`;



document.body.appendChild(lightbox);



const lightboxImg =
lightbox.querySelector("img");


const closeBtn =
lightbox.querySelector(".close-btn");


const prevBtn =
lightbox.querySelector(".prev");


const nextBtn =
lightbox.querySelector(".next");





function openLightbox(index){

    currentIndex = index;

    updateLightbox();

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}




function updateLightbox(){

    lightboxImg.src =
    `${IMAGE_PATH}img${currentIndex}.jpg`;

}




function closeLightbox(){

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}





closeBtn.addEventListener(
    "click",
    closeLightbox
);



lightboxImg.addEventListener(
    "click",
    e => e.stopPropagation()
);



lightbox.addEventListener(
    "click",
    closeLightbox
);




nextBtn.addEventListener(
"click",
e=>{

    e.stopPropagation();


    currentIndex =
    currentIndex >= TOTAL_IMAGES
    ? 1
    : currentIndex + 1;


    updateLightbox();

});




prevBtn.addEventListener(
"click",
e=>{

    e.stopPropagation();


    currentIndex =
    currentIndex <= 1
    ? TOTAL_IMAGES
    : currentIndex - 1;


    updateLightbox();

});





document.addEventListener(
"keydown",
e=>{


    if(!lightbox.classList.contains("active"))
        return;



    if(e.key==="Escape")
        closeLightbox();



    if(e.key==="ArrowRight")
        nextBtn.click();



    if(e.key==="ArrowLeft")
        prevBtn.click();


});





/* ===============================
   ORDER BUTTONS - WHATSAPP
================================ */


const orderButtons =
document.querySelectorAll(".order-btn");



const phoneNumber =
"917025310192";



orderButtons.forEach(btn=>{


    btn.addEventListener(
    "click",
    ()=>{


        const message =
        encodeURIComponent(
            btn.dataset.msg || ""
        );


        const url =
        `https://wa.me/${phoneNumber}?text=${message}`;


        window.open(
            url,
            "_blank"
        );


    });


});





/* ===============================
   HERO TEXT SYSTEM
================================ */


const heroQuotes = [

{
title:"Where Art Meets Emotion",
sub:"A curated collection of my creative journey"
},


{
title:"Every Portrait Tells a Story",
sub:"Moments captured with soul and detail"
},


{
title:"Art That Feels Personal",
sub:"Because emotions deserve expression"
},


{
title:"Creativity Beyond Canvas",
sub:"Turning imagination into timeless art"
}

];





let heroIndex = 0;



const heroTitle =
document.getElementById("hero-quote");



const heroSub =
document.getElementById("hero-sub");





function typeWriter(
text,
element,
speed=60
){


    if(!element)
        return;



    element.innerHTML="";


    let i=0;



    const timer =
    setInterval(()=>{


        element.innerHTML +=
        text.charAt(i);



        i++;


        if(i>=text.length)
            clearInterval(timer);



    },speed);


}





function revealWords(
text,
element
){


    if(!element)
        return;



    element.innerHTML="";



    text.split(" ")
    .forEach((word,i)=>{


        const span =
        document.createElement("span");



        span.textContent =
        word+" ";



        span.className =
        "word";



        span.style.animationDelay =
        `${i*0.08}s`;



        element.appendChild(span);



    });


}





function changeHeroText(){


    if(!heroTitle || !heroSub)
        return;



    heroTitle.style.opacity=0;

    heroSub.style.opacity=0;



    setTimeout(()=>{


        const current =
        heroQuotes[heroIndex];



        typeWriter(
            current.title,
            heroTitle
        );



        revealWords(
            current.sub,
            heroSub
        );



        heroTitle.style.opacity=1;

        heroSub.style.opacity=1;



        heroIndex =
        (heroIndex+1)
        %
        heroQuotes.length;



    },600);


}





changeHeroText();



setInterval(
changeHeroText,
5000
);





/* ===============================
   SCROLL REVEAL
================================ */


const observer =
new IntersectionObserver(
entries=>{


entries.forEach(entry=>{


    if(entry.isIntersecting){


        entry.target.classList.add(
            "active"
        );


    }


});


},
{
threshold:.15
}
);




document
.querySelectorAll(".reveal")
.forEach(el=>{


    observer.observe(el);


});





/* ===============================
   ART CARD 3D HOVER
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



const rotateY =
(x-rect.width/2)/20;



const rotateX =
-(y-rect.height/2)/20;



card.style.transform =
`
perspective(600px)
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
