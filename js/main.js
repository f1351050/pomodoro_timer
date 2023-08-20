
/*
●変更内容が反映されない件について
F5ボタン　リロード
Ctrl + F5 スパーリロードを試す

●javascriptのエラー箇所確認
F12　をおしDevToolsを開き確認

●sqlでの確認文
SELECT * FROM workTime ORDER BY kirokuNo DESC LIMIT 20;

●Gitコマンド
git remote add origin https://github.com/f1351050/pomodoro_timer.git
git branch -M main
git push -u origin main
（Gitコミットメッセージ）
fix：バグ修正
hotfix：クリティカルなバグ修正
add：新規（ファイル）機能追加
update：機能修正（バグではない）
change：仕様変更
clean：整理（リファクタリング等）
disable：無効化（コメントアウト等）
remove：削除（ファイル）
upgrade：バージョンアップ
revert：変更取り消し

●20230818　エラー・修正必要箇所
★今ある機能を正常に動かす！！（エラーをなくす）
// □ﾎﾟﾓﾄﾞｰﾛの種類を変更した際、ボタンが消えてしまう現象
// □ストップウォッチが機能しない
□音量がなっていない時は別のボタンへ変更
// □stop中に別のタイマーへ変更する場合は、アラート
// □lglestをなくす
// □配列へ変更
// □★作動中に、タイマー変更すると、そのまま動作したまま
// □★アルゴリズムがおかしい
□通知→クリック後の動作が不安
ーーーーーーーーーーーーーーーーーーーー
★デザイン等の＋α機能
□デザインの問題(何のボタンかわからない。スタート等のボタンを大きくする)
□モーダルウィンドウの内容変更
□時間が経ったときの音量、sound1、sound2,soudn3が容量が大きすぎた件
*/


// ❶ポモドーロタイマーの実装
var timerId=null;
var pmdNum=0;
var msTime=0;
var timer=0;
var differ=0;
var category='work';
var hizuke;
var start;
var nt;
var sound;
var kiroku=true; //テーブルに記録するしない
var sound_paused=true;
var stopwatch=false;
var timerKind=["25分　⇔　5分",
				"50分　⇔　10分",
				"テスト(3秒⇔４秒"];
var i=0;
var timerKindNow=timerKind[i];
var passedTime;
var timer1;
var timer2;
// var timer3;
var henkou=false;

//モーダルウィンドー
/* 未実装
var dialog=document.getElementById("dialog");
$("#category").contextmenu(function(){
	dialog.setAttribute('open','');
	return false;
})
$(".slideText").contextmenu(function(){
	dialog.showModal();
	return false;
})
$("#closeDlog").click(function(){	
	dialog.close();
})
*/
 //変更内容　処理
 /*未実装
 var formSub=document.getElementById("formSub");
 formSub.addEventListener("click",changeProcess);
 function changeProcess(){
	const pmdNumChange=document.form.pmdNumChange;
	const categoryChenge=document.form.categoryChenge;
	if(pmdNumChange!==""){
		pmdNumCh(pmdNumChange);
	}
	if(categoryChenge!==""){
		categoryCh(categoryChenge);
	}
	henkou=true;
 }
*/
//（未実装部分）モーダルウィンドー部分で変更した際
// function conf_max_pmdNum(){
// 	set_max=chPmdNum;
// 		for(var i=1;i<=set_max;i++){
// 			var text='<input type="radio" value='+'\"'+i+'\"'+'name="pmdNumChange"/>'+i;
// 			$("#setHenkou").append(text);
// 		}
// }
// conf_max_pmdNum();

 	//pmdの回数表示
	function pmdNumCh(pmdNumChange){
 		for(let i=0;i<pmdNumChange.length;i++){
			if(pmdNumChange[i].checked){
				pmdNum=pmdNumChange[i].value;
			break;}
		}
		var check=$("#pmdNum").text();
		if(check==""){
			document.getElementById("pmdNum").innerHTML="【"+pmdNum+"set】";
		}else{
			$("#pmdNum").text("【"+pmdNum+"set】");
		}
		$("#pmdNum").css('display', 'inline');
	}
	//カテゴリーの変更処理
	function categoryCh(categoryChenge){
		for(let i=0;i<categoryChenge.length;i++){
			if(categoryChenge[i].checked){
				category=categoryChenge[i].value;
				break;}
			}
			switch(category){
				case 'work':
					timer=timer1.timer;
					break;
				case 'Rest':
					timer=timer2.timer;
					break;
			}
			tds(timer);
		var check2=$("#category").text();
		if(check2==""){	
			document.getElementById("category").innerHTML=category;
		}else{
			$("#category").text(category);
		}
	}

//タイマーの種類変更　タイマー下の<>の変更処理
$.each(timerKind,function(index,elem){
	$('<li></li>')
	.append(elem)
	.appendTo('.slideText');
})
 $('.slideText').slick({
    autoplay:false,
	arrows: true,
});

//ﾀｲﾏｰの種類を変える際のスライド
// ▷を押した場合の処理
$('.slick-next').click(function(){
	if(pmdNum!=0){
		var boolean=window.confirm('現在作業中です。タイマーの種類を切り替えると作業がリセットされます。切り替えますか？');
		if(boolean==false){
			currentMoziCheck();
			return false;}
	}
	if(timerId!==null){
		abortTime();
		setTime.style.display='inline';
	}
	i++;
	if(i>timerKind.length-1){
		i=0;
	}
	timerKindNow=timerKind[i];
	currentTimer();
	currentMoziCheck();
})


// ◁を押した場合の処理
$('.slick-prev').click(function(){
	if(pmdNum!=0){
		var boolean=window.confirm('現在作業中です。タイマーの種類を切り替えると作業がリセットされます。切り替えますか？');
		if(boolean==false){
			currentMoziCheck();
			return false;}
	}
	if(timerId!==null){
		abortTime();
		setTime.style.display='inline';
	}
	i--;
	if(i<0){
		i=timerKind.length-1; }
	timerKindNow=timerKind[i];
	currentTimer();
	currentMoziCheck();
	})
	//テキスト文字を判断し、表示された時間をｾｯﾄする
	function currentMoziCheck(){
		var current=$('.slick-current').text();
		if(current!==timerKindNow){
			$('.slick-current').text(timerKindNow);
		}
	}

//現在のタイマーに切り替える
 function currentTimer(){
	timerKindCurrent();
  if(pmdNum==0 || (timer!=0 && timer==timer2.timer)){
	timer=timer1.timer;
	change1=timer1.category;
	change2=timer1.timer;

  }else{
	timer=timer2.timer;
	change1=timer2.category;
	change2=timer2.timer;
  }
  pn="【"+pmdNum+"set】";
  $("#pmdNum").text(pn);
  $("#category").text(change1);
  if(pmdNum==0){
	$("#pmdNum").css('display', 'none');
  }
  category=change1;
  passedTime=msTimeChange(change2);
  var current_timer;
  nt=passedTime+'経ちました。クリックすると次のタイマーが作動します';
  tds(timer);
}
currentTimer();


//矢印ボタンでﾀｲﾏｰの種類を変更する際の処理
function timerKindCurrent(){
	var now=new Date();
	var hour=now.getHours();
	// var lgRestTimer;
	switch(timerKindNow){
		case timerKind[0]:
			timer1={timer:1500000,category:'work'};
			timer2={timer:300000,category:'Rest'};
			kiroku=true; 
			break;
		case timerKind[1]:
			timer1={timer:3000000,category:'work'};
			timer2={timer:600000,category:'Rest'};
			 kiroku=true; 
		break;
		case timerKind[2]:
			timer1={timer:3000,category:'work'};
			timer2={timer:4000,category:'Rest'};
			 kiroku=true; 
	}
	kirokuMode(kiroku);
}
timerKindCurrent();

//記録機能のON、OFF
	$("#kirokuMode").click(function(){
		if(kiroku==true){
			var conf=window.confirm("記録機能をOFFにしますか？")
			if(conf){
				kiroku=false;
				kirokuMode(kiroku);
			}
		}else{
			if(kiroku==false){
			var conf=window.confirm("記録機能をONにしますか？")
			if(conf){
				kiroku=true;
				kirokuMode(kiroku);
			}
		}
	}})
//記録モードON・OFF確認　表記　
	function kirokuMode(kiroku){
	if(kiroku==true){
		$("#kirokuBan").css('display', 'none');
	}else if(kiroku==false){
		$("#kirokuBan").css('display', 'inline');
	}
	}
	kirokuMode();

 //★pmdの回数と作業用タイマーの起動
		function timeStart(){
		//   pmdNum++;
		  if(henkou==false){
		    currentTimer();
		  }else{
		  	hekou=false;
		  }
		    pmdNum++;
			$("#pmdNum").css('display', 'inline');
		  	pmdSw();
		  	sound=new Audio();
		  	sound.src=active_music();
		  	sound.play();
		  	sound_paused=false;
		  	$("#soundStop").attr('src','iconImage/sound_play.png');
		  document.getElementById("pmdNum").innerHTML="【"+pmdNum+"set】";
		}
  //★時間が経ったときに、workタイマーrestタイマーか切り替える
	  function changeTimeStart(){
		  switch(category){
				  case "work":
					currentTimer();
		  			pmdSw();
					  break;
				  case "Rest":
					  timeStart();
					  break;
			  }
		Push.clear();
	  }

  //初期画面のセット（categoryとpmdNumを非表示）
		var hiden=document.getElementById("hidden")
  //「セット」をクリックすると、タイマーがスタートする。
		var setTime=document.getElementById("set");
			setTime.addEventListener("click",timeStart);
  		
  		//「stop」をクリックするとタイマーが停止
  			var stop=document.getElementById("stop");
  			stop.style.display='none';
  			stop.addEventListener("click",timeStop);
  		//「reStart」をクリックするとタイマーが停止
  			var reStart=document.getElementById("reStart");
  			reStart.style.display='none';
  			reStart.addEventListener("click",timeReStart);
  		//timer通知を間違えて消してしまった時の救済
  			var changeTime=document.getElementById("changeTime");
  			changeTime.style.display='none';
  			changeTime.addEventListener("click",changeTimeStart);
  			//作業中断　PMD回数、タイマーをリセット
  				var abort=document.getElementById("abort");
  				abort.style.display='none';
  				abort.addEventListener("click",abortTime);
  				
// タイマー停止
  function twStop(){
	  clearInterval(timerId);
			  timerId=null;
	   var end=dateTime();
			  if(kiroku){
			  	ajaxCon(category,hizuke,start,end);
			  }
  }
  //タイマー停止2
  		function timeStop(){
			  twStop();
			  	reStart.style.display='inline';
			  	stop.style.display='none';
		  }
  //タイマー再開
  		function timeReStart(){
			  timer=differ;
			  	reStart.style.display='none';
			  	stop.style.display='inline';
			  	changeTime.style.display='none';
			  pmdSw();
		  }
		  
    //reset
    	function reset(){
			if(differ>=0){
			  	    	var end=dateTime();
			  	    	if(kiroku){
			  				ajaxCon(category,hizuke,start,end);
			  			}
			  		}
			  timerId=null;
			  category="";
			  differ=0;
			  timer=0;
			  pmdNum=0;
			  hiden.style.visibility ="hidden";
			  stop.style.display='none';
			  abort.style.display='none';
			  reStart.style.display='none';
			  changeTime.style.display='none';
		}
		  //abort処理 作業停止
		  function abortTime(){
			  clearInterval(timerId);
			  if(differ>=0){
				var end=dateTime();
				if(kiroku){
					ajaxCon(category,hizuke,start,end);
			  	}
			  }
			  var boolean=window.confirm('本当に停止してよろしいですか');
				if(boolean){
					reset();
					currentTimer();
			  			setTime.style.display='inline';
			  	}else{
					  timeReStart();
				}
		  }

  //ポモドーロの機能（ｶｳﾝﾄﾀﾞｳﾝﾀｲﾏｰ起動、st文字表示、開始・終了時間の表示)
		function pmdSw(){
		  var seTime=dateTime();//ここでmstimeもset
			   start=seTime;
			   if(kiroku){
			   		ajaxCon(category,hizuke,start);
			   	}
		  	stop.style.display='inline';
		  	setTime.style.display='none';	
		  	changeTime.style.display='none';
		  	abort.style.display='inline'  
		  	hiden.style.visibility ="visible";
		  	document.getElementById("category").innerHTML=category;
		    timerId=setInterval(pmd,1000);
		 }
  //時間表示　関数
  		function dateTime(){
			var time=new Date(); 
				var hour=set2fig(time.getHours());
				var min=set2fig(time.getMinutes());
				var sec=set2fig(time.getSeconds());
				var year=time.getFullYear();
		    	var month=time.getMonth()+1;
		    	var date=time.getDate();
			msTime=time.getTime();
			
			hizuke=year+"-"+month+"-"+date;
			var seTime=hour+":"+min+":"+sec;
			return seTime;
		}
	  
  //2時間を2桁表示　01とか
  function set2fig(num){
	  var ret;
	  if(num < 10){ret ="0"+num;}
	  else{ret=num;}
	  return ret;
  }

  //指定した時間から計算して、時間になると音が鳴る＆通知（何分経ったか）　または　時間経過中はタイマーの表示
	  function pmd(){
			var now=new Date();
				now=now.getTime();
		differ=timer+msTime-now;
			if(differ>1){
				tds(differ);
			}else if(differ<=1){
			  sound.pause();
			  sound.src="Cuckoo_Clock02-02(Bell-Mid).mp3";
			  sound.play();
			  PushNFT(nt);
			  clearInterval(timerId);
			  	stop.style.display='none';
			  	reStart.style.display='none';
			  	changeTime.style.display='inline';
			  var end=dateTime();
			  if(kiroku){
			  	ajaxCon(category,hizuke,start,end);
			  }	  
		  }
		}
		
//ストップウォッチ機能
$("#stopWatchSE").css('display', 'none');
$("#stopWatchSE_reset").css('display', 'none');
//PMDかストップウォッチ切替
	  $("#changeSt").click(function(){
		  if(stopwatch==false){
			  if(!timerId==null || !timer==0){
			  	var conf=window.confirm('今のﾀｲﾏｰをﾘｾｯﾄしてもよろしいですか');
			  	}
			  	if(conf==false){return;}
			  		clearInterval(timerId);
			  		reset();
					tds(differ);
		  			$("#changeSt").attr('src','iconImage/stopwatch.png');
		  			$("#stopWatchSE").css('display', 'inline');
		  			$("#set").css('display', 'none');
		  			$("#reStart").css('display', 'none');
		  			$("#abort").css('display', 'none');
		  			$("#stopWatchSE").text('start');
		  			$("#timerKind").css('display','none');
					$('.slideText').css('display', 'none');
		  			stopwatch=true;

		  }else if(stopwatch==true){
			   if(!timerId==null || !timer==0 ||differ>0){
			  	var conf=window.confirm('今のﾀｲﾏｰをﾘｾｯﾄしてもよろしいですか');
			  	}
			  	if(conf==false){return;}
			  	    clearInterval(timerId);
			  		reset();
					$("#changeSt").attr('src','iconImage/timer.png');
					$("#stopWatchSE").css('display', 'none');
					$("#set").css('display', 'inline');
					$("#stopWatchSE_reset").css('display', 'none');
					$("#timerKind").css('display','inline');
					$('.slideText').css('display', 'inline');
					window.location.reload(true);
					stopwatch=false;
			   }
	  });

	$("#stopWatchSE").click(function(){
		if(timerId==null){
			   var seTime=dateTime();
			   start=seTime;
			   category='freeWork';
			   $(this).text('stop');
			   if(kiroku){
			   		ajaxCon(category,hizuke,start);
			   	}
				timerId=setInterval(stopWatch,1000);
				$("#stopWatchSE_reset").css('display', 'inline');
		}else{
			  twStop();
			  $(this).text('start');
			  timer=differ;
		}
	})

	//ストップウォッチ作動
		function stopWatch(){
			var now=new Date();
			differ=now-msTime+timer;
			tds(differ);
		}
	//リスタート
	$("#stopWatchSE_reset").click(function(){
		var conf=window.confirm('本当にリセットしますか？');
		if(conf){
			var end=dateTime();
			  	    	if(kiroku){
			  				ajaxCon(category,hizuke,start,end);
			  			}
			differ=0;
			timer=0;
			clearInterval(timerId);
			timerId=null;
			tds(0);
			$("#stopWatchSE_reset").css('display','none');
			$("#stopWatchSE").text('start');
		}
	});
//timerKindが変わるたび、ﾀｲﾏｰ表記を変える。
function msTimeChange(timer){
	var ary=msTimeChangePr(timer);
	if(ary.hour=='00' && ary.sec=='00'){
		passedTime=ary.min+"分";
	}else if(ary.min!=='00' && ary.sec!=='00'){
		passedTime=ary.min+"分"+ary.sec+"秒";
	}else if(ary.hour=='00' && ary.min=='00'){
		passedTime=ary.sec+"秒";
	}
	return passedTime;
}
  //ミリ秒から秒、分、時間への変換
	function msTimeChangePr(differ){
		var sec=set2fig(Math.floor(differ/1000)%60);
		var min=set2fig(Math.floor(differ/1000/60)%60);
		var hour=set2fig(Math.floor(differ/1000/60/60)%24);
		return {sec:sec,min:min,hour:hour};
	}
  //残り時間を表示させる
	  function tds(differ){
		var ary=msTimeChangePr(differ);
		  if(ary.hour==0){
		  	var remainingTime=ary.min+":"+ary.sec;
		  }else{
			var remainingTime=ary.hour+":"+ary.min+":"+ary.sec;
		  }
		  document.getElementById("remainingTime").innerHTML=remainingTime;
	  }
	  
	  //音関係
	  $("#soundStop").click(function(){
		  if(sound_paused==false){
		  		sound.pause();
		  		$("#soundStop").attr('src','iconImage/sound_stop.png');
		  		sound_paused=true;
		  }else if(sound_paused==true){
			  	if(sound==null){
					  sound=new Audio();
					  sound.src=active_music();
				  }
					sound.play();
					$("#soundStop").attr('src','iconImage/sound_play.png');
				sound_paused=false;
		  }
	  });
	  function active_music(){
		  	var soundList=['active_music/sound1.mp3', 'active_music/sound2.mp3', 'active_music/sound3.mp3', 'active_music/sound4.mp3'];
	  		var sound;
	  		var now=new Date();
	  		hour=now.getHours();
	  		switch(true){
    			case hour<=13:
        			sound=soundList[0];
        			break;
    			case hour>13&& hour<15:
        			sound=soundList[1];
        			break;
   				case hour>=15:
        			var max=3;
       				var min=2;
        			var rnd=Math.floor(Math.random()*(max+1-min))+min;
        			sound=soundList[rnd];
        			break;
			}
			return sound;
	  }
	  
  //通知機能
	   function PushNFT(nt) {
		  Push.create('時間です!!!!', {
		  body: nt,
		  requireInteraction: true,
		  onClick: function() {
		  // 通知がクリックされた場合の設定
			    changeTimeStart();
				window.focus();
			  }
		  });
	  }