class Storage{
    static getSearchedUsersFromStorage(){
        //get all users
        let users;
        if(localStorage.getItem("searched") === null){
            users = []
        }else{
            users = JSON.parse(localStorage.getItem("searched"))
        }
        return users;
    }
    static addSearchedUsersToStorage(username){
        //add user
        let users = this.getSearchedUsersFromStorage()
        //indexOf
        if(users.indexOf(username) === -1){
            users.push(username)
        }
        localStorage.setItem("searched",JSON.stringify(users))
    }
    static clearAllSearchedUsersFromStorage(){
        //clear all
        localStorage.removeItem("searched")
    }
}