Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
  }
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
  }



//the boot

async function checkSession(sessionKey){
    if(!sessionKey === localStorage.getItem('sessionKey')){
        window.location.assign('login.html')
    }
}

async function compareAccessToken(){
    if(sessionStorage.getItem('sessionKey') === null || sessionStorage.getItem('sessionKey') === undefined){
        window.location.assign('login.html')
    }
    else {
        //do nothing becuase this runs on all pages
    }

    
}

const logout = async () => {
  //Don't forget to clear sessionStorage when user logs out
  await sessionStorage.clear();

  window.location.assign('login.html')

}


compareAccessToken();

window.addEventListener('load', async() => {
    setProfileImage();


    // logout
    var logoutButton = document.getElementById('logout')
    logoutButton.addEventListener('click', logout);
})




// set the user profile --> very simple as of now
async function setProfileImage(){
    var profileLink = document.getElementById('userAcctProfile')
  
    var currUser = await localStorage.getObj('currUserObj')
  
    var pfp = currUser.pfp;
  
    profileLink.innerHTML = `<img style="height:32px;width:32px;border-radius:100%" src="${pfp}" alt="pfp" id="userPFP">`
  };

