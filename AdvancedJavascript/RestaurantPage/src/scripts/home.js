export function emptyPage(){
    const content = document.querySelector("#content");
    while(content.hasChildNodes()){
        content.removeChild(content.lastChild);
    }
}

function generateTitle(){
    const content = document.querySelector("#content");
    
    const title = document.createElement("div");
    title.setAttribute("class", "title");
    
    const titleText = document.createElement("p");
    titleText.textContent = "Beary's Breakfast Bar";
    title.appendChild(titleText);
    
    content.appendChild(title);
};

function generateReview(){
    const content = document.querySelector("#content");
    
    const review = document.createElement("div");
    review.setAttribute("class", "review");
    
    const reviewText = document.createElement("p");
    reviewText.textContent = "Beary's has the best porridge! The atmosphere and customer service make you feel like you are sitting in the middle of the woods, eating like a bear! This is exactly the kind of place that I like to return to again and again.";
    reviewText.setAttribute("class", "review-text");
    const reviewAuthor = document.createElement("p");
    reviewAuthor.textContent = "Goldilocks";
    reviewAuthor.setAttribute("class", "review-author");
    review.appendChild(reviewText);
    review.appendChild(reviewAuthor);
    
    content.appendChild(review);
};

function generateHours(){
    const content = document.querySelector("#content");
    
    const hours = document.createElement("div");
    hours.setAttribute("class", "hours");
}

export function renderHomePage(){
    emptyPage();
    generateTitle();
    generateReview();
    generateHours();
};