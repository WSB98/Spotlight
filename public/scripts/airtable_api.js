


/* cloud func  //NVM SET THEM ALL UP ON AWS - ITS THE SAME SHIT (SADLY) - 
WE COULD AND SHOULD SET UP A REAL BACKEND */
async function getKeys(){
    //AIRTABLE
    await fetch('https://04sp0o823b.execute-api.us-east-1.amazonaws.com/default/GetAirtableKey', {
        method:"POST",
    }).then(response => response.json())
    .then(async data => {
        var key = (data[0])
        var encrypted = CryptoJS.enc.Utf8.parse(data[1])
        var secret_key = CryptoJS.enc.Utf8.parse(data[4])
        var decrypted = CryptoJS.AES.decrypt(encrypted, secret_key);
        await getRecords(key, false)
    })

    add25_progress()
}

//pagination for the second table OR glassTable1
const rowsPerPage2 = 10; // change this as needed
var tableRows2 = []
var totalPages2 = 0

const rowsPerPage = 5; // change this as needed
var tableRows = []
var totalPages = 0

/* call the aritable API */
var tableData = []
var offsetData = [];
var isOffset_temp = false;

//get progress bar to animate 
var progressBar = document.getElementById('progressScroll')
var progressContainer = document.getElementById('progressBar')
var progressBar2 = document.getElementById('progressScroll1')
var progressContainer2 = document.getElementById('progressBar1')
async function getRecords(apiKey,isOffset){

    //URL for airtbale, change to offset if it is detected
    var url = 'https://api.airtable.com/v0/appGIbRtWyja4t8Q7/Contacts?view=Grid%20view'
    if(isOffset){
        url = `https://api.airtable.com/v0/appGIbRtWyja4t8Q7/Contacts?view=Grid%20view&offset=${tableData['offset']}`
    }

    await fetch(url , {
        method:'GET',
        headers: {
            'Authorization': 'Bearer '+`${apiKey}`
        }  
    }).then(response => response.json())
    .then( async data => {
        tableData = data;
        try{
            if(tableData['offset'].length > 5){
                getRecords(apiKey, true)
                isOffset_temp = true;
            }
        }
        catch{
            isOffset_temp = false;
        }
        
        data['records'].forEach(async o => {
            offsetData.push(o)
        })
    })
    .then( async function(){
        if(isOffset_temp !== true){ //everything happens in this order so functionality operates as expected
            
            await loadTable();
           
           
            await loadSchoolTable(offsetData);
          
            await loadSortScript();
           
            //pagination for the second table OR glassTable1
            tableRows2 = document.querySelectorAll('.trow2');
            totalPages2 = Math.ceil(tableRows2.length / rowsPerPage2);

            tableRows = document.querySelectorAll('.trow');
            totalPages = Math.ceil(tableRows.length / rowsPerPage);


            
            

            await genLinks2();
            await addPaginationResets();

            progressContainer.style.display = 'none'
            progressContainer2.style.display = 'none'

            
        }
    }
)
    .catch(error => console.log(error))
}

var records = [];
 async function loadTable(){
    
    
    records = offsetData
    
    var injection = `    
        <tr id="tableHead_students" class="noselect clickable">
            <th class="thead">Name</th>
            <th class="theadMiddle">Expected Graduation</th>
            <th class="theadRight">School</th>
        </tr>`

    records.forEach(async o => {
        var created = o['createdTime']
        var fullName = '';
        var interests = []
        var email = '';
        var school = '';
        var date = new Date(created)
        var linkedinData = ``;
        var formattedDate = date.toLocaleString();
        var resume = ''

        try{resume = o['fields']['Resume'][0]['url']}
        catch{resume = 'None Proivded'}
        try{
            fullName = o['fields']['Full Name']
            if(fullName === undefined){
                fullName = 'No Name Provided'
            }
        }
        catch{
            fullName = 'No Name Provided'
        }

        var linkedin = '';

        
        try{
            linkedin = o['fields']['LinkedIn'].split('.')
            if(linkedin.length === 2){
                linkedin = linkedin[1]
            }
            else if(linkedin.length === 3){
                linkedin = linkedin[2]
            }

            if(linkedin === undefined){
                linkedin = 'No LinkedIn Provided'
            }
        }
        catch{
            linkedin = "No LinkedIn Provided"
        }

        
        try{
            school = o['fields']['Affiliated School']
            if(school === undefined){
                school = 'No School Provided'
            }
        }
        catch{
            school = 'No School Provided'
        }

        try{
            email = o['fields']['Preferred Email']
            if(email === undefined){
                email = 'No Email Provided'
            }
        }
        catch{
            email = 'No Email Provided'
        }

        try{
            interests = o['fields']['Program Interest']
            if(interests === undefined){
                interests = 'No Interests Provided'
            }
        }
        catch{
            interests = 'No Interests Provided'
        }

        if(linkedin === "No LinkedIn Provided"){
            linkedinData = `
            <td class="hidden_column">${linkedin}</td>
            `
        }
        else{
            linkedinData = `
            <td class="hidden_column"><a target="_blank" href="https://linkedin.${linkedin}">LinkedIn</a></td>
            `
        }
        
        
        var id = o['id']
        var gradYear = o['fields']['Expected Year of Graduation? ']
        if(gradYear === undefined){
            gradYear = 'Not Provided'
        }


        // picture in table <img alt="airtable picture" src="${imageURL}" class="fellowPicture"><br>
        injection += `
    <tr id='${id}' class="trow2">
        <td class="tdata">${fullName}</td>
        <td class="tdata">${gradYear}</td>
        <td class="tdata">${school}</td>
        ${linkedinData}
        <td class="hidden_column">${formattedDate}</td>
        <td class="hidden_column">${email}</td>
        <td class="hidden_column">${interests}</td>
        <td class="hidden_column">${resume}</td>
    </tr>`

    //END LOOP --> ALL RECORDS ADDED
    });

    document.getElementById('myTable2').innerHTML = injection
}





async function loadSortScript(){
  //add sortable script after adding the data (doesnt work if loaded before data)
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://www.kryogenix.org/code/browser/sorttable/sorttable.js";
  document.head.appendChild(script)
};


async function fireOff(){
    await getKeys();
}
fireOff();
var categorizedItems = {};
async function loadSchoolTable(data){

    //sort into an an object of unis / orgs
    await data.forEach(async o => {
        if(!categorizedItems[o['fields']['Affiliated School']]){
            categorizedItems[o['fields']['Affiliated School']] = []
        }
        await categorizedItems[o['fields']['Affiliated School']].push(o['fields'])
    });

    var injection = `    
        <tr id="tableHead_orgs" class="noselect clickable">
            <th class="thead">Organization</th>
            <th class="theadRight">Members</th>
        </tr>`

    //add each of these to the table with each person as a hidden column
    await Object.keys(categorizedItems).forEach(async x => {
        if(x === 'undefined'){
            injection += `<tr class="trow">
            <td class='tdata'>Not Provided</td>
            <td class='tdata'>${categorizedItems[x].length}</td>`

        }
        else if(x === 'Option not Available'){
            injection += `<tr class="trow">
            <td class='tdata'>Not Available</td>
            <td class='tdata'>${categorizedItems[x].length}</td>`

        }
        else{
            injection += `<tr class="trow">
                <td class='tdata'>${x}</td>
                <td class='tdata'>${categorizedItems[x].length}</td>`
        }
        categorizedItems[x].forEach(i => {
            var name = i['Full Name']
            var gradYear = ''
            try{gradYear = i['Expected Year of Graduation? ']}catch{gradYear = 'None Proivded'}
            if(gradYear === undefined){gradYear = 'None Provided'}
            var resume = ''
            try{resume = i['Resume'][0]['url']
                resume = `<a target="_blank" href="${resume}">Open Resume</a>`}catch{resume = 'None Provided'}
            
            injection += `
            <td class="hidden_column">${name}</td>
            <td class="hidden_column">${gradYear}</td>
            <td class="hidden_column">${resume}</td>
            
            `
        })
        injection += `</tr>`
    });
    orgTable.innerHTML = injection
}



    /* pagination for passed proposal table */


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

  /* events table */
     



// onload section
async function genLinks2() {
    
        
      generatePaginationLinks2(1);
      // Add this line to display the first page on load
      document.querySelector('#pagination2 a[data-page2="1"]').click();

      generatePaginationLinks(1);
      // Add this line to display the first page on load
      document.querySelector('#pagination a[data-page="1"]').click();
    
  };




async function addPaginationResets(){
    /* get the header of proposal table and go to the first page on click. need to do this because the sortable script 
    is sorting the data and causing the page numbers to get out of order without being shown on the UI.
    this basically realigns the order after the sorting is done */
    document.getElementById('tableHead_orgs').addEventListener('click', async () => {
        generatePaginationLinks(1);
        // Add this line to display the first page on load
        document.querySelector('#pagination a[data-page="1"]').click();
    });
    //same as above but for the passed proposals. 
    document.getElementById('tableHead_students').addEventListener('click', async () => {
        generatePaginationLinks2(1);
        // Add this line to display the first page on load
        document.querySelector('#pagination2 a[data-page2="1"]').click();
    });
}

async function add25_progress(){

    for (var i = 0; i < 11; i++) {
        (function(i) {
          setTimeout(function() {
            progressBar.style.width = (i * 10).toString() + '%'
            progressBar2.style.width = (i * 10).toString() + '%'
          }, i*100);
        })(i);
      }
    
    
}