/*
* @Author: Administrator
* @Date:   2017-07-06 13:41:44
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-06 18:48:03
*/
// 内容的管理对象
'use strict';
var H5= function (){
  this.id = ('h5_'+Math.random()).replace('.','_');
  this.el = $('<div class="h5" id="'+this.id+'">').hide();
  this.page=[];
  $('body').append(this.el);
  /*新增一个页
  *@parm{string} name 组件的名称，会加入到Classname中
  *@parm{string} text 页内的默认文本
  *@return {H5} H5对象，可以重复使用H5对象支持的方法
  */
  this.addPage= function (name,text){
    var page = $('<div class="h5_page section">');
    if(name!=undefined){
      page.addClass('h5_page_'+name);
    }
    if(text!=undefined){
      page.text(text);
    }
    this.el.append(page);
    this.page.push(page);
    return this;
  }
    // 新增一个组件
  this.addComponent = function (name,cfg){
    var cfg=cfg|| {};
    var cfg = $.extend({
      type:'base'
    },cfg);
    var component;
    var page = this.page.slice(-1)[0];
    switch(cfg.type) {
      case 'base':
       component = new H5ComponentBase(name,cfg);
      break;
      default:
    }
    page.append(component)
    return this;
  }

  // H5对象的初始化呈现
  this.loader = function(){
    this.el.show();
    this.el.fullpage({
       onLeave:function(index,nextIndex,direction){
        $(this).find('.h5_component').trigger('onLeave');
      },
      afterLoad:function(anchorLink,index){
        $(this).find('.h5_component').trigger('afterLoad');
      },
    });
    this.page[0].find('.h5_component').trigger('afterLoad');
  }
    return this;
}
