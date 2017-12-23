$(document).ready(function() {
	// function pageScroll() {
	// 	window.scrollBy(0,1);
	//     scrolldelay = setTimeout(pageScroll,.2);
	//     if ($(document).scrollTop() > 4208) {
	//     	$(document).scrollTop(0);
	//     }
	// }

	var doc = window.document,
  context = doc.querySelector('.js-loop'),
  clones = context.querySelectorAll('.clone'),
  disableScroll = false,
  scrollHeight = 0,
  scrollPos = 0,
  clonesHeight = 0,
  i = 0;

	function getScrollPos () {
	  return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
	}

	function setScrollPos (pos) {
	  context.scrollTop = pos;
	}

	function getClonesHeight () {
	  clonesHeight = 0;

	  for (i = 0; i < clones.length; i += 1) {
	    clonesHeight = clonesHeight + clones[i].offsetHeight;
	  }

	  return clonesHeight;
	}

	function reCalc () {
	  scrollPos = getScrollPos();
	  scrollHeight = context.scrollHeight;
	  clonesHeight = getClonesHeight();

	  if (scrollPos <= 0) {
	    setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
	  }
	}

	function scrollUpdate () {
	  if (!disableScroll) {
	    scrollPos = getScrollPos();

	    if (clonesHeight + scrollPos >= scrollHeight) {
	      // Scroll to the top when you’ve reached the bottom
	      setScrollPos(1); // Scroll down 1 pixel to allow upwards scrolling
	      disableScroll = true;
	    } else if (scrollPos <= 0) {
	      // Scroll to the bottom when you reach the top
	      setScrollPos(scrollHeight - clonesHeight);
	      disableScroll = true;
	    }
	  }

	  if (disableScroll) {
	    // Disable scroll-jumping for a short time to avoid flickering
	    window.setTimeout(function () {
	      disableScroll = false;
	    }, 40);
	  }
	}

	window.requestAnimationFrame(reCalc);

	context.addEventListener('scroll', function () {
	  window.requestAnimationFrame(scrollUpdate);
	}, false);

	window.addEventListener('resize', function () {
	  window.requestAnimationFrame(reCalc);
	}, false);
});

