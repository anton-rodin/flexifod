$(function(){
    /* Template system :) */
    $.fn.createTemplate = function(tmpl) {
        return new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        "with(obj){p.push('" +
        tmpl
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
      };
    var Helper = {
      date: function(date){
        return date.toString('dd-MM-yyyy h:mm:ss')
      }
    }

    /* View route function */
    $.fn.View  = {
        'stream.html': {
            init: $.fn.controller.handler['streamInit'],
            listeners: [
                [ '#moreButton', $.fn.controller.handler['streamShowMore'], 'click' ], /* thier item by default is 'cilcl' */
                [ '.link', $.fn.controller.handler['streamExtendLink']], 
                [ '.edit-button-icon', $.fn.controller.handler['streamEditItem']],
                [ '.save-button', $.fn.controller.handler['streamSaveItem']] 
            ]
        },
        'add.html': {
            init: $.fn.controller.handler['addInit'],
            listeners: [
                [ '#add-addButton', $.fn.controller.handler['addAddLink'], 'click' ]
            ]
        },
        'about.html': {
            init: null,
            listeners: [ ]
        },
        'account.html': {
            init: null,
            render: $.fn.controller.handler['profileRender'],
            listeners: [ ]
        }
    };
});