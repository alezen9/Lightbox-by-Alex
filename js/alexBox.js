var pictures = document.querySelectorAll('.alex-box');
var i = -1;

pictures.forEach(el => {
    el.addEventListener('click',function() {open(this)});
});

function createModal(foto){
    var pic = document.createElement('img');
    pic.src = foto;
    pic.classList.add('foto');

    var x = document.createElement('span');
    x.classList.add('x');
    x.addEventListener('click',function() {close()});

    var modal = document.createElement('div');
    modal.classList.add('modal');
    document.addEventListener("keydown", keypressed);

    modal.appendChild(x);
    modal.appendChild(pic);
    body = document.querySelector('body');
    body.appendChild(modal);
}

function open(el){
    event.preventDefault();
    el.classList.add("opened");
    createModal(el.getAttribute('href'));
    pictures.forEach(function (element, index) {
        if(element === el){
            i = index;
        }
    });
}

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

function keypressed(event){
    var x = event.charCode || event.keyCode;  // Get the Unicode value
    if (x == 37){   // left arrow
        close();
        // loop
        if(i == 0){
            open(pictures[pictures.length -1])
        }else{
            open(pictures[i-1]);
        }
    }else if (x == 39){ // right arrow
        close();
        // loop
        if(i == (pictures.length -1)){
            open(pictures[0])
        }else{
            open(pictures[i+1]);
        }
    }
}