import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  // let defaultTransform = 0;

  // let next = $('#next');
  // let prev = $('#prev');

  // function goNext() {
  //   defaultTransform = defaultTransform - 398;
  //   var slider = $('#slider');
  //   if (Math.abs(defaultTransform) >= slider[0].scrollWidth / 1.7) {
  //     defaultTransform = 0;
  //   }
  //   slider.css('transform', 'translateX(' + defaultTransform + 'px)');
  // }

  // function goPrev() {
  //   var slider = $('#slider');
  //   if (Math.abs(defaultTransform) === 0) {
  //     defaultTransform = 0;
  //   } else {
  //     defaultTransform = defaultTransform + 398;
  //   }
  //   slider.css('transform', 'translateX(' + defaultTransform + 'px)');
  // }

  // next.on('click', goNext);
  // prev.on('click', goPrev);











  // Carousel
// var carousels = document.querySelectorAll('.carousel');
// carousels.forEach(function(carousel) {
//   var carouselSlides = carousel.querySelector('.carousel-slides');
//   var slide = carousel.querySelector('.carousel-slides div');

//   // Next button
//   var carouselNavNext = carousel.querySelector('.carousel-nav-next');
//   carouselNavNext.addEventListener('click', function(event) {
//     event.preventDefault();
//     carouselSlides.scrollLeft = carouselSlides.scrollLeft + slide.clientWidth;
//   });

//   // Prev button
//   var carouselNavPrev = carousel.querySelector('.carousel-nav-prev');
//   carouselNavPrev.addEventListener('click', function(event) {
//     event.preventDefault();
//     carouselSlides.scrollLeft = carouselSlides.scrollLeft - slide.clientWidth;
//   });

//   // Sorting slides
//   function updateSort(el) {
//     var scrollWidth = el.scrollWidth;
//     var scrollLeft = el.scrollLeft;
//     var width = el.offsetWidth;
//     var items = el.children;

//     if (scrollLeft <= width) {
//       el.prepend(items[items.length - 1]);
//       el.scrollLeft = scrollLeft + width;
//     }
//     if (scrollWidth - scrollLeft - width <= 0) {
//       el.append(items[0]);
//       el.scrollLeft = scrollLeft - width;
//     }
//   }

//   var scrollDebounce = true;
//   carouselSlides.addEventListener('scrollend', function() {
//     if (scrollDebounce) {
//       scrollDebounce = false;
//       updateSort(carouselSlides);
//       setTimeout(function () { scrollDebounce = true; }, 500);
//     }
//   });

//   updateSort(carouselSlides);

//   setInterval(function() {
//     carouselNavNext.click();
//   }, 5000);
// });
}
