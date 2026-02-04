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
    const text = document.createElement("p");
    text.textContent = "Hours";
    text.setAttribute("class", "hours-title");
    const days = document.createElement("p");
    days.setAttribute("class", "hours-days");
    days.textContent = "Sunday: 8am - 8pm\n Monday: 6am - 6pm\n Tuesday: 6am - 6pm\n Wednesday: 6am - 6pm\n" +
                        "Thursday: 6am - 10pm\n Friday: 6am - 10pm\n Saturday: 8am - 10pm\n";
    hours.appendChild(text);
    hours.appendChild(days);
    content.appendChild(hours);
}

function generateLocation(){
    const content = document.querySelector("#content");
    
    const location = document.createElement("div");
    location.setAttribute("class", "location");
    const locationText = document.createElement("p");
    locationText.textContent = "Location";
    locationText.setAttribute("class", "location-title");
    const place = document.createElement("p");
    place.setAttribute("class", "place");
    place.textContent = "123 Forest Drive, Forestville, Maine";
    location.appendChild(locationText);
    location.appendChild(place);
    content.appendChild(location);
}
export function renderHomePage(){
    emptyPage();
    generateTitle();
    generateReview();
    generateHours();
    generateLocation();
};