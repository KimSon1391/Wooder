//Header
$(document).ready(function () {
  let header = $("header");
  let heightHeader = header.outerHeight();
  let slider = $(".slider");
  let backToTop = $(".back-to-top");

  //Change header color when scroll, back to top
  $(window).scroll(function () {
    let scrollY = $(window).scrollTop();
    if (scrollY > slider.outerHeight() - heightHeader) {
      header.addClass("active");
      backToTop.addClass("active");
    } else {
      header.removeClass("active");
      backToTop.removeClass("active");
    }
  });
  //back to top click
  backToTop.click(function () {
    $(window).scrollTop(0);
  });

  //Click to scroll to section in menu
  let headerMenu = $(".header__menu li a");
  let sections = [];

  headerMenu.each(function (index) {
    let sectionName = $(this).attr("href").replace("#", "");
    let section = $("." + sectionName);
    sections.push(section);

    $(this).click(function (e) {
      e.preventDefault();

      headerMenu.removeClass("active");
      $(this).addClass("active");

      $(window).scrollTop(section.offset().top - heightHeader + 1);
    });

    $(window).scroll(function () {
      let position = $(window).scrollTop();

      $(sections).each(function (index) {
        if (
          position > $(this).offset().top - heightHeader &&
          position < $(this).offset().top + $(this).outerHeight()
        ) {
          headerMenu.removeClass("active");
          $(headerMenu[index]).addClass("active");
        } else {
          $(headerMenu[index]).removeClass("active");
        }
      });
    });
  });

  //Language
  let langCurrent = $(".header__lang-current");
  let langOpt = $(".lang__option");
  let langItem = $(".lang__option-item");
  let langSpan = $(".header__lang-current span");

  langCurrent.click(function (e) {
    e.stopPropagation();
    langOpt.toggleClass("active");
  });
  langItem.click(function () {
    let langTemp = langSpan.text();
    langSpan.text($(this).text());
    $(this).text(langTemp);
  });

  $(document).click(function (e) {
    langOpt.removeClass("active");
    removeNav();
  });

  function showNavBtn() {
    let windowWidth = $(window).width();
    if (windowWidth < 992) {
      navBtn.addClass("active");
    } else {
      navBtn.removeClass("active");
      navMenu.removeClass("active");
    }
  }
  function removeNav() {
    navMenu.removeClass("active");
    bgopacity.removeClass("active");
    navBtn.removeClass("transform");
  }

  let navBtn = $(".navbtn");
  let navMenu = $(".nav");
  let bgopacity = $(".bgopacity");
  navBtn.click(function (e) {
    e.stopPropagation();
    navMenu.toggleClass("active");
    bgopacity.toggleClass("active");
    $(this).toggleClass("transform");
  });

  $(window).scroll(function () {
    removeNav();
  });

  showNavBtn();

  $(window).resize(function () {
    showNavBtn();
  });

  //PopUp video quality
  let playBtn = $(".quality__item-img");
  let popUpVideo = $(".popup-video");
  let close = $(".close");
  let iframe = $("iframe");
  playBtn.click(function (e) {
    e.stopPropagation();
    let videoId = $(this).attr("data-video-id");
    iframe.attr("src", `https://www.youtube.com/embed/${videoId}?autoplay=1`);
    popUpVideo.addClass("active");
  });
  close.click(function () {
    iframe.attr("src", "");
    popUpVideo.removeClass("active");
  });
  $(document).click(function () {
    iframe.attr("src", "");
    popUpVideo.removeClass("active");
  });

  // //News Tabs
  let tab = $(".tab");
  let tabItem = $(".news-wrap");
  tab.click(function () {
    tab.removeClass("active");
    $(this).addClass("active");

    let tabIndex = $(this).index();
    let tabItemIndex = tabItem.eq(tabIndex);

    tabItem.removeClass("active");
    tabItemIndex.addClass("active");
  });

  //Faq accordian
  let faqBtn = $(".accordian__title");
  faqBtn.click(function () {
    faqBtn.next().not($(this).next()).slideUp();
    $(this).next().slideToggle();

    faqBtn.parent().not($(this).parent()).removeClass("active");
    $(this).parent().toggleClass("active");
  });

  //Slider
  let sliderItem = $(".slider__item");
  let currentSlider = 0;
  let sliderDot = $(".page__dot-item");
  let sliderNumber = $(".page__number");

  sliderItem.each(function (index) {
    currentSlider = $(this).hasClass("active") ? index : currentSlider;
  });

  function showNumber(index) {
    sliderNumber.html(index.toString().padStart(2, "0"));
  }

  function goTo(index) {
    $(sliderItem[currentSlider]).removeClass("active");
    $(sliderItem[index]).addClass("active");
    $(sliderDot[currentSlider]).removeClass("active");
    $(sliderDot[index]).addClass("active");
    currentSlider = index;
    showNumber(currentSlider + 1);
  }

  $(".--next").click(function () {
    if (currentSlider < sliderItem.length - 1) {
      goTo(currentSlider + 1);
    } else {
      goTo(0);
    }
  });

  $(".--prev").click(function () {
    if (currentSlider > 0) {
      goTo(currentSlider - 1);
    } else {
      goTo(sliderItem.length - 1);
    }
  });

  sliderDot.each(function (index) {
    $(this).click(function () {
      goTo(index);
    });
  });
});

$(window).on("load", function () {
  // Photo swipe lib
  initPhotoSwipeFromDOM(".gallery__grid");

  // AOS lib
  AOS.init({
    duration: 1000,
  });

  // loading show
  $(".loading").removeClass("active");
});

let $carousel = $(".slider-wrap");
$carousel.flickity({
  //Options
  cellAlign: "left",
  contain: true,
  wrapAround: true,
  prevNextButtons: false,
  autoPlay: true,
  friction: 0.8,
  on: {
    ready: function () {
      let dot = $(".flickity-page-dots");
      let paging = $(".page__dot");
      dot.appendTo(paging);
    },
    change: function (index) {
      let number = $(".page__number");
      let indexSlider = index + 1;
      number.text(indexSlider.toString().padStart(2, 0));
    },
  },
});
//prev , next button
$(".--next").on("click", function () {
  $carousel.flickity("next");
});
$(".--prev").on("click", function () {
  $carousel.flickity("previous");
});

//Gallery Photo Swiper
var initPhotoSwipeFromDOM = function (gallerySelector) {
  var parseThumbnailElements = function (el) {
    var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      size,
      item;
    for (var i = 0; i < numNodes; i++) {
      figureEl = thumbElements[i]; // <figure> element
      if (figureEl.nodeType !== 1) {
        continue;
      }
      linkEl = figureEl.children[0]; // <a> element
      size = linkEl.getAttribute("data-size").split("x");
      item = {
        src: linkEl.getAttribute("href"),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10),
      };
      if (figureEl.children.length > 1) {
        item.title = figureEl.children[1].innerHTML;
      }
      if (linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute("src");
      }
      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }
    return items;
  };
  var closest = function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };
  var onThumbnailsClick = function (e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    var eTarget = e.target || e.srcElement;
    var clickedListItem = closest(eTarget, function (el) {
      return el.tagName && el.tagName.toUpperCase() === "FIGURE";
    });
    if (!clickedListItem) {
      return;
    }
    var clickedGallery = clickedListItem.parentNode,
      childNodes = clickedListItem.parentNode.childNodes,
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index;
    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }
      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }
    if (index >= 0) {
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };
  var photoswipeParseHash = function () {
    var hash = window.location.hash.substring(1),
      params = {};
    if (hash.length < 5) {
      return params;
    }
    var vars = hash.split("&");
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split("=");
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }
    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }
    return params;
  };
  var openPhotoSwipe = function (
    index,
    galleryElement,
    disableAnimation,
    fromURL
  ) {
    var pswpElement = document.querySelectorAll(".pswp")[0],
      gallery,
      options,
      items;
    items = parseThumbnailElements(galleryElement);
    options = {
      galleryUID: galleryElement.getAttribute("data-pswp-uid"),
      getThumbBoundsFn: function (index) {
        var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
          pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
      },
      showAnimationDuration: 0,
      hideAnimationDuration: 0,
    };
    if (fromURL) {
      if (options.galleryPIDs) {
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }
    if (isNaN(options.index)) {
      return;
    }
    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };
  var galleryElements = document.querySelectorAll(gallerySelector);
  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute("data-pswp-uid", i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }
  var hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }
};

//Photo Slider
$carouselPhoto = $(".photo-wrap");
$carouselPhoto.flickity({
  //Options
  freeScroll: true,
  contain: true,
  wrapAround: true,
  pageDots: false,
  prevNextButtons: false,
  friction: 0.6,
  autoPlay: true,
});
