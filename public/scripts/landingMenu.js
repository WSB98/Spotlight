

// the simplest navbar ever lmao

var burger = document.getElementById('burger');
var opened = false;
var navbar = document.getElementById('navbar');
var links = document.getElementById('linkListMobile');

burger.addEventListener('click', async(e) => {
    //open the menu
    if(opened === false){
        opened = true;
        navbar.style.transition = 'all ease 0.2s';
        navbar.style.height = '800px';
        links.style.transition = 'all ease 0.2s';
        links.innerHTML = `<ul class="linkList">
                                <a href="#top"><li>home</li></a>
                                <a href="#scroller"><li>about</li></a>
                                <a><li>mission</li></a>
                                <a href="login.html"><li>login</li></a>
                            </ul>`
    }
    else {
        opened = false;
        navbar.style.height = '72px'
        links.innerHTML = ``;
    }  
});