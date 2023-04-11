
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



  







/* click to open the overlay */
var overlay = document.getElementById('overlay');
var orgTable = document.getElementById('myTable');
var eventTable = document.getElementById('myTable2');

orgTable.addEventListener('click', async(e) => {
  var whereClicked = e.target.tagName;
  if(whereClicked == "TD" || whereClicked == "IMG"){
     /* INJECT INFO */
     var row = e.target.closest('tr');
     var cells = row.querySelectorAll('td');
     var injection = ``
     
     for(i=0;i < 3; i++){
      

      // INITAITIVES ALWAYS IN INDEX 3
      
      if (i === 0){
        injection += `<div class='contentBox source-sans-pro neumorphicOut'><h6 class="IBM-monospace">Organization</h6>${cells[i].innerHTML}</div>`
      }
      else if(i === 1){
        injection += `<div class='contentBox source-sans-pro neumorphicOut'><h6 class="IBM-monospace">Members</h6>${cells[i].innerHTML}</div>`
      }
     
      
     }
     for(i=2;i < cells.length - 2; i+=3){

      var name = cells[i].innerHTML;
      var year = cells[i+1].innerHTML;
      var resume = cells[i+2].innerHTML;
      
      

      // INITAITIVES ALWAYS IN INDEX 3
      injection += `<div class='contentBox source-sans-pro neumorphicOut'>
      <h6 class="IBM-monospace">${name}</h6>Grad Year: ${year} <br>Resume: ${resume}</div>`
      
      
      
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

eventTable.addEventListener('click', async(e) => {
  var whereClicked = e.target.tagName;
  if(whereClicked == "TD" || whereClicked == "IMG"){
     /* INJECT INFO */
     var row = e.target.closest('tr');
     var cells = row.querySelectorAll('td');
     var injection = ``
     
     for(i=0;i < cells.length; i++){
      

      
      if(i === 0){
        injection += `<div class='contentBox source-sans-pro neumorphicOut'><h6 class="IBM-monospace">Name</h6>${cells[i].innerHTML}</div>`
      }
      else if(i === 1){
        injection += `<div class='contentBox source-sans-pro neumorphicOut'><h6 class="IBM-monospace">Graduation Year</h6>${cells[i].innerHTML}</div>`
      }
      else if(i === 2){
        injection += `<div class='contentBox source-sans-pro neumorphicOut'><h6 class="IBM-monospace">Affiliated School</h6>${cells[i].innerHTML}</div>`
      }
      else if(i === 3){
        injection += `<div class='contentBox source-sans-pro neumorphicOut'><h6 class="IBM-monospace">LinkedIn</h6>${cells[i].innerHTML}</div>`
      }
      else if(i === 5){
        //CHECK IF EMPTY BEFORE GIVIING A LINK
        if(cells[i].innerHTML === "No Email Provided"){
          injection += `<div class='contentBox source-sans-pro neumorphicOut'><h6 class="IBM-monospace">Email</h6>${cells[i].innerHTML}</div>`
        }
        else {
          injection += `<div class='contentBox source-sans-pro neumorphicOut'><h6 class="IBM-monospace">Email</h6><a href="mailto:${cells[i].innerHTML}">Click To Email!</a></div>`
        }
      }
      else if(i === 4){
        injection += `<div class='contentBox source-sans-pro neumorphicOut'><h6 class="IBM-monospace">Date Joined</h6>${cells[i].innerHTML}</div>`
      }
      else if(i === 6){
        injection += `<div class='contentBox source-sans-pro neumorphicOut'><h6 class="IBM-monospace">Interests</h6>${cells[i].innerHTML}</div>`
      }
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
  try {
    if(whereClicked !== "TD" && whereClicked !== 'IMG' && !overlay.contains(e.target)){
    var ID = e.target.closest('div');
    if(ID.id !== "overlay"){
      overlay.style.transform = 'translate(0px,-1000px)'
      overlay.style.opacity = "0"
    }
    
  }
  else if(e.target.id === closeIcon.id){
      overlay.style.transform = 'translate(0px,-1000px)'
      overlay.style.opacity = "0"
    }
  }
  catch(e){
    console.log(e)
  }
  
});








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




