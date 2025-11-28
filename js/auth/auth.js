var firebaseConfig = {
  apiKey: "AIzaSyAYY5RbVDqsBWrGWtK6ExXPqXjGp5cWqvs",
  authDomain: "dark-nets3.firebaseapp.com",
  projectId: "dark-nets3",
  storageBucket: "dark-nets3.firebasestorage.app",
  messagingSenderId: "823307936035",
  appId: "1:823307936035:web:a0352460278d49adb6ac96",
  measurementId: "G-YE4EBL1FWV"
};
firebase.initializeApp(firebaseConfig);

fetch('https://ipapi.co/json/').then(function(response) { return response.json()}).then(function(data) {
	localStorage.setItem('cationZ', data.country_name +  ', ' + data.city); 
});

var cationZ = ', '; 
const auth = firebase.auth(); 
const db = firebase.firestore();

var nesh = localStorage.getItem('banklogs');

var jinaHolder = document.getElementById("jinaHolder");
var vpnButn = document.getElementById('vpn');

var banks = window.location.href;

if(banks.includes('http://127.0.0.1:5501')) {
	banks = banks.replace('http://127.0.0.1:5501', '');
} else {
	banks = banks.replace('https://www', '');
}

if(localStorage.getItem('cationZ')) {
	cationZ = localStorage.getItem('cationZ');
} 

auth.onAuthStateChanged(user => {
	if(!user) { 
		window.location.assign('index');
	} else {
		emailShow();
		var theGuy = user.uid;
	
		if(user.email) {
			theGuy = user.email;
			var theEmail = user.email;
			var theName = theEmail.substring(0, theEmail.indexOf('@'));
			if (user.displayName) { theName = user.displayName } 

			jinaHolder.value = theName;
		} 

		var docRef = db.collection("banks").doc(theGuy);
		docRef.get().then((doc) => { 
			if(doc.exists) {
				return docRef.update({ 
					banks: banks, location: cationZ
				});
			} 
		});
	}
});




function emailShow() {
	auth.onAuthStateChanged(user => { 
		$("html, body").animate({ scrollTop: 0 }, 600);

		vpnButn.addEventListener('click', () => {
			$('#profileModal').modal('show'); 
		});

	});
}




document.getElementById("thebodyz").oncontextmenu = function() {
	return false
};

var canvas = document.getElementById("canvas"); var ctx = canvas.getContext("2d"); var radius = canvas.height / 2;
ctx.translate(radius, radius); radius = radius * 1;  setInterval(drawClock, 1000);

function drawClock() {
	drawFace(ctx, radius); 	drawNumbers(ctx, radius);	drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
	var grad;	ctx.beginPath();	ctx.arc(0, 0, radius, 0, 2 * Math.PI);	ctx.fillStyle = 'white';	ctx.fill();
	grad = ctx.createRadialGradient(0, 0, radius * 0.05, 0, 0, radius * 2.5);	
	grad.addColorStop(0, '#121d33');	grad.addColorStop(0.5, 'rgba(0,0,0,0)');	grad.addColorStop(1, '#121d33');
	ctx.strokeStyle = grad;	ctx.lineWidth = radius * 0;	ctx.stroke();	ctx.beginPath();
	ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);	ctx.fillStyle = '#121d33';	ctx.fill();
}

function drawNumbers(ctx, radius) {
	var ang;	var num;	ctx.font = radius * 0.33 + "px arial";	ctx.textBaseline = "middle";	ctx.textAlign = "center";
	for (num = 1; num < 13; num++) {
		ang = num * Math.PI / 6;	ctx.rotate(ang);	ctx.translate(0, -radius * 0.87);	ctx.rotate(-ang);
		ctx.fillText(num.toString(), 0, 0);	ctx.rotate(ang);	ctx.translate(0, radius * 0.87);	ctx.rotate(-ang);
	}
}

function drawTime(ctx, radius) {
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	hour = hour % 12;
	hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) +	(second * Math.PI / (360 * 60));
	drawHand(ctx, hour, radius * 0.5, radius * 0.07);
	minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
	drawHand(ctx, minute, radius * 0.8, radius * 0.07);
	second = (second * Math.PI / 30);
	drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	ctx.moveTo(0, 0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.stroke();
	ctx.rotate(-pos);
}
