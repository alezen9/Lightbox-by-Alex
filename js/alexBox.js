var pictures = document.querySelectorAll('.alex-box');
var i = -1;
var currentGallery = "";
var galleria;

pictures.forEach(el => {
    el.addEventListener('click',function() {open(this)});
});

function createModal(source,tipo){
    if(tipo != 'video'){
        var pic = document.createElement('img');
        pic.src = source;
        pic.classList.add('foto');
        pic.addEventListener('click', clickedPic);
    }else{
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
    }
    var x = document.createElement('span');
    x.classList.add('x');
    x.addEventListener('click',function() {close()});
    
    var modal = document.createElement('div');
    modal.classList.add('modal');
    modal.addEventListener('click', clicked);
    document.addEventListener("keydown", keypressed);
    modal.appendChild(x);
    if(tipo != 'video'){
        modal.appendChild(pic);
    }else{
        modal.appendChild(video);
    }
    body = document.querySelector('body');
    body.appendChild(modal);
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
    event.preventDefault();
    el.classList.add("opened");
    var tipo = el.getAttribute('type');
    currentGallery = el.getAttribute('gallery-alex-box');
    if(tipo == 'video'){
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
}
// keypress handling
function keypressed(event){
    var x = event.charCode || event.keyCode;  // Get the Unicode value
    if ((x == 37) || (x == 40)){   // left arrow or down arrow
        close();
        open(pictures[previous(i,currentGallery)]);
    }else if ((x == 39) || (x == 38)){ // right arrow or up arrow
        close();
        open(pictures[next(i,currentGallery)]);
    }
}

function previous (n,currentGallery){
    var precedente = n <= 0 ? pictures.length-1 : n-1;
    if(pictures[precedente].getAttribute('gallery-alex-box') == currentGallery){
        return precedente;
    }else{
        return previous(precedente-1,currentGallery);
    }
}
function next (n,currentGallery){
    var prossimo = n >= pictures.length-1 ? 0 : n+1;
    if(pictures[prossimo].getAttribute('gallery-alex-box') == currentGallery){
        return prossimo;
    }else{
        return next(prossimo+1,currentGallery);
    }
}