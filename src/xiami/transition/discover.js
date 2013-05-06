KISSY.add(function (S, Node, Event, Transition, Event, header, DD, ScrollView, ScrollbarPlugin, IO, XTemplate) {

    var $ = Node.all,
        timer = null,
        scrollview = null,
        el;

    var HTML = ['<div class="display-area">',
                    '<div class="radar-area center">',
                        '<ul class="switch-way J_Switch">',
                            '<li class="active"></li>',
                            '<li></li>',
                        '</ul>',
                        '<div class="panel J_RadarPanel">',
                            '<canvas id="radar-canvas" class="opt-area"></canvas>',        
                            '<div class="radar">',
                                '<div class="radar-bg"></div>',
                                '<div class="radar-handler"></div>',
                            '</div>',
                            '<div id="message">',
                                '<div class="mask"></div>',
                                '<div class="result-msg">发现15首好歌</div>',
                            '</div>',
                        '</div>',

                        '<div class="panel J_ShakePanel" style="display:none;">',
                            '<div class="opt-area">',
                                '<div class="battery-container">',
                                    '<div class="battery-energy"></div>',
                                '</div>',
                                '<div class="battery-anode"></div>',
                            '</div>',
                        '</div>',
                    '</div><!-- end of .radar-area -->',
                    '<div class="songs-area center">',
                        '<div class="songs-list J_SongsList">',
                            '<ul class="unstyled">',
                            '</ul>',
                        '</div>',
                    '</div><!-- end of .songs-area -->',
                '</div><!-- end of .display-area -->',

                '<div class="illustration-area">',
                    '<div class="radar-illustration center J_RadarIllus">',
                        '<h2>音乐雷达</h2>',
                        '<p>移动滑块，根据您的心情发现音乐</p>',
                    '</div>',

                    '<div class="radar-illustration center J_ShakeIllus" style="display: none;">',
                        '<h2>音乐摇摆引擎</h2>',
                        '<p>摇滚你的手机，根据节奏发现好音乐</p>',
                    '</div>',
                '</div><!-- end of .illustration-area -->',

                '<script type="text/template" id="songs-list-tpl">',
                    '{{#each songs}}',
                        '<li data-id="{{id}}">{{title}}<button class="play-btn"/><button class="addtolist-btn"/></li>',
                    '{{/each}}',
                '</script>']
                .join('');

        var emotion = {
            'sadness':[
                [{'tag':'粤语','key':''},{'tag':'民谣','key':''},{'tag':'五月天','key':''}],
                [{'tag':'伤感','key':''},{'tag':'金属','key':''},{'tag':'轻快','key':''}],
                [{'tag':'励志','key':''},{'tag':'温暖','key':''},{'tag':'忧伤','key':''}],
                [{'tag':'吉他','key':''},{'tag':'怀旧','key':''},{'tag':'纯音乐','key':''}],
                [{'tag':'摇滚','key':''},{'tag':'治愈','key':''},{'tag':'舒服','key':''}]
            ],
            'happiness':[
                [{'tag':'杨宗纬','key':''},{'tag':'深情','key':''},{'tag':'清新','key':''}],
                [{'tag':'节奏','key':''},{'tag':'慵懒','key':''},{'tag':'Rock','key':''}],
                [{'tag':'电子','key':''},{'tag':'钢琴','key':''},{'tag':'韩国','key':''}],
                [{'tag':'小提琴','key':''},{'tag':'电音','key':''},{'tag':'悠然自在','key':''}],
                [{'tag':'爵士','key':''},{'tag':'流行','key':''},{'tag':'舒缓','key':''}]
            ],
            'calm':[
                [{'tag':'抒情','key':''},{'tag':'Electronic','key':''},{'tag':'轻音乐','key':''}],
                [{'tag':'Folk','key':''},{'tag':'Jazz','key':''},{'tag':'林志炫','key':''}],
                [{'tag':'小清新','key':''},{'tag':'Adele','key':''},{'tag':'古风','key':''}],
                [{'tag':'中国摇滚','key':''},{'tag':'治愈系','key':''},{'tag':'五月天','key':''}],
                [{'tag':'粤语','key':''},{'tag':'民谣','key':''},{'tag':'五月天','key':''}]
            ],
            'excite':[
                [{'tag':'抒情','key':''},{'tag':'Electronic','key':''},{'tag':'轻音乐','key':''}],
                [{'tag':'抒情','key':''},{'tag':'Electronic','key':''},{'tag':'轻音乐','key':''}],
                [{'tag':'抒情','key':''},{'tag':'Electronic','key':''},{'tag':'轻音乐','key':''}],
                [{'tag':'抒情','key':''},{'tag':'Electronic','key':''},{'tag':'轻音乐','key':''}],
                [{'tag':'抒情','key':''},{'tag':'Electronic','key':''},{'tag':'轻音乐','key':''}]
            ]
        };

    var TAG_URL = 'http://test.fem.taobao.net:3000/song/tag/';

    return {

        init: function (cfg) {
            var self = this;
            if (!el) {
                el = $('<div class="mod-page"></div>').appendTo(body);
                el.html(HTML);

                self._drawCanvas();
                self._bindEvent();

                S.log('discover music is new');
            } else {
                S.log('discover music is coming again');
            }
                    
            var headerEl = header.getHeader('discover');
            if (!headerEl.contents().length) {
                headerEl.html('<h1>发现音乐</h1><a href="#" class="list-icon icon">列表</a><a href="#" class="search-icon icon">搜索</a>');
            }

        },

        getEl: function () {
            return el;
        },

        /**
         * 绘制象限canvas
         * @return {[type]} [description]
         */
        _drawCanvas: function(){
            var canvas = S.one("#radar-canvas")[0],
                cxt = canvas.getContext("2d");
                width = canvas.width,
                height = canvas.height,
                LINE_WIDTH = 2,
                PADDING = 5,
                COLOR = '#FFF';

            function init(){
                cxt.strokeStyle = COLOR;
                cxt.fillStyle = COLOR;//文字
                cxt.lineWidth = LINE_WIDTH;
            }

            function draw(){
                cxt.beginPath();
                cxt.moveTo(PADDING, height/2);
                cxt.lineTo(width-PADDING, height/2);
                cxt.stroke();

                cxt.beginPath();
                cxt.moveTo(width/2, PADDING);
                cxt.lineTo(width/2, height-PADDING);
                cxt.stroke();

                cxt.font = "12px Times New Roman";
                cxt.fillText('忧伤',PADDING,height/2 - LINE_WIDTH);
                cxt.textAlign = 'right';
                cxt.fillText('快乐',width-PADDING, height/2 - LINE_WIDTH);
                cxt.fillText('平静',width/2-LINE_WIDTH, PADDING + 12);
                cxt.fillText('激动',width/2-LINE_WIDTH, height - PADDING);
            }

            init();
            draw();
        },

        /**
         * 雷达拖动推荐音乐   
         * @param  {object} position 当前滑块位置在象限中的位置
         * @return {[type]}          [description]
         */
        _recommendSongsByRadar: function(position){
            var self = this,
                canvas = S.one('#radar-canvas'),
                w = canvas.width(),
                h = canvas.height(),
                PADDING = 5,
                x = position.x,
                y = position.y,
                coorX = x - w/2,
                coorY = y - h/2,
                intervalX = w/2/5,
                intervalY = h/2/5,
                idxX = Math.floor(Math.abs(coorX)/intervalX),
                idxY = Math.floor(Math.abs(coorY)/intervalY);

            var xArray = coorX < 0 ? emotion['sadness'][idxX] : emotion['happiness'][idxX],
                yArray = coorY < 0 ? emotion['excite'][idxY] : emotion['calm'][idxY];

            var xTag = xArray[Math.floor(Math.random() * xArray.length)],
                yTag = yArray[Math.floor(Math.random() * yArray.length)];

            var received = false,
                songs = [];

            new IO({
                type: 'GET',
                url: TAG_URL + xTag['tag'],
                dataType: 'jsonp',
                crossDomain: true,
                complete: function(response, textStatus, xhrObj){
                    if(textStatus == 'success' && response.songs){
                        songs = songs.concat(response.songs);
                        if(received){
                            self._showResult(songs);
                        }else{
                            received = true;
                        }
                    }
                }
            });

            new IO({
                type: 'GET',
                url: TAG_URL + yTag['tag'],
                dataType: 'jsonp',
                crossDomain: true,
                complete: function(response, textStatus, xhrObj){
                    if(textStatus == 'success' && response.songs){
                        songs = songs.concat(response.songs);
                        if(received){
                            self._showResult(songs);
                        }else{
                            received = true;
                        }
                    }
                }
            });
        },

        /**
         * 摇一摇推荐音乐
         * @return {[type]} [description]
         */
        _recommendSongsByShake: function(){
            var energy = S.one('.battery-energy'),
                anode = S.one('.battery-anode');
            //能量全满
            energy.css('width','100%');
            anode.css('background', '#90d5fe');

            //推荐歌曲
            new IO({
                type: 'GET',
                url: TAG_URL + '摇滚',
                dataType: 'jsonp',
                crossDomain: true,
                complete: function(response, textStatus, xhrObj){
                    if(textStatus == 'success' && response.songs){
                        var html = new XTemplate(S.one('#songs-list-tpl').html()).render({songs:response.songs});
                        S.one('.J_SongsList').one('ul').html(html).end().show();
                        scrollview.show().sync();   

                        energy.css('width','0');
                        anode.css('background', '#cad0d3');                     
                    }
                }
            });


        },

        /**
         * 定位消息
         * @return {[type]} [description]
         */
        _updateMsgPosition: function(){
            var MASK_WIDTH = 35,
                INTERVAL = 5,
                canvas = S.one('#radar-canvas'),
                canvasWidth = canvas.width(),
                canvasHeight = canvas.height(),
                radar = S.one('.radar'),
                pos = radar.offset(),
                posL = pos.left - S.one('.J_RadarPanel').offset().left,
                posT = pos.top - S.one('.J_RadarPanel').offset().top,
                radarWidth = radar.width(),
                radarHeight = radar.height(),
                msg = S.one('#message'),
                mEdgeS = Math.min(msg.width(), msg.height()),
                mEdgeL = Math.max(msg.width(), msg.height()),
                overlap = MASK_WIDTH - INTERVAL,
                left = 0,
                top = 0;

            if(posL + radarWidth + mEdgeS - overlap < canvasWidth && posT >= 0 && posT + radarHeight < canvasHeight){//right available
                msg.addClass('right');
                left = posL + radarWidth - overlap;
                top = posT;
            }else if(posL - mEdgeS + overlap > 0 && posT >= 0 && posT + radarHeight < canvasHeight){//left available
                msg.addClass('left');
                left = posL - mEdgeS + overlap;
                top = posT;
            }else if(posT + radarHeight + mEdgeS - overlap < canvasHeight && posL >= 0 && posL + radarWidth < canvasWidth){//bottom available
                msg.addClass('bottom');
                left = posL;
                top = posT + radarHeight - overlap;
            }else if(posT - mEdgeS + overlap > 0 && posL >= 0 && posL + radarWidth < canvasWidth){//top available
                msg.addClass('top');
                left = posL;
                top = posT - mEdgeS + overlap;
            }else if(posL < canvasWidth/2 && posT < canvasHeight/2){//左上角
                msg.addClass('lefttop').addClass('right');
                left = posL + radarWidth - overlap;
                top = posT;
            }else if(posL > canvasWidth/2 && posT < canvasHeight/2){//右上角
                msg.addClass('righttop').addClass('left');
                left = posL - mEdgeS + overlap;
                top = posT;
            }else if(posL < canvasWidth/2 && posT > canvasHeight/2){//左下角
                msg.addClass('leftbottom').addClass('right');
                left = posL + radarWidth - overlap;
                top = posT;
            }else if(posL > canvasWidth/2 && posT > canvasHeight/2){//右下角
                msg.addClass('rightbottom').addClass('left');
                left = posL - mEdgeS + overlap;
                top = posT;
            }
            msg.css({
                left: left + 'px',
                top: top + 'px'
            });

        },

        /**
         * 展示发现音乐结果
         * @param  {array} songs
         * @return {[type]}       [description]
         */
        _showResult: function(songs){
            var html = new XTemplate(S.one('#songs-list-tpl').html()).render({songs:songs});
            S.one('.J_SongsList').one('ul').html(html).end().show();
            scrollview.show().sync();

            var self = this,
                radar = S.one('.radar'),
                msg = S.one('#message');


                msg.attr('class','');

                radar.removeClass('detecting');
                clearTimeout(timer);

                self._updateMsgPosition();
                 
                msg.one('.result-msg').text('发现'+songs.length+'首好歌');      
                msg.show();                                      


        },

        _bindEvent: function(){
            var self = this,
                radar = S.one('.radar'),
                light = S.one('.radar-bg'),
                handler = S.one('.radar-handler'),
                msg = S.one('#message');

            var dragable = new DD.Draggable({
                    node: '.radar',
                    handlers: ['.radar-handler'],
                    move: true
                });
            
            var deg = 5,
                startRotate = function(){
                    light.css({
                        '-webkit-transform':'rotate('+deg+'deg)',
                        '-moz-transform':'rotate('+deg+'deg)',
                        'transform':'rotate('+deg+'deg)'
                    });
                    deg += 30;
                    timer = setTimeout(startRotate,100);
                };
                

            dragable.on('dragstart',function(e){
                msg.hide();
                radar.removeClass('active');
            });


            dragable.on('dragend',function(e){
                var pos = radar.offset(),
                    posL = pos.left - S.one('.J_RadarPanel').offset().left,
                    posT = pos.top - S.one('.J_RadarPanel').offset().top,
                    width = radar.width(),
                    height = radar.height();
                radar.addClass('active').addClass('detecting');
                startRotate();    
                self._recommendSongsByRadar({x:posL + width/2,y:posT + height/2});            
            });


            scrollview = new ScrollView({
                srcNode: '.songs-list',
                plugins: [new ScrollbarPlugin({})]
            }).render().hide();

            var mode = 'radar',
                shakePanel = S.one('.J_ShakePanel'),
                radarPanel = S.one('.J_RadarPanel'),
                shakeIllus = S.one('.J_ShakeIllus'),
                radarIllus = S.one('.J_RadarIllus'),
                switcher = S.one('.J_Switch'),
                switchToShake = function(){
                    shakePanel.show();
                    radarPanel.hide();
                    shakeIllus.show();
                    radarIllus.hide();
                    switcher.all('li').item(1).addClass('active').siblings().removeClass('active');
                    S.one('.J_SongsList').one('ul').empty().end().hide();
                    mode = 'shake';
                },
                switchToRadar = function(){
                    shakePanel.hide();
                    radarPanel.show();
                    shakeIllus.hide();
                    radarIllus.show();
                    switcher.all('li').item(0).addClass('active').siblings().removeClass('active');
                    S.one('.J_SongsList').one('ul').empty().end().hide();
                    mode = 'radar';
                };

            //切换两种发现音乐的方式
            Event.on('.display-area','swipe',function(e){
                if(mode === 'radar' && e.direction === 'left'){
                    switchToShake();
                }else if(mode === 'shake' && e.direction === 'right'){                    
                    switchToRadar();
                }
            });

            //播放
            Event.delegate('.J_SongsList','click','.play-btn',function(e){
                var target = S.one(e.target);
                Transition.forward('xiami/transition/discover', 'xiami/transition/player',{
                    id: target.parent('li').attr('data-id')
                });
            });

            //摇一摇
            Event.on(window, 'shake', function(e){
                if(mode === 'shake'){
                    self._recommendSongsByShake();
                }
            });

            //trigger点击也能切换两种发现音乐的方式
            S.one('.J_Switch').all('li').each(function(li, idx){
                if(idx == 0){
                    li.on(Event.Gesture.tap,function(){
                        switchToRadar();
                    });
                }else{
                    li.on(Event.Gesture.tap,function(){
                        switchToShake();
                    });
                }
            });

        }




    };

}, {
    requires: ['node','event','./index','event','../header','dd','scrollview/drag','scrollview/plugin/scrollbar','ajax', 'xtemplate']
});
