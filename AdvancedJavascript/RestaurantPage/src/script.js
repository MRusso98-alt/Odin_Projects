import "./styles.css";
import { renderMenuPage } from "./scripts/menu.js";
import { renderContactsPage } from "./scripts/contacts.js";
import { renderHomePage } from "./scripts/home.js";

function updateColor(event){
    navs.forEach(element =>{
        if(element.getAttribute("id") === event.target.getAttribute("id")){
            element.style.backgroundColor = "#ECA43B";
        } else {
            element.style.backgroundColor = "#FFDE73";
        }
    });
}

function addListeners (navs) {
    navs.forEach(element => {
        element.addEventListener("click", function(event){
            updateColor(event);
        });

        if(element.getAttribute("id") === "home-button"){
            element.addEventListener("click", function(event){
                renderHomePage();
            });
        } else if (element.getAttribute("id") === "menu-button"){
            element.addEventListener("click", function(event){
                renderMenuPage();
            });
        } else if (element.getAttribute("id") === "contact-button"){
            element.addEventListener("click", function(event){
                renderContactsPage();
            });
        };
    });
};

let navs = document.querySelectorAll("nav button");
addListeners(navs);
renderHomePage();
