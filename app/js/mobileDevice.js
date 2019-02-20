$(function(){

    current = 0;
    $pages = $('.screen-page');
    maxCount = $pages.length -1;
    var timerInterval;

    $(document).ready(function () {
        $('body').css('overflow','hidden');

        let cssAttr =  navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? 'bottom' : 'height';
          
        $(window).load(function () {
            $({property: 0}).animate({property: 100}, {
                duration: 1500,
                step: function() {
                    var _percent = Math.round(this.property);
                    $(".fillProgress").css(cssAttr ,  _percent+"%");
                },
                complete: function() {

                    $('.layerTrans').each(function(){
                        $(this).addClass('runAnimate');
                    })
                    setTimeout(function(){
                        $('#preloader').fadeOut('slow', function () {
                            // $('body').css('overflow','inherit');
                            $('header').fadeIn(1200);
                        }).remove();

                        contentInanimate(current);
                        setTimeout(function(){
                            $('.bottomArrow').addClass('slideUp');
                                setTimeout(function(){
                                    $('.bottomArrow').find('.CltoAction').css({'opacity':'0','transition':'all 1s ease'});
                                },5000);

                        },1000)
                    },350);
                    
                }
            });
        });
    });
    
    $pages.eq( current ).addClass( 'current' );

    var timer = 0;
    setInterval(function () { timer += 50; }, 50);
    //touchscreen
    var ts;
    $('.screen-page').bind('click touchstart', function (event){
        event.preventDefault();
        // $('#testID').on('click touchstart',function(){
        //     alert('sdfdsfsd');
        // })
       ts = event.originalEvent.touches[0].clientY;
    });

    $('.screen-page').bind('click touchend', function (event){
        event.preventDefault();
        // back to top
        $('.toTopBtn').on('click touchend',function(event){
            event.preventDefault();
            scrolltoTop();
        })
        //run our values
        $('.group-list').on('click touchend','.mobile-list',function(){
            var _index = $(this).index();
            clickAbleOurvalues(_index);
        })
        //our story
        $('.wrapperBg').on('click touchend','.returnBack',function(){
            $('.MbAnim2').css('right','-100%');
            setTimeout(function(){
                $('.MbAnim1').fadeIn(500,function(){
                    $('.moreButton').fadeIn();
                });
            },500)  ;
        })

        $('#layer2').on('click touchend','.moreButton',function(){
            $('.MbAnim1').fadeOut(500,function(){
                $('.moreButton').fadeOut();
                $('.MbAnim2').css('right','0');
            });
        })
        //form focus
        $('#ctcUs').find('input').on('click touchend',function(){
            $(this).focus();
        })
        //form submit
        $('#ctcUs').find('button.btn').on('click touchend',function(){
            event.preventDefault();

            var dataValue   = $('#ctcUs').serialize();
            var $inputs     = $('#ctcUs').find("input, select, button, textarea")
            var base_url    = window.location.origin;

            $inputs.prop("disabled", true);

            request = $.ajax({
                url: base_url+"/process/sendmail.php",
                type: "post",
                data: dataValue
            });

            request.done(function (response, textStatus, jqXHR){
                // Log a message to the console
                let msg = 'Thank you! your message has been sent successfully.'
                $('#ctcUs').find('.messageSucces').html(msg);
                $('#ctcUs').find('input').val('');
                console.log("Hooray, it worked!");
            });

            request.fail(function (jqXHR, textStatus, errorThrown){
            // Log the error to the console
                console.error(
                    "The following error occurred: "+
                    textStatus, errorThrown
                );
            });

            // Callback handler that will be called regardless
            // if the request failed or succeeded
            request.always(function () {
                // Reenable the inputs
                $inputs.prop("disabled", false);
            });
        })

       var te = event.originalEvent.changedTouches[0].clientY;
        current = $(this).index();
        if(ts > te+5){
            if (timer > 1200) {
                timer = 0;
                scrollDown(current);    
            }   
        }else if(ts < te-5){
            if (timer > 1200) {
                timer = 0;
                scrollUp(current);
            }
       }
       return false;
    });

    $('#toDOwn').click(function(e){
        e.preventDefault();
        let indexParameter = $('.current');

        let getIndex = $('.screen-page').index(indexParameter);
        console.log(getIndex);
        scrollDown(getIndex);   
    })

    $('#toUp').click(function(e){
        e.preventDefault();
            
        let indexParameter = $('.current');

        let getIndex = $('.screen-page').index(indexParameter);
        console.log(getIndex);
        scrollUp(getIndex);

    })

    function scrollDown(el){
        if (el < maxCount) {

            let curPage  = $('.screen-page.current');
            let nextPage = curPage.next();
            el = el +1;

            roundedTransition(); // run transition

            setTimeout(function(){

                contentOutanimate(curPage); //content out
                displayInFooter(el); // footer

                nextPage.addClass('current');
                curPage.removeClass('current'); 

                setTimeout(function(){
                    contentInanimate(el);
                },250);

            },650); 
        }
    }
    function scrollUp(el){
        
        if (el > 0) {

            el = el -1;

            let curPage = $('.screen-page.current');
            let prevPage = curPage.prev();

            roundedTransition(el); // run transition

            setTimeout(function(){

                contentOutanimate(curPage); //content out
                displayInFooter(el); // footer

                prevPage.addClass('current'); 
                curPage.removeClass('current');

                setTimeout(function(){
                    contentInanimate(el);
                },250);

            },650); 
        }
    }

    function displayInFooter(el){

        if (el > 0) {
            $('.bottomArrow').find('.rowUpslide').show();
            $('.bottomArrow').find('.CltoAction').hide();
            $('.bottomArrow').find('.endslide').css('width','40px');
            $('.bottomArrow').find('.pushbottom').removeClass('oneSLide');
        }else{
            $('.bottomArrow').find('.rowUpslide').hide();
            $('.bottomArrow').find('.CltoAction').show();
        }

        if (el == 6) {
            $('.bottomArrow').find('.endslide').fadeOut();
        }else{
            $('.bottomArrow').find('.endslide').fadeIn();
        }

    }
    function roundedTransition(){

        getSelector = $('.roundTrans');

        getSelector.addClass('secAnime');
        getSelector.one('oanimationend animationend webkitAnimationEnd',   
        function(e) {
            $(this).removeClass('secAnime');
        });

    }
    function progressBar(el){ //section 2
        let _parent = $('.screen-page').eq(el);
        let varAnimate = $('.progressingbar');

        varAnimate.fadeIn(0,function(){
            varAnimate.addClass('runScaleX');
        })
        varAnimate.one('oanimationend animationend webkitAnimationEnd',   
        function(e) {

            varAnimate.fadeOut(500,function(){
                varAnimate.removeClass('runScaleX');
            })

            if (el == 1 || el == 5) { // setion 2
                _parent.find('.batchOne').fadeOut(1000,function(){ //fade 1
            
                    let batchtwo = _parent.find('.batchtwo');
                        
                    batchtwo.fadeIn(750) //return callback
                    animateMovie(el); // run animate content;
                });
            }
            else if(el == 2){ // setion 3

                // $('footer').find('.pushbottom').addClass('whiteBg');
                
                setTimeout(function(){

                    if (screen && screen.width > 1024) {
                        $('.screen-page').eq(el).find('.MleftAnimate').each(function(){
                            let datapost = $(this).data('slide');
                            let style_ = $(this).data('style');
                            let frox = $(this).data('firefox');

                            $(this).css(style_,datapost+'%');
                            $(this).addClass(frox);
                        })
                    }else{
                        $('.MbAnim1').fadeOut(500,function(){
                            $('.moreButton').fadeOut();
                            $('.MbAnim2').css('right','0');
                        })
                    }

                },600);
            }
            else if(el == 3){ // setion 4
                $('.content-item.pos1').eq(0).addClass('active');
                _parent.find('.batchOne').fadeOut(750,function(){
                  _parent.find('.batchtwo').fadeIn(1000,function(){
                    $('.content-item').find('.Animate').addClass('slideUp');
                        setTimeout(function(){
                            $('.content-item').find('.Animate2').addClass('slideUp');

                            //autorun our values
                            if (navigator.userAgent.match(/iPad/i)) { 
                                autoRunOurvalueforIpda() //ipad
                            }else{
                                autoRunOurvalue(); //others
                            }

                        },300);
                  });
                })
            }
        });
    }
    function animateMovie(el){ //section 2
        
        let time = 500;

            let getSelector = $('.screen-page').eq(el).find('.Animate2').each(function(){
                let _this = $(this);
                let classAnim = _this.data('animate');

                    setTimeout(function(){
                        _this.addClass(classAnim);
                        // console.log(v.delay);
                    },time);

                time += 500;
            });

            
    }
    function contentOutanimate(el){

        $('.progressingbar').fadeOut(0,function(){
            $(this).removeClass('runScaleX');
        });

        $(document).find('.Animate').each(function(){
            let dataClass = $(this).data('animate');
            $(this).removeClass(dataClass);
        })

        $(document).find('.Animate2').each(function(){
            let dataClass = $(this).data('animate');
            $(this).removeClass(dataClass);
        })

        $(document).find('.MleftAnimate').each(function(){
            let datapost = $(this).data('reset');
            let style_ = $(this).data('style');
            let frox = $(this).data('firefox');

            $(this).css(style_,datapost+'%');
            $(this).removeClass(frox);
        })
        
        $('.MbAnim1').fadeIn()
        $('.MbAnim2').css('right','-100%');
        
        $('.content-item').find('.Animate, .Animate2').removeClass('leftoright righttoleft slideUp tobottom');
        
        $('.batchOne').fadeIn();
        $('.batchtwo').fadeOut();
        $('.layerTrans').removeClass('runAnimate');
        $('.list-item').find('.contentFade p').slideUp();

        // RESET OUR VALUES
        if (navigator.userAgent.match(/iPad/i)) { 
            img = 'images/background/bg_0.jpg';
            $('.ourValueBgitem').css('background-image','url('+img+')');
            $('.list-item, .content-item').removeClass('active');
            $('.list-item, .content-item').eq(0).addClass('active');
        }else{
            img = 'images/mobile/our_values_0.jpg';
            $('.ourValueBgitem').css('background-image','url('+img+')');
            $('.mobile-list').removeClass('active');
            $('.mobile-list').eq(0).addClass('active');
        }
        clearInterval(timerInterval);
        // $('.overlayerbg').fadeOut();
    }
    function contentInanimate(el){
        
        let time = 500;
        // let funcAr = reindexArray(el,'Animate');
       
        // funcAr.forEach(function(v){

            let getSelector = $('.screen-page').eq(el).find('.Animate').each(function(){
                let _this = $(this);
                let classAnim = _this.data('animate');

                    setTimeout(function(){
                        _this.addClass(classAnim);
                        // console.log(v.delay);
                    },time);

                time += 500;
            });

            
        // })

        if (el > 0) {
            if (el == 1 || el == 3 || el == 5) {
                setTimeout( function(){  // progressbar delay
                    progressBar(el);
                },1500);
            }
            else if(el == 2){
                 setTimeout( function(){  // progressbar delay
                    progressBar(el);
                },3000);
            }
        }
        if( el == 4 ){
            rotatorText();
        }else if(el > 0){
            ClearRotator();
        }
    
    }

    function ClearRotator(){
        $('.rotator-item.first, .rotator-item.scnd').slick('unslick')
    }

    function rotatorText(){
        $(document).ready(function(){
            $('.rotator-item.first, .rotator-item.scnd').slick({
                arrows: false,
                dots: false,
                speed: 1500,
                fade: true,
                autoplay: true,
                autoplaySpeed: 3000
            })
        })
    }

    // ======== our values =========//
    function clickAbleOurvalues(index){

        clearInterval(timerInterval);
        var counter     = index;
        var loader_     = $('.layerLoader');
        console.log(counter);

        $('.mobile-list').removeClass('active');
        $('.mobile-list').find('.contentFade p').slideUp(1000)

        loader_.fadeIn(500,function(){
            
            var img = new Image();
            img.src = 'images/mobile/our_values_'+counter+'.jpg';

            img.onload = function() {
                loader_.fadeOut(500);
                $('.ourValueBgitem').css('background-image','url('+img.src+')');
                // var timeSeting = setTimeout(function(){
                $('.mobile-list').eq(counter).addClass('active')
                .find('.contentFade > p').slideDown(1000);
                // },500);
            };
            
        });

        timerInterval = setInterval(function () {
            counter++;
            var timeSeting;

            // clearTimeout(timeSeting);

            loader_.fadeIn(500,function(){
            
                var img = new Image();
                img.src = 'images/mobile/our_values_'+counter+'.jpg';

                img.onload = function() {
                    loader_.fadeOut(500);
                    $('.ourValueBgitem').css('background-image','url('+img.src+')');
                    // var timeSeting = setTimeout(function(){

                    // },500);
                };
                
            });

            if(counter > 5){
                counter = 0;
                // clearInterval(timer);
            }
            
            $('.mobile-list').removeClass('active');
            $('.mobile-list').find('.contentFade p').slideUp(1000);
            $('.mobile-list').eq(counter).addClass('active');
            $('.mobile-list').eq(counter).find('.contentFade p').slideDown(1000);
            // $('.list-item').find('.contentFade').fadeOut(500);
            // $('.list-item.active').find('.contentFade').fadeIn(500);

        }, 6000);
    }
    function autoRunOurvalue(){

        $('.mobile-list').eq(0).addClass('active');
        $('.mobile-list').eq(0).find('.contentFade p').slideDown(1000);
        // var timer;
        clearInterval(timerInterval);
        var counter = 0;

        timerInterval = setInterval(function () {
            counter++;
            var loader_     = $('.layerLoader');
            var timeSeting;

            // clearTimeout(timeSeting);

            loader_.fadeIn(500,function(){
            
                var img = new Image();
                img.src = 'images/mobile/our_values_'+counter+'.jpg';

                img.onload = function() {
                    loader_.fadeOut(500);
                    $('.ourValueBgitem').css('background-image','url('+img.src+')');
                    // var timeSeting = setTimeout(function(){

                    // },500);
                };
                
            });

            if(counter > 5){
                counter = 0;
                // clearInterval(timer);
            }
            
            $('.mobile-list').removeClass('active');
            $('.mobile-list').find('.contentFade p').slideUp(1000);
            $('.mobile-list').eq(counter).addClass('active');
            $('.mobile-list').eq(counter).find('.contentFade p').slideDown(1000);
            // $('.list-item').find('.contentFade').fadeOut(500);
            // $('.list-item.active').find('.contentFade').fadeIn(500);

        }, 6000);
    }

    //for ipad
    function autoRunOurvalueforIpda(){

        // var timer;
        clearInterval(timerInterval);
        var counter = 0;

        timerInterval = setInterval(function () {
            counter++;
            var loader_     = $('.layerLoader');
            var timeSeting;

            clearTimeout(timeSeting);

            loader_.fadeIn(500,function(){

                // $('.content-item').find('.inline-item').fadeOut();
                $('.content-item').find('.Animate, .Animate2').removeClass('leftoright righttoleft slideUp tobottom');
                $('.content-item').eq(counter).addClass('active');

                var classAnime;

                switch(counter){
                    case 0:
                        classAnime = 'slideUp';
                        break;
                    case 1:
                        classAnime = 'leftoright';
                        break;
                    case 2:
                        classAnime = 'righttoleft';
                        break;
                    case 3:
                        classAnime = 'tobottom';
                        break;
                    case 4:
                        classAnime = 'slideUp';
                        break;
                    case 5:
                        classAnime = 'leftoright';
                        break;
                }
            
                var img = new Image();
                img.src = 'images/background/bg_'+counter+'.jpg';

                img.onload = function() {
                    loader_.fadeOut(500);
                    $('.ourValueBgitem').css('background-image','url('+img.src+')');
                    var timeSeting = setTimeout(function(){
                        // $('.content-item').eq(_index_).find('.inline-item').fadeIn(800);
                        $('.content-item').eq(counter).find('.Animate').addClass(classAnime);
                        setTimeout(function(){
                            $('.content-item').eq(counter).find('.Animate2').addClass(classAnime);
                        },300);

                    },500);
                };
                
            });

            if(counter > 5){
                counter = 0;
                // clearInterval(timer);
            }

            $('.list-item, .content-item').removeClass('active');
            $('.list-item').eq(counter).addClass('active');

        }, 5000);
    }

    // =========== end our values =========//

    $('.wrapper-position').on('click','#buttoRedkendi',function(event){
        event.preventDefault();
        // productItem();
    })
    
    $('.headerProductItem').on('click','#backBtn',function(event){
        event.preventDefault();

        var layerClosed = $('.screen-wrapper');
        var layertwoOpen= $('#ProdutWrapper-section');

        $('.layerTrans').each(function(){
            $(this).addClass('runAnimate');
        })

        setTimeout(function(){
            layertwoOpen.fadeOut(0,function(){
                layerClosed.fadeIn(1000,function(){
                    $('.layerTrans').removeClass('runAnimate');
                });
            })
        },350);

    })

    // $('.toTopBtn').click(function(event){
    //     event.preventDefault();
    //     scrolltoTop();
    // })

    function productItem(){

        var _bodyParent = $('body');
        var layerClosed = $('.screen-wrapper');
        var layertwoOpen= $('#ProdutWrapper-section');

        $('.layerTrans').each(function(){
            $(this).addClass('runAnimate');
        })

        setTimeout(function(){
            layerClosed.fadeOut(0,function(){
                layertwoOpen.fadeIn(1000,function(){
                    $('.layerTrans').removeClass('runAnimate');
                });
            })
        },350);
    
    }

    function scrolltoTop(){

        let curPage = $('.screen-page.current');
        let OneSection = $('.screen-page').eq(0);

        roundedTransition(); // run transition

        setTimeout(function(){

            contentOutanimate(curPage); //content out
            displayInFooter(0); // footer

            OneSection.addClass('current');
            curPage.removeClass('current'); 

            setTimeout(function(){
                contentInanimate(0);
            },250);

        },650); 
    }

})