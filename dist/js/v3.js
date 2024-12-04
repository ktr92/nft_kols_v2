$(document).ready(function() {
  const $copyBtn = document.querySelector("[data-copyfrom='copy_id1']")

  if ($copyBtn) {
    $copyBtn.addEventListener('click', e => {
      e.preventDefault()
  
      const $copyFrom = $copyBtn.getAttribute('data-copyfrom')
      const $copyValue = document.querySelector(`[data-copysrc=${$copyFrom}]`).textContent
      navigator.clipboard.writeText($copyValue);
    })
  }

  $('.benefits__title').on('click', function(e) {
    $(this).siblings('.benefits__text').slideToggle()
    $(this).toggleClass('active')
  })



  function monthsinputSliderInit() {

    var rangeTimeout;
function monthsrangeSliderCreate (slideIndex, slide) {

    if ($(slide).attr('data-range-slider-ready') === 'yes') {
    var rangeSliderOptions;
    var rangeSliderType = $(slide).attr('data-range-slider-type');
    var rangeSliderStart = parseFloat($(slide).closest('.months-slider').find('.form-control').val());
    var rangeSliderMin = parseFloat($(slide).closest('.months-slider').find('.form-control').data("min"));
    var rangeSliderMax = parseFloat($(slide).closest('.months-slider').find('.form-control').data("max"));

    if (rangeSliderType === 'months') {
        rangeSliderOptions = {
            start: [rangeSliderStart],
            range: {
                'min': [rangeSliderMin,1],
                
                'max': [rangeSliderMax]
            },
            connect: 'lower'
        }
    } 
    else {
        rangeSliderOptions = {
            start: [1],
            range: {
                'min': [rangeSliderMin],
                'max': [rangeSliderMax]
            },
            connect: 'lower'
        }
    }

    $(slide).attr('data-range-slider-index', slideIndex);

    var rangeSlidersItem = noUiSlider.create(slide.querySelector('.months-slider__ui'), rangeSliderOptions);

    $(slide.querySelector('.months-slider__ui')).data('slider', rangeSlidersItem);

    rangeSlidersItem.on('slide', function( values, handle ) {
        clearTimeout(rangeTimeout);
        if (rangeSliderType === 'months') {
            $(this.target).closest('.months-slider').find('.form-control').val(Math.round(values[handle]));
        }
         else {
            $(this.target).closest('.months-slider').find('.form-control').val(values[handle]);
        }
    });
    rangeSlidersItem.on('change', function() {
        var target = $(this.target);
        rangeTimeout = setTimeout(function() {
            target.closest('.months-slider').find('.form-control').trigger("change");
        }, 500);
    });
}
}

function monthsrangeSliderInit(rangeSliders) {
    for ( var i = 0; i < rangeSliders.length; i++ ) {
      monthsrangeSliderCreate(i, rangeSliders[i]);
    }

    $('.months-slider__control').on('change', function(){

       if ( $(this).closest('.months-slider').attr('data-range-slider-type') === 'day' ) {
            if (parseFloat(this.value) > parseFloat(this.getAttribute('data-max'))) {
                this.value = parseFloat(this.getAttribute('data-max'));
            } else if (parseFloat(this.value) < parseFloat(this.getAttribute('data-min')) || parseFloat(this.value) === '') {
                this.value = parseFloat(this.getAttribute('data-min'));
            }
            $(this).next().data('slider').set(parseFloat(this.value/*.replace(/[^0-9]/g, '')*/).toFixed(2));
        }
    });
}

$(document).ready(function(){

    $('[data-months-format]').inputmask('integer', {
        mask: "( 99){+|1} \\m\\o\\n\\t\\h\\s",
        numericInput: true,
        showMaskOnHover: false,
        showMaskOnFocus: false,
        rightAlign: false
    });

   
    
    if ($('.months-slider').length) {
        var rangeSliders = $('.months-slider');
        monthsrangeSliderInit(rangeSliders);
    }

});

 
}

monthsinputSliderInit();

})