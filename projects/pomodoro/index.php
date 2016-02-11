<!DOCTYPE HTML>
<html>

<head>
		<meta charset="utf-8">
		<link href="css/style.css" rel="stylesheet">
		<title>FCC Pomodoro Clock</title>
</head>
<body>
	<div class="wrapper">
		<h2 id="abba">FCC Pomodoro Clock</h2>
		<div class="container">
			<div class="session">
				<div id="minus-session" class="minus">-</div>
				<div id="timer-s" class="timer">
					<div id="session-clock" class="clock"></div>
					<div class="timer-name">session</div>
				</div>
				<div id="plus-session" class="plus">+</div>
			</div>
			<div class="break">
				<div id="minus-break" class="minus">-</div>
				<div id="timer-b" class="timer">
					<div id="break-clock" class="clock"></div>
					<div class="timer-name">break</div>
				</div>
				<div id="plus-break" class="plus">+</div>
			</div>
			<div id="reset" class="reset">Reset</div>
		</div>
	</div>
	<script src="js/common.js"></script>
</body>

</html>