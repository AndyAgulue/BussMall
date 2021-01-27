'use strict';
// create a goat contructor
//   timesClicked
//   timesShown
//   image

function Products(image) {
  this.timesClicked = 0;
  this.timesShown = 0;
  this.image = image;

  Products.allImages.push(this);
}

// Creates our allImages property on the GoatImage Contructor
Products.allImages = [];


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
console.log(Products.allImages);

// select elements from my HTML to render goat stuff

var productBox = document.getElementById('photo-box');
var leftProduct = document.getElementById('left-photo');
var middleProduct = document.getElementById('middle-photo');
var rightProduct = document.getElementById('right-photo');

// generates 2 random goat images
function generateRandomProducts() {

  // randomIndex from our  array
  var leftIndex = Math.floor(Math.random() * Products.allImages.length);
  var middleIndex = Math.floor(Math.random() * Products.allImages.length);
  var rightIndex = Math.floor(Math.random() * Products.allImages.length);

  while (rightIndex === middleIndex) {
    rightIndex = Math.floor(Math.random() * Products.allImages.length);
  }if (middleIndex === leftIndex){
    middleIndex = Math.floor(Math.random() * Products.allImages.length);
  }

  var leftProduct = Products.allImages[leftIndex];
  var middleProduct = Products.allImages[middleIndex];
  var rightProduct = Products.allImages[rightIndex];

  return [leftProduct, middleProduct, rightProduct];
}
console.log(leftProduct, middleProduct, rightProduct)

function renderAssets(leftProduct, middleProduct, rightProduct){
  leftAsset.src =  'left-photo', leftProduct.image;
  leftProduct.timesShown++;
  // leftGoatImage.setAttribute('data-id', leftGoat.image);
  
  middleAsset.src = 'middle-photo', middleProduct.image;
  middleProduct.timeShown++;

  rightAsset.src = 'right-photo', rightProduct.image;
  rightAsset.timesShown++;
  // rightGoatImage.setAttribute('data-id', rightGoat.image);
}
console.log(leftProduct, middleProduct, rightProduct )
// initialize our page
var randomProduct = generateRandomProducts();
renderAssets(randomProduct[0], randomProduct[1], randomProduct[2]);


// how do we do something everytime an image was clicked
productBox.addEventListener('click', function (event) {
  console.log(event.target); // the actual item that was clicked

  // how do identify which image is clicked.  Increment the object that was clicked.
  for (var i = 0; i < Products.allImages.length; i++) {
    if (event.target.src.includes(Products.allImages[i].image)) {
      Products.allImages[i].timesClicked++;
      console.log(Products.allImages[i]);
    }
  }
  var newProducts = generateRandomProducts();
  renderAssets(newProducts[0], newProducts[1], newProducts[2]);
});