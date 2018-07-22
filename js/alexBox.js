var pictures = document.querySelectorAll('.alex-box');
var count = -1;
var i = -1;
var currentGallery = "";
var currentState = "block";
var galleria;
var dirSwipe;
window.addEventListener('keydown', notArrows);
//for enter key (-disable)
function notArrows(event){
    event.preventDefault();
    /*if((event.charCode == 13) || (event.keyCode == 13)){
        console.log("enter");
    }*/
}

pictures.forEach(el => {
    el.addEventListener('click',function() {open(this)});
    el.addEventListener('touch',function() {open(this)});
});

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
            //console.log("i settato a " + i);
        }
    });
}

//counter
function conta(gallery){
    var count = 0;
    var j;
    pictures.forEach((element,index) => {
        if(element.getAttribute('gallery-alex-box') == gallery){
            count++;
        }
        if(element.classList.contains('opened')){
            j = count;
        }
    });
    var res = j + '/' + count;
    return res;
}

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
        video.classList.add('video', 'enterEffect');
        video.addEventListener('click', clickedPic);
        video.addEventListener('click', toggleArrows);
        video.appendChild(vidSrc);
        swipedetect(video, function(swipedir){
            dirSwipe = swipedir;
            if (swipedir == "left"){
                video.classList.remove('enterEffect');
                video.classList.add('swipeLeft');
            }else if(swipedir == "right"){
                video.classList.remove('enterEffect');
                video.classList.add('swipeRight');
            }
            setTimeout(keypressed, 200);
            if(swipedir == "up"){
                video.classList.remove('enterEffect');
                video.classList.add('swipeUp');
                setTimeout(close, 350);
            }else if(swipedir == "down"){
                video.classList.remove('enterEffect');
                video.classList.add('swipeDown');
                setTimeout(close, 350);
            }else if(swipedir == "none"){
                toggleArrows();
            }
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
            setTimeout(keypressed, 200);
        });
    }*/
    else{
        var pic = document.createElement('img');
        pic.src = source;
        pic.classList.add('foto', 'enterEffect');
        pic.addEventListener('click', clickedPic);
        pic.addEventListener('click', toggleArrows);
        swipedetect(pic, function(swipedir){
            dirSwipe = swipedir;
            if (swipedir == "left"){
                pic.classList.remove('enterEffect');
                pic.classList.add('swipeLeft');
            }else if(swipedir == "right"){
                pic.classList.remove('enterEffect');
                pic.classList.add('swipeRight');
            }
            setTimeout(keypressed, 200);
            if(swipedir == "up"){
                pic.classList.remove('enterEffect');
                pic.classList.add('swipeUp');
                setTimeout(close, 350);
            }else if(swipedir == "down"){
                pic.classList.remove('enterEffect');
                pic.classList.add('swipeDown');
                setTimeout(close, 350);
            }else if(swipedir == "none"){
                toggleArrows();
            }
        });
    }
    var x = document.createElement('div');
    x.classList.add('x');
    x.style.display = currentState;
    x.addEventListener('click',function() {close()});

    var larrow = document.createElement('div');
    larrow.classList.add('lBtn');
    larrow.style.display = currentState;
    larrow.addEventListener('click',function() {arrow(this)});

    var rarrow = document.createElement('div');
    rarrow.classList.add('rBtn');
    rarrow.style.display = currentState;
    rarrow.addEventListener('click',function() {arrow(this)});

    var contatore = document.createElement('div');
    contatore.classList.add('counter');
    contatore.innerHTML =  conta(currentGallery);
    contatore.style.display = currentState;
    
    var modal = document.createElement('div');
    modal.classList.add('modal');
    modal.addEventListener('click', clicked);
    document.addEventListener("keydown",keypressed);
    modal.appendChild(x);
    modal.appendChild(larrow);
    modal.appendChild(rarrow);
    modal.appendChild(contatore);
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
// toggle arrows show
function toggleArrows(){
    var arrows = document.querySelectorAll('.lBtn, .rBtn, .x, .counter');
    if (currentState == "block"){
        arrows[0].style.display = "none";
        arrows[1].style.display = "none";
        arrows[2].style.display = "none";
        arrows[3].style.display = "none";
        currentState = "none";
    }else{
        arrows[0].style.display = "block";
        arrows[1].style.display = "block";
        arrows[2].style.display = "block";
        arrows[3].style.display = "block";
        currentState = "block";
    }
}
// prevent close click on image
function clickedPic(){
    event.stopPropagation();
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
        if (event){
            event.preventDefault();
        }
        close();
        open(pictures[previous(i,currentGallery)]);
    }else if ((x == 39) || (x == 38) || (dirSwipe == "right")){ // right arrow or up arrow
        if (event){
            event.preventDefault();
        }
        close();
        open(pictures[next(i,currentGallery)]);
    }else if(x == 27){ // esc button
        if (event){
            event.preventDefault();
        }
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

// arrows click
function arrow(el){
    event.stopPropagation();
    close();
    if (el.classList.contains('lBtn')){
        open(pictures[previous(i,currentGallery)]);
    }else{
        open(pictures[next(i,currentGallery)]);
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
    threshold = 5, //required min distance traveled to be considered swipe
    restraint = 50, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 600, // maximum time allowed to travel that distance
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