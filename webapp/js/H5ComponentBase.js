/*
* @Author: Administrator
* @Date:   2017-07-05 18:45:04
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-07 00:39:19
*/
// 基本图文组件对象
'use strict';
var H5ComponentBase = function(name,cfg){
  var cfg = cfg || {};
  var id = ('h5_c_'+Math.random()).replace('.','_');
  // 把当前的组件类型添加到样式中进行标记
  var cls = 'h5_component_name_'+name+' h5_component_'+cfg.type;
  var component = $('<div class="h5_component '+cls+'" id="'+id+'">');
  cfg.text && component.text(cfg.text);
  cfg.width&& component.width(cfg.width/2);
  cfg.css&& component.css(cfg.css);
  cfg.height&& component.height(cfg.height/2);
  cfg.bg&& component.css('backgroundImage','url('+cfg.bg+')');
  if(cfg.center){
    component.css({
      marginLeft: (cfg.width/4*-1)+'px',
      left:'50%'
    })
  }
  // var leave = true;
  // $('body').on('click',function (){
  //   leave=!leave;
  //   component.trigger(leave?'afterLoad':'onLeave')
  // })
  component.on('onLeave',function(){
    $(this).removeClass(cls+'_load').addClass(cls+'_leave');
    cfg.animateOut&& component.animate(cfg.animateOut,'fast','linear');
  })
  component.on('afterLoad',function(){
    $(this).removeClass(cls+'_leave').addClass(cls+'_load');
    cfg.animateIn&& component.animate(cfg.animateIn,'fast','linear');
  })

  return component;
}
