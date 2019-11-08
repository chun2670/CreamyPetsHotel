// 回上頁按鈕 (newsPost)
function goBack() {
  window.history.back();
}

$(document).ready(function () {
  // alert('yes');
// Navbar - 滾動超過 section #hero 時，navbar 改變顏色
  $(function () {
    $(window).scroll(function () {
      var $nav = $(".navbar_scroll");
      // var $hero = $('#hero');
      // $nav.toggleClass('scrolled', $(this).scrollTop() > $hero.height());
      $nav.toggleClass('scrolled', $(this).scrollTop() > 300);
    });
  });
// Navbar - hover navbar 的下拉式選單
  $('.navbar__list__menu').hover(function (event) {
    // 自動 add or remove .active 這個 class
    // 當 .navbar__list__menu hover 的時候在它的上一層裡面尋找 .navbar__list__menu--open 這個 class. (.stop()為 slide到一半可中斷)
    $(this).toggleClass('active');
    $(this).parent().find('.navbar__list__menu--open').stop().slideDown();
    // 尋找除了自已以外的 .navbar__list__menu--open，並 slideUp 關起來。
    // 尋找除了自已以外的 .navbar__list__menu，並移除 .active。
    $(this).parent().siblings().find('.navbar__list__menu--open').stop().slideUp();
    $(this).parent().siblings().find('.navbar__list__menu').removeClass('active');
  });
  // 當滑鼠離開 .navbar__list 這整個 gruop 時，尋找裡面的 .navbar__list__menu--open，並 slideUp 關起來。
  $('.navbar__list').mouseleave(function (event) {
    $(this).find('.navbar__list__menu--open').stop().slideUp();
  });
  // aside navbar - 點擊漢堡按鈕，開始側邊選單
  $('.asideMenu__toggle').click(function (event) {
    $('body').toggleClass('open');
    // 點選除了 class="aside"" 元素以外的所有 < div > 元素，把 asideMenu 關閉
    $("div:not(.aside)").click(function () {
      $('body').removeClass('open');
      return false;
    });
  });
  // aside 側邊選單裡的 List 下拉式選單設定 1. 針對 ul 本身底層的 li 做收合。 2. 針對其它的同層 li 關閉
  $('.aside__menu__dropdown').click(function (e) {
    e.preventDefault();
    $(this).parent().find('.aside__menu__dropdown--open').slideToggle();
    $(this).parent().siblings().find('.aside__menu__dropdown--open').slideUp();
  });

  // back to top
  // hide #back-top first
  $('#backtoTop').hide();
  // fade in #back-top
  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('#backtoTop').fadeIn();
      } else {
        $('#backtoTop').fadeOut();
      }
    });
    // scroll body to 0px on click
    $('#backtoTop a').click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 100);
      return false;
    });
  });


  // footer
  // 複製連結
  $('[data-trigger="copy"]').on('click', function (e) {
    var temp = $('<input>'); // 建立input物件
    $('body').append(temp); // 將input物件增加到body
    var url = $(this).data('url'); // 取得要複製的連結
    temp.val(url).select(); // 將連結加到input物件value
    document.execCommand('copy'); // 複製
    temp.remove(); // 移除input物件
    $('[data-toggle="popover"]').popover();  // 已複製連結提示訊息
  });

// 相關認證 - 當螢幕大於 pad 的寬度 768px 時，點擊 .certificate__pic 會隱藏說明文字欄
  $(".certificate__pic").on("click", function (e) {
    var src = $(window).width();
    if (src > 769)  {
      $(this).parent().find('.certificate__content').stop().fadeToggle(500);
    };
  });

// wow 動畫
  new WOW().init();
  var wow = new WOW(
    {
      boxClass: 'wow',      // 要套用WOW.js縮需要的動畫class(預設是wow)
      animateClass: 'animated', // 要"動起來"的動畫(預設是animated, 因此如果你有其他動畫library要使用也可以在這裡調整)
      offset: 0,          // 距離顯示多遠開始顯示動畫 (預設是0, 因此捲動到顯示時才出現動畫)
      mobile: true,       // 手機上是否要套用動畫 (預設是true)
      live: true,       // 非同步產生的內容是否也要套用 (預設是true, 非常適合搭配SPA)
      callback: function (box) {
        // 當每個要開始時, 呼叫這裡面的內容, 參數是要開始進行動畫特效的element DOM
      },
      scrollContainer: null, // 可以設定成只套用在某個container中捲動才呈現, 不設定就是整個視窗
      resetAnimation: true,
    }
  );
  wow.init();


// About - Swiper-1 照片輪播
  var swiper = new Swiper('.swiper-1', {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    effect: "fade",
    speed: 1500,  //照片淡出速度
    autoplay: {
      delay: 2000,  //自動播放間隔時間
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });


// Beauty - Swiper-2 照片輪播
  var swiper = new Swiper('.swiper-2', {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    effect: "fade",
    speed: 1000,  //照片淡出速度
    // autoplay: {
    //   delay: 1800,  //自動播放間隔時間
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.beauty__album__btn-next',
      prevEl: '.beauty__album__btn-prev',
    },
  });

  // index 首頁 News 區塊 - Swiper-3
  var swiper = new Swiper('.swiper-3', {
    slidesPerView: 'auto',
    // spaceBetween: 60,
    freeMode: true,
    grabCursor: true,
    cssMode: true,
    // mousewheel: true,
    // keyboard: true,
    navigation: {
      nextEl: '.circleBtn__next',
      prevEl: '.circleBtn__prev',
    },
  });

  // Well - Received 顧客好評 - Swiper-4
  var swiper = new Swiper('.swiper-4', {
    spaceBetween: 30,
    grabCursor: true,
    loop: true, // 循環才不會從最後一個往回刷至第一個
    autoplay: {
      delay: 3000,
    },
  });


// 住宿環境 facilities
// isotope 相片集 plugin
  var $grid = $('.grid').isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows',
    getSortData: {
      name: '.name',
      symbol: '.symbol',
      number: '.number parseInt',
      category: '[data-category]',
      weight: function (itemElem) {
        var weight = $(itemElem).find('.weight').text();
        return parseFloat(weight.replace(/[\(\)]/g, ''));
      }
    }
  });
  // filter functions
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function () {
      var number = $(this).find('.number').text();
      return parseInt(number, 10) > 50;
    },
    // show if name ends with -ium
    ium: function () {
      var name = $(this).find('.name').text();
      return name.match(/ium$/);
    }
  };
  // bind filter button click
  $('#filters').on('click', 'button', function () {
    var filterValue = $(this).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[filterValue] || filterValue;
    $grid.isotope({ filter: filterValue });
  });
  $('.button-group').each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function () {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
    });
  });

  // 燈箱效果 lightbox
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
  })

// news 最新消息
//   螢幕寬度 < 769 且超過 30個文字以 "..." 取代
//   螢幕寬度 >= 769 且超過 80個文字以 "..." 取代
  var src = $(window).width();
  $(".news__content-p").each(function () {
    var $lenPhone = 30;
    var $lenPad = 80;
    var src = $(window).width();
    if (src < 769) {
      if ($(this).text().length > $lenPhone) {
        var $text = $(this).text().substring(0, $lenPhone - 1) + "...";
        $(this).text($text);
      };
    };
    if (src >= 769) {
      if ($(this).text().length > $lenPad) {
        var $text = $(this).text().substring(0, $lenPad - 1) + "...";
        $(this).text($text);
      };   
    };
  });

  // index 首頁
  // skrollr初始化設定
  // var s = skrollr.init();


  // 取得當天日期 - news, newspost
  var today = new Date();
  var tdm = today.getMonth() + 1;
  if (tdm.toString().length == 1) {
    tdm = "0" + tdm;
  };
  var tdd = today.getDate();
  if (tdd.toString().length == 1) {
    tdd = "0" + tdd;
  };
  // td = Today.getFullYear() + '/' + tdm + '/' + tdd;
  $('.today_d').html(tdd);
  $('.today_m').html(tdm);
  $('.today_y').html(today.getFullYear());


});



// scrollReveal 動畫
window.sr = ScrollReveal({
  // 初始值參數設定
  // origin: "left",  // 起始位置
  distance: "50px",  // 距離
  duration: 800,  // 動畫時間
  delay: 0,  // 動畫延遲時間
  // rotate: { x: 0, y: 0, z: 0 },  // 旋轉角度
  opacity: 0.2,  // 透明度
  // scale: 0.9, // 縮放比例
  easing: "ease-in-out", // 動畫速度曲線
  // easing 接受的數值: ease ease-in ease -in -out ease - out step - start step - end steps() cubic - bezier() // 贝塞尔曲线
  // easing: "cubic-bezier(0.6, 0.2, 0.1, 1)", // 動畫速度曲線
  // container: window.document.documentElement, // 外層
  mobile: true, // 支援行動裝置
  reset: true, // 每次都啟動動畫
  useDelay: "always", // 延遲動畫次數
  viewFactor: 0.3, // 當該物件在可視範圍內，則顯示此物件(0.2表示可視範圍20%)
  viewOffset: { top: 100, right: 0, bottom: 0, left: 0 }, // 當外層有設定間隔造成偏移，則請設定在此維持精準度
  // beforeReveal: function (domEl) { console.log(1) }, // 當啟動顯示前，則執行此函式
  // beforeReset: function (domEl) { console.log(2) }, // 當重啟前，則執行此函式
  // afterReveal: function (domEl) { console.log(3) }, // 當啟動後，則執行此函式
  // afterReset: function (domEl) { console.log(4) } // 當重啟後，則執行此函式
});
sr.reveal(".srFadeInRight", {
  // 套用初始值
});
sr.reveal(".srFadeInTop", {
  origin: "bottom",  // 起
  distance: "120px",  // 距離
  duration: 1200,  // 動畫時間
  opacity: 0.9,  // 透明度
  // easing: "cubic-bezier(0.0, 0.0, 1.0, 1.0)",
});
// index.html NEWS title
sr.reveal(".srFadeInLeft_1", {
  origin: "right",  // 起
  duration: 400,  // 動畫時間
  delay: 0,  // 動畫延遲
  easing: "cubic-bezier(0.0, 0.0, 1.0, 1.0)",
});
sr.reveal(".srFadeInLeft_2", {
  origin: "right",  // 起始位置
  duration: 400,  // 動畫時間
  delay: 200,  // 動畫延遲時間
  opacity: 0.4,  // 透明度
  easing: "cubic-bezier(0.0, 0.0, 1.0, 1.0)",
});
sr.reveal(".srFadeInLeft_3", {
  origin: "right",  // 起始位置
  duration: 400,  // 動畫時間
  delay: 400,  // 動畫延遲時間
  opacity: 0.6,  // 透明度
  easing: "cubic-bezier(0.0, 0.0, 1.0, 1.0)",
});
sr.reveal(".srFadeInLeft_4", {
  origin: "right",  // 起始位置
  duration: 500,  // 動畫時間
  delay: 600,  // 動畫延遲時間
  opacity: 0.8,  // 透明度
  easing: "cubic-bezier(0.0, 0.0, 1.0, 1.0)",
});
// sr.reveal('.srFlipX_1', 'delay: 500,');


// contact send message
var form = $('#contact'),
  submit = form.find('[name="submit"]');
form.on('submit', function (e) {
  e.preventDefault();
  if (submit.attr('value') !== 'Send')
    return;
  var valid = true;
  form.find('input, textarea').removeClass('invalid').each(function () {
    if (!this.value) {
      $(this).addClass('invalid');
      valid = false;
    }
  });
  if (!valid) {
    form.animate({ left: '-1em' }, 50)
      .animate({ left: '1em' }, 100)
      .animate({ left: '0' }, 50);
  } else {
    submit.attr('value', 'Sending...')
      .css({
        boxShadow: '0 0 200em 200em rgba(225, 225, 225, 0.6)',
        backgroundColor: '#1D88CA'
      });
    //  AJAX response
    setTimeout(function () {
      // 滑動label及輸入
      // 當AJAX傳回success
      // no animation for AJAX failure yet
      form.find('label')
        .animate({ left: '100%' }, 500)
        .animate({ opacity: '0' }, 500);
    }, 1000);
    setTimeout(function () {
      //  show thank you
      submit.attr('value', 'Thank you : )')
        .css({ boxShadow: 'none' });
    }, 2000);
    setTimeout(function () {
      //  reset
      form.find('input, textarea').val('');
      form.find('label')
        .css({ left: '0' })
        .animate({ opacity: '1' }, 500);
      submit.attr('value', 'Send')
        .css({ backgroundColor: '' });
    }, 4000);
  }
});



// Google map
var map;
initMap();
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: { lat: 24.8139412, lng: 120.96 },
    styles: [
      {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "weight": "2.00"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#9c9c9c"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "color": "#f2f2f2"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 45
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#7b7b7b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#46bcec"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#c8d7d4"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#070707"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      }
    ]
    // ---styles end---
  });

  var marker = new google.maps.Marker({
    position: { lat: 24.8139412, lng: 120.96 },
    map: map,
    title: '新竹市',
    icon: {
      url: 'https://lh3.googleusercontent.com/qENsEQ7NAydNwHIIS604v98OcNnEDR79SZ9DWDBQ0xTQn5dC7EFqBTdOma_LcH5NG5uNSAEaQtmsWmPxlqxF5OCLEYQrMppKAdeOectOaLKylNY2l5TBo8l1oj72VjUYkC7_6S7CeWtcTq7uoyIjw2Ly_Pzs5Cti-Xer81Cq_kKQk-wftD8G_DWJeZhRZkhDo5KfD-kIatF6bJmc-Nh3fCoqPw5ANEUrw90R2g4EVtYgJDn3N-c4vkyFdhW_C9lGtSztBEIIKq206K1kye1MM6_AGAOqkY8nr7dubBIJRXnJBkfQiXU0hInULG8l4AiuVgo0N2t_vZKgo_yjh5UCvGDXHtRdFuRH06gHiNDetrb9k9KNc-Fvu-AYOc-xf1J8mQ0qTU-Wwcv35WIFMXsIcnwA2bNuEL38kIUt3VUsFd0hnfso9CQfvCJPTkJK62YLeKZc65Ddcf_tJ0vlCFiNXgC80CHSvG-B3sRH5uJ7w6I1vwRmoocs4Y_Q4IiPP4GqknpHJDoJdCuL5cEngUwElQJ_7sjFoGSXJl8OAnTO5UzBgFdq6KnPoISR25Gy4-cM1Wd8EeDE1mrGOh80LtTIrmFJpl-V6cH0IcHJ8-eaat3RfGbRCsY7YY801lrFlOKGdvRDOnUXGJVywJsLgAhdxBJ1mBy12A=s256-no',
      scaledSize: new google.maps.Size(50, 50)
    }
  })
}


