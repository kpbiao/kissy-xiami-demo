/*
Copyright 2013, KISSY UI Library v1.40dev
MIT Licensed
build time: May 23 00:43
*/
KISSY.add("component/extension/align",function(c,a,f){function e(b){var p=b.ownerDocument.body,c=a.css(b,"position");if(!("fixed"==c||"absolute"==c))return"html"==b.nodeName.toLowerCase()?null:b.parentNode;for(b=b.parentNode;b&&b!=p;b=b.parentNode)if(c=a.css(b,"position"),"static"!=c)return b;return null}function q(b){var p,c,d={left:0,right:Infinity,top:0,bottom:Infinity},h;c=b.ownerDocument;p=c.body;for(c=c.documentElement;b=e(b);)if((!r.ie||0!=b.clientWidth)&&b!=p&&b!=c&&"visible"!=a.css(b,"overflow"))h=
a.offset(b),h.left+=b.clientLeft,h.top+=b.clientTop,d.top=Math.max(d.top,h.top),d.right=Math.min(d.right,h.left+b.clientWidth),d.bottom=Math.min(d.bottom,h.top+b.clientHeight),d.left=Math.max(d.left,h.left);b=a.scrollLeft();h=a.scrollTop();d.left=Math.max(d.left,b);d.top=Math.max(d.top,h);p=a.viewportWidth();c=a.viewportHeight();d.right=Math.min(d.right,b+p);d.bottom=Math.min(d.bottom,h+c);return 0<=d.top&&0<=d.left&&d.bottom>d.top&&d.right>d.left?d:null}function o(b,c,h,d){var a,f;a=b.left;f=b.top;
c=l(c,h[0]);b=l(b,h[1]);b=[b.left-c.left,b.top-c.top];return{left:a-b[0]+ +d[0],top:f-b[1]+ +d[1]}}function m(b,h,a){var d=[];c.each(b,function(b){d.push(b.replace(h,function(b){return a[b]}))});return d}function j(){}function h(b){var h,f;c.isWindow(b[0])?(h={left:a.scrollLeft(),top:a.scrollTop()},f=a.viewportWidth(),b=a.viewportHeight()):(h=b.offset(),f=b.outerWidth(),b=b.outerHeight());h.width=f;h.height=b;return h}function l(b,h){var c=h.charAt(0),d=h.charAt(1),a=b.width,f=b.height,g,e;g=b.left;
e=b.top;"c"===c?e+=f/2:"b"===c&&(e+=f);"c"===d?g+=a/2:"r"===d&&(g+=a);return{left:g,top:e}}var s=c.Env.host,r=c.UA;j.__getOffsetParent=e;j.__getVisibleRectForElement=q;j.ATTRS={align:{value:{}}};j.prototype={_onSetAlign:function(b){b&&b.points&&this.align(b.node,b.points,b.offset,b.overflow)},align:function(b,a,e,d){var b=f.one(b||s),e=e&&[].concat(e)||[0,0],d=d||{},l=this.get("el"),i=0,g=q(l[0]),k=h(l),j=h(b),b=o(k,j,a,e),n=c.merge(k,b);if(g&&(d.adjustX||d.adjustY)){if(b.left<g.left||b.left+k.width>
g.right)i=1,a=m(a,/[lr]/ig,{l:"r",r:"l"}),e[0]=-e[0];if(b.top<g.top||b.top+k.height>g.bottom)i=1,a=m(a,/[tb]/ig,{t:"b",b:"t"}),e[1]=-e[1];i&&(b=o(k,j,a,e),c.mix(n,b));a={};a.adjustX=d.adjustX&&(b.left<g.left||b.left+k.width>g.right);a.adjustY=d.adjustY&&(b.top<g.top||b.top+k.height>g.bottom);if(a.adjustX||a.adjustY)d=c.clone(b),i={width:k.width,height:k.height},a.adjustX&&d.left<g.left&&(d.left=g.left),a.resizeWidth&&d.left>=g.left&&d.left+i.width>g.right&&(i.width-=d.left+i.width-g.right),a.adjustX&&
d.left+i.width>g.right&&(d.left=Math.max(g.right-i.width,g.left)),a.adjustY&&d.top<g.top&&(d.top=g.top),a.resizeHeight&&d.top>=g.top&&d.top+i.height>g.bottom&&(i.height-=d.top+i.height-g.bottom),a.adjustY&&d.top+i.height>g.bottom&&(d.top=Math.max(g.bottom-i.height,g.top)),n=c.mix(d,i)}n.left!=k.left&&(this.setInternal("x",null),this.get("view").setInternal("x",null),this.set("x",n.left));n.top!=k.top&&(this.setInternal("y",null),this.get("view").setInternal("y",null),this.set("y",n.top));n.width!=
k.width&&l.width(l.width()+n.width-k.width);n.height!=k.height&&l.height(l.height()+n.height-k.height);return this},center:function(b){this.set("align",{node:b,points:["cc","cc"],offset:[0,0]});return this}};return j},{requires:["dom","node"]});
KISSY.add("component/extension/content-render",function(c){function a(){c.mix(this.get("childrenElSelectors"),{contentEl:"#ks-content{id}"})}a.prototype={getChildrenContainerEl:function(){return this.get("contentEl")},_onSetContent:function(a){var e=this.get("contentEl");e.html(a);9>c.UA.ie&&!this.get("allowTextSelection")&&e.unselectable()}};c.mix(a,{ATTRS:{contentTpl:{value:'<div id="ks-content{{id}}" class="{{getBaseCssClasses "content"}}">{{{content}}}</div>'},content:{sync:0}},HTML_PARSER:{content:function(a){return a.one("."+
this.getBaseCssClass("content")).html()},contentEl:function(a){return a.one("."+this.getBaseCssClass("content"))}}});a.ContentTpl=a.ATTRS.contentTpl.value;return a});
KISSY.add("component/extension/decorate-child",function(c,a){function f(){}c.augment(f,a,{decorateInternal:function(a){var c=this.get("defaultChildCfg").prefixCls;if(a=a.one("."+this.get("decorateChildCls")))(c=this.findChildConstructorFromNode(c,a))?this.decorateChildrenInternal(c,a):this.decorateChildren(a)}});f.ATTRS={decorateChildCls:{valueFn:function(){return this.getBaseCssClass("content")}}};return f},{requires:["./decorate-children"]});
KISSY.add("component/extension/decorate-children",function(c,a){function f(){}var e=a.Manager;c.augment(f,{decorateInternal:function(a){this.decorateChildren(a)},findChildConstructorFromNode:function(a,c){var f=c[0].className||"";return f?(f=f.replace(RegExp("\\b"+a,"ig"),""),e.getConstructorByXClass(f)):null},decorateChildrenInternal:function(a,e,f){f=c.merge(this.get("defaultChildCfg"),f,{srcNode:e});delete f.xclass;return this.addChild(new a(f))},decorateChildren:function(a){var c=this,f=c.get("defaultChildCfg").prefixCls,
j=c.get("defaultChildCfg").xclass;a.children().each(function(a){var l=c.findChildConstructorFromNode(f,a)||j&&e.getConstructorByXClass(j);l&&c.decorateChildrenInternal(l,a)})}});return f},{requires:["component/base"]});
KISSY.add("component/extension/delegate-children",function(c,a){function f(){}function e(a){if(!this.get("disabled")){var c=this.getOwnerControl(a.target,a);if(c&&!c.get("disabled"))switch(a.type){case m.start:c.handleMouseDown(a);break;case m.end:c.handleMouseUp(a);break;case m.tap:c.performActionInternal(a);break;case "mouseover":c.handleMouseOver(a);break;case "mouseout":c.handleMouseOut(a);break;case "contextmenu":c.handleContextMenu(a);break;case "dblclick":c.handleDblClick(a)}}}var q=c.UA,o=
c.Env.host.document.documentMode||q.ie,m=a.Gesture,j=c.Features.isTouchSupported();c.augment(f,{__bindUI:function(){var a;a=m.start+" "+m.end+" "+m.tap+" touchcancel ";j||(a+="mouseover mouseout contextmenu "+(o&&9>o?"dblclick ":""));this.get("el").on(a,e,this)},getOwnerControl:function(a){for(var c=this.get("children"),f=c.length,e=this.get("el")[0];a&&a!==e;){for(var b=0;b<f;b++)if(c[b].get("el")[0]===a)return c[b];a=a.parentNode}return null}});return f},{requires:["event"]});
KISSY.add("component/extension",function(c,a,f,e,q,o,m,j,h){return{Align:a,Position:e,PositionRender:q,ContentRender:f,ShimRender:6===c.UA?o:null,DelegateChildren:m,DecorateChild:h,DecorateChildren:j}},{requires:"./extension/align,./extension/content-render,./extension/position,./extension/position-render,./extension/shim-render,./extension/delegate-children,./extension/decorate-children,./extension/decorate-child".split(",")});
KISSY.add("component/extension/position-render",function(){function c(){var a=this.get("renderData");this.get("elStyle")["z-index"]=a.zIndex}c.ATTRS={x:{},y:{},zIndex:{sync:0}};c.prototype={_onSetZIndex:function(a){this.get("el").css("z-index",a)},_onSetX:function(a){null!=a&&this.get("el").offset({left:a})},_onSetY:function(a){null!=a&&this.get("el").offset({top:a})}};return c});
KISSY.add("component/extension/position",function(c){function a(){}a.ATTRS={x:{view:1},y:{view:1},xy:{setter:function(a){var e=c.makeArray(a);e.length&&(e[0]&&this.set("x",e[0]),e[1]&&this.set("y",e[1]));return a},getter:function(){return[this.get("x"),this.get("y")]}},zIndex:{view:1},visible:{value:!1}};a.prototype={move:function(a,e){c.isArray(a)&&(e=a[1],a=a[0]);this.set("xy",[a,e]);return this}};return a});
KISSY.add("component/extension/shim-render",function(){function c(){}c.prototype.__createDom=function(){this.get("el").prepend(S.all("<iframe style='position: absolute;border: none;width: expression(this.parentNode.clientWidth);top: 0;opacity: 0;filter: alpha(opacity=0);left: 0;z-index: -1;height: expression(this.parentNode.clientHeight);'/>"))};return c});
