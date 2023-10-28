// Class that manage the carousel
class Carousel {

    // Constructor, initialise the carousel
    constructor() {



        // Get image elements
        this.img = [];
        this.img[0] = document.getElementById("carousel-image-0");
        this.img[1] = document.getElementById("carousel-image-1");
        this.img[2] = document.getElementById("carousel-image-2");
        this.img[3] = document.getElementById("carousel-image-3");
        this.img[4] = document.getElementById("carousel-image-4");
        this.img[5] = document.getElementById("carousel-image-5");

        // Set animation key frames forward and backward
        this.animForward  = ['mv0to5', 'mv1to0', 'mv2to1', 'mv3to2', 'mv4to3', 'mv5to4'];
        this.animBackward = ['mv0to1', 'mv1to2', 'mv2to3', 'mv3to4', 'mv4to5', 'mv5to0'];

        // Reset carousel 
        this.reset();
    }



    // Set a new image (src) to image at given position (pos)
    // 0 first image on the left
    // 2 middle image
    // 4 last image
    // 5 hidden image
    setImage(pos, src) {
        this.img[(pos+this.currentImage+4)%6].src = src;
    }

    // Hide an image at given position (pos)
    // 0 first image on the left
    // 2 middle image
    // 4 last image
    // 5 hidden image
    hideImage(pos) {
        this.img[(pos+this.currentImage+4)%6].style.visibility = 'hidden';
    }

    // Show an image at given position (pos)
    // 0 first image on the left
    // 2 middle image
    // 4 last image
    // 5 hidden image    
    showImage(pos) {
        this.img[(pos+this.currentImage+4)%6].style.visibility = 'visible';
    }

    // Reset carousel, set image 2 in the middle
    reset() {
        // Remove animations
        this.img.forEach((image) => {
            this.animForward.forEach((animation) => {
                image.classList.remove( animation );            
            })
            this.animBackward.forEach((animation) => {
                image.classList.remove( animation );            
            })
        })
        this.currentImage=2;
    }

    // Animate one image forward
    // If nextImage is defined, replace the hidden image (at position 5) with the new image
    next(nextImage) {
        
        // Set new image if requested
        if (nextImage !== undefined) this.setImage( 5 , nextImage );

        //  Animate    
        this.img.forEach((image, i) => {    
            
            // Remove animation
            this.animForward.forEach((animation) => { image.classList.remove( animation ); });
            this.animBackward.forEach((animation) => { image.classList.remove( animation ); });

            // Animate to next image
            image.classList.add( this.animForward[(-this.currentImage+i+8)%6] );
        })

        // Increase index to next image
        this.currentImage = (this.currentImage+1)%6;
    }


    // Animate one image backward
    // If previousImage is defined, replace the hidden image (at position 5) with the new image
    previous(previousImage) {
        
        // Set new image if requested
        if (previousImage !== undefined) this.setImage( 5, previousImage );

        //  Animate
        this.img.forEach((image, i) => {    
        //for (let i=0 ; i<=5 ; i++) {
            
            // Remove animations
            this.animForward.forEach((animation) => { image.classList.remove( animation ); });
            this.animBackward.forEach((animation) => { image.classList.remove( animation ); });
            
            // Animate to previous image
            image.classList.add( this.animBackward[(-this.currentImage+i+8)%6] );
        })

        // Decrease index to previous image
        this.currentImage = (this.currentImage+5)%6;
    }
}
// End of class


let carousel = new Carousel();

//carousel.hideImage(0);
//carousel.hideImage(1);

document.querySelector("#next").addEventListener("click",function(){

     carousel.showImage(5); carousel.next();

})

document.querySelector("#previous").addEventListener("click",function(event){
carousel.previous();   
event.preventDefault();
})

// Right click



// var intervalId = window.setInterval(function(){
//     autoSlide();
//   }, 2000);


// function autoSlide(){
//   carousel.showImage(5); 
//   carousel.next();
// }


document.addEventListener("DOMContentLoaded",function(){
    let carousel = new Carousel();
    
    var coll = document.getElementsByClassName("collapsible");
var i;
           
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

},false)

