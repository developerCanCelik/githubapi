//elementleri selected
const githubForm = document.getElementById("github-form")
const nameInput = document.getElementById("githubname")
const clearLastUsers = document.getElementById("clear-last-users")
const lastUsers = document.getElementById("last-users")
//github object
const github = new Github()
//ui object
const ui = new UI()
eventListeners()
function eventListeners(){
    //click
    githubForm.addEventListener("submit",getData)
    clearLastUsers.addEventListener("click",clearAllSearched)
    
    document.addEventListener("DOMContentLoaded",getAllSearched)
}
function getData(e){
    let userName = nameInput.value.trim()
    if(userName === ""){
        alert("Lütfen Geçerli Bir Kullanıcı Adı Giriniz")
    }
    else{
        github.getGithubData(userName)
        .then(response => {
            if(response.user.message ==="Not Found"){
                //Error
                ui.showError("Kullanıcı bulunamadı")
            }else{
                //username,user,repo add
                ui.addSearchedUsersToUI(userName)
                Storage.addSearchedUsersToStorage(userName)
                ui.showUserInfo(response.user)
                ui.showRepoInfo(response.repo)
            }
        })
        .catch(err => ui.showError(err))
    }
    //clear input
    ui.clearInput()
    e.preventDefault()
}
function clearAllSearched(){
    if(confirm("Emin misiniz?")){
        //clear-ui
        ui.clearAllSearchedFromUI()
        //clear-stoarge
        Storage.clearAllSearchedUsersFromStorage()
    } 
}
function getAllSearched(){
    //get
    let users = Storage.getSearchedUsersFromStorage()
    let result = "";
    users.forEach(user =>{
        result += `<li class="list-group-item">${user}</li>`
    })
    lastUsers.innerHTML = result

}
