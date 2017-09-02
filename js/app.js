
//names of image files
var productNames = ["boots", "banana", "bag", "chair", "cthulhu", "dragon",
"pen", "scissors", "shark", "sweep", "unicorn", "usb", "water_can", "wine_glass"];

var productArray = [];

//constructor function for the products
var Product = function(productName) {
  this.name = productName;
  this.imageFile = productName + ".jpg"
  this.numberOfVotes = 0;
  this.voteCounter = function() {
      this.numberOfVotes = this.numberOfVotes + 1;
  }
}

//fills array with Products
function createProducts() {
  for (var index = 0; index < productNames.length; index++)
    productArray.push(new Product(productNames[index]));
}

createProducts();


//function to create image elements, console.log clicks and append them to the section element
function addImage(imageFileName) {
  var container = document.getElementById("image-container");
  var image = document.createElement("img");
  image.src = imageFileName;
  image.addEventListener("click", recordClick);
  container.appendChild(image);
}


//function to render images to the page
function showImages() {
  var index = Math.floor(Math.random() * 14)
  addImage("images/"+productArray[index].imageFile);
  index = Math.floor(Math.random() * 14)
  addImage("images/"+productArray[index].imageFile);
  index = Math.floor(Math.random() * 14)
  addImage("images/"+productArray[index].imageFile);
}

//this will track how many times the user has voted
var fifteenVoteTracker = 0;

//function to find the product image in the array that matches the partial image url,
// then increase the vote count of that Product. After this is done 15 times, button will appear
function recordClick(event) {
  var index = 0;
  var imageSource = event.target.src;
  var partialFileName = imageSource.split("images/")[1];
  var imageNodes = document.getElementsByTagName("img")[0];
  var imageNodes2 = document.getElementsByTagName("img")[1];
  var imageNodes3 = document.getElementsByTagName("img")[2];
 
  do {
    index++
  } while (partialFileName !== productArray[index].imageFile);

 productArray[index].voteCounter();
 console.log("Product name: " +productArray[index].name)
 console.log("Number of votes so far: " + productArray[index].numberOfVotes);
  var sectionNode = document.getElementById("image-container");
  sectionNode.removeChild(imageNodes);
  sectionNode.removeChild(imageNodes2);
  sectionNode.removeChild(imageNodes3);
  fifteenVoteTracker += 1
  if (fifteenVoteTracker == 15) {
    document.getElementById("button-container").innerHTML ="<input type=\"button\" value=\"Show results!\" id=\"listButton\">"
    document.getElementById("listButton").addEventListener("click", showResults);
  }
  else {
    showImages();
  }
}

//function that adds a list of the results
function showResults() {
  var body = document.getElementById("body");
  var uList = document.createElement("ul");
  body.appendChild(uList);

  for (var index = 0; index < productArray.length; index++) {
    var listItem = document.createElement("li");
    listItem.innerHTML = productArray[index].name + ": " + productArray[index].numberOfVotes + " votes.";
    uList.appendChild(listItem);
  }
}

//shows the images once the rest of the page loads
window.addEventListener("load", showImages);

//ranker object to manage all the attributes and behaviors around a visitor's product-ranking experience
var ranker = {

}