
$(function(){
    /* For old browers */
    if (typeof Object.create !== "function")
        Object.create = function(o) {
            function F() {}
            F.prototype = o;
        return new F();
    };
    $.fn.toarray = function (obj) {
        var list=[];
        for ( var i in obj ) {
           list.push(obj[i]);
        }
        return list;
    }

    /* History API init */
    var defaultTmpl = "stream.html",
        blockModule = $('#block .module'),
        partials = {},
        curPageHolder;

    function loadPartial( tmpl ) {
        function result( html ) {
            var pageHolder = new PageHolder(html, tmpl);
            partials[tmpl] = pageHolder;
            showPageHolder( partials[tmpl] );
        }
        function showPageHolder(ph) {
            if (curPageHolder){
                curPageHolder.off();  /* off all ilisteners on old page */
            }
            curPageHolder = ph;
            ph.show(function(){ /* callback when PageHolder will be ready*/
                loading.hide();
                $('a[data-tmpl="'+tmpl+'"]').addClass('current');
            });
            
        }
        $('.route.current').removeClass('current');
        $('#account-nav .last').removeClass('nav-open');
        if (partials[tmpl]==undefined){ /* chche of template */
            $.get("/partial/"+tmpl, result)
        } else {
            showPageHolder( partials[tmpl] );
        }
    }
    function handlerAnchors( e ) {
    	e.preventDefault();
        var state = {
            title: this.getAttribute( "title" ),
            url: this.getAttribute( "href", 2 ), 
            tmpl: this.getAttribute( "data-tmpl" )
        }

        history.pushState( state, state.title, state.url );
        loading.show();
        loadPartial( this.getAttribute('data-tmpl') );

        return false;
    }

    $('a.route').click(handlerAnchors);
    history.replaceState(null, null,'/app/'+oldDir); /*oldDir render via server after refreshig the page (f5)*/
    window.onpopstate = function( e ) {
        var tmpl;
        loading.show();/*
        if ( oldDir&&oldDir!="None" ) {
            tmpl = $('a[href='+oldDir+']').data('tmpl');
        }*/
        loadPartial( tmpl || history.state && history.state.tmpl || defaultTmpl );
    }

    /* Loading Object */
    var loading = {
        loadingEl: $('#loading'),
        show: function(notflickering) {
            this.loadingEl.removeClass('hidden');
            if (!notflickering)
                blockModule.removeClass('display');
        },
        hide: function() {
            this.loadingEl.addClass('hidden');
            blockModule.addClass('display');
        }
    }

    /* Public Init */
    $.fn.controller = { handler: {}}; //init controller object

    $('#account-nav').click(function() {
        var last = $(this).find('.last');
        if (last.hasClass('nav-open'))
            last.removeClass('nav-open');
        else
            last.addClass('nav-open');
    });

    /* PageHolder class */
    var PageHolder = function(element, tmplName) {
        var view = $.fn.View[tmplName],
            ready = true,   /* for acync rendering */
            promise = null, /* for acync rendering */
            appendLestener = function( selector, func ) {
                blockModule.on(arguments[2]||'click', selector, func);
                console.log(selector)
            };
        if (view.render) {
            ready = false;
            view.render(element, function(html){
                element = $(html);
                ready = true;
                if (promise) {
                    promise();
                }
            })
        } else {
            element = $(element)
        }
        this.show = function(callback){
            var work = function() {
                blockModule.html(element);
                view.init && view.init()
                for (var params in view.listeners) {
                    appendLestener.apply(null, view.listeners[params]);
                }
                callback();
            }
            if (ready) {
                work();
            } else {
                promise = work;
            }
        }
        this.off = function() {
            blockModule.off();
        }
    };


    /* ============ Controller handler functions ============= */

    /* streamInit */
    $.fn.controller.handler['streamInit'] = function() {
        var success = function(json) {
                var items, 
                    template = $.fn.createTemplate($('#stream-linkList').html());
                json.map(function(item, index) {
                    $.fn.Bookmark.init(item);    
                });
                /* TODO make the sort */
                items = $.fn.toarray($.fn.Bookmark.items).reverse();
                $('#putHere').html(template({items:items}));
                loading.hide(); 
            },
            error = function(){
                toastr.error('Ошибка соединения');
                loading.hide();
            }

        loading.show(true);
        $.ajax({
            url: "/api/bookmark/feed/0",
            data: this.prop,
            success: success,
            error: error
        });
    }
    /* streamShowMore */
    $.fn.controller.handler['streamShowMore'] = function() {
        console.log('clicked "#moreButton"');
    }
    /* streamShowMore */
    $.fn.controller.handler['streamExtendLink'] = function() {
        var link = $(this),
            extended = link.find('.extended'),
            height;
        if (link.hasClass('full')) {
            link.removeClass('full')
        } else if (!link.hasClass('edit')){
            link.addClass('full');
            //extended.slideDown();
        }
    }
    /* streamEditItem */
    $.fn.controller.handler['streamEditItem'] = function(e) {
        e.stopPropagation();
        var link = $(this.parentNode.parentNode.parentNode);
        link.removeClass('full')
        .addClass('edit');
    }
    /* streamSaveItem */
    $.fn.controller.handler['streamSaveItem'] = function(e) {
        e.stopPropagation();
        var form = $(this).closest('form'),
            link = form.parent().parent(),
            id = link.data('id'),
            params = {},
            callback = function(instence, done){
                if (done) {
                    toastr.success('Изменения сохранены');
                    form[0].reset();
                    link.removeClass('edit');
                    $.fn.controller.handler['streamInit']();
                } else if (instence)
                    toastr.error('Не удалось сохранить изменения, роблемы соединения с сервером, попробуйте ещё раз');
                else
                    toastr.error('Не удалось сохранить изменения, плохая ссылка');
                loading.hide();
            };
        form.serializeArray().map(function(item, index){
            params[item.name] = item.value;
        });
        loading.show(true);
        $.fn.Bookmark.items[id].update(params, callback);
    }

    /* addInit */
    $.fn.controller.handler['addInit'] = function() {
        console.log('Add inited');
    }
    /* addAddLink */
    $.fn.controller.handler['addAddLink'] = function() {
        var form = $(this).closest('form'),
            params = {},
            callback = function(instence, done){
                if (done) {
                    toastr.success('Закладка создана');
                    form[0].reset();
                } else if (instence)
                    toastr.error('Не удалось создать закладку, роблемы соединения с сервером, попробуйте ещё раз');
                else
                    toastr.error('Не удалось создать закладку, плохая ссылка');
                loading.hide();
            };
        form.serializeArray().map(function(item, index){
            params[item.name] = item.value;
        });
        loading.show(true);
        $.fn.Bookmark.create(params, callback);
        console.log(params);
    }
    /* profileRender */
    $.fn.controller.handler['profileRender'] = function(tmpl, callback) {
        var template = $.fn.createTemplate(tmpl),
            success = function(json) {
                callback(template({user: json}));

            },
            error = function(){
                toastr.error('Ошибка соединения');
                callback(null);
            }

        loading.show(true);
        $.ajax({
            url: "/api/user/info",
            data: this.prop,
            success: success,
            error: error
        });
    }

    if (oldDir&&oldDir!="None") 
        defaultTmpl = $('a[href='+oldDir+']').data('tmpl');
    $('a.route[data-tmpl="'+defaultTmpl+'"]').trigger('click');
});;
