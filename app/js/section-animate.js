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
                                // $(this).removeClass('slideUp');
                                setTimeout(function(){
                                    $('.bottomArrow').find('.CltoAction').css({'opacity':'0','transition':'all 1s ease'});
                                    // $('.bottomArrow').addClass('downslideOut');
                                    // $('.bottomArrow').one('oanimationend animationend webkitAnimationEnd',   
                                    // function(e) {
                                    //     $(this).removeClass('slideUp');
                                    //     $(this).removeClass('downslideOut');
                                    // });
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

    $('.screen-page').on( 'mousewheel DOMMouseScroll',function ( event ) {
        current = $(this).index();
        if( event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) { 
            //scroll down
            if (timer > 1200) {
                timer = 0;
                scrollDown(current);                
            }
        }else {
            //scroll up
             if (timer > 1200) {
                timer = 0;
                scrollUp(current);
            }
        }
        return false;
    });

    $('.scrollDown-btn').click(function(e){
        e.preventDefault();
        scrollDown(0);  
    })

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

            // console.log(el);
            // $('ul.itemscroll li').removeClass('active');
            // $('ul.itemscroll li').eq(el).addClass('active');
        }
    }

    function displayInFooter(el){

        if (el > 0) {
            $('.bottomArrow').css({'bottom':'24px','opacity':'1'});
            $('.bottomArrow').find('.rowUpslide').show();
            $('.bottomArrow').find('.CltoAction').hide();
            $('.bottomArrow').find('.endslide').css('width','40px');
            $('.bottomArrow').find('.pushbottom').removeClass('oneSLide');
            // $('footer').find('.secNone').fadeOut();
            // $('footer').css('z-index','0');
            // $('footer').fadeOut(0);
        }else{
            // $('.bottomArrow').css({'bottom':'-4px'});
            $('.bottomArrow').find('.rowUpslide').hide();
            $('.bottomArrow').find('.CltoAction').show();
            $('.bottomArrow').find('.endslide').css('width','100%');
            $('.bottomArrow').find('.pushbottom').addClass('oneSLide');
            // $('footer').find('.secNone').fadeIn();
            // $('footer').css('z-index','2');
            // $('footer').fadeIn(0);
        }

        if (el == 6) {
            $('footer').fadeIn();
            $('.bottomArrow').find('.endslide').fadeOut();
            $('.bottomArrow').find('.rowUpslide').find('h6').show();
        }else{
            $('.bottomArrow').find('.endslide').fadeIn();
            $('.bottomArrow').find('.rowUpslide').find('h6').hide();
            $('footer').fadeOut(0);
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

            if (el == 1 || el == 4 || el == 5) { // setion 2
                _parent.find('.batchOne').fadeOut(500,function(){ //fade 1
            
                    let batchtwo = _parent.find('.batchtwo');
                        
                    batchtwo.fadeIn(750) //return callback
                    animateMovie(el); // run animate content;
                });
            }
            else if(el == 2){ // setion 3

                // $('footer').find('.pushbottom').addClass('whiteBg');
                
                // setTimeout(function(){
                    $('.screen-page').eq(el).find('.MleftAnimate').each(function(){
                        let datapost = $(this).data('slide');
                        let style_ = $(this).data('style');
                        let frox = $(this).data('firefox');

                        $(this).css(style_,datapost+'%');
                        $(this).addClass(frox);
                    })

                // },600);
            }
            else if(el == 3){ // setion 4
                $('.content-item.pos1').eq(0).addClass('active');
                _parent.find('.batchOne').fadeOut(750,function(){
                  _parent.find('.batchtwo').fadeIn(500,function(){
                    $('.content-item').find('.Animate').addClass('slideUp');
                        // setTimeout(function(){
                            $('.content-item').find('.Animate2').addClass('slideUp');
                        // },300);
                  });
                  autoRunOurvalue(); //autorun our values
                })
            }
        });
    }
    function animateMovie(el){ //section 2
        
        let time = 50;
        let funcAr = reindexArray(el,'Animate2');
       
        funcAr.forEach(function(v){

            let getSelector = $('.screen-page').eq(el).find('.Animate2').each(function(){
                let _this = $(this);
                let classAnim = _this.data('animate');
                if (v.delay == _this.data('delay')) {

                    setTimeout(function(){
                        _this.addClass(classAnim);
                        // console.log(v.delay);
                    },time);

                }
                time += 100;
            });

            
        })
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
        $('.content-item').find('.Animate, .Animate2').removeClass('leftoright righttoleft slideUp tobottom');
        
        $('.batchOne').fadeIn();
        $('.batchtwo').fadeOut();
        $('.layerTrans').removeClass('runAnimate');
        // RESET OUR VALUES
        img = 'images/background/bg_0.jpg';
        $('.ourValueBgitem').css('background-image','url('+img+')');
        $('.list-item, .content-item').removeClass('active');
        $('.list-item, .content-item').eq(0).addClass('active');
        clearInterval(timerInterval);
        // $('.overlayerbg').fadeOut();
    }
    function contentInanimate(el){
        
        let time = 50;
        let funcAr = reindexArray(el,'Animate');
       
        funcAr.forEach(function(v){

            let getSelector = $('.screen-page').eq(el).find('.Animate').each(function(){
                let _this = $(this);
                let classAnim = _this.data('animate');
                if (v.delay == _this.data('delay')) {

                    setTimeout(function(){
                        _this.addClass(classAnim);
                        // console.log(v.delay);
                    },time);

                }
                time += 100;
            });

            
        })

        if (el > 0) {
            if (el == 1 || el == 3 || el == 4 || el == 5) {
                setTimeout( function(){  // progressbar delay
                    progressBar(el);
                },1000);
            }
            else if(el == 2){
                 setTimeout( function(){  // progressbar delay
                    progressBar(el);
                },2000);
            }
        }
        // if( el == 4 ){
        //     rotatorText();
        // }else if(el > 0){
        //     ClearRotator();
        // }
    
    }

    // var appRotator = {
    //     init: function(){}
    // }

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

    function reindexArray(el,clasAnimate){

        var storeArray = new Array();

        $('.screen-page').eq(el).find('.'+clasAnimate).each(function(){
            storeArray.push({
                'delay'   : $(this).data('delay'),
                'animate' : $(this).data('animate')
            })
        })

        var reindexing = new Array();

        storeArray.map(function(x){
            reindexing[x.delay] = {
                'delay'   : x.delay,
                'animate' : x.animate
            }
        })
        // console.log(storeArray);
        return reindexing;
        // console.log(reindexing);
    }

    // ======== our values =========//
    let elemObjt =  $('.list-item');
    let contentElem = $('.content-item');

    $('.group-list').on('click','.list-item',function(){

        // elemObjt.removeClass('active');
        
        // $(this).addClass('active');
        _index_ = $(this).index();
        // tabOurValues(_index_);
    })

    function tabOurValues(_index_){

        var loader_     = $('.layerLoader');
        var timeSeting;

        clearTimeout(timeSeting);

        loader_.fadeIn(500,function(){

            // $('.content-item').find('.inline-item').fadeOut();
            $('.content-item').find('.Animate, .Animate2').removeClass('leftoright righttoleft slideUp tobottom');
            $('.content-item').eq(_index_).addClass('active');

            var classAnime;

            switch(_index_){
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
            img.src = 'images/background/bg_'+_index_+'.jpg';

            img.onload = function() {
                loader_.fadeOut(500);
                $('.ourValueBgitem').css('background-image','url('+img.src+')');
                var timeSeting = setTimeout(function(){
                    // $('.content-item').eq(_index_).find('.inline-item').fadeIn(800);
                    $('.content-item').eq(_index_).find('.Animate').addClass(classAnime);
                    setTimeout(function(){
                        $('.content-item').eq(_index_).find('.Animate2').addClass(classAnime);
                    },300);

                },500);
            };
            
        });

        $('.list-item, .content-item').removeClass('active');
        $('.list-item').eq(_index_).addClass('active');
        
    }
    
    $('.group-list').on('click','.list-item',function(){

        clearInterval(timerInterval);

        var counter     = $(this).index();
        var loader_     = $('.layerLoader');
        var timeSeting;

        clearTimeout(timeSeting);

        $('.list-item, .content-item').removeClass('active');
        $('.list-item').eq(counter).addClass('active');
        $('.content-item').eq(counter).addClass('active');

        loader_.fadeIn(500,function(){
            $('.content-item').find('.Animate, .Animate2').removeClass('leftoright righttoleft slideUp tobottom');
            // $('.content-item').eq(counter).addClass('active');

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

        console.log(counter);

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
                        var timeSeting = setTimeout(function(){
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

        }, 4000);
    })

    function autoRunOurvalue(){

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

        }, 4000);
    }

    // =========== end our values =========//

    $('.wrapper-position').on('click','#buttoRedkendi',function(event){
        event.preventDefault();
        productItem();
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

    $('.toTopBtn').click(function(event){
        event.preventDefault();
        scrolltoTop();
    })

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