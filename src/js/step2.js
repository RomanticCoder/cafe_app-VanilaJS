import { $ } from './utils/dom.js';
import store from './store/index.js';

function App(){
    // status - (changable value) : menu name, sold-out
    let projects = {
        "front-end":[],
        "back-end":[],
        "mobile":[],
    } 

    let currentCategory = 'front-end';

    const render = ()=>{
        const template = projects[currentCategory].map((item,index)=>{
            return `
            <li data-project-id="${index}" class="project-list-item d-flex items-center py-2">
                <a href="${item.link}" target="_blank"><i class="fas fa-external-link-alt"></i></a>
                <span class="w-100 pl-2 project-name ${item.isComplete ? "complete" : ""}">${item.name}</span>
                <button type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 project-complete-button">
                complete
                </button>
                <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 project-edit-button">
                edit
                </button>
                <button type="button" class="bg-gray-50 text-gray-500 text-sm project-remove-button">
                remove
                </button>
            </li>
            `
        }).join("");
        $('#project-list').innerHTML = template;
        updateMenuCount();
    }

    const updateMenuCount = ()=>{
        $(".project-count").innerHTML = `total: ${projects[currentCategory].length}`;
    }

    const addMenuName = () =>{
        if($("#project-name").value === ''){
            alert("Enter a project name");
            return;
        }
        const projectName = $("#project-name").value;
        const projectLink = $("#project-link").value;

        projects[currentCategory].push({name:projectName,type:currentCategory,link:projectLink});
        store.setLocalStorage(projects);
        $("#project-name").value = '';
        $("#project-link").value = '';
        render();

    }

    const updateMenuName = (e)=>{
        const projectId = e.target.closest("li").dataset.projectId;
        const $projectName =e.target.closest("li").querySelector(".project-name");
        const projectLink = e.target.closest("li").querySelector("a").href;
        const updatedProjectName = prompt("Enter a new project name", $projectName.innerText);
        const updatedProjectLink = prompt("Enter a new project link", projectLink);
        if(!updatedProjectName || updatedProjectName == '')
            return;
        projects[currentCategory][projectId].name = updatedProjectName;
        projects[currentCategory][projectId].link = updatedProjectLink;
        store.setLocalStorage(projects);
        render();
    }

    const removeMenuName = (e)=>{
        const answer = confirm("Do you really want to delete it?");
        if (!answer)
            return;
        const projectId = e.target.closest("li").dataset.menuId;
        projects[currentCategory].splice(projectId,1);
        store.setLocalStorage(projects);
        render();
    }

    const completeProject = (e)=>{
        console.log(e.target)
        const projectId = e.target.closest("li").dataset.projectId;
        //toggle
        projects[currentCategory][projectId].isComplete = !projects[currentCategory][projectId].isComplete;
        store.setLocalStorage(projects);
        render();
    }

    const init = () =>{
        if(store.getLocalStorage()){
            projects = store.getLocalStorage();
        }
        render();
    }

    init();

    //prevent form tag from sending data 
    $("#project-form").addEventListener("submit",(e)=>{
        e.preventDefault();
    })

    $("#project-list").addEventListener("click",(e)=>{
        //update menu name
        if(e.target.classList.contains("project-edit-button")){
            updateMenuName(e);
            return;
        }

        if(e.target.classList.contains("project-remove-button")){
            removeMenuName(e);
            return;
        }

        if(e.target.classList.contains("project-complete-button")){
            completeProject(e);
            return;
        }
    })

    $("#project-submit-button").addEventListener("click",addMenuName);

    $("#project-name").addEventListener("keypress",(e)=>{
        if(e.key !== 'Enter')
            return;
        addMenuName();
    });

    $("#project-link").addEventListener("keypress",(e)=>{
        if(e.key !== 'Enter')
            return;
        addMenuName();
    });

    $("nav").addEventListener("click",(e)=>{
        const isCategoryBtn = e.target.classList.contains("project-category-name");
        if(!isCategoryBtn)
            return;
        currentCategory = e.target.dataset.categoryName;
        $('#category-title').innerText = `${e.target.innerText} project`;
        render();
    });

}

App();