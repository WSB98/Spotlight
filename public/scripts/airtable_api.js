


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
}

//pagination for the second table OR glassTable1
const rowsPerPage2 = 5; // change this as needed
var tableRows2 = []
var totalPages2 = 0

/* call the aritable API */
var tableData;
var offsetData = [];
var isOffset_temp = false;
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
        if(isOffset_temp !== true){
            await loadTable();
            await loadSortScript();
            //pagination for the second table OR glassTable1
            tableRows2 = document.querySelectorAll('.trow2');
            totalPages2 = Math.ceil(tableRows2.length / rowsPerPage2);

            await genLinks2();
        }
    }
)
    .catch(error => console.log(error))
}

var records = [];
 async function loadTable(){

    records = offsetData
    
    var injection = `    
        <tr id="tableHeadProposals" class="noselect clickable">
        <th class="thead">Name</th>
        <th class="theadMiddle">Linkedin</th>
        <th class="theadRight">Joined</th>
        </tr>`

    records.forEach(async o => {
        var created = o['createdTime']
        var fullName = '';
        var interests = []
        var email = '';
        var school = '';
        var date = new Date(created)
        var formattedDate = date.toLocaleString();
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
        
        
        var id = o['id']
        // var affiliatedSchool = o['fields']['Affiliated School']

        // picture in table <img alt="airtable picture" src="${imageURL}" class="fellowPicture"><br>


        injection += `
    <tr id='${id}' class="trow2">
        <td class="tdata">${fullName}</td>
        <td class="tdata"><a target="_blank" href="https://linkedin.${linkedin}">LinkedIn</a></td>
        <td class="tdata">${formattedDate}</td>
        <td class="hidden_column">${school}</td>
        <td class="hidden_column">${email}</td>
        <td class="hidden_column">${interests}</td>
    </tr>`
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

  /* events table */
     



// onload section
async function genLinks2() {
    
        
      generatePaginationLinks2(1);
      // Add this line to display the first page on load
      document.querySelector('#pagination2 a[data-page2="1"]').click();

    
  };
