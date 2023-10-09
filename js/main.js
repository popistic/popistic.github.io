'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(750).fadeOut("slow");       

        $.ajax({
            url: "https://capi.mini.store/api/v1/stores/popistic/catalog",
            success: function(data){
                process_response(data);
            }
        });
    });

    //Search Switch
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    //Canvas Menu
    $(".canvas__open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("active");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".offcanvas-menu-overlay, .offcanvas__close").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("active");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    /*------------------
		Navigation
	--------------------*/
    $(".header__menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Accordin Active
    --------------------*/
    $('.collapse').on('shown.bs.collapse', function () {
        $(this).prev().addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('active');
    });

    /*--------------------------
        Banner Slider
    ----------------------------*/
    $(".banner__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*--------------------------
        Product Details Slider
    ----------------------------*/
    $(".product__details__pic__slider").owlCarousel({
        loop: false,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<i class='arrow_carrot-left'></i>","<i class='arrow_carrot-right'></i>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false,
        mouseDrag: false,
        startPosition: 'URLHash'
    }).on('changed.owl.carousel', function(event) {
        var indexNum = event.item.index + 1;
        product_thumbs(indexNum);
    });

    function product_thumbs (num) {
        var thumbs = document.querySelectorAll('.product__thumb a');
        thumbs.forEach(function (e) {
            e.classList.remove("active");
            if(e.hash.split("-")[1] == num) {
                e.classList.add("active");
            }
        })
    }

    function process_response(data){
        // product categories
        var category_list = {};
        for (var category of data.data.categories){
            category_list[category.id] = category.name
            if (category.name != "other"){
                $(".filter__controls").append(`<li data-filter=".${category.name.replace(/ /g,"").toLowerCase()}">${category.name}</li>`);
            }
        }

        for (var product of data.data.products){
            if (product.active){
                console.log(product)
                console.log(category_list[product.categories[0]].replace(/ /g,"-"));

                // Populate products
                $(".property__gallery").append(`<div class="col-lg-3 col-md-4 col-6 mix ${category_list[product.categories[0]].replace(/ /g,"").toLowerCase()}">
                <div class="product__item">
                    <div class="product__item__pic set-bg" data-setbg="https://minis-media-assets.swiggy.com/swiggymini/image/upload/w_500,h_500,c_fit,q_auto,f_auto/${product.images[0]}">
                        ${product.badges.length>0 ? `<div class="label new">${product.badges[0]}</div>` : ''}
                        <ul class="product__hover">
                            <li><a target="_blank" href="https://popistic.mini.store/products/${product.id}"><i class="fa-solid fa-bag-shopping"></i></a></li>
                        </ul>
                    </div>
                    <div class="product__item__text">
                        <h6><a class="text-decoration-none" target="_blank" href="https://popistic.mini.store/products/${product.id}">${product.name}</a></h6>

                        ${product.discountPercent ? `<div class="product__price">₹ ${product.discountedPrice}</div> <span class="text-danger">(${product.discountPercent}% off)</span>` : '<div class="product__price">₹ ${product.price}</div>'}

                        ${product.discountPercent ? `<div class="product__price text-muted"><del>₹ ${product.price}</del></div>` : ''}
                    </div>
                </div>
            </div>`)
            }
        }

        /*------------------
        Background Set
        --------------------*/
        $('.set-bg').each(function () {
            var bg = $(this).data('setbg');
            $(this).css('background-image', 'url(' + bg + ')');
        });


                /*------------------
        Product filter
        --------------------*/
        $('.filter__controls li').on('click', function () {
            $('.filter__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.property__gallery').length > 0) {
            var containerEl = document.querySelector('.property__gallery');
            var mixer = mixitup(containerEl);
        }

    }


    /*------------------
		Magnific
    --------------------*/
    $('.image-popup').magnificPopup({
        type: 'image'
    });

    /*------------------
		Single Product
	--------------------*/
	$('.product__thumb .pt').on('click', function(){
		var imgurl = $(this).data('imgbigurl');
		var bigImg = $('.product__big__img').attr('src');
		if(imgurl != bigImg) {
			$('.product__big__img').attr({src: imgurl});
		}
    });
    
    /*-------------------
		Quantity change
	--------------------- */
    var proQty = $('.pro-qty');
	proQty.prepend('<span class="dec qtybtn">-</span>');
	proQty.append('<span class="inc qtybtn">+</span>');
	proQty.on('click', '.qtybtn', function () {
		var $button = $(this);
		var oldValue = $button.parent().find('input').val();
		if ($button.hasClass('inc')) {
			var newVal = parseFloat(oldValue) + 1;
		} else {
			// Don't allow decrementing below zero
			if (oldValue > 0) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 0;
			}
		}
		$button.parent().find('input').val(newVal);
    });
    
    /*-------------------
		Radio Btn
	--------------------- */
    $(".size__btn label").on('click', function () {
        $(".size__btn label").removeClass('active');
        $(this).addClass('active');
    });

})(jQuery);