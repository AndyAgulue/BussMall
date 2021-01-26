'use strict';
// create a goat contructor
//   timesClicked
//   timesShown
//   image

function Products(asset) {
  this.timesClicked = 0;
  this.timesShown = 0;
  this.image = asset;

  Products.allAssets.push(this);
}

// Creates our allImages property on the GoatImage Contructor
Products.allAssets = [];


// creates the goatImage, and runs the operations within the constructor
new Products('assets/bag.jpg');
new Products('assets/banana.jpg');
new Products('assets/bathroom.jpg');
new Products('assets/boots.jpg');
new Products('assets/breakfast.jpg');
new Products('assets/bubblegum.jpg');
new Products('assets/chair.jpg');
new Products('assets/cthulhu.jpg');
new Products('assets/dog-duck.jpg');
new Products('assets/dragon.jpg');
new Products('assets/pen.jpg');
new Products('assets/pet-sweep.jpg');
new Products('assets/scissors.jpg');
new Products('assets/shark.jpg');
new Products('assets/sweep.png');
new Products('assets/tauntaun.jpg');
new Products('assets/unicorn.jpg');
new Products('assets/usb.gif');
new Products('assets/water-can.jpg');
new Products('assets/wine-glass.jpg');
console.log(Products.allAssets);

// select elements from my HTML to render goat stuff

var productBox = document.getElementById('photo-box');
var leftProduct = document.getElementById('left-photo');
var middleProduct = document.getElementById('middle-photo');
var rightProduct = document.getElementById('right-photo');

// generates 2 random goat images
function generateRandomProducts() {

  // randomIndex from our  array
  var leftIndex = Math.floor(Math.random() * Products.allAssets.length);
  var middleIndex = Math.floor(Math.random() * Products.allAssets.length);
  var rightIndex = Math.floor(Math.random() * Products.allAssets.length);

  while (leftIndex === middleIndex) {
    leftIndex = Math.floor(Math.random() * Products.allAssets.length);
  }if (middleIndex === rightIndex){
    middleIndex = Math.floor(Math.random() * Products.allAssets.length);
  }

  var leftAsset = Products.allAssets[leftIndex];
  var middleAsset = Products.allAssets[middleIndex];
  var rightAsset = Products.allAssets[rightIndex];

  return [leftAsset, middleAsset, rightAsset];
}

function renderAssets(leftAsset, middleAsset, rightAsset){
  leftAsset.src = leftAsset.assets;
  leftAsset.timesShown++;
  // leftGoatImage.setAttribute('data-id', leftGoat.image);
  
  middleAsset.src = middleAsset.assets;
  middleAsset.timeShown++;

  rightAsset.src = rightAsset.assets;
  rightAsset.timesShown++;
  // rightGoatImage.setAttribute('data-id', rightGoat.image);
}

// initialize our page
var randomProducts = generateRandomProducts();
renderAssets(randomProducts[0], randomProducts[1], randomProducts[2]);


// how do we do something everytime an image was clicked
productBox.addEventListener('click', function (event) {
  console.log(event.target); // the actual item that was clicked

  // how do identify which image is clicked.  Increment the object that was clicked.
  for (var i = 0; i < Products.allAssets.length; i++) {
    if (event.target.src.includes(Products.allAssets[i].image)) {
      Products.allAssets[i].timesClicked++;
      console.log(Products.allAssets[i]);
    }
  }
  var newAssets = generateRandomProducts();
  renderPhoto(newAssets[0], newAssets[1], newAssets[2]);
});