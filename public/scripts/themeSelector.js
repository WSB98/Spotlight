/* theme selection */
window.addEventListener('load', async (e) => {
    var body = document.body;
    var colorSelectors = document.getElementById('colorSelectors');
    var flipper = document.getElementById('swapIcon');
    var swapper = document.getElementById('colorSwapper');
    var palette = document.getElementById('paintIcon');
    var color1 = document.getElementById('color1');
    var color2 = document.getElementById('color2');
    var styles = getComputedStyle(document.body);
    var currFG = styles.getPropertyValue('--background').trim();
    var currBG = styles.getPropertyValue('--foreground').trim();
    
    colorSelectors.style.display = 'none'
  
    
    
  
    if(localStorage.getItem('color1') !== null){
        color1.value = localStorage.getItem('color1')
        document.documentElement.style.setProperty("--background", localStorage.getItem('color1'));
    }
    else{
      color1.value = currFG
    }
    if(localStorage.getItem('color2') !== null){
        color2.value = localStorage.getItem('color2')
        document.documentElement.style.setProperty("--foreground", localStorage.getItem('color2'));
        
    } else{
      color2.value = currBG
    }
    
  
    swapper.addEventListener('click' , async (e) => {
        
        swapper.style.width = '150px';
        palette.style.display = 'none';
        colorSelectors.style.display = 'inline-flex'
        
    });
  
    document.addEventListener('click', async(e) => {
        if(!swapper.contains(e.target)){
          
            colorSelectors.style.display = 'none'
            swapper.style.width = '48px';
            palette.style.display = 'flex';
            
        }
    });
  
    color1.addEventListener('change', async (e) => {
        await localStorage.setItem('color1',color1.value)
        await document.documentElement.style.setProperty("--background", localStorage.getItem('color1'));
        
    });
    color2.addEventListener('change', async (e) => {
        await localStorage.setItem('color2',color2.value)
        await document.documentElement.style.setProperty("--foreground", localStorage.getItem('color2'));
        
    });
    flipper.addEventListener('click', async(e) => {
      await localStorage.setItem('color1',color2.value)
      await localStorage.setItem('color2',color1.value)
      await document.documentElement.style.setProperty("--foreground", localStorage.getItem('color2'));
      await document.documentElement.style.setProperty("--background", localStorage.getItem('color1'));
      window.location.reload()
    });

    /* NAVBAR JS */
/* checkbox close on clicking outside of it */
const checkboxToggle = document.getElementById('checkbox_toggle');
const navbar = document.querySelector('.navbar');

document.addEventListener('click', function(event) {
  if (!navbar.contains(event.target)) {
    checkboxToggle.checked = false;
    menuBtn.classList.remove('open');
    menuOpen = false;
  }
});

const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
  if(!menuOpen) {
    menuBtn.classList.add('open');
    menuOpen = true;
  } else {
    menuBtn.classList.remove('open');
    menuOpen = false;
  }
});

  })


  

async function gohome(){
  window.location.replace('index.html')
};