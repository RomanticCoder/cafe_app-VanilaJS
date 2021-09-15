const store = {
    setLocalStorage(projects){
        localStorage.setItem("projects",JSON.stringify(projects))
    },
    getLocalStorage(){
        return JSON.parse(localStorage.getItem("projects"));
    }
}

export default store;