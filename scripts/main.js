/* pagination JS */
/* pagination for the first table */
const rowsPerPage = 5; // change this as needed
const tableRows = document.querySelectorAll('.trow');
const totalPages = Math.ceil(tableRows.length / rowsPerPage);

function generatePaginationLinks(currentPage = 1) {
    if (currentPage === undefined) {
        currentPage = 1;
        }
    let linksHtml = '';
    const startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(startPage + 2, totalPages);

    if (startPage > 1) {
        linksHtml += '<li><a href="#" data-page="1">1</a></li>';
        if (startPage > 2) {
        linksHtml += '<li ><span class="IBM-monospace">...</span></li>';
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        linksHtml += `<li><a href="#" data-page="${i}"${i === currentPage ? ' class="active"' : ''}>${i}</a></li>`;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
        linksHtml += '<li><span class="IBM-monospace">...</span></li>';
        }
        linksHtml += `<li><a href="#" data-page="${totalPages}">${totalPages}</a></li>`;
    }

    document.querySelector('#pagination').innerHTML = `<ul>${linksHtml}</ul>`;
    const activeLink = document.querySelector(`#pagination a[data-page="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    
}




document.getElementById('pagination').addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.tagName === 'A') {
      event.preventDefault();
      if (clickedElement.hasAttribute('data-page')) {
        const selectedPage = clickedElement.getAttribute('data-page');
        const tableRows = document.querySelectorAll('.trow');
        const startIndex = (selectedPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        tableRows.forEach((row, index) => {
          if (index >= startIndex && index < endIndex) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
        generatePaginationLinks(selectedPage);
      } else if (clickedElement.textContent === '...') {
        const currentPage = parseInt(document.querySelector('#pagination a.active').getAttribute('data-page'));
        generatePaginationLinks(currentPage);
      }
    }
  });
  
  

// onload section
window.addEventListener('load', () => {
    generatePaginationLinks(1);
     // Add this line to display the first page on load
    document.querySelector('#pagination a[data-page="1"]').click();
  });

window.addEventListener('load', async () => {
    //add sortable script after adding the data (doesnt work if loaded before data)
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://www.kryogenix.org/code/browser/sorttable/sorttable.js";
    document.head.appendChild(script)
});


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
  })


  /* search fellows projects table */
  // search orgs
function searchTable() {
    // Declare variables for accessing the input field and table
   var input, filter, table, tr, td, i, txtValue;
   input = document.getElementById("searchInput");
   filter = input.value.toUpperCase();
   table = document.getElementById("myTable");
   tr = table.getElementsByTagName("tr");

   // Loop through all table rows and hide those that don't match the search query
   for (i = 0; i < tr.length; i++) {
     td = tr[i].getElementsByTagName("td"); // Get the first td element in the current row
     for (j = 0; j < td.length; j++) { // Make sure the td element exists (i.e., the row isn't a table header)
       txtValue = td[j].textContent || td[j].innerText; // Get the text content of the td element
       if (txtValue.toUpperCase().indexOf(filter) > -1) {  // Check if the text content contains the search query
         tr[i].style.display = ""; // Show the row if it matches the search query
         break;
       } else {
         tr[i].style.display = "none"; // Hide the row if it doesn't match the search query
       }
     }
   }

   if(filter == "" || filter == " "){
       document.querySelector('#pagination a[data-page="1"]').click();
   }
   
 }


 //scrolling 
function scrollToSection(sectionId) {
    const offset = 135; // set the offset value to 100px less than the target section
    const section = document.getElementById(sectionId);
    const top = section.offsetTop - offset;
    window.scrollTo({top, behavior: 'smooth'});
  }


  /* load in spotlight title typewriter style */
async function welcomeMessage(){
    var welcomeMessage = 'Spotlight'
    var header = document.getElementById('spotlightTitle')
    header.innerHTML = '';
  
    for (var i = 0; i < welcomeMessage.length; i++) {
      (function(i) {
        setTimeout(function() {
          header.innerHTML += welcomeMessage.charAt(i);
        }, i*70);
      })(i);
    }
  }
  welcomeMessage()



  /* events table */
     // search events
function searchTable2() {
  // Declare variables for accessing the input field and table
 var input, filter, table, tr, td, i, txtValue;
 input = document.getElementById("searchInput2");
 filter = input.value.toUpperCase();
 table = document.getElementById("myTable2");
 tr = table.getElementsByTagName("tr");

 // Loop through all table rows and hide those that don't match the search query
 for (i = 0; i < tr.length; i++) {
   td = tr[i].getElementsByTagName("td"); // Get the first td element in the current row
   for (j = 0; j < td.length; j++) { // Make sure the td element exists (i.e., the row isn't a table header)
     txtValue = td[j].textContent || td[j].innerText; // Get the text content of the td element
     if (txtValue.toUpperCase().indexOf(filter) > -1) {  // Check if the text content contains the search query
       tr[i].style.display = ""; // Show the row if it matches the search query
       break;
     } else {
       tr[i].style.display = "none"; // Hide the row if it doesn't match the search query
     }
   }
 }

 if(filter == "" || filter == " "){
     document.querySelector('#pagination2 a[data-page2="1"]').click();
 }
 
}


/* pagination for passed proposal table */
//pagination for the second table OR glassTable1
const rowsPerPage2 = 5; // change this as needed
const tableRows2 = document.querySelectorAll('.trow2');
const totalPages2 = Math.ceil(tableRows2.length / rowsPerPage2);

function generatePaginationLinks2(currentPage2 = 1) {
    if (currentPage2 === undefined) {
        currentPage2 = 1;
        }
    let linksHtml2 = '';
    const startPage2 = Math.max(currentPage2 - 1, 1);
    const endPage2 = Math.min(startPage2 + 2, totalPages2);

    if (startPage2 > 1) {
        linksHtml2 += '<li><a href="#" data-page2="1">1</a></li>';
        if (startPage2 > 2) {
        linksHtml2 += '<li><span class="IBM-monospace">...</span></li>';
        }
    }

    for (let i = startPage2; i <= endPage2; i++) {
        linksHtml2 += `<li><a href="#" data-page2="${i}"${i === currentPage2 ? ' class="active"' : ''}>${i}</a></li>`;
    }

    if (endPage2 < totalPages2) {
        if (endPage2 < totalPages2 - 1) {
        linksHtml2 += '<li><span class="IBM-monospace">...</span></li>';
        }
        linksHtml2 += `<li><a href="#" data-page2="${totalPages2}">${totalPages2}</a></li>`;
    }

    document.querySelector('#pagination2').innerHTML = `<ul>${linksHtml2}</ul>`;
    const activeLink2 = document.querySelector(`#pagination2 a[data-page2="${currentPage2}"]`);
    if (activeLink2) {
        activeLink2.classList.add('active');
    }

    
}




document.getElementById('pagination2').addEventListener('click', (event2) => {
    const clickedElement2 = event2.target;
    if (clickedElement2.tagName === 'A') {
      event2.preventDefault();
      if (clickedElement2.hasAttribute('data-page2')) {
        const selectedPage2 = clickedElement2.getAttribute('data-page2');
        const tableRows2 = document.querySelectorAll('.trow2');
        const startIndex2 = (selectedPage2 - 1) * rowsPerPage2;
        const endIndex2 = startIndex2 + rowsPerPage2;
        tableRows2.forEach((row2, index2) => {
          if (index2 >= startIndex2 && index2 < endIndex2) {
            row2.style.display = '';
          } else {
            row2.style.display = 'none';
          }
        });
        generatePaginationLinks2(selectedPage2);
      } else if (clickedElement2.textContent === '...') {
        const currentPage2 = parseInt(document.querySelector('#pagination2 a.active').getAttribute('data-page2'));
        generatePaginationLinks2(currentPage2);
      }
    }
  });
  
  

// onload section
window.addEventListener('load', () => {
    generatePaginationLinks2(1);
     // Add this line to display the first page on load
    document.querySelector('#pagination2 a[data-page2="1"]').click();
});




/* click to open the overlay */
var overlay = document.getElementById('overlay');
var orgTable = document.getElementById('myTable');
var eventTable = document.getElementById('myTable2');

orgTable.addEventListener('click', async(e) => {
  var whereClicked = e.target.tagName;
  if(whereClicked == "TD" || whereClicked == "img"){
     /* INJECT INFO */
     var row = e.target.closest('tr');
     var cells = row.querySelector('td');
     var injection = ``
     for(i=0;i < cells.length; i++){
      injection += `<div class='contentBox'>${cells[i]}</div>`
     }

     overlay.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" id="closeIcon" class="closeIcon" viewBox="0 0 512 512">
     <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License -
      https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 48a208 
      208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 
      0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 
      47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
      
      <div class="rowItems">
      ${injection}
      </div>
      `

     /* VISIBLE */
    overlay.style.transform = 'translate(0px,40px)'
    overlay.style.opacity = "1"


   
  }
});



//close overlay
document.addEventListener('click', async(e) => {

  var whereClicked = e.target.tagName;
  
  var closeIcon = document.getElementById('closeIcon')

  if(whereClicked !== "TD"){
    var ID = e.target.closest('div');
    if(ID.id !== "overlay"){
      overlay.style.transform = 'translate(0px,-1000px)'
      overlay.style.opacity = "0"
    }
    else if(e.target.id === closeIcon.id){
      console.log('closed')
      overlay.style.transform = 'translate(0px,-1000px)'
      overlay.style.opacity = "0"
    }
  }
});