KISSY.add("xiami/transition/album",function(q,r,w,i,j,k,s,t,u){var l=r.all,f,m=this.getName(),v=l("#body"),o=j.getHeader(m),p=0,a=null,n=null;return{init:function(a){j.setTitle("");a.id!=p?(f=l('<div class="mod-page"><div class="album-loading"></div></div>').appendTo(v),j.setTitle("loading..."),this.fetchData(a)):j.setTitle(n);o.contents().length||o.append(m);k.setCurrentMod(m)},getEl:function(){return f},fetchData:function(a){var c=this;p=a.id;q.IO({dataType:"jsonp",url:"http://test.fem.taobao.net:3000/album/"+
a.id,success:function(a){for(var b=c.getTemplate(),e=a.songs,d=a.img,b=b.replace(RegExp("{{album_id}}","gi"),a.id),b=b.replace(RegExp("{{author}}","gi"),a.artist.title),b=b.replace(RegExp("{{desc}}","gi"),a.desc),b=b.replace(RegExp("{{img}}","gi"),a.img),b=b.replace(RegExp("{{list_count}}","gi"),e.length),b=b+'<ul class="album-list">',h=0;h<e.length;h++)var g=c.getListTemplate(),g=g.replace(RegExp("{{song_id}}","gi"),e[h].id),g=g.replace(RegExp("{{song_location}}","gi"),e[h].location),g=g.replace(RegExp("{{title}}",
"gi"),e[h].title),g=g.replace(RegExp("{{hot}}","gi"),e[h].hot),b=b+g;f.html(b+"</ul>");f.all(".J_album_play").on(i.Gesture.tap,function(){var a=l(this),b=a.attr("data-id"),c=a.attr("data-location"),a=a.parent("li").one(".album-song-title").text();k.playOne({id:b,location:c,albumCover:d,title:a})});f.all(".J_album_add_list").on(i.Gesture.tap,function(){var a=l(this),b=a.attr("data-id"),c=a.attr("data-location"),a=a.parent("li").one(".album-song-title").text();k.addToList({id:b,location:c,albumCover:d,
title:a})});f.all(".J_album_desc").on(i.Gesture.tap,function(){c.getAlbumDescPopup(a)});f.all(".J_album_add_list_all").on(i.Gesture.tap,function(){for(var a=[],b=0;b<e.length;b++)a.push({id:e[b].id,location:e[b].location,albumCover:d,title:e[b].title});k.addToList(a)});f.all(".J_album_play_first").on(i.Gesture.tap,function(){var a=f.one(".J_album_play"),b=a.attr("data-id"),c=a.attr("data-location"),a=a.parent("li").one(".album-song-title").text();k.playOne({id:b,location:c,albumCover:d,title:a})});
n=a.title;j.setTitle(n)}})},getTemplate:function(){return'<div class="album-title"><div class="album-img"><img src="{{img}}"></div><div class="album-info album-inline"><h3>{{author}}</h3><div class="album-desc J_album_desc">{{desc}}</div><div class="album-control"><button class="play inline J_album_play_first">&nbsp;</button><button class="list inline J_album_add_list_all">&nbsp;</button></div></div><div class="album-list-count">{{list_count}}首歌曲</div></div>'},getListTemplate:function(){return'<li><h3 class="album-song-title">{{title}}</h3><div class="album-btn-group"><button class="J_album_play play inline" data-id="{{song_id}}" data-location="{{song_location}}">&nbsp;</button><button class="J_album_add_list list inline" data-id="{{song_id}}" data-location="{{song_location}}">&nbsp;</button></div></li>'},
getAlbumDescPopup:function(d){if(a)return!1;var c;c='<dl class="desc-container"><dt class="desc-header"><h4 class="title">{{title}}</h4><h4 class="article">{{author}}</h4></dt><dd class="desc"><div class="ks-scrollview-content ks-content">{{desc}}</div></dd></dl><i class="J_close album-close">×</i>'.replace(RegExp("{{title}}","gi"),d.title);c=c.replace(RegExp("{{desc}}","gi"),d.desc);c=c.replace(RegExp("{{author}}","gi"),d.artist.title);d={width:0.98*document.documentElement.clientWidth,height:0.98*
(document.documentElement.clientHeight-l("#suspender").outerHeight()-0.05*document.documentElement.clientHeight-20),closeable:!0,align:{points:["tc","tc"]},content:c,elCls:"album-popup"};a=new s(d);a.on("afterRenderUI",function(){a.get("el").all(".desc").height();_titleHeight=a.get("el").all("dt").height();_contentHeight=a.get("el").height();a.get("el").all(".desc").css("height",_contentHeight-_titleHeight-80+"px");(new t({srcNode:a.get("el").all(".desc"),plugins:[new u({})]})).render();a.get("el").all(".J_close").on("click",
function(){a.get("el").remove();a=null})});a.render().show()}}},{requires:"node,./index,event,../header,../suspender,overlay,scrollview,scrollview/plugin/scrollbar,./album.css".split(",")});
