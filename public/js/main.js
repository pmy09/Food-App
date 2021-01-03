const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#side-menu-toggle');

// const User = require('../models/user');

// const delItem = document.querySelector('.remove');
// console.log(delItem.parentElement.parentElement);

function backdropClickHandler() {
  backdrop.style.display = 'none';
  sideDrawer.classList.remove('open');
}

function menuToggleClickHandler() {
  backdrop.style.display = 'block';
  sideDrawer.classList.add('open');
}

function delHandler() {
  var item = this.parentElement.parentElement;
  console.log(item);
}

backdrop.addEventListener('click', backdropClickHandler);
menuToggle.addEventListener('click', menuToggleClickHandler);
// delItem.addEventListener('click', delHandler);



// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("kc_fab_main_btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function productOnLoad(){}
// When the user clicks the button, open the modal 
btn.onclick = function() {
    console.log('add product')
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// $('.remove').on('click',function(){
//   selectedId = $(this).attr('id')
//   console.log(selectedId);
//   $('selectedId').remove()
// })