$(document).ready(function () {
  var modal = $('.modal');
  var modalBtn = $('[data-toggle=modal]');
  var closeBtn = $('.modal__close');

  // Обработка клика по кнопке и вызов модального окна
  modalBtn.on('click', function() {
    modal.toggleClass('modal--visible');
  });

  // Обработка клика по крестику и скрытие модального окна
  closeBtn.on('click', function () {
    modal.toggleClass('modal--visible');
  });

  // Обработка нажатия клавиши Esc
  // Если открыто модальное окно - закрывает его
  $(document).keydown(function (e) { 
    if (e.keyCode === 27) {
      modal.removeClass('modal--visible');
    };
  });
  
  // Обработка клика, при открытом модальном окне
  $(modal).mouseup(function (e) { 
    var modalDialog = $('.modal__dialog')
    //Клик был не по модальному окну, и его дочерним элементам
    if (!modalDialog.is(e.target) && modalDialog.has(e.target).length === 0) {
      modal.toggleClass('modal--visible'); // Скрываем модальное окно
    }
  });

  //Прокрутка страницы ввехр
  $(function(){
    $(window).scroll(function(){ //Функция прокрутки
      if($(window).scrollTop() > 800) { //Если прокрутили больше 800
        $('.scroll-top__btn').show(); //Показать кнопку
      } else {
        $('.scroll-top__btn').hide();  //Если нет - спрятать
      }
    });
   
    $('.scroll-top__btn').click(function(){ //Клик по кнопке
      $('html, body').animate({scrollTop: 0}, 900); //Пролистать страницу вверх
      return false; //Возврат значения
    });
  });

  //Подключение слайдера
  var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
  
  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');

  next.css('left', prev.width() + 30 + bullets.width() + 30)
  bullets.css('left', prev.width() + 30)

});