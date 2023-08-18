<!--
  http://localhost/git/%E3%83%AA%E3%83%9D%E3%82%B8%E3%83%88%E3%83%AA%E3%83%BC/php_timer/index.php
-->
<html>
<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	<meta name="viewport" content="width=200, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <link rel="stylesheet" href="css/style.css" type="text/css">
	<script src="https://code.jquery.com/jquery-3.6.4.min.js" integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8="
    crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/push.js/0.0.11/push.min.js"></script>	
    <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
</head>
<body class="full">
	<div class="backToumei">
			<div class="icon">

				<h1>PMD</h1>
				<span class="circle">
  				    <a href="php/report.php"><img src="iconImage/report.png" /></a>
				</span>
				<span class="circle">
					<img id="soundStop" src="iconImage/sound_stop.png" />
				</span>
				<span class="circle">
							<img id="kirokuMode" src="iconImage/kirokuMode.png" />
							<!-- <img id="kirokuBan" src="iconImage/ban.png" /> -->
				</span>
			    <img id="kirokuBan" src="iconImage/ban.png" />
				<span class="circle">
					<img id="changeSt" src="iconImage/timer.png" />
				</span>
				
			</div>
		  	<div class="heightCenter">

            	<div id="remainingTime"></div>
			</div>	
		
			<ul class="slideText"></ul>
			
			<dialog class="dlog" id="dialog">
				<div class="test2">
					<p>ｶﾃｺﾞﾘｰ変更
						<!-- <div id="mmmmm"></div> -->
						<form name="form">
						<!-- //<div id="categoryID"></div> -->
						<input type="radio" value="work" name="categoryChenge" />work
						<input type="radio" value="shRest" name="categoryChenge" />shRest
						<input type="radio" value="lgRest" name="categoryChenge"/>lgRest
					</p>
					<p>set変更
						<div id="setHenkou"></div>
						<!-- <input type="radio" value="1" name="pmdNumChange"/>1
						<input type="radio" value="2" name="pmdNumChange"/>2 -->
					</form>
					</p>
					<input type="button" id="formSub" value="変更">
					<button id="closeDlog">閉じる</button>
				</div>
			</dialog>

			<div class="heightCenter">
            	<div id="hidden">
            		<span id="category"></span>
    	    		<span id="pmdNum"></span>
    	    	</div>

                <div class="btn">
                	<button id="stopWatchSE" >start</button>
                	<button id="stopWatchSE_reset" >reSet</button>
                    <button id="set" >set</button>
                    <button id="stop">stop</button>
                    <button id="reStart">reStart</button>
            	        <button id="changeTime">Start</button>
            	        <button id="abort">abort</button>
                </div>
			</div>
            	<div id="res"></div>

            <!---
            <div class="slider">
        	    <ul class="slider-inner">
        	    </ul>
            </div>
			-->
	</div>
	 <script type="text/javascript" src="js/slick.min.js"></script>
     <script type="text/javascript" src="js/main.js"></script>
     <script type="text/javascript" src="js/ajax.js"></script>
</body>
</html>