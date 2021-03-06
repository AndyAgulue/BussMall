'use strict';

// an array of all the product names
var products = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var imageContainer = document.getElementById('image-container');
var leftImageElement = document.getElementById('left-image');
var rightImageElement = document.getElementById('right-image');
var middleImageElement = document.getElementById('middle-image');
//var imageInfo = document.getElementById('image-info')
var roundsOfVoting = 25;

var ctx = document.getElementById('myChart').getContext('2d');
var votesByProduct = [];
var timesProductsAreShown = [];

// var resultsFromLocalStorage = localStorage.getItem('image-info');
// var resultsAsAnArray = JSON.parse(resultsFromLocalStorage);
ProductImage.allImages = [];
ProductImage.imageMap = {};
function ProductImage(name) {
  this.name = name.substring(0, name.length - 4);// grabs the substring from the first position of the string, up until the forth position from the end.
  this.timesShown = 0;
  this.timesClicked = 0;// 'this' refers to the object that the constructor is creating
  this.image = `images/${name}`;
  
  
  ProductImage.allImages.push(this);
  // Mapping using bracket notation on an objects to assign he object to a key that is this.name
  ProductImage.imageMap[this.name] = this;
}

fillProductsArray();

// console.log(ProductImage.allImages);
// console.log(ProductImage.imageMap);

/**
 * Functions for handling User click logic and Product generation & rendering
 */

// returns 3 random images from ProductImage.allImages
function generateRandomImages() {
  var leftIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  var rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  var middleIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  
  // as long as the their is one duplicate index
  //   UPDATE:  We also need to check whether our middle and right Index are equal, that added index increases our complexity more that just double since everything needs to be compared.
  while (leftIndex === rightIndex || leftIndex === middleIndex || middleIndex === rightIndex) {
    if (leftIndex === rightIndex) {
      rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
    }
    if (leftIndex === middleIndex) {
      middleIndex = Math.floor(Math.random() * ProductImage.allImages.length);
    }
    if (middleIndex === rightIndex) {
      rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);// Adding additional conditional here to account for the added condition in the while
    }
  }
  
  var leftProductImage = ProductImage.allImages[leftIndex];
  var middleProductImage = ProductImage.allImages[middleIndex];
  var rightProductImage = ProductImage.allImages[rightIndex];
  
  return [leftProductImage, middleProductImage, rightProductImage];
}

function renderImages() {
  
  //  What is currently rendered?
  var currentlyRenderedImages = [leftImageElement.name, rightImageElement.name, middleImageElement.name];
  
  var newImages = generateRandomImages();
  
  // let's duscuss .includes
  //   method that loops through a data type (either a string or an array)
  //   and returns a boolean if it finds a match.
  
  //   ensure that there are not the images that were previously rendered
  //     What is going to be the new images currently rendered?
  //     images from the previous state to our new state cannot be duplicated.
  while (
    currentlyRenderedImages[0] === newImages[0].name ||
    currentlyRenderedImages[1] === newImages[0].name ||
    currentlyRenderedImages[2] === newImages[0].name ||
    currentlyRenderedImages[0] === newImages[1].name ||
    currentlyRenderedImages[1] === newImages[1].name ||
    currentlyRenderedImages[2] === newImages[1].name ||
    currentlyRenderedImages[0] === newImages[2].name ||
    currentlyRenderedImages[1] === newImages[2].name ||
    currentlyRenderedImages[2] === newImages[2].name ||
    currentlyRenderedImages[0] === newImages[0].name ||
    currentlyRenderedImages[1] === newImages[0].name ||
    currentlyRenderedImages[2] === newImages[0].name ||
    currentlyRenderedImages[0] === newImages[1].name ||
    currentlyRenderedImages[1] === newImages[1].name ||
    currentlyRenderedImages[2] === newImages[1].name ||
    currentlyRenderedImages[0] === newImages[2].name ||
    currentlyRenderedImages[1] === newImages[2].name ||
    currentlyRenderedImages[2] === newImages[2].name ||
    currentlyRenderedImages[0] === newImages[0].name ||
    currentlyRenderedImages[1] === newImages[0].name
    ) {
      newImages = generateRandomImages();
    }
    
    // render new images to the page
    leftImageElement.src = newImages[0].image;
    leftImageElement.name = newImages[0].name;
    newImages[0].timesShown++;
    
    middleImageElement.src = newImages[1].image;
    middleImageElement.name = newImages[1].name;
    newImages[1].timesShown++;
    
    rightImageElement.src = newImages[2].image;
    rightImageElement.name = newImages[2].name;
    newImages[2].timesShown++;
  }
  
  function handleImageClick(event) {
    roundsOfVoting--;
    for (var i = 0; i < ProductImage.allImages.length; i++) {
      if (event.target.name === ProductImage.allImages[i].name) {
        ProductImage.allImages[i].timesClicked++;
        console.log(ProductImage.allImages[i]);
      }
      event.preventDefault();
    }
    renderImages();
    if (!roundsOfVoting) {
      imageContainer.removeEventListener('click', handleImageClick); // anything that needs to happen afer voting is completed
      renderResults();
      renderChart();
      storeObjects(ProductImage.allImages);
      
      // var stringify = localStorage.getItem('image-info');
      // return JSON.parse.renderResults, stringify;
    }     
  }
  
  function storeObjects(obj) {
    var stringify = JSON.stringify(obj);
    localStorage.setItem('imageInfo', stringify);
  }
  function fetchObject(key) {
    var stringify = localStorage.getItem(key);
    return JSON.parse(stringify);
  }
  renderImages();
  imageContainer.addEventListener('click', handleImageClick);
  
  
  function renderResults() {
    var imageInfo = document.getElementById('image-info')
    for (var i = 0; i < ProductImage.allImages.length; i++) {
      var rowElement = document.createElement('tr');
      var nameElement = document.createElement('td');
      var cellElement = document.createElement('td');
      nameElement.textContent = ProductImage.allImages[i].name + ProductImage.allImages[i].timesClicked + ProductImage.allImages[i].timesShown;
      cellElement.textContent = ProductImage.allImages[i].timesClicked;
      cellElement.textContent = ProductImage.allImages[i].timesShown;
      rowElement.appendChild(nameElement);
      nameElement.appendChild(cellElement);
      rowElement.appendChild(cellElement);
      imageInfo.appendChild(rowElement);
    }
  }
  function fillProductsArray(){
    for (var i = 0; i < products.length; i++) { // Loop through the products 
      console.log(products[i]);
      new ProductImage(products[i]);
   }
  }
  // fillProductsArray();
function checkLocalStorage(){
  if (!localStorage.getItem('image-info')){
    populateStorage();
// if the data exists, grab that data then assign to the ProductImage array
  }else {
// if it doesn't, create data
setStyles();
  }
}
checkLocalStorage();
  
// // this grabs our canvas element and select a context called ('2d;);
// //    this operation enables us to draw 2 dimensional shapes use the ctx variable
// var ctx = document.getElementById('myChart').getContext('2d');

function renderChart() { 
// var ctx = document.getElementById('myChart').getContext('2d');
// var votesByProduct = [];
// var timesProductsAreShown = [];


for (var i = 0; i < ProductImage.allImages.length; i++) {
  votesByProduct.push(ProductImage.allImages[i].timesClicked);
  timesProductsAreShown.push(ProductImage.allImages[i].timesShown);
}

// This is an object constructor, from chart.js.  Because we have installed our chart.js file from the cdn, we should have access to a new constructor
var myChart = new Chart(ctx, {

  type: 'bar',
  data: {
    labels: products = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'],
    datasets: [{
      label: 'times clicked',
      data: votesByProduct, // array of numbers goes here
      // data: votesByProduct, 
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1
    },
    {
      label: 'times Shown',
      data: timesProductsAreShown,
      backgroundColor: [
        'rgba(300, 65, 132, 1)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(250, 100, 144, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
}  