

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
                                <a href="#top" onclick="document.querySelector('.mantine-Burger-root').dispatchEvent(new MouseEvent('click', {      
                                    view: window,
                                    bubbles: true,
                                    cancelable: true
                                  }));"><li>home</li></a>
                                
                                <a href="#potwMobile" onclick="document.querySelector('.mantine-Burger-root').dispatchEvent(new MouseEvent('click', {      
                                    view: window,
                                    bubbles: true,
                                    cancelable: true
                                  }));"><li>project of the month</li></a>

                                <a href="#scroller" onclick="document.querySelector('.mantine-Burger-root').dispatchEvent(new MouseEvent('click', {      
                                    view: window,
                                    bubbles: true,
                                    cancelable: true
                                  }));"><li>about</li></a>
                                <a href="login.html"><li>login</li></a>
                            </ul>`
    }
    else {
        opened = false;
        navbar.style.height = '72px'
        links.innerHTML = ``;
    }  
});


//close popups when clicking the X
var closeIcons = document.querySelectorAll('.closeBtn')

closeIcons.forEach(async o => {

    o.addEventListener('click', async(e) => {
        document.getElementById('navLogo').click();
        console.log('clicked')
    })
})