/*
* jQuery pagegallery
* https://code.google.com/p/pagegallery/
* http://carlosrberto.org
*
* Copyright (c) 2009 Carlos Roberto Gomes Júnior
* Licensed under MIT License.
* 
* Version: 1.0.0
*/
(function() {

    jQuery.fn.pagegallery = function(options) {

        settings = jQuery.extend({
            opacity:0.6,
            width:640,
            height:480,
            preloaderText:'Loading...',
            errorMessage:"Error loading the image!",
            preloaderOpacity:0.6,
            preloaderTime:400,
            autoPlay:false,
            autoPlayInterval: 2500,
            playPauseControl:'#pagegallery_control',
            playControl:'#pagegallery_play',
            pauseControl:'#pagegallery_pause',  
            imagelist: [{name:'01.jpg'}],
            thumbList:'#pagegalery_thumbs',
            firstIndex:0,
            animationTime:'medium',
            nextButton:'#pagegallery_next',
            prevButton:'#pagegallery_prev',
            nextButtonDisableClass:'pagegallery_disable',
            prevButtonDisableClass:'pagegallery_disable',
            enableImageNextLink:false
            }, options);

            var currentIndex = settings.firstIndex;
            var objectType = typeof settings.imagelist;
            var self = this;

            function getImageList(){
                images = new Array();

                switch (objectType){
                    case 'object':
                    images = settings.imagelist;
                    break;

                    case 'string':
                    $(settings.imagelist).find('a').each(function(i){
                        var a = $(this);
                        images.push(eval('({"name":"'+a.attr("href")+'", "title":"'+a.attr("title")+'"})'));
                    });
                    break;
                }
                return images;
            }

            var arrayImages = getImageList();
            var numImages = arrayImages.length;

            function loadImage(i){

                var imgUrl = arrayImages[i].name;
                var title = arrayImages[i].title;
                var args = [i, title, numImages];
                var img = new Image();
                var preloader = $("#pagegallery_preloader");
                var imageContainer = $('#pagegallery_image');

                preloader.animate({opacity:settings.preloaderOpacity}, settings.preloaderTime);

                $(img)
                .load(function () {
                    preloader.animate({opacity:0}, settings.preloaderTime);
                    img = this;

                    if($(img).length == 1) {
                        $(img).fadeOut(settings.animationTime, function(){
                            imageContainer.empty().append(img);
                            $(img).hide().fadeIn(settings.animationTime); 
                        });

                        $(self).trigger('imagechange', args);  
                    } else {
                        imageContainer.empty().append(img);
                        $(self).trigger('init', args);
                    }

                })    
                .error(function () {
                    //tratar o erro!
                    alert(settings.errorMessage);
                })
                .attr('src', imgUrl);
            }

            function nextImage(cycle) {
                if( currentIndex < (arrayImages.length-1) ) {
                    loadImage(currentIndex + 1);
                    currentIndex++;

                    if(  $(settings.prevButton).hasClass(settings.prevButtonDisableClass) ) {
                        $(settings.prevButton).removeClass(settings.prevButtonDisableClass);
                    }
                } else if(cycle) {
                    currentIndex = 0;
                    loadImage(currentIndex);
                    $(settings.nextButton).removeClass(settings.nextButtonDisableClass);
                }

                if( ! $(settings.nextButton).hasClass(settings.nextButtonDisableClass) && currentIndex == (arrayImages.length-1) ) {
                    $(settings.nextButton).addClass(settings.nextButtonDisableClass);
                }      

            }

            function prevImage() {
                if( currentIndex > 0 ) {
                    loadImage(currentIndex - 1);
                    currentIndex--;

                    if(  $(settings.nextButton).hasClass(settings.nextButtonDisableClass) ) {
                        $(settings.nextButton).removeClass(settings.nextButtonDisableClass);
                    }
                }

                if( ! $(settings.prevButton).hasClass(settings.prevButtonDisableClass) && currentIndex == 0 ) {
                    $(settings.prevButton).addClass(settings.prevButtonDisableClass);
                } 
            }

            $(settings.nextButton).bind('click', function(e){
                nextImage(false);
                e.preventDefault();
            });

            $(settings.prevButton).bind('click', function(e){
                prevImage();
                e.preventDefault();
            });


            if( objectType == 'string' ) {
                var thumbAnchor = $( settings.imagelist ).find('a');
                thumbAnchor.bind('click', function( e ){
                    var index = thumbAnchor.index(this);
                    loadImage( index );
                    currentIndex = index;
                    e.preventDefault();
                });

            } 


            var player =  {

                idInterval:false,

                autoPlay:function(){
                    this.idInterval = window.setInterval(function(){ nextImage( true ) }, settings.autoPlayInterval);
                },

                play:function(){
                    if( !this.idInterval ) {
                        nextImage( true );
                        this.autoPlay();
                    }
                },

                pause:function(){
                    if ( this.idInterval ) {
                        window.clearInterval(this.idInterval);
                        this.idInterval = false;     
                    }

                }

            }

            function init(target){
                if ($('#pagegallery').length == 0){
                    target.append('<div id="pagegallery"><div id="pagegallery_loading"><div id="pagegallery_preloader">'+settings.preloaderText+'</div></div><div id="pagegallery_image"></div></div>');
                }

                if( arrayImages.length > 1) {
                    $(settings.prevButton).addClass(settings.prevButtonDisableClass);
                    $(settings.nextButton).removeClass(settings.nextButtonDisableClass);
                } else {
                    $(settings.prevButton).addClass(settings.prevButtonDisableClass);
                    $(settings.nextButton).addClass(settings.nextButtonDisableClass);
                }


                $("#pagegallery").css({ width:settings.width, height:settings.height });
                $("#pagegallery_loading").css({ width:settings.width });
                $("#pagegallery_preloader").css({ top:(settings.height/2), opacity:settings.opacity }).css({opacity:0});
                loadImage(settings.firstIndex);


                $(settings.playControl).bind('click', function(e){
                    player.play();
                    e.preventDefault();
                });

                $(settings.pauseControl).bind('click', function(e){
                    player.pause();
                    e.preventDefault();
                });

                $( settings.playPauseControl ).bind('click', function(e){
                    if( ! player.idInterval ) {
                        player.play();
                    } else {
                        player.pause();
                    }
                    e.preventDefault();
                });


                if( settings.autoPlay ){
                    $(self).bind('init', function(){
                        player.autoPlay();
                    });
                }


                if( settings.enableImageNextLink && arrayImages.length > 1 ){
                    $("#pagegallery").css({cursor:'pointer'});
                    $("#pagegallery img").live('click', function(e){
                        nextImage(true);
                    });      
                }

            }


            return this.each(function(){
                init($(this));
            });

        };

        })(jQuery);
