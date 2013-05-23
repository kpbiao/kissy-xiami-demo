/*
Copyright 2013, KISSY UI Library v1.40dev
MIT Licensed
build time: May 23 00:53
*/
KISSY.add("json",function(h,k,f){return h.JSON={stringify:k,parse:f}},{requires:["./json/stringify","./json/parse"]});
KISSY.add("json/parse",function(h,k,f){function m(a,b,c){var e=a[b],i,g,f;if("object"===typeof e)if(h.isArray(e)){i=0;g=e.length;for(var d=[];i<g;)f=m(e,""+i,c),void 0!==f&&(d[d.length]=f);e=d}else{d=h.keys(e);i=0;for(g=d.length;i<g;i++){var k=d[i];f=m(e,k,c);void 0===f?delete e[k]:e[k]=f}}return c.call(a,b,e)}k.yy={unQuote:f.unQuote};return function(a,b){var c=k.parse(""+a);return b?m({"":c},"",b):c}},{requires:["./parser","./quote"]});
KISSY.add("json/parser",function(){var h={},k=KISSY,f=function(a){this.rules=[];k.mix(this,a);this.resetInput(this.input)};f.prototype={constructor:function(a){this.rules=[];k.mix(this,a);this.resetInput(this.input)},resetInput:function(a){k.mix(this,{input:a,matched:"",stateStack:[f.STATIC.INITIAL],match:"",text:"",firstLine:1,lineNumber:1,lastLine:1,firstColumn:1,lastColumn:1})},getCurrentRules:function(){var a=this.stateStack[this.stateStack.length-1],b=[],a=this.mapState(a);k.each(this.rules,
function(c){var e=c.state||c[3];e?k.inArray(a,e)&&b.push(c):a==f.STATIC.INITIAL&&b.push(c)});return b},pushState:function(a){this.stateStack.push(a)},popState:function(){return this.stateStack.pop()},getStateStack:function(){return this.stateStack},showDebugInfo:function(){var a=f.STATIC.DEBUG_CONTEXT_LIMIT,b=this.matched,c=this.match,e=this.input,b=b.slice(0,b.length-c.length),b=(b.length>a?"...":"")+b.slice(-a).replace(/\n/," "),c=c+e,c=c.slice(0,a)+(c.length>a?"...":"");return b+c+"\n"+Array(b.length+
1).join("-")+"^"},mapSymbol:function(a){var b=this.symbolMap;return!b?a:b[a]||(b[a]=++this.symbolId)},mapReverseSymbol:function(a){var b=this.symbolMap,c,e=this.reverseSymbolMap;if(!e&&b)for(c in e=this.reverseSymbolMap={},b)e[b[c]]=c;return e?e[a]:a},mapState:function(a){var b=this.stateMap;return!b?a:b[a]||(b[a]=++this.stateId)},lex:function(){var a=this.input,b,c,e,i=this.getCurrentRules();this.match=this.text="";if(!a)return this.mapSymbol(f.STATIC.END_TAG);for(b=0;b<i.length;b++){c=i[b];var g=
c.token||c[0];e=c.action||c[2]||void 0;if(c=a.match(c.regexp||c[1])){if(b=c[0].match(/\n.*/g))this.lineNumber+=b.length;k.mix(this,{firstLine:this.lastLine,lastLine:this.lineNumber+1,firstColumn:this.lastColumn,lastColumn:b?b[b.length-1].length-1:this.lastColumn+c[0].length});b=this.match=c[0];this.matches=c;this.text=b;this.matched+=b;e=e&&e.call(this);e=void 0==e?g:this.mapSymbol(e);this.input=a=a.slice(b.length);return e?e:this.lex()}}}};f.STATIC={INITIAL:"I",DEBUG_CONTEXT_LIMIT:20,END_TAG:"$EOF"};
var m=new f({rules:[[2,/^"(\\"|\\\\|\\\/|\\b|\\f|\\n|\\r|\\t|\\u[0-9a-zA-Z]{4}|[^\\"\x00-\x1f])*"/,0],[0,/^[\t\r\n\x20]/,0],[3,/^,/,0],[4,/^:/,0],[5,/^\[/,0],[6,/^\]/,0],[7,/^\{/,0],[8,/^\}/,0],[9,/^-?\d+(?:\.\d+)?(?:e-?\d+)?/i,0],[10,/^true|false/,0],[11,/^null/,0],[12,/^./,0]]});h.lexer=m;m.symbolMap={$EOF:1,STRING:2,COMMA:3,COLON:4,LEFT_BRACKET:5,RIGHT_BRACKET:6,LEFT_BRACE:7,RIGHT_BRACE:8,NUMBER:9,BOOLEAN:10,NULL:11,INVALID:12,$START:13,json:14,value:15,object:16,array:17,elementList:18,member:19,
memberList:20};h.productions=[[13,[14]],[14,[15],function(){return this.$1}],[15,[2],function(){return this.yy.unQuote(this.$1)}],[15,[9],function(){return parseFloat(this.$1)}],[15,[16],function(){return this.$1}],[15,[17],function(){return this.$1}],[15,[10],function(){return"true"===this.$1}],[15,[11],function(){return null}],[18,[15],function(){return[this.$1]}],[18,[18,3,15],function(){this.$1[this.$1.length]=this.$3;return this.$1}],[17,[5,6],function(){return[]}],[17,[5,18,6],function(){return this.$2}],
[19,[2,4,15],function(){return{key:this.yy.unQuote(this.$1),value:this.$3}}],[20,[19],function(){var a={};a[this.$1.key]=this.$1.value;return a}],[20,[20,3,19],function(){this.$1[this.$3.key]=this.$3.value;return this.$1}],[16,[7,8],function(){return{}}],[16,[7,20,8],function(){return this.$2}]];h.table={gotos:{"0":{14:7,15:8,16:9,17:10},2:{15:12,16:9,17:10,18:13},3:{19:16,20:17},18:{15:23,16:9,17:10},20:{15:24,16:9,17:10},21:{19:25}},action:{"0":{2:[1,0,1],5:[1,0,2],7:[1,0,3],9:[1,0,4],10:[1,0,5],
11:[1,0,6]},1:{1:[2,2,0],3:[2,2,0],6:[2,2,0],8:[2,2,0]},2:{2:[1,0,1],5:[1,0,2],6:[1,0,11],7:[1,0,3],9:[1,0,4],10:[1,0,5],11:[1,0,6]},3:{2:[1,0,14],8:[1,0,15]},4:{1:[2,3,0],3:[2,3,0],6:[2,3,0],8:[2,3,0]},5:{1:[2,6,0],3:[2,6,0],6:[2,6,0],8:[2,6,0]},6:{1:[2,7,0],3:[2,7,0],6:[2,7,0],8:[2,7,0]},7:{1:[0,0,0]},8:{1:[2,1,0]},9:{1:[2,4,0],3:[2,4,0],6:[2,4,0],8:[2,4,0]},10:{1:[2,5,0],3:[2,5,0],6:[2,5,0],8:[2,5,0]},11:{1:[2,10,0],3:[2,10,0],6:[2,10,0],8:[2,10,0]},12:{3:[2,8,0],6:[2,8,0]},13:{3:[1,0,18],6:[1,
0,19]},14:{4:[1,0,20]},15:{1:[2,15,0],3:[2,15,0],6:[2,15,0],8:[2,15,0]},16:{3:[2,13,0],8:[2,13,0]},17:{3:[1,0,21],8:[1,0,22]},18:{2:[1,0,1],5:[1,0,2],7:[1,0,3],9:[1,0,4],10:[1,0,5],11:[1,0,6]},19:{1:[2,11,0],3:[2,11,0],6:[2,11,0],8:[2,11,0]},20:{2:[1,0,1],5:[1,0,2],7:[1,0,3],9:[1,0,4],10:[1,0,5],11:[1,0,6]},21:{2:[1,0,14]},22:{1:[2,16,0],3:[2,16,0],6:[2,16,0],8:[2,16,0]},23:{3:[2,9,0],6:[2,9,0]},24:{3:[2,12,0],8:[2,12,0]},25:{3:[2,14,0],8:[2,14,0]}}};h.parse=function(a){var b=this,c=b.lexer,e,i,g=
b.table,f=g.gotos,g=g.action,d=b.productions,h=[null],l=[0];for(c.resetInput(a);;){a=l[l.length-1];e||(e=c.lex());if(!e)return!1;i=g[a]&&g[a][e];if(!i){var m=[];g[a]&&k.each(g[a],function(a,c){m.push(b.lexer.mapReverseSymbol(c))});c.showDebugInfo();m.join(", ");return!1}switch(i[0]){case 1:l.push(e);h.push(c.text);l.push(i[2]);e=null;break;case 2:var j=d[i[1]],a=j.symbol||j[0];i=j.action||j[2];var o=(j.rhs||j[1]).length,q=0,s=void 0,j=h[h.length-o];for(b.$$=j;q<o;q++)b["$"+(o-q)]=h[h.length-1-q];
i&&(s=i.call(b));j=void 0!==s?s:b.$$;o&&(l=l.slice(0,-2*o),h=h.slice(0,-1*o));l.push(a);h.push(j);l.push(f[l[l.length-2]][l[l.length-1]]);break;case 0:return j}}};return h});
KISSY.add("json/quote",function(h){var k={"":"\\b","":"\\f","\n":"\\n","\r":"\\r","\t":"\\t",'"':'\\"'},f={},m=/["\b\f\n\r\t\x00-\x1f]/g,a=/\\b|\\f|\\n|\\r|\\t|\\"|\\u[0-9a-zA-Z]{4}/g;h.each(k,function(a,c){f[c]=a});f["\\/"]="/";return{quote:function(a){return'"'+a.replace(m,function(a){var b;if(!(b=k[a]))b="\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);return b})+'"'},unQuote:function(b){return b.slice(1,b.length-1).replace(a,function(a){var b;if(!(b=f[a]))b=String.fromCharCode(parseInt(a.slice(2),
16));return b})}}});
KISSY.add("json/stringify",function(h,k){function f(a){return 10>a?"0"+a:a}function m(a,b,c,e,i,g,n){var d=b[a];if(d&&"object"===typeof d)if("function"===typeof d.toJSON)d=d.toJSON(a);else if(d instanceof Date)d=isFinite(d.valueOf())?d.getUTCFullYear()+"-"+f(d.getUTCMonth()+1)+"-"+f(d.getUTCDate())+"T"+f(d.getUTCHours())+":"+f(d.getUTCMinutes())+":"+f(d.getUTCSeconds())+"Z":null;else if(d instanceof String||d instanceof Number||d instanceof Boolean)d=d.valueOf();void 0!==c&&(d=c.call(b,a,d));switch(typeof d){case "number":return isFinite(d)?
""+d:"null";case "string":return k.quote(d);case "boolean":return""+d;case "object":if(d){if(h.isArray(d)){a=d;if(h.inArray(a,g))throw new TypeError("cyclic json");g[g.length]=a;for(var b=n,n=n+i,d=[],r=a.length,l=0;l<r;){var p=m(""+l,a,c,e,i,g,n);d[d.length]=void 0===p?"null":p;++l}d.length?i?(c=d.join("\n,"+n),c="[\n"+n+c+"\n"+b+"]"):c="["+d.join(",")+"]":c="[]"}else{a=d;if(h.inArray(a,g))throw new TypeError("cyclic json");g[g.length]=a;for(var b=n,n=n+i,j,d=void 0!==e?e:h.keys(a),p=[],l=0,r=d.length;l<
r;l++){j=d[l];var o=m(j,a,c,e,i,g,n);void 0!==o&&(j=k.quote(j),j+=":",i&&(j+=" "),j+=o,p[p.length]=j)}p.length?i?(c=p.join(",\n"+n),c="{\n"+n+c+"\n"+b+"}"):c="{"+p.join(",")+"}":c="{}"}g.pop();g=c}else g="null";return g}}return function(a,b,c){var e="",f,g;b&&("function"===typeof b?g=b:h.isArray(b)&&(f=b));"number"===typeof c?(c=Math.min(10,c),e=Array(c+1).join(" ")):"string"===typeof c&&(e=c.slice(0,10));return m("",{"":a},g,f,e,[],"")}},{requires:["./quote"]});
