var pe={},LANG={/*"Happy birthday":"Boldog szülinapot","Name?":"Neve?","Bad name!":"Hibás név!","Already exists!":"Már van ilyen!","Filename?":"Filenév?",
"Setup":"Beállítások","Start!":"Start!","Load":"Betölt","Save":"Lement","Reset":"Újrakezd","Tutorials":"Példák",'forward':"Előre",'backward':"Hátra",'left':"Balra fordul",'right':"Jobbra fordul",'pendown':"Farkinca le",'penup':"Farkinca fel",'color':"Szín",'text':"Szöveg",'let':"Értékadás",'call':"Eljárás hívás",'if':"Elágazás",'repeat':"Ismétlés",'question':"Kérdés",'rand':"Véletlen",'alert':"Figyelmeztetés",'debug':"Hibakeresés",
"addfunc":"Új eljárás","delfunc":"Eljárás törlése","Are you sure?":"Biztos vagy benne?","Variable":"Doboz","Prompt":"Kérdés","Expression":"Érték","pixels":"képpont","Default":"Alapért","Draw turtle":"Mutasd a teknőst","Debug execution":"Mutasd az utasításokat","Depth?":"Szintek száma?","How old are you?":"Hány éves vagy?","snowflake":"hópehely","wandering":"bóklászó","plant":"virág","curly":"íves","triangle":"háromszög","bdaycake":"torta"*/};
function L(t){return LANG[t]!=null&&LANG[t]!=undefined?LANG[t]:(t!=null?t.replace(/_/g,' '):'');}

pe.jslogo = {
	content:null,
	canvas:null,
	menu:null,
	working:null,
	turtle:null,
	drawturtle:true,
	debuglog:false,
	dragging:null,
	dragobj:null,
	pen:true,
	color:'#000000',
	filename:'noname.txt',
	args:null,
	tutorials:[
		{"name":"snowflake","preview":"iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+EMBBEqLWwOQcsAAADRSURBVCjPY2AgGzRAaUYFKIMpAcoQUoEy6qyhDAdGdEYCM5RhwAYVMGBhBhnJuCGBme0AiCHgwMjiAGTISzswfokAMsx4GxhumAEZYBuZkBkGIAYfEEuAGBxALABjgKXYkBWDjAAT5iBGBRBzghgeIEvBjgQRQCcwNkB5YFEw7wCyGlkQIwJmYBluh7EhO0wCt8MUWBoYONRABko6MNypAjlMyIFRBeQwBgloaDB+SGBmPwB2ggALI1pgYoZzjjSUYaUHiyZYfDHD4ouxgexEAAAvFRuJBA7SdwAAAABJRU5ErkJggg==","code":"to koch(h,l)\nh=h/3\nif l [\nkoch(h,l-1)\nleft 60\nkoch(h,l-1)\nright 120\nkoch(h,l-1)\nleft 60\nkoch(h,l-1)\n] else [\nforward h\n]\nend\n\nquestion l,4,"+L('Depth?')+"\npenup\nforward h/6\nright 90\nbackward w/6\npendown\nrepeat 3 [\nkoch(w,l)\nright 120\n]\n"},
		{"name":"wandering","preview":"iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+EMBBErEC19PJsAAAEuSURBVCjPY2CgHeCBMdigtEIdlFHZ2gAkmRkY/NgOABnsBxja+UAiPAcYDoIZHA0MCTIghn0Dg4EuSIsNA4PEX6hh/P8YIFIMAQw1DAyKQDMaGBzrGBQdGPgZGBzEGBQZGOQYGBKEGFQZGIw/MDhIgxjFHAwfuBtsgSIC/C/4GoAi1gbye3gO8DIw1C6wZzB5wMHAcO/B/+ZvD7IZGOY4PH4svSGvguFROuME1k6bZgbGPQwVzMft+xgYHjDwH/yt/4GBcQEDh73mdaBTEhg4Ev+9BXtNoP/7LYhnN36JAdH8Z5U1fEAMjl/VC8Ehwfv/zP9mEINPvSHJAcTgvM34BxIy7I1nIAzmAhMIg4n/CTTUGI/BGN1QBjMnlMFXCWXYH4AyWBqgDP4DNIxiBgD6AEnxd0Ab/QAAAABJRU5ErkJggg==","code":"repeat 200 [\nrand d,0,180\nright d\nrand l,10,50\nforward l\n]\n"},
		{"name":"plant","preview":"iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+EMBBEpLDAkIp4AAAD9SURBVCjP5ZCxSgNBEIa/3ZzJRQ88ECRN5Ixa2KlYRLjitNcnsMgbaC/IxMpCMKWFyBUWPoKFaKwEHyIc1hZRQSyd3T2fwoWFj2H++YYBiKjfWlXDfSUBHr7HAT5u6srXJFTM0yR0x6v7Uw/zt92pa2pCW+4UTiSN5FDhExvJsUKP2fTM5a+we/Lj3XYobz7fMMMXCctcHJXEVqE8LYP28r3AeloXcqN+NmFnF622zrGJN+dsWzfieomOcZ7RHHGUESN96MSaeyxgYE1qBz0WxsaQpE1WhOcsszndgmWd+eqgncABiwUzI7d5q8CoZItGpXLo+yvo3/gD/iH8AgNrM399JvyrAAAAAElFTkSuQmCC","code":"to plant(s,a)\nif s>5 [\nright a\nforward s\nrepeat 4 [\nrand d,20,160\nleft 90\nplant(s/2,d)\nright 90\n]\nbackward s\nleft a\n] else [\n]\nend\n\nplant(100,0)\n"},
		{"name":"curly","preview":"iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+EMBBEeDnVDw04AAADFSURBVCjPY2DABuwgFDvDwQYwg/sggwOE0SgAZRyyXwBmcLbYK4AZHixQhiuLPkTKjUUdotjziADEHAMbfojJB1hgVsEZTBgMRgaGH1AGMzvEgAYZqEMaEhggtjk2MAiAGUoMDBxghgjMUA4GPohZAgyGjVDG4UQwQ4FRGeIkB0b/CRAGk/4JMKOB6X8HlBEPZjAyQEWAjPiPEPcwmQZCnMootgjKEHCCOv58C5RhwAFl8BhAGcwHsPsUk8FCGYMHg0EjAAD9IyJDS3urWAAAAABJRU5ErkJggg==","code":"to curly(s)\nif s>1 [\nrepeat 360 [\nif repcount=10 [\nleft 90\ncurly(s/2)\nright 90\n] else [\n]\nforward s\nright repcount\n]\nright 180\n] else [\n]\nend\n\ncurly(20)\n"},
		{"name":"triangle","preview":"iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEX///8AAABVwtN+AAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+EMBBEZKOgP0HQAAAEqSURBVCjPnc+xSsNQFMbx7/bGJGgwHURrjYk4FRQJFrRgqH2J7hkko3TSDkXzCK5uzgoidCm6ZBX6EJmdsogdSuPJvScPoHe5v+n8+YC/vrRGxr8YMGReI2RYoxoLhtNieB7Djxinh4zzW8Z9jfknVzOhIXKuilxm3DRjjbe1ETfdQjcdW1c3HU/D9yNd3emfHCtcdG8ShaOfYanjZalBIV19ouMVBJ1VVdEEVFXO6Hi1XtJOVbWWQFDBdIBWj7DRBqIOIQgIE8LeFEiuq/hHitUX4bJMoapxtVSqJi1tULWollopxIMMGwfGAGImQyumqlxaC6twc5iGYdvNZgjTdGhpL4S73t7eijpjuIHv96PJGLuP0+5ZcjXH/vvL9/Du+VXtpLdCjH+8X8C6UIoQeMzdAAAAAElFTkSuQmCC","code":"to sierpinski(n,l)\nif n>0 and l>1 [\nrepeat 3 [\nsierpinski(n-1,l/2)\nforward l\nright 120\n]\n] else [\n]\nend\n\nquestion n,5,"+L('Depth?')+"\npenup\nright 30\nbackward h/4\npendown\nsierpinski(n,h/2)\n"},
		{"name":"bdaycake","preview":"iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAFVBMVEV6KxiIQC5CaFDDwr7e3Nb99NH9//zV4jmHAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+EMBBEWG9BHra0AAACTSURBVEjH7ZRNCoAgEEanTetm0wG6gtIFHLxBXkCd+x8hUbEfSFtbg+Lj8wmiInCj4Bc6E3zoJrZMW6Ei+BybGx2Cj7EpgrkJLq/ThVKWhDXEjp1KZNkmsu5RsB0KREKSUqTEmWQgsUjSwIiAOA1xgOFCC+IMDNUaexGwWuEcdOvZN4W1Oq9f7OEjd9EU/p/2Q8IOHD5HGuMevwoAAAAASUVORK5CYII=","code":"to doboz(sz,m)\nforward sz\nleft 90\nforward m\nleft 90\nforward sz\nleft 90\nforward m\nleft 90\nend\n\nto gyertya()\npendown\ncolor #000000\ndoboz(10,50)\nleft 90\nforward 50\nright 90\nforward 5\ncolor #e9cb24\nleft 60\nforward 10\nleft 45\nforward 15\nleft 150\nforward 15\nleft 45\nforward 10\nright 30\npenup\nforward 50\nleft 90\nend\n\nquestion n,8,"+L('How old are you?')+"\npenup\nbackward 100\nright 90\nbackward 20*n+10\npendown\ncolor #742919\nrepeat 50 [\nforward 40*n+20\nbackward 40*n+20\nleft 90\nforward 1\nright 90\n]\ndoboz(40*n+20,20)\nleft 90\nforward 20\nright 90\nrepeat 50 [\nforward 40*n+20\nbackward 40*n+20\nleft 90\nforward 1\nright 90\n]\npenup\nforward 10\nrepeat n [\nforward 15\ngyertya()\nforward 15\n]\n"}
	],

	init:function(cfg) {
		pe.jslogo.turtle=new Image();
		pe.jslogo.turtle.src='images/jslogo/turtle.png';
		pe.jslogo.turtle.width=16;
		pe.jslogo.turtle.height=16;
		pe.jslogo.content=document.getElementById('content');
		if(pe.jslogo.content==null) {
			pe.jslogo.content=document.createElement('div');
			pe.jslogo.content.id='content';
			document.body.appendChild(pe.jslogo.content);
		}
		var logo=document.createElement('div'),bg=document.createElement('div'),inp=document.createElement('div'),w=document.createElement('div');
		bg.setAttribute('id','bgdiv');
		bg.style='position:fixed;top:0px;left:0px;width:100%;height:100%;background:rgba(0,0,0,0.2);z-index:9;';
		bg.onclick=pe.jslogo.main;
		logo.innerHTML='<img src="images/jslogo/logo.gif" style="float:left;"><h1>JSLogo</h1><b>Logo Interpreter<br>by bzt<br><br><br>'+L('Happy birthday')+' Bende!</b>';
		logo.style='position:fixed;top:50%;left:50%;margin-top:-210px;margin-left:-310px;width:600px;border:outset 1px;padding:10px;z-index:10;background:#ffffff;';
		logo.onclick=pe.jslogo.main;
		document.body.appendChild(bg);
		pe.jslogo.content.appendChild(logo);
		inp.setAttribute('id','inp');
		inp.setAttribute('style','display:none;');
		document.body.appendChild(inp);
		w.style='position:fixed;top:0px;left:0px;width:100%;height:100%;z-index:99;opacity:0.3;visibility:hidden;';
		w.innerHTML='<img style="position:fixed;bottom:0px;right:0px;" src="images/jslogo/working.png">';
		document.body.appendChild(w);
		pe.jslogo.working=w;
		window.addEventListener( "mousemove", pe.jslogo.display, false );
		window.addEventListener( "mouseup", pe.jslogo.drop, false );
	},

	display:function(e) {
		if(pe.jslogo.dragobj!=null) {
			pe.jslogo.dragging=pe.jslogo.dragobj.cloneNode(true);
			if(pe.jslogo.dragobj.tagName!='IMG' && e.ctrlKey==false && e.shiftKey==false) {
				try{pe.jslogo.dragobj.parentNode.removeChild(pe.jslogo.dragobj);}catch(e){};
			}
			pe.jslogo.dragobj=null;
			pe.jslogo.dragging.setAttribute('style','position:absolute;z-index:999;left:0px;top:0px;margin:0px;opacity:0.8;');
			document.body.appendChild(pe.jslogo.dragging);
		}
		if(pe.jslogo.dragging!=null){
		      if(e!=null){
		        if(e.pageX){
		          ml=e.pageX;mt=e.pageY;
		        }else{
		          ml=(event.clientX + document.body.scrollLeft);mt=(event.clientY+document.body.scrollTop);
        		}
		      }
		      pe.jslogo.dragging.style.left=Math.floor(ml+10)+'px';
		      pe.jslogo.dragging.style.top=Math.floor(mt+10)+'px';
		}
	},

	drag:function(event,obj) {
		if(obj==null) obj=event.target;
		pe.jslogo.dragobj=obj;
		return false;
	},

	drop:function(e,ctx) {
		pe.jslogo.dragobj=null;
		if(pe.jslogo.dragging!=null) {
			var cmd,args,obj;
			if(pe.jslogo.dragging.tagName=='IMG') {
				cmd=pe.jslogo.dragging.getAttribute('data-cmd'); args=null; obj=null;
			} else {
				var img=pe.jslogo.dragging.getElementsByTagName('IMG')[0];
				cmd=img.getAttribute('data-cmd'); args=img.nextSibling.innerHTML; obj=pe.jslogo.dragging.cloneNode(true);
			}
			if(ctx!=null) {
				var i, bef=null, divs=document.getElementById("editor").getElementsByTagName('*');
				for(i=0;i<divs.length;i++) {
					if(divs[i].className=='cmd' && Math.round(divs[i].style.paddingTop.replace('px',''))) {
						divs[i].style.paddingTop='0px'; bef=divs[i];
					}
				}
			}
			try{document.body.removeChild(pe.jslogo.dragging);}catch(e){} pe.jslogo.dragging=null;
			if(ctx!=null)
				pe.jslogo.addcmd(ctx, cmd, args, bef, obj);
		}
		pe.jslogo.dropbefore(e);
		return false;
	},

	dropbefore:function(e) {
		var i, divs;
		try{divs=document.getElementById("editor").getElementsByTagName('*');}catch(e){return true;};
		for(i=0;i<divs.length;i++) {
			if(divs[i].className=='cmd')
				divs[i].style.paddingTop='0px';
		}
		if(e.type=='mouseover' && pe.jslogo.dragging!=null) {
			if( e.target.className=='cmd') e.target.style.paddingTop='20px'; else
			if( e.target.parentNode.className=='cmd') e.target.parentNode.style.paddingTop='20px';
		}
		return true;
	},

	setargs:function(evt,cmd,val) {
		if(pe.jslogo.args==null) return;
		if(cmd=='color' && val=='') val='#000000';
		pe.jslogo.args.innerHTML=val;
		if(evt!=null&&evt.keyCode==13) pe.jslogo.main();
	},

	setdeg:function() {
		var cvs=document.getElementById('deg'),ctx;
		if(cvs==null) return;
		var obj=cvs.previousSibling.previousSibling.previousSibling;
		var r=Math.round(obj.value);
		cvs.width=180;cvs.height=180;ctx=cvs.getContext('2d');ctx.scale(1,1); ctx.clearRect(0,0,180,180);
		ctx.beginPath(); ctx.strokeStyle='#000000';ctx.lineWidth=1;ctx.arc(90,90,89,0,2*Math.PI,false); ctx.stroke();
		ctx.translate(90,90); ctx.beginPath(); ctx.moveTo(0,0); ctx.strokeStyle='#F0F0FF';  ctx.fillStyle='#F0F0FF'; ctx.lineTo(0,-89); ctx.stroke();
		ctx.beginPath(); ctx.moveTo(0,0);
		if(obj.getAttribute('data-dir')!='right') { r=Math.round(360-r); if(r!=360) ctx.arc(0,0,60,r*Math.PI/180.0-Math.PI/2,-Math.PI/2,false); }
		else { ctx.arc(0,0,60,-Math.PI/2,r*Math.PI/180.0-Math.PI/2,false); }
		ctx.fill(); ctx.beginPath(); ctx.moveTo(0,0);
		ctx.rotate(r*Math.PI/180.0);  ctx.strokeStyle='#000000'; ctx.lineWidth=3; ctx.lineTo(0,-85);
		ctx.moveTo(0,-84); ctx.lineTo(5,-79); ctx.lineTo(-5,-79); ctx.lineTo(0,-84); ctx.stroke();
	},

	getdeg:function(event) {
		var cvs=document.getElementById('deg'),obj,pos,x,y,r;
		if(cvs==null||event.buttons==0) return;
		obj=cvs.previousSibling.previousSibling.previousSibling;
		pos=cvs.getBoundingClientRect();
		x=event.clientX-Math.round(pos.left)-90;
		y=event.clientY-Math.round(pos.top)-90;
		r=Math.round(Math.atan2(y,x)*180.0/Math.PI)+90; if(r<0) r+=360;
		if(obj.getAttribute('data-dir')=='right')
			obj.value=r;
		else
			obj.value=Math.round(360-r);
		pe.jslogo.setargs(event,obj.getAttribute('data-dir'),obj.value);
		pe.jslogo.setdeg();
	},

	getargs:function(obj) {
		var a,txt,cmd=obj.getAttribute('data-cmd'),val,pos=obj.getBoundingClientRect(),inp=document.getElementById('inp');
		if(obj.parentNode.className!=null && obj.parentNode.className.match(/error/)) obj.parentNode.className=obj.parentNode.className.replace(' error','').trim();
		if(cmd=='pendown'||cmd=='penup') return;
		pe.jslogo.args=obj.nextSibling;
		val=pe.jslogo.args!=null&&pe.jslogo.args.innerHTML!=null?pe.jslogo.args.innerHTML.trim():''
		document.getElementById('bgdiv').style.display='block';
		inp.setAttribute('style','position:fixed;background:#ffffff;top:'+pos.top+';left:'+Math.round(pos.left+48)+'px;display:block;z-index:10;padding:5px;');
		txt='<b>'+L(cmd)+'</b><br>';
		if(cmd=='forward'||cmd=='backward') {
			if(val=='') val=0;
			txt+='<input type="text" style="width:60px;" value="'+val+'" onchange="if(this.value<0)this.value=0;pe.jslogo.setargs(event,\''+cmd+'\',this.value.replace(/,/gi,\'\'));" onkeyup="if(this.value<0)this.value=0;pe.jslogo.setargs(event,\''+cmd+'\',this.value.replace(/,/gi,\'\'));">'+L('pixels');
		} else
		if(cmd=='left'||cmd=='right') {
			if(val=='') val=0;
			txt+='<input type="text" data-dir="'+cmd+'" style="width:60px;" value="'+val+'" onchange="if(this.value>359)this.value-=360;if(this.value<0)this.value=Math.round(this.value)+360;pe.jslogo.setargs(event,\''+cmd+'\',this.value);pe.jslogo.setdeg();" onkeyup="if(this.value>359)this.value-=360;if(this.value<0)this.value=Math.round(this.value)+360;pe.jslogo.setargs(event,\''+cmd+'\',this.value);pe.jslogo.setdeg();">&deg;<br>';
			txt+='<canvas id="deg" style="cursor:crosshair;width:180px;height180px;" onmousedown="pe.jslogo.getdeg(event);"  onmousemove="pe.jslogo.getdeg(event,this);">';
		} else
		if(cmd=='question') {
			var a=val.split(',');
			txt+=L('Variable')+':<input type="text" size="2" value="'+(a[0]?a[0]:'')+'" onchange="pe.jslogo.setargs(event,\''+cmd+'\',this.value.replace(/,/gi,\'\')+\',\'+this.nextSibling.nextSibling.value.replace(/,/gi,\'\')+\',\'+this.nextSibling.nextSibling.nextSibling.nextSibling.value.replace(/,/gi,\'\'));" onkeyup="pe.jslogo.setargs(event,\''+cmd+'\',this.value.replace(/,/gi,\'\')+\',\'+this.nextSibling.nextSibling.value.replace(/,/gi,\'\')+\',\'+this.nextSibling.nextSibling.nextSibling.nextSibling.value.replace(/,/gi,\'\'));">,&nbsp;';
			txt+=L('Default')+':<input type="text" size="4" value="'+(a[1]?a[1]:'')+'" onchange="pe.jslogo.setargs(event,\''+cmd+'\',this.previousSibling.previousSibling.value.replace(/,/gi,\'\')+\',\'+this.value.replace(/,/gi,\'\')+\',\'+this.nextSibling.nextSibling.value.replace(/,/gi,\'\'));" onkeyup="pe.jslogo.setargs(event,\''+cmd+'\',this.previousSibling.previousSibling.value.replace(/,/gi,\'\')+\',\'+this.value.replace(/,/gi,\'\')+\',\'+this.nextSibling.nextSibling.value.replace(/,/gi,\'\'));">';
			txt+=L('Prompt')+':<input type="text" value="'+(a[2]?a[2]:'')+'" onchange="pe.jslogo.setargs(event,\''+cmd+'\',this.previousSibling.previousSibling.previousSibling.previousSibling.value.replace(/,/gi,\'\')+\',\'+this.previousSibling.previousSibling.value.replace(/,/gi,\'\')+\',\'+this.value.replace(/,/gi,\'\'));" onkeyup="pe.jslogo.setargs(event,\''+cmd+'\',this.previousSibling.previousSibling.previousSibling.previousSibling.value.replace(/,/gi,\'\')+\',\'+this.previousSibling.previousSibling.value.replace(/,/gi,\'\')+\',\'+this.value.replace(/,/gi,\'\'));">';
		} else
		if(cmd=='let') {
			var a=val.split('=');
			txt+=L('Variable')+':<input type="text" size="2" value="'+(a[0]?a[0]:'')+'" onchange="pe.jslogo.setargs(event,\''+cmd+'\',this.value.replace(/,/gi,\'\')+\'=\'+this.nextSibling.nextSibling.value.replace(/,/gi,\'\'));" onkeyup="pe.jslogo.setargs(event,\''+cmd+'\',this.value.replace(/,/gi,\'\')+\'=\'+this.nextSibling.nextSibling.value.replace(/,/gi,\'\'));">,&nbsp;';
			txt+=L('Expression')+':<input type="text" value="'+(a[1]?a[1]:'')+'" onchange="pe.jslogo.setargs(event,\''+cmd+'\',this.previousSibling.previousSibling.value.replace(/,/gi,\'\')+\'=\'+this.value.replace(/,/gi,\'\'));" onkeyup="pe.jslogo.setargs(event,\''+cmd+'\',this.previousSibling.previousSibling.value.replace(/,/gi,\'\')+\'=\'+this.value.replace(/,/gi,\'\'));">';
		} else
		if(cmd=='call') {
			var a=[], i, tbl=document.getElementById("editor"), name, f,fp='',p='',c=0;
			f=val.substr(0,val.length-1); i=f.indexOf('('); if(i<0) i=f.length; a[0]=f.substr(0,i); a[1]=f.substring(i+1,f.length);
			name=(a[0]?a[0]:'');
			txt+='<select onchange="this.nextSibling.nextSibling.setAttribute(\'placeholder\',this.options[this.selectedIndex].getAttribute(\'data-pars\'));pe.jslogo.args.setAttribute(\'data-pars\',this.options[this.selectedIndex].getAttribute(\'data-pars\'));pe.jslogo.args.setAttribute(\'data-call\',this.selectedIndex+1);pe.jslogo.setargs(event,\''+cmd+'\',this.value+\'(\'+this.nextSibling.nextSibling.value+\')\');">';
			for(i=1;i<tbl.rows[1].cells.length;i++) {
				f=tbl.rows[1].cells[i].getAttribute('data-func');
				f=f.substr(0,f.length-1).split('(');
				if(i==1) {fp=f[0]; p=f[1];}
				txt+='<option value="'+f[0]+'" data-pars="'+f[1]+'" '+(f[0]==name?' selected':'')+'>'+f[0]+'</option>';
			}
			txt+='</select>(<input type="text" value="'+(a[1]?a[1]:'')+'" onchange="pe.jslogo.setargs(event,\''+cmd+'\',this.previousSibling.previousSibling.value+\'(\'+this.value+\')\');" onkeyup="pe.jslogo.setargs(event,\''+cmd+'\',this.previousSibling.previousSibling.value+\'(\'+this.value+\')\');" placeholder="'+p+'">)';
			pe.jslogo.args.setAttribute('data-pars',p);
			pe.jslogo.args.setAttribute('data-call',1);
			pe.jslogo.setargs(null,'call', (a[0]?a[0]:fp)+'('+(a[1]?a[1]:'')+')');
		} else
		if(cmd=='rand') {
			var a=val.split(',');
			txt+=L('Variable')+':<input type="text" size="2" value="'+(a[0]?a[0]:'')+'" onchange="pe.jslogo.setargs(event,\''+cmd+'\',this.value.replace(/,/gi,\'\')+\',\'+this.nextSibling.nextSibling.value+\',\'+this.nextSibling.nextSibling.nextSibling.nextSibling.value);" onkeyup="pe.jslogo.setargs(event,\''+cmd+'\',this.value.replace(/,/gi,\'\')+\',\'+this.nextSibling.nextSibling.value+\',\'+this.nextSibling.nextSibling.nextSibling.nextSibling.value);">,&nbsp;';
			txt+='min:<input type="number" style="width:60px;" value="'+Math.round(a[1]?a[1]:'')+'" onchange="pe.jslogo.setargs(event,\''+cmd+'\',this.previousSibling.previousSibling.value.replace(/,/gi,\'\')+\',\'+this.value+\',\'+this.nextSibling.nextSibling.value);">';
			txt+='max:<input type="number" style="width:60px;" value="'+Math.round(a[2]?a[2]:'')+'" onchange="pe.jslogo.setargs(event,\''+cmd+'\',this.previousSibling.previousSibling.previousSibling.previousSibling.value.replace(/,/gi,\'\')+\',\'+this.previousSibling.previousSibling.value+\',\'+this.value);">';
		} else
		if(cmd=='color') {
			if(val=='') { val='#000000'; pe.jslogo.setargs(null,cmd,val); }
			txt+='<input type="color" value="'+val+'" onchange="pe.jslogo.setargs(event,\''+cmd+'\',this.value);">';
		} else
		if(cmd=='text') {
			var a=val.split(','),s=[8,10,12,16,24,36,48];
			txt+='<select onchange="pe.jslogo.setargs(event,\''+cmd+'\',this.value+\',\'+this.nextSibling.nextSibling.value.replace(/,/gi,\'\'));">';
			if(a[0]==null||a[0]<8) a[0]=16;
			for(i=0;i<s.length;i++) {
				txt+='<option value="'+s[i]+'"'+(s[i]==a[0]?' selected':'')+'>'+s[i]+'</option>';
			}
			txt+='</select>(<input type="text" value="'+(a[1]?a[1]:'')+'" onchange="pe.jslogo.setargs(event,\''+cmd+'\',this.previousSibling.previousSibling.value+\',\'+this.value.replace(/,/gi,\'\'));"  onkeyup="pe.jslogo.setargs(event,\''+cmd+'\',this.previousSibling.previousSibling.value+\',\'+this.value.replace(/,/gi,\'\'));">';
			} else
			txt+='<input type="text" value="'+val+'" onchange="pe.jslogo.setargs(event,\''+cmd+'\',this.value.replace(/,/gi,\'\'));" onkeyup="pe.jslogo.setargs(event,\''+cmd+'\',this.value.replace(/,/gi,\'\'));">';
		inp.innerHTML=txt;
		if(cmd=='left'||cmd=='right') pe.jslogo.setdeg();
		inp.getElementsByTagName('INPUT')[0].focus();
		inp.getElementsByTagName('INPUT')[0].select();
		return false;
	},

	addcmd:function(func,cmd,args,bef,obj) {
		if(bef!=null) func=bef.parentNode;
		if(func!=null) {
			if(obj==null){
			obj=document.createElement('div');
			if(cmd=='if') {
				obj.innerHTML='<table class="if"><tr><th class="if" colspan="2"><img draggable=false src="images/jslogo/'+cmd+'.png" data-cmd="'+cmd+'" onmousedown="return pe.jslogo.drag(event,this.parentNode.parentNode.parentNode.parentNode.parentNode);" onclick="pe.jslogo.getargs(this);"><span></span></th><tr><td class="if" onmouseup="return pe.jslogo.drop(event,this);"></td><td class="if" onmouseup="return pe.jslogo.drop(event,this);"></td></tr></table>';
			} else if(cmd=='repeat') {
				obj.innerHTML='<table class="repeat"><tr><th class="repeat"><img draggable=false src="images/jslogo/'+cmd+'.png" data-cmd="'+cmd+'"  onmousedown="return pe.jslogo.drag(event,this.parentNode.parentNode.parentNode.parentNode.parentNode);" onclick="pe.jslogo.getargs(this);"><span></span></th><tr><td class="repeat" onmouseup="return pe.jslogo.drop(event,this);"></td></tr></table>';
			} else {
				obj.innerHTML='<img draggable=false src="images/jslogo/'+cmd+'.png" data-cmd="'+cmd+'" onmousedown="return pe.jslogo.drag(event,this.parentNode);" onclick="return pe.jslogo.getargs(this);"><span></span>';
			}
			}
			obj.setAttribute('onmouseover','pe.jslogo.dropbefore(event);');
			obj.setAttribute('onmouseout','pe.jslogo.dropbefore(event);');
			obj.setAttribute('style','margin-top:0px;');
			obj.setAttribute('class','cmd');
			obj.setAttribute('draggable','false');
			if(bef!=null)
				func.insertBefore(obj,bef);
			else
				func.appendChild(obj);
			if(args==null)
				pe.jslogo.getargs(obj.getElementsByTagName('IMG')[0]);
		}
	},

	addfunc:function(name) {
		var i,tbl=document.getElementById("editor"), th=document.createElement('th'), td=document.createElement('td');
		if(name==null||name=='') name=prompt(L('Name?'));
		if(name==null||name=='') return;
		if(name.match(/^[a-z]+$/)) name+='()';
		if(!name.match(/^([a-z]+)\(([a-z,]*)\)$/)) { alert(L('Bad name!')); return; }
		var func=name.substr(0,name.indexOf('('));
		for(i=0;i<tbl.rows[0].cells.length;i++) { var a=tbl.rows[1].cells[i].getAttribute('data-func');
			if(a.substr(0,a.indexOf('('))==func) {alert(L('Already exists!')); return; } }
		th.setAttribute('data-func', name);
		th.setAttribute('class', 'func');
		th.innerHTML=name+'<img src="images/jslogo/delfunc.png" style="float:right;vertical-align:middle;cursor:pointer;" onclick="pe.jslogo.delfunc(this.parentNode);" title="'+L('delfunc')+'">';
		td.setAttribute('data-func', name);
		td.setAttribute('class', 'func');
		td.setAttribute('onmouseup','return pe.jslogo.drop(event,this);');
		tbl.rows[0].appendChild(th);
		tbl.rows[1].appendChild(td);
		return td;
	},

	delfunc:function(th) {
		var i, j, tbl=document.getElementById("editor"), name=th.getAttribute('data-func');
		if(!confirm(L('Are you sure?'))) return;
		for(i=0;i<tbl.rows[0].cells.length;i++) { if(tbl.rows[1].cells[i].getAttribute('data-func')==name) break; }
		if(i>0) {
			tbl.rows[0].removeChild(tbl.rows[0].cells[i]);
			tbl.rows[1].removeChild(tbl.rows[1].cells[i]);
		}
		tbl=document.getElementById("editor").getElementsByTagName('*');
		for(j=0;j<tbl.length;j++) {
			if(tbl[j].getAttribute('data-call')!=null && tbl[j].getAttribute('data-call')==i) {
				tbl[j].parentNode.className+=' error';
			}
		}
	},

	clearerr:function() {
		var i, tbl=document.getElementById("editor").getElementsByTagName('*');
		for(i=0;i<tbl.length;i++) {
			if(tbl[i].className!=null && tbl[i].className.match(/error/)) tbl[i].className=tbl[i].className.replace(' error','').trim();
		}
	},

	lgo2dom:function(name, txt) {
		pe.jslogo.filename=name;
		pe.jslogo.menu=null;
		pe.jslogo.main();
		var i,j,a=[],v=[],lines=txt.split('\n'),line,tbl=document.getElementById("editor"),obj=tbl.rows[1].cells[0],cmd,args,ext,html='';
		for(i=0;i<lines.length;i++) {
			line=lines[i].trim();
			if(line=='') continue;
			if(line.substr(0,3)=='to ') {
				obj=pe.jslogo.addfunc(line.substring(3,line.length));
			} else
			if(line=='end') {
				obj.innerHTML=html;
				obj=tbl.rows[1].cells[0];
				html='';
			} else {
				if(line.match(/^[a-z]+=/)) { cmd='let'; args=line; } else
				if(line.match(/^[a-z]+\(/)) { cmd='call'; args=line; } else
				{j=line.indexOf(' '); if(j<0) j=line.length; cmd=line.substring(0,j); args=line.substring(j+1,line.length); }
				html+='<div onmouseover="pe.jslogo.dropbefore(event);" onmouseout="pe.jslogo.dropbefore(event);" style="margin-top:0px;" class="cmd" draggable="false">';
				if(cmd=='if') {
					html+='<table class="if"><tr><th class="if" colspan="2"><img draggable=false src="images/jslogo/'+cmd+'.png" data-cmd="'+cmd+'" onmousedown="return pe.jslogo.drag(event,this.parentNode.parentNode.parentNode.parentNode.parentNode);" onclick="pe.jslogo.getargs(this);"><span>'+args.substring(0,args.length-2)+'</span></th><tr><td class="if" onmouseup="return pe.jslogo.drop(event,this);">';
				} else
				if(cmd==']') {
					html+=args=='else ['?'</td><td class="if" onmouseup="return pe.jslogo.drop(event,this);">':'</td></tr></table>';
				} else
				if(cmd=='repeat') {
					html+='<table class="repeat"><tr><th class="repeat"><img draggable=false src="images/jslogo/'+cmd+'.png" data-cmd="'+cmd+'"  onmousedown="return pe.jslogo.drag(event,this.parentNode.parentNode.parentNode.parentNode.parentNode);" onclick="pe.jslogo.getargs(this);"><span>'+args.substring(0,args.length-2)+'</span></th><tr><td class="repeat" onmouseup="return pe.jslogo.drop(event,this);">';
				} else {
					if(cmd=='call') {
						j=args.indexOf('('); if(j<0) j=args.length; a[0]=args.substr(0,j); a[1]=args.substr(j+1,args.length-1);
						for(j=1;j<tbl.rows[1].cells.length;j++) {
							v=tbl.rows[1].cells[j].getAttribute('data-func').split('(');
							if(a[0]==v[0]) {
								ext=' data-call="'+j+'" data-pars="'+v[1].substr(0,v[1].length-1)+'"';
								break;
							}
						}
					} else ext='';
					html+='<img draggable=false src="images/jslogo/'+cmd+'.png" data-cmd="'+cmd+'" onmousedown="return pe.jslogo.drag(event,this.parentNode);" onclick="return pe.jslogo.getargs(this);"><span'+ext+'>'+args+'</span>';
				}
				html+='</div>';
			}
		}
		obj.innerHTML=html;
	},

	load:function(files) {
		if(files.length<1 || files[0].size<1) return;
		var reader = new FileReader();
		reader.onload = function(e) {
			pe.jslogo.lgo2dom(files[0].name,e.target.result);
		};
		reader.readAsText(files[0]);
	},

	dom2lgo:function(obj,level) {
		var i,txt='';
		if(obj==null||obj.childNodes==null||obj.childNodes.length==0) return '';
		for(i=0;i<obj.childNodes.length;i++) {
			if(obj.childNodes[i]==null||obj.childNodes[i].firstChild==null) continue;
			if(obj.childNodes[i].firstChild.tagName=='TABLE') {
				//control structures
				cmd=obj.childNodes[i].firstChild.rows[0].cells[0].firstChild.getAttribute('data-cmd');
				args=obj.childNodes[i].firstChild.rows[0].cells[0].firstChild.nextSibling.innerHTML;
				txt+='  '.repeat(level)+cmd+' '+args.replace(/&gt;/gi,'>').replace(/&lt;/gi,'<')+' [\n';
				if(cmd=='repeat') {
					txt+=pe.jslogo.dom2lgo(obj.childNodes[i].firstChild.rows[1].cells[0],level+1);
				} else
				if(cmd=='if') {
					txt+=pe.jslogo.dom2lgo(obj.childNodes[i].firstChild.rows[1].cells[0],level+1);
					txt+='  '.repeat(level)+'] else [\n';
					txt+=pe.jslogo.dom2lgo(obj.childNodes[i].firstChild.rows[1].cells[1],level+1);
				}
				txt+='  '.repeat(level)+']\n';
			} else if(obj.childNodes[i].firstChild.tagName=='IMG') {
				cmd=obj.childNodes[i].firstChild.getAttribute('data-cmd');
				txt+='  '.repeat(level)+(cmd!='let'&&cmd!='call'?cmd+' ':'')+obj.childNodes[i].firstChild.nextSibling.innerHTML+'\n';
			}
		}
		return txt;
	},

	save:function() {
		var a=document.getElementById('download'), i, tbl=document.getElementById("editor"), txt='';
		if(pe.jslogo.filename==null||pe.jslogo.filename=='') pe.jslogo.filename='noname.txt';
		pe.jslogo.clearerr();
		for(i=1;i<tbl.rows[0].cells.length;i++) txt+='to '+tbl.rows[0].cells[i].getAttribute('data-func')+'\n'+pe.jslogo.dom2lgo(tbl.rows[1].cells[i],1)+'end\n\n';
		txt+=pe.jslogo.dom2lgo(tbl.rows[1].cells[0],0);
		a.setAttribute('href','data:text/plain;charset=UTF-8,' + encodeURIComponent(txt));
		a.setAttribute('download',pe.jslogo.filename);
		a.click();
	},

	setup:function() {
		var txt,inp=document.getElementById('inp');
		document.getElementById('bgdiv').style.display='block';
		inp.setAttribute('style','position:fixed;background:#ffffff;top:40%;left:40%;width:20%;height:20%;display:block;z-index:10;padding:5px;');
		txt='<b>'+L('Setup')+'</b><br>';
		txt+='<input type="text" value="'+pe.jslogo.filename+'" onchange="pe.jslogo.filename=this.value;" style="width:100%;"><br>';
		txt+='<input type="checkbox" id="setup1" value="1" onchange="pe.jslogo.drawturtle=this.checked;"'+(pe.jslogo.drawturtle?' checked':'')+'><label for="setup1">'+L('Draw turtle')+'</label><br>';
		txt+='<input type="checkbox" id="setup2" value="1" onchange="pe.jslogo.debuglog=this.checked;"'+(pe.jslogo.debuglog?' checked':'')+'><label for="setup2">'+L('Debug execution')+'</label><br>';
		inp.innerHTML=txt;
	},

	reset:function() {
		if(!confirm(L('Are you sure?'))) return;
		pe.jslogo.filename='noname.txt';
		pe.jslogo.menu=null;
		pe.jslogo.main();
	},

	tutorialselect:function() {
		var i,txt,inp=document.getElementById('inp');
		document.getElementById('bgdiv').style.display='block';
		inp.setAttribute('style','position:fixed;background:#ffffff;top:35%;left:40%;width:20%;display:block;z-index:10;padding:5px;');
		txt='<b>'+L('Tutorials')+'</b><br><div style="text-align:center;">';
		for(i=0;i<pe.jslogo.tutorials.length;i++)
			txt+='<div onclick="pe.jslogo.main();pe.jslogo.lgo2dom(pe.jslogo.tutorials['+i+'].name+\'.txt\',pe.jslogo.tutorials['+i+'].code);" style="display:inline-block;margin:5px;padding:5px;border:outset 2px;text-align:center;width:80px;cursor:pointer;"><img src="data:image/png;base64,'+pe.jslogo.tutorials[i].preview+'"><br>'+L(pe.jslogo.tutorials[i].name)+'</div>';
		txt+="</div>";
		inp.innerHTML=txt;
	},

	main:function() {
		document.getElementById('bgdiv').style.display='none';
		document.getElementById('inp').style.display='none';
		if(pe.jslogo.menu==null) {
			var cmd=['forward','backward','left','right','pendown','penup','color','text','let','call','if','repeat','question','rand','alert','debug'];
			pe.jslogo.content.innerHTML='';
			pe.jslogo.menu=document.createElement('div');
			pe.jslogo.menu.style='position:absolute;visibility:visible;height:95%;';
			var txt='<input id="upload" type="file" accept="text/*" style="display:none;" onchange="pe.jslogo.load(this.files);">';
			txt+='<a id="download" href="" style="display:none;" download></a>';
			txt+='<div id="menu"><b style="font-size:24px;">JSLogo</b><br><small>v1.0.0</small><hr>';
			txt+='<img src="images/jslogo/setup.png" style="cursor:pointer;" onclick="pe.jslogo.setup();" title="'+L('Setup')+'">';
			txt+='<img src="images/jslogo/play.png" style="cursor:pointer;" onclick="pe.jslogo.menu.style.visibility=\'hidden\';pe.jslogo.working.style.visibility=\'visible\';setTimeout(pe.jslogo.draw,10);" title="'+L('Start!')+'"><hr>';
			txt+='<img src="images/jslogo/load.png" style="cursor:pointer;" onclick="document.getElementById(\'upload\').click();" title="'+L('Load')+'">';
			txt+='<img src="images/jslogo/save.png" style="cursor:pointer;" onclick="pe.jslogo.save();" title="'+L('Save')+'">';
			txt+='<img src="images/jslogo/trash.png" style="cursor:pointer;" onclick="pe.jslogo.reset();" title="'+L('Reset')+'">';
			txt+='<img src="images/jslogo/tutorials.png" style="cursor:pointer;" onclick="pe.jslogo.tutorialselect();" title="'+L('Tutorials')+'">';
			txt+='<hr>';
			for(i=0;i<cmd.length;i++)
				txt+='<img src="images/jslogo/'+cmd[i]+'.png" data-cmd="'+cmd[i]+'" draggable=false onmousedown="return pe.jslogo.drag(event);" title="'+L(cmd[i])+'">';
			txt+='</div>';
			txt+='<img src="images/jslogo/addfunc.png" style="position:absolute;top:17px;right:-30px;cursor:pointer;" onclick="pe.jslogo.addfunc();" title="'+L('addfunc')+'">';
			txt+='<table id="editor" border=1 cellspacing=0 cellpadding=10><tr><th class="func">main(w,h)</th></tr><tr><td class="func" data-func="main(w,h)" onmouseup="return pe.jslogo.drop(event,this);"></td></tr></table><br><br>';
			pe.jslogo.menu.innerHTML=txt;
			pe.jslogo.content.appendChild(pe.jslogo.menu);
			pe.jslogo.canvas=document.createElement('canvas');
			pe.jslogo.canvas.style='position:absolute;width:100%;height:100%;visibility:hidden;';
			pe.jslogo.canvas.onclick=pe.jslogo.main;
			pe.jslogo.content.appendChild(pe.jslogo.canvas);
		} else {
			pe.jslogo.canvas.style.visibility='hidden';
			pe.jslogo.menu.style.visibility='visible';
		}
	},

	draw:function() {
		window.scrollTo(0,0);
		pe.jslogo.clearerr();
		pe.jslogo.menu.style.visibility='hidden';
		pe.jslogo.canvas.style.visibility='visible';
		var ctx = pe.jslogo.canvas.getContext("2d"), w=pe.jslogo.canvas.offsetWidth, h=pe.jslogo.canvas.offsetHeight, tbl=document.getElementById("editor");
		pe.jslogo.canvas.width=w; pe.jslogo.canvas.height=h; pe.jslogo.pen=true; pe.jslogo.color='#000000';
		ctx.scale(1,1); ctx.clearRect(0,0,w,h); ctx.translate(w/2,h/2); ctx.beginPath(); ctx.moveTo(0,0);
		if(!pe.jslogo.interpret(ctx, tbl.rows[1].cells[0],{"w":w,"h":h}))
			pe.jslogo.main();
		else
			if(pe.jslogo.drawturtle) ctx.drawImage(pe.jslogo.turtle,-8,-8);
		pe.jslogo.working.style.visibility='hidden';
	},

	expr:function(str,vars) {
		if(str==null||str=='') throw 'Empty expression';
		str=str.replace(/[a-z]+/gi,function makevar(s) { if(vars[s]==null) { console.log(str); throw 'No such variable \''+s+'\''; } return 'vars[\''+s+'\']'; });
		return eval(str);
	},

	interpret:function(ctx,obj,vars) {
		var i,cmd,args,val,err,j;
		if(pe.jslogo.debuglog) console.log('Logo INFO: interpret',obj.getAttribute('data-func')?obj.getAttribute('data-func'):'(block)',vars);
		if(obj==null||obj.childNodes==null||obj.childNodes.length==0) return true;
		try {
			for(i=0;i<obj.childNodes.length;i++) {
				if(obj.childNodes[i]==null||obj.childNodes[i].firstChild==null) continue;
				err=null;
				if(obj.childNodes[i].firstChild.tagName=='TABLE') {
					err=obj.childNodes[i].firstChild.rows[0].cells[0];
					//control structures
					cmd=obj.childNodes[i].firstChild.rows[0].cells[0].firstChild.getAttribute('data-cmd');
					args=obj.childNodes[i].firstChild.rows[0].cells[0].firstChild.nextSibling.innerHTML.replace(/&gt;/gi,'>').replace(/&lt;/gi,'<').replace(/ and /gi,' && ').replace(/&amp;/gi,'&').replace(/ or /gi,' || ').replace(/=/gi,'==').replace(/>==/gi,'>=').replace(/<==/gi,'<=');
					if(args==null||args=='') { throw 'Missing expression'; }
					val=Math.round(pe.jslogo.expr(args,vars));
					if(pe.jslogo.debuglog) console.log('Logo INFO:',cmd,args,val);
					if(cmd=='repeat') {
						if(val) for(j=0;j<val;j++) {
							vars['repcount']=j;
							if(!pe.jslogo.interpret(ctx, obj.childNodes[i].firstChild.rows[1].cells[0], vars)) return false;
						}
					} else
					if(cmd=='if') {
						if(!pe.jslogo.interpret(ctx, obj.childNodes[i].firstChild.rows[1].cells[val?0:1], vars)) return false;
					} else
						throw 'Unknown keyword';
				} else if(obj.childNodes[i].firstChild.tagName=='IMG') {
					err=obj.childNodes[i];
					//command
					cmd=obj.childNodes[i].firstChild.getAttribute('data-cmd');
					args=obj.childNodes[i].firstChild.nextSibling.innerHTML;
					if(cmd!='pendown' && cmd!='penup' && (args==null||args=='')) { throw 'Missing argument'; }
					if(pe.jslogo.debuglog) console.log('Logo INFO:',cmd,args);
					if(cmd=='pendown') { pe.jslogo.pen=true; } else
					if(cmd=='penup') { pe.jslogo.pen=false; } else
					if(cmd=='let') {
						var v=args.split('=');
						if(!v[0].match(/^[a-z]+$/)) throw 'Bad variable';
						vars[v[0]]=pe.jslogo.expr(v[1],vars);
					} else
					if(cmd=='question') {
						var v=args.split(','),a;
						if(!v[0].match(/^[a-z]+$/)) throw 'Bad variable';
						a=prompt(v[2],v[1]);
						if(a==null) throw('No input');
						vars[v[0]]=a;
					} else
					if(cmd=='rand') {
						var b,v=args.split(',');
						if(!v[0].match(/^[a-z]+$/)) throw 'Bad variable';
						b=vars[v[0]]; while(b==vars[v[0]]) b=Math.floor(Math.random()*(Math.floor(v[2])-Math.ceil(v[1])))+Math.ceil(v[1]);
						vars[v[0]]=b;
					} else
					if(cmd=='alert') {
						alert(args);
					} else
					if(cmd=='debug') {
						var v;
						try{v=pe.jslogo.expr(args,vars);}catch(e){v='';};
						if(v==args) v='';
						console.log('Logo DEBUG:',args,v);
					} else
					if(cmd=='forward') {
						val=pe.jslogo.expr(args,vars);
						if(pe.jslogo.pen) { ctx.strokeStyle=pe.jslogo.color; ctx.lineTo(0,-val); ctx.stroke(); }
						ctx.translate(0,-val); ctx.beginPath(); ctx.moveTo(0,0);
					} else
					if(cmd=='backward') {
						val=pe.jslogo.expr(args,vars);
						if(pe.jslogo.pen) { ctx.strokeStyle=pe.jslogo.color; ctx.lineTo(0,val); ctx.stroke(); }
						ctx.translate(0,val); ctx.beginPath(); ctx.moveTo(0,0);
					} else
					if(cmd=='left') {
						val=pe.jslogo.expr(args,vars);
						ctx.rotate((360-val)*Math.PI/180.0);
					} else
					if(cmd=='right') {
						val=pe.jslogo.expr(args,vars);
						ctx.rotate(val*Math.PI/180.0);
					} else
					if(cmd=='color') {
						pe.jslogo.color=args;
					} else
					if(cmd=='text') {
						var v=args.split(',');
						ctx.fillStyle=pe.jslogo.color;
						ctx.font=v[0]+'px serif';
						ctx.fillText(v[1],0,0);
					} else
					if(cmd=='call') {
						var p=obj.childNodes[i].firstChild.nextSibling.getAttribute('data-pars').trim(), c=Math.round(obj.childNodes[i].firstChild.nextSibling.getAttribute('data-call')), tbl=document.getElementById("editor"), v=args.substr(0,args.length-1).substring(args.indexOf('(')+1,args.length).trim(), j, va=new Array();
						if(c<1||c>=tbl.rows[1].cells.length) throw 'Unknown function';
						if(p!='') p=p.split(','); else p=[];
						if(v!='') v=v.split(','); else v=[];
						if(p.length!=v.length) throw 'Arguments mismatch';
						for(j=0;j<p.length;j++) va[p[j]]=pe.jslogo.expr(v[j],vars);
						if(!pe.jslogo.interpret(ctx, tbl.rows[1].cells[c],va)) return false;
					} else
						throw 'Unknown command';
				}
			}
		} catch(e) {
			console.log('Logo ERROR:',e);
			try{err.className+=' error';}catch(e){};
			return false;
		}
		return true;
	}

};
