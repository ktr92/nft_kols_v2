function initFE() {
  closeByClickOutside(
    '[data-toggle="accountmenu"]',
    '[data-toggleclick="accountmenu"]'
  )
  closeByClickOutside(
    '[data-toggle="messageblock"]',
    '[data-toggleclick="messageblock"]'
  )
  closeByClickOutside(
    '[data-toggle="datepick"]',
    '[data-datepicker="datepick"]'
  )
  closeByClickOutside(
    '[data-toggle="notesbtn"]',
    '[data-toggleclick="notesbtn"]'
  )
  closeByClickOutside(".fdropdown__menu", ".fdropdown__button")
  closeByClickOutside(
    "[data-toggle='project_link']",
    "[data-action='project_link']"
  )
  closeByClickOutside(
    "[data-toggle='hashtagsblock']",
    "[data-action='hashtagsblock']"
  )
  closeByClickOutside(".headersearch", '[data-toggleclick="headersearch"]')
  closeByClickOutside(".suggestions", ".searchinput")
  closeByClickOutside(
    '[data-toggle="notifications"]',
    '[data-toggleclickset="notifications"]'
  )
  closeByClickOutside('[data-toggle="showby"]', '[data-toggleclick="showby"]')
  closeByClickOutside(
    '[data-toggle="choose_category"]',
    '[data-toggleclick="choose_category"]'
  )
  repostSliderInit()
  inputSliderInit()
  radioTooltip()
}

function showSuggestions(e) {
  if (e.value.length > 0) {
    $(e)
      .closest("[data-togglewrapper]")
      .find('[data-toggle="suggestions"]')
      .addClass("active")
    $(e).closest("[data-togglewrapper]").addClass("sugg")
  } else {
    $(e)
      .closest("[data-togglewrapper]")
      .find('[data-toggle="suggestions"]')
      .removeClass("active")
    $(e).closest("[data-togglewrapper]").removeClass("sugg")
  }
}

function radioTooltip() {
  $('input[type="radio"]').on("change", function () {
    $(".customradio").removeClass("active")
    const radio = $(this)
    const wrapper = radio.closest("[data-radiotooltip]")
    if (wrapper.length) {
      wrapper.addClass("active")
    }
  })
  $("[data-radioclick]").on("click", function () {
    $("[data-radioclick]").removeClass("active")
    $(this).addClass("active")

    const clicked = $(this)
    const value = clicked.find("input").val()
    const radio = clicked.attr("data-radioclick")

    $(`[data-radiotooltip="${radio}"]`).find('input[type="radio"]').val(value)
    const text = clicked.find("[data-radiocaption]").text()
    $(`[data-radiotooltip="${radio}"]`)
      .find(".customradio__subtitle")
      .text(text)
  })
  /*  $('input[type="radio"]').on('change', function() {
        const radio = $(this)
        const wrapper = radio.closest('[data-radiotooltip]')
        const tooltip = wrapper.attr('data-radiotooltip')
        if (wrapper.length) {
            wrapper.addClass('active')
        }
    }) */
}

function closeByClickOutside(element, button, callback) {
  $(document).click(function (event) {
    if (!$(event.target).closest(`${element},${button}`).length) {
      $(button).removeClass("active")
      $(element).removeClass("active")
    }
  })

  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      // escape key maps to keycode `27`
      $(button).removeClass("active")
      $(element).removeClass("active")
    }
  })

  if (callback instanceof Function) {
    callback()
  }
}

function repostSliderInit() {
  $('[data-slider="repostslider"]').each(function () {
    $(this).slick({
      dots: true,
      arrows: true,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      swipe: true,
      nextArrow: $(this)
        .closest("[data-sliderwrapper]")
        .find("[data-slidernext]"),
      prevArrow: $(this)
        .closest("[data-sliderwrapper]")
        .find("[data-sliderprev]"),
    })
    $('[data-slider="repostslider"]').on(
      "afterChange",
      function (e, s, currentSlideIndex) {
        let previousSlideIndex = currentSlideIndex + 1

        $('[data-click="copy-img"]').attr("data-clickindex", previousSlideIndex)
        $('[data-click="download-img"]').attr(
          "data-downloadindex",
          previousSlideIndex
        )
      }
    )
  })
}

function inputSliderInit() {
  var rangeTimeout
  function rangeSliderCreate(slideIndex, slide) {
    if ($(slide).attr("data-range-slider-ready") === "yes") {
      var rangeSliderOptions
      var rangeSliderType = $(slide).attr("data-range-slider-type")
      var rangeSliderStart = parseFloat(
        $(slide).closest(".range-slider").find(".form-control").val()
      )
      var rangeSliderMin = parseFloat(
        $(slide).closest(".range-slider").find(".form-control").data("min")
      )
      var rangeSliderMax = parseFloat(
        $(slide).closest(".range-slider").find(".form-control").data("max")
      )

      if (rangeSliderType === "day") {
        rangeSliderOptions = {
          start: [rangeSliderStart],
          range: {
            min: [rangeSliderMin, 1],
            "28%": [15, 1],
            "48%": [30, 1],
            "60%": [100, 1],
            "70%": [300, 1],
            max: [rangeSliderMax],
          },
          connect: "lower",
        }
      } else {
        rangeSliderOptions = {
          start: [1],
          range: {
            min: [rangeSliderMin],
            max: [rangeSliderMax],
          },
          connect: "lower",
        }
      }

      $(slide).attr("data-range-slider-index", slideIndex)

      var rangeSlidersItem = noUiSlider.create(
        slide.querySelector(".range-slider__ui"),
        rangeSliderOptions
      )

      $(slide.querySelector(".range-slider__ui")).data(
        "slider",
        rangeSlidersItem
      )

      rangeSlidersItem.on("slide", function (values, handle) {
        clearTimeout(rangeTimeout)
        if (rangeSliderType === "day") {
          $(this.target)
            .closest(".range-slider")
            .find(".form-control")
            .val(Math.round(values[handle]))
        } else {
          $(this.target)
            .closest(".range-slider")
            .find(".form-control")
            .val(values[handle])
        }
      })
      rangeSlidersItem.on("change", function () {
        var target = $(this.target)
        rangeTimeout = setTimeout(function () {
          target
            .closest(".range-slider")
            .find(".form-control")
            .trigger("change")
        }, 500)
      })
    }
  }

  function rangeSliderInit(rangeSliders) {
    for (var i = 0; i < rangeSliders.length; i++) {
      rangeSliderCreate(i, rangeSliders[i])
    }

    $(".range-slider__control").on("change", function () {
      if (
        $(this).closest(".range-slider").attr("data-range-slider-type") ===
        "day"
      ) {
        if (
          parseFloat(this.value) > parseFloat(this.getAttribute("data-max"))
        ) {
          this.value = parseFloat(this.getAttribute("data-max"))
        } else if (
          parseFloat(this.value) < parseFloat(this.getAttribute("data-min")) ||
          parseFloat(this.value) === ""
        ) {
          this.value = parseFloat(this.getAttribute("data-min"))
        }
        $(this)
          .next()
          .data("slider")
          .set(parseFloat(this.value /*.replace(/[^0-9]/g, '')*/).toFixed(2))
      }
    })
  }

  $(document).ready(function () {
    ;(function v4() {
      function setBodyheight() {
        const h =
          $(window).height() -
          $("#footer").height() -
          $("#header").height() -
          $(".navcontent").height()
        $(".vhblock").css("min-height", `${h}px`)
      }
      setBodyheight()

      function showLinkpopup(element) {
        $('[data-toggle="project_link"]').removeClass("active")

        const markpos = element.position().left

        element.siblings('[data-toggle="project_link"]').addClass("active")
        element
          .siblings('[data-toggle="project_link"]')
          .find(".linkpopup__marker")
          .css("left", markpos + "px")
      }

      $("[data-action='addtofav']").on("click", function (e) {
        e.preventDefault()
        $(this).toggleClass("active")
      })
      $("[data-action='getHashtag']").on("click", function (e) {

      })
    
 /*      $(".tablehashtags]").on("click", function (e) {
        
      }) */
      $("[data-action='getHashtag']").on("click", function (e) {
        e.preventDefault()
        e.stopPropagation()
        if ($(this).hasClass("disabled")) {
          return
        }

      /*   if ($(this).hasClass("active")) {
          $(this).removeClass("active")

          return
        } */


        $(this).find(".tablehastag").removeClass("notactive").addClass("active")
        const html = $(this).wrap("<p/>").parent().html()
        $(this).unwrap()
        $(this).hide()
        if (
          $(this).attr("data-type") &&
          $(this).attr("data-type") === "type1"
        ) {
          $('[data-type="type1"]').not($(this)).addClass("disabled")
        }
        $(this)
          .closest(".tableblock__col_hashtags")
          .find(".tablehashtags__selected ul")
          .prepend(html)

        $('[data-toggle="hashtagsblock"]').removeClass("active")
      });


      $("[data-action='hashtagsblock']").on("click", function (e) {
        e.preventDefault()
        $(".hashtagsblock").removeClass("active")

        $(this).toggleClass("active")
        $(this).siblings('[data-toggle="hashtagsblock"]').toggleClass("active")
      })

      $("[data-action='project_link'].unactive").on("click", function (e) {
        e.preventDefault()
        const element = $(this)
        showLinkpopup(element)
      })

      $("body").on("mousedown", "[data-action='project_link']", function (e) {
        document.oncontextmenu = function () {
          return false
        }
        if (e.button == 2) {
          const element = $(this)
          showLinkpopup(element)
          return false
        }
        return true
      })

      function join(date, options, separator) {
        function format(option) {
           let formatter = new Intl.DateTimeFormat('en', option);
           return formatter.format(date);
        }
        return options.map(format).join(separator);
     }

      $('[data-datepicker="datepick"]').on('click', function(e) {
        e.preventDefault()
        $('[data-toggle="datepick"]').removeClass('active')
        $(this).closest('.tableblock__col_notify').find('[data-toggle="datepick"]').toggleClass('active')
      })

      $(".datepick").each(function () {
        const notify = $(this)
        $(this).datetimepicker({
          date: new Date(),
          viewMode: "YMDHMS",
          firstDayOfWeek: 1,
          onOk: function () {
            notify.closest('.tableblock__col_notify').find('[data-toggle="datepick"]').removeClass('active')
          },
          onClear: function(){
            notify.closest('.tableblock__col_notify').find('[data-datepicker="datepick"]').removeClass('chosen')
            notify.closest('.tableblock__col_notify').find('[data-toggle="datepick"]').removeClass('active')
          },
          onDateChange: function () {
            notify.closest('.tableblock__col ').find('.notify').addClass('chosen')
            let options = [{day: 'numeric'}, {month: 'short'}];
            if ( this.getValue()) {
              const date = join(this.getValue(), options, ' ');
              const time = ("0" + this.getValue().getHours()).slice(-2) + ":" + ("0" + this.getValue().getMinutes()).slice(-2);
              notify
                .closest(".tableblock__col")
                .find(".tabledatetime__date")
                .text(date)
              /*   $('#date-text-ymd2').text(this.getText('YYYY-MM-DD')); */
              notify
                .closest(".tableblock__col")
                .find(".tabledatetime__time")
                .text(time)
  
            }
          
          },
        })
       
      })
    })()

    $("[data-day-format]").inputmask("integer", {
      mask: "( 999){+|1} \\d\\a\\y",
      numericInput: true,
      showMaskOnHover: false,
      showMaskOnFocus: false,
      rightAlign: false,
    })

    if ($(".range-slider").length) {
      var rangeSliders = $(".range-slider")
      rangeSliderInit(rangeSliders)
    }
  })
}

function resizeEvents() {
  $(".siteheader__left").css("min-width", $(".siteheader__right").width())
}

$(window).resize(function () {
  resizeEvents()
})
$(document).ready(function () {
  resizeEvents()

  $(".modal").on("shown.bs.modal", function (e) {
    $(this).find("[data-slider]").slick("setPosition")
  })

  $('[data-click="download-img"]').on("click", function () {
    let index = $(this).attr("data-downloadindex")
    html2canvas(
      document.querySelector(
        `[data-download="download-img"][data-blockindex="${index}"]`
      )
    ).then(function (canvas) {
      var link = document.createElement("a")
      document.body.appendChild(link)
      link.download = "repost.png"
      link.href = canvas.toDataURL("image/png")
      link.target = "_blank"
      link.click()
      canvas.remove()
      link.remove()
    })
  })
  $('[data-click="copy-img"]').on("click", function () {
    let index = $(this).attr("data-clickindex")
    console.log(index)
    html2canvas(
      document.querySelector(
        `[data-download="download-img"][data-blockindex="${index}"]`
      )
    ).then(function (canvas) {
      canvas.toBlob(function (blob) {
        navigator.clipboard
          .write([
            new ClipboardItem(
              Object.defineProperty({}, blob.type, {
                value: blob,
                enumerable: true,
              })
            ),
          ])
          .then(function () {
            console.log("Copied to clipboard")
            /* domNode.classList.remove("on"); */
          })
      })
      canvas.remove()
    })
  })

  $(function () {
    $('[data-tabsheader="tabsheader"]').on(
      "click",
      "li:not(.active)",
      function () {
        $(this)
          .addClass("active")
          .siblings()
          .removeClass("active")
          .closest('[data-tabswrapper="tabswrapper"]')
          .find("[data-tabscontent]")
          .removeClass("active")
          .eq($(this).index())
          .addClass("active")
      }
    )
  })

  document.querySelectorAll('[data-toggle="password"]').forEach((item) => {
    item.addEventListener("click", (event) => {
      let inp = item.closest(".inputpassword").querySelector("input")
      if (inp.type === "password") {
        inp.type = "text"
        item.closest(".inputpassword").classList.add("active")
      } else {
        inp.type = "password"
        item.closest(".inputpassword").classList.remove("active")
      }
    })
  })

  $("[data-toggleclick]").on("click", function (e) {
    $(this).toggleClass("active")
    e.preventDefault()
    let dropdown = $(this).data("toggleclick")
    $("[data-toggle].active")
      .not($(`[data-toggle=${dropdown}]`))
      .removeClass("active")
    $("[data-toggleclick].active")
      .not($(`[data-toggleclick=${dropdown}]`))
      .removeClass("active")
    $(`[data-toggle=${dropdown}]`).toggleClass("active")
    $(`[data-toggleactive=${dropdown}]`).toggleClass("active")
  })

  $("[data-toggleclickset]").on("click", function (e) {
    $(this).toggleClass("active")
    e.preventDefault()
    let dropdown = $(this).data("toggleclickset")
    let wrapper = $(this).closest(`[data-toggleitem]`)
    $("[data-toggleitem].active").not(wrapper).removeClass("active")
    $("[data-toggle].active")
      .not(wrapper.find(`[data-toggle=${dropdown}]`))
      .removeClass("active")
    $("[data-toggleclickset].active")
      .not(wrapper.find(`[data-toggleclickset=${dropdown}]`))
      .removeClass("active")
    wrapper.addClass("active")
    wrapper.find(`[data-toggle=${dropdown}]`).toggleClass("active")
    $(`[data-toggleactive=${dropdown}]`).toggleClass("active")
  })

  $("[data-scroll]").click(function (e) {
    e.preventDefault()
    let scroll = $(this).data("scroll")
    $(this).siblings(`[data-scrollblock=${scroll}]`).animate({
      scrollLeft: "+=126px",
    })
  })

  $("[data-menutoggle]").on("click", function (e) {
    e.preventDefault()
    let menu = $(this).data("menutoggle")
    $(`[data-menu=${menu}]`).toggleClass("active")
    $(this).toggleClass("active")
    $(".jsbackdrop").toggleClass("active")
    $("body").toggleClass("block")
  })
  $(".jsbackdrop").on("click", function (e) {
    $(this).removeClass("active")
    $("[data-menu]").removeClass("active")
    $("[data-menutoggle]").removeClass("active")
    $("body").removeClass("block")
  })
})

window.addEventListener("load", function () {
  initFE()
})
