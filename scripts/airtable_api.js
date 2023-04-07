/* call the aritable API */
var tableData;
async function getRecords(){
    await fetch('https://api.airtable.com/v0/appX04UW5jL8cJNki/Jokes?maxRecords=3&view=All%20jokes', {
        method:'GET',
        headers: {
            'Authorization': 'Bearer '+`API_KEY`
        }  
    }).then(response => response.json())
    .then(data => {
        tableData = data;
    })
    .catch(error => console.log(error))
}

document.getElementById('hamburger').addEventListener('click', async(e) => {
    await getRecords();
    var records = tableData['records']
    console.log(records)
    
    var injection = `    
        <tr id="tableHeadProposals" class="noselect clickable">
        <th class="thead">Event</th>
        <th class="theadMiddle">Location</th>
        <th class="theadRight">Dates</th>
        </tr>`

    records.forEach(async o => {
        var created = o['createdTime']
        var funniness = o['fields']['Funniness']
        var punchline = o['fields']['Punchline']
        var setup = o['fields']['Setup']
        var title = o['fields']['Title']
        var imageURL = o['fields']['Image'][0]['url']
        var subjects = o['fields']['Type/Subject Matter']
        console.log(created, funniness, punchline, setup, title, subjects)

        injection += `
    <tr class="trow2">
        <td class="tdata"><img alt="airtable picture" src="${imageURL}" class="fellowPicture"><br>${title}</td>
        <td class="tdata">${setup} ... ${punchline}</td>
        <td class="tdata">${created}</td>
        <td class="hidden_column">${subjects}</td>
    </tr>`
    });

    document.getElementById('myTable2').innerHTML = injection

   
})