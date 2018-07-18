var pictures = document.querySelectorAll('.alex-box');
var i = -1;
var currentGallery = "";
var galleria;
var dirSwipe;
window.addEventListener('keydown', notArrows);
//for enter key (-disable)
function notArrows(event){
    event.preventDefault();
    if((event.charCode == 13) || (event.keyCode == 13)){
        console.log("enter");
    }
}

pictures.forEach(el => {
    el.addEventListener('click',function() {open(this)});
    el.addEventListener('touch',function() {open(this)});
});

function createModal(source,tipo){
    if(tipo == 'video'){
        var vidSrc = document.createElement('source');
        var att1 = document.createAttribute('src');
        att1.value = source;
        var att2 = document.createAttribute('type');
        att2.value = 'video/mp4';
        vidSrc.setAttributeNode(att1);
        vidSrc.setAttributeNode(att2);

        var video = document.createElement('video');
        var controls = document.createAttribute('controls');
        video.setAttributeNode(controls);
        video.classList.add('video');
        video.addEventListener('click', clickedPic);
        video.appendChild(vidSrc);
        swipedetect(video, function(swipedir){
            dirSwipe = swipedir;
            if (swipedir == "left"){
                video.classList.add('swipeLeft');
            }else if(swipedir == "right"){
                video.classList.add('swipeRight');
            }
            setTimeout(keypressed, 400);
        });
    }
    /*else if(tipo == 'youtube'){
        var yt = document.createElement('iframe');
        var url = source.replace("watch?v=", "embed/");
        yt.setAttribute("src", url);
        yt.setAttribute('frameborder', 0);
        yt.style.width = "90%";
        yt.style.height = "80%";
        yt.classList.add('video');
        yt.addEventListener('click', clickedPic);
        swipedetect(yt, function(swipedir){
            dirSwipe = swipedir;
            if (swipedir == "left"){
                video.classList.add('swipeLeft');
            }else if(swipedir == "right"){
                video.classList.add('swipeRight');
            }
            setTimeout(keypressed, 400);
        });
    }*/
    else{
        var pic = document.createElement('img');
        pic.src = source;
        pic.classList.add('foto');
        pic.addEventListener('click', clickedPic);
        swipedetect(pic, function(swipedir){
            dirSwipe = swipedir;
            if (swipedir == "left"){
                pic.classList.add('swipeLeft');
            }else if(swipedir == "right"){
                pic.classList.add('swipeRight');
            }
            setTimeout(keypressed, 400);
        });
    }
    var x = document.createElement('span');
    x.classList.add('x');
    x.addEventListener('click',function() {close()});
    
    var modal = document.createElement('div');
    modal.classList.add('modal');
    modal.addEventListener('click', clicked);
    document.addEventListener("keydown",keypressed);
    modal.addEventListener('keyup', notArrows);
    modal.appendChild(x);
    if(tipo == 'video'){
        modal.appendChild(video);
    }
    /*else if(tipo == 'youtube'){
        modal.appendChild(yt);
    }*/
    else{
        modal.appendChild(pic);
    }
    body = document.querySelector('body');
    body.appendChild(modal);
    body.style.overflow = "hidden";
}
// close on modal click (empty space around image)
function clicked(){
    close();
}
// prevent close click on image
function clickedPic(){
    event.stopPropagation();
}
// opnes image in modal
function open(el){
    if(event){
        event.preventDefault();
    }
    el.classList.add("opened");
    var tipo = el.getAttribute('type');
    currentGallery = el.getAttribute('gallery-alex-box');
    if(tipo){
        createModal(el.getAttribute('href'), tipo);
    }else{
        createModal(el.getAttribute('href'));
    }
    pictures.forEach(function (element, index) {
        if(element === el){
            i = index;
        }
    });
}
// closes modal and deletes element
function close(){
    pictures.forEach(element => {
        if(element.classList.contains('opened')){
            element.classList.remove('opened');
            var modal = document.querySelector('.modal');
            modal.parentNode.removeChild(modal);
            document.removeEventListener("keydown", keypressed);
        }
    });
    dirSwipe = "";
    body.style.overflow = "auto";
}
// keypress handling
function keypressed(event){
    if(event){
        var x = event.charCode || event.keyCode;  // Get the Unicode value
    }
    if ((x == 37) || (x == 40) || (dirSwipe == "left")){   // left arrow or down arrow
        event.preventDefault();
        close();
        open(pictures[previous(i,currentGallery)]);
    }else if ((x == 39) || (x == 38) || (dirSwipe == "right")){ // right arrow or up arrow
        event.preventDefault();
        close();
        open(pictures[next(i,currentGallery)]);
    }else if(x == 27){
        event.preventDefault();
        close();
    }
}

function previous (n,currentGallery){
    var precedente = n <= 0 ? pictures.length-1 : n-1;
    if(pictures[precedente].getAttribute('gallery-alex-box') == currentGallery){
        return precedente;
    }else{
        return previous(precedente,currentGallery);
    }
}
function next (n,currentGallery){
    var prossimo = n >= pictures.length-1 ? 0 : n+1;
    if(pictures[prossimo].getAttribute('gallery-alex-box') == currentGallery){
        return prossimo;
    }else{
        return next(prossimo,currentGallery);
    }
}

//--------------------------------------------------------swipe detection-------------------------------------------------------
function swipedetect(el, callback){
  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}