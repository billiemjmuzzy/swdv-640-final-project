

// https://stackoverflow.com/questions/39447411/how-to-load-nav-menu-from-an-external-file-no-wamp-all-code-must-be-browser


$(function() {

  $("#header").load("../partials/header.html");

  function activeNav() {
      var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
       $("#nav ul li a").each(function(){
            if($(this).attr("href") == pgurl || $(this).attr("href") == '' )
            $(this).addClass("active");
       });
  }

  setTimeout(function() {
      activeNav();
  }, 100);

});


$(function() {

  $("#footer").load("../partials/footer.html");

  function activeNav() {
      var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
       $("#nav ul li a").each(function(){
            if($(this).attr("href") == pgurl || $(this).attr("href") == '' )
            $(this).addClass("active");
       });
  }

  setTimeout(function() {
      activeNav();
  }, 100);

});

// Counter 
(function ($){
  $.fn.counter = function() {
    const $this = $(this),
    numberFrom = parseInt($this.attr('data-from')),
    numberTo = parseInt($this.attr('data-to')),
    delta = numberTo - numberFrom,
    deltaPositive = delta > 0 ? 1 : 0,
    time = parseInt($this.attr('data-time')),
    changeTime = 10;
    
    let currentNumber = numberFrom,
    value = delta*changeTime/time;
    var interval1;
    const changeNumber = () => {
      currentNumber += value;
      //checks if currentNumber reached numberTo
      (deltaPositive && currentNumber >= numberTo) || (!deltaPositive &&currentNumber<= numberTo) ? currentNumber=numberTo : currentNumber;
      this.text(parseInt(currentNumber));
      currentNumber == numberTo ? clearInterval(interval1) : currentNumber;  
    }

    interval1 = setInterval(changeNumber,changeTime);
  }
}(jQuery));

$(document).ready(function(){

  $('.count-up').counter();
  $('.count1').counter();
  $('.count2').counter();
  $('.count3').counter();
  
  new WOW().init();
  
  setTimeout(function () {
    $('.count5').counter();
  }, 3000);
});

// object-fit polyfill run
objectFitImages();

/* init Jarallax */
jarallax(document.querySelectorAll('.jarallax'));

jarallax(document.querySelectorAll('.jarallax-keep-img'), {
    keepImg: true,
});