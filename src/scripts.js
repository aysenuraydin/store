
$(function(){

    $('.alert-button').click(function(event) {
      $(this).closest('.alert').toggleClass('hidden').toggleClass('block');
    });

    let defaultTransform = 0;

    let next = $('#next');
    let prev = $('#prev');

    function goNext() {
      defaultTransform = defaultTransform - 398;
      var slider = $('#slider');
      if (Math.abs(defaultTransform) >= slider[0].scrollWidth / 1.7) {
        defaultTransform = 0;
      }
      slider.css('transform', 'translateX(' + defaultTransform + 'px)');
    }

    function goPrev() {
      var slider = $('#slider');
      if (Math.abs(defaultTransform) === 0) {
        defaultTransform = 0;
      } else {
        defaultTransform = defaultTransform + 398;
      }
      slider.css('transform', 'translateX(' + defaultTransform + 'px)');
    }

    next.on('click', goNext);
    prev.on('click', goPrev);


    $('#search-link').click((event)=> {
      event.stopPropagation();
      $('#modal-search').toggleClass('hidden').toggleClass('block');
    });

    $('#modal-search').click((event)=> {
      event.stopPropagation();
      $('#modal-search').toggleClass('hidden').toggleClass('block');
      if($('#modal-card').hasClass('block')){
        $('#modal-card').toggleClass('hidden').toggleClass('block');
      }
      if($('#modal-fav').hasClass('block')){
        $('#modal-fav').toggleClass('hidden').toggleClass('block');
      }
    });
    $('#search-box').click((event)=> {
      event.stopPropagation();
    });


    $('#close').click(()=> {
      $('.modal-window').toggleClass('hidden').toggleClass('block');
    });
    $('.modal-link').click((event)=> {
      event.stopPropagation();
      $('.modal-window').toggleClass('hidden').toggleClass('block');
    });


    $('.modal-window').click((event)=> {
      event.stopPropagation();
      $('.modal-window').toggleClass('hidden').toggleClass('block');
    });
    $('#modal-product').click((event)=> {
      event.stopPropagation();
    });


    $('#fav-button').click(()=> {
      $('#modal-fav').toggleClass('hidden').toggleClass('block');
    });
    $('#fav-link').click((event)=> {
      event.stopPropagation();
      $('#modal-fav').toggleClass('hidden').toggleClass('block');
      $('#fav-link i').toggleClass('fa-solid').toggleClass('fa-regular');
      if($('#modal-card').hasClass('block')){
        $('#modal-card').toggleClass('hidden').toggleClass('block');
      }
    });
    $('.fav-blur').click((event)=> {
      event.stopPropagation();
      $('#modal-fav').toggleClass('hidden').toggleClass('block');
      if($('#fav-link i').hasClass('fa-solid')){
        $('#fav-link i').toggleClass('fa-solid').toggleClass('fa-regular');
      }
    });


    $('#cart-link').click((event)=> {
      event.stopPropagation();
      $('#modal-card').toggleClass('hidden').toggleClass('block');
      if($('#modal-fav').hasClass('block')){
        $('#modal-fav').toggleClass('hidden').toggleClass('block');
      }
    });
    $('#cart-button').click(()=> {
      $('#modal-card').toggleClass('hidden').toggleClass('block');
    });
    $('.cart-blur').click((event)=> {
      event.stopPropagation();
      $('#modal-card').toggleClass('hidden').toggleClass('block');
    });

    $('#banner-button').click((event)=> {
      event.stopPropagation();
      $('#banner').toggleClass('hidden');
    });


    // var contentId = $(this).data("id");
    // $.ajax({
    //   url: '/getContent',
    //   type: 'GET',
    //   data: { id: contentId },
    //   success: function(response) {
    //     $('#model-content').html('fbsrdenbfgrensgbsrgbrwmgb');
    //   },
    //   error: function() {
    //     alert("Hata oluştu, lütfen tekrar deneyin.");
    //   }
    // });

    $('.content').richText();



  // Carousel
  var carousels = document.querySelectorAll('.carousel');
  carousels.forEach(function(carousel) {
  var carouselSlides = carousel.querySelector('.carousel-slides');
  var slide = carousel.querySelector('.carousel-slides div');
  // Next button
  var carouselNavNext = carousel.querySelector('.carousel-nav-next');
  carouselNavNext.addEventListener('click', function(event) {
    event.preventDefault();
    carouselSlides.scrollLeft = carouselSlides.scrollLeft + slide.clientWidth;
  });
  // Prev button
  var carouselNavPrev = carousel.querySelector('.carousel-nav-prev');
  carouselNavPrev.addEventListener('click', function(event) {
    event.preventDefault();
    carouselSlides.scrollLeft = carouselSlides.scrollLeft - slide.clientWidth;
  });

    // Sorting slides
    function updateSort(el) {
      var scrollWidth = el.scrollWidth;
      var scrollLeft = el.scrollLeft;
      var width = el.offsetWidth;
      var items = el.children;
      if (scrollLeft <= width) {
        el.prepend(items[items.length - 1]);
        el.scrollLeft = scrollLeft + width;
      }
      if (scrollWidth - scrollLeft - width <= 0) {
        el.append(items[0]);
        el.scrollLeft = scrollLeft - width;
      }
    }

    var scrollDebounce = true;
    carouselSlides.addEventListener('scrollend', function() {
      if (scrollDebounce) {
        scrollDebounce = false;
        updateSort(carouselSlides);
        setTimeout(function () { scrollDebounce = true; }, 500);
      }
    });
    updateSort(carouselSlides);
    setInterval(function() {
      carouselNavNext.click();
    }, 5000);
  });


  // let tabsContainer = document.querySelector("#tabs");
  // let tabTogglers = tabsContainer.querySelectorAll("#tabs a");
  // console.log(tabTogglers);
  // tabTogglers.forEach(function(toggler) {
  //   toggler.addEventListener("click", function(e) {
  //     e.preventDefault();
  //     let tabName = this.getAttribute("href");
  //     let tabContents = document.querySelector("#tab-contents");
  //     for (let i = 0; i < tabContents.children.length; i++) {
  //       tabTogglers[i].parentElement.classList.remove("border-t", "border-r", "border-l", "-mb-px", "bg-white");  tabContents.children[i].classList.remove("hidden");
  //       if ("#" + tabContents.children[i].id === tabName) {
  //         continue;
  //       }
  //       tabContents.children[i].classList.add("hidden");
  //     }
  //     e.target.parentElement.classList.add("border-t", "border-r", "border-l", "-mb-px", "bg-white");
  //   });
  // });


   });

  const colorMax = 192;
  const scrollBreakpoint = $(window).height() * 0.9;
  $(document).ready(function () {
    setupScrollListener();
    setupScrollEvent();
  });
  function setupScrollEvent() {
    $('.scroll-top').on('click', function () {
      $('html, body').animate({ scrollTop: 0 }, 250);
    });
  }
  function setupScrollListener() {
    $(window).on('scroll', function () {
      const scrollButton = $('.scroll-top');
      const scrollOffset = $(window).scrollTop();

      if (scrollOffset >= scrollBreakpoint) {
        scrollButton.addClass('visible').removeClass('hidden');
      } else {
        scrollButton.removeClass('visible').addClass('hidden');
      }
    });
  }

  function randVal(max) {
    return Math.floor(Math.random() * max);
  }

//scrol button


  function toggleAccordion(id) {
    const allAccordions = document.querySelectorAll("[id^='accordion']");
    allAccordions.forEach((accordion) => {
      if (accordion.id === `accordion${id}`) {
        if (accordion.classList.contains("max-h-0")) {
          accordion.classList.remove("max-h-0", "overflow-hidden");
          accordion.classList.add("max-h-screen");
        } else {
          accordion.classList.add("max-h-0", "overflow-hidden");
          accordion.classList.remove("max-h-screen");
        }
      } else {
        accordion.classList.add("max-h-0", "overflow-hidden");
        accordion.classList.remove("max-h-screen");
      }
    });
  }

  function toggleSelect() {
    const checkboxes = document.querySelectorAll(".contact-checkbox");
    const allSelected = Array.from(checkboxes).every(checkbox => checkbox.checked);
    checkboxes.forEach(checkbox => {
      checkbox.checked = !allSelected;
    });
  }




