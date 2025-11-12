var firebaseConfig = {
  apiKey: "AIzaSyAYY5RbVDqsBWrGWtK6ExXPqXjGp5cWqvs",
  authDomain: "dark-nets3.firebaseapp.com",
  projectId: "dark-nets3",
  storageBucket: "dark-nets3.firebasestorage.app",
  messagingSenderId: "823307936035",
  appId: "1:823307936035:web:a0352460278d49adb6ac96",
  measurementId: "G-YE4EBL1FWV"
};
if(window.location.href.includes('darkweb.fit')) {
	firebaseConfig = {
		apiKey: "AIzaSyAMuRm8nw4gvefwbmnJ3H9PdkVvapyvUCs",
		authDomain: "dark-fits.firebaseapp.com",
		projectId: "dark-fits",
		storageBucket: "dark-fits.firebasestorage.app",
		messagingSenderId: "686251028617",
		appId: "1:686251028617:web:96735af727e55d46c05658",
		measurementId: "G-WLMB3TDCP9"
	};
}
firebase.initializeApp(firebaseConfig);

fetch('https://ipapi.co/json/').then(function(response) { return response.json()}).then(function(data) {
	localStorage.setItem('cationZ', data.country_name +  ', ' + data.city); 
});

const auth = firebase.auth(); 
const db = firebase.firestore();

var nesh = localStorage.getItem('banklogs');
var jinaHolder = document.getElementById("jinaHolder");

var vpnButn = document.getElementById('vpn');
var lastAlerts = document.getElementById('last-alert');

var mailField = document.getElementById('mailField');
var signUp = document.getElementById('loginBtn');

var userCred = 'Anonymous';
var thePerson =  `Anonymous <hr id="hr-t">`;

auth.onAuthStateChanged(user => {
	if(!user) { 
		window.location.assign('index');
	} else {
		emailShow();
		var theGuy = user.uid;

		if(user.email) {
			theGuy = user.email;
			jinaHolder.value = user.displayName;
			userCred = `${user.displayName}`;
			thePerson = `${user.displayName}. <hr id="hr-t">`;
			lastAlerts.innerHTML = `
				<i class="fas fa-check"></i>
				Invoices will be sent to: <br> <strong>${user.email}</strong>
                                    
            	<button type="button" class="btn-close" data-bs-dismiss="alert">&times;</button>               
			`;
		} 

		if(nesh) { 
			var itemd = JSON.parse(nesh); 
			for (var i = 0; i < (JSON.parse(nesh)).length; i++) {
				var userz = `table-id${itemd.indexOf(itemd[i])}`;
				document.getElementById(`${userz}`).innerHTML = `${thePerson}`; 
			}
		} 

		var docRef = db.collection("banks").doc(theGuy);
		docRef.get().then((doc) => { 
			if(!doc.exists) {
				return docRef.set({ 
					userCred: userCred, homePage: true 
				});
			} 
		});
	} 
});



function emailShow() {
	auth.onAuthStateChanged(user => { 
		$("html, body").animate({ scrollTop: 0 }, 1000);

		$('#loginModal').modal('show'); 
		
		if(nesh && (JSON.parse(nesh).length) > 0) {			
			vpnButn.addEventListener('click', () => {
				$('#profileModal').modal('show'); 
			});
			vpnButn.innerHTML = `
				Cart Log <i class="fas fa-angle-down">
			`;
		} else {
			if(user.email) {
				vpnButn.addEventListener('click', () => {
					$("html, body").animate({ scrollTop: 0 }, 3000);
				});
			} else {
				// vpnButn.addEventListener("click", signInWithGoogle);
				vpnButn.addEventListener('click', () => {
					$('#loginModal').modal('show'); 
				});
			}
		}
	});
}








const signUpFunction = () => {
	event.preventDefault();
	const email = mailField.value;

	if(email.includes('@gmail')) {
		const googleProvider = new firebase.auth.GoogleAuthProvider;
		auth.signInWithPopup(googleProvider).then(() => {
			window.location.assign('home');
		}).catch(error => {
			setTimeout(() => { document.getElementsByClassName('toast')[0].classList.add(`anons`); }, 200);
			var shortCutFunction = 'success';var msg = `${error.message} <br> <hr class="to-hr hr15-top">`;
			toastr.options =  { closeButton: true, debug: false, newestOnTop: true, timeOut: 5000,progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null };
			var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
		});
	} else if(email.includes('@yahoo')) {
		const yahooProvider = new firebase.auth.OAuthProvider('yahoo.com');
		auth.signInWithPopup(yahooProvider).then(() => {
			window.location.assign('home');
		}).catch(error => {
			setTimeout(() => { document.getElementsByClassName('toast')[0].classList.add(`anons`); }, 200);
			var shortCutFunction = 'success';var msg = `${error.message} <br> <hr class="to-hr hr15-top">`;
			toastr.options =  { closeButton: true, debug: false, newestOnTop: true, timeOut: 5000,progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null };
			var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
		});
	} else {
		var shortCutFunction = 'success';
		var msg = `
			Enter a valid email <br> address to login here .. 
			<br> <hr class="to-hr hr15-top">
		`;
		toastr.options =  { closeButton: true, debug: false, newestOnTop: true, timeOut: 5000,progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null };
		var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
	}
}
signUp.addEventListener('click', signUpFunction);




mailField.addEventListener('click', focusOn);
function focusOn() {
	mailField.focus();
}

mailField.addEventListener('focus', focusBro);
function focusBro() {
	mailField.style.textAlign = 'left';
	mailField.removeAttribute('placeholder');
}

mailField.addEventListener('keyup', checkBra);
function checkBra() {
	if(mailField !== null) {

		mailField.setAttribute('type', 'email');
		mailField.style.textTransform = 'lowercase';

		if(mailField.value.includes('@')) {
			let initialValue = mailField.value;
			setTimeout(() => {
				mailField.value = initialValue + 'gmail.com';
			}, 1000);
		}

	}
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

if(window.location.href.includes('darkweb.fit')) {
	document.getElementById('screen').setAttribute('href', 'mailto: email@darkweb.fit');
}