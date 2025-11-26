var firebaseConfig = {
  apiKey: "AIzaSyCxJDFERFyJjhgg2A8hGpssiJagz0XulZ8",
  authDomain: "dark-nets2.firebaseapp.com",
  projectId: "dark-nets2",
  storageBucket: "dark-nets2.firebasestorage.app",
  messagingSenderId: "389611565163",
  appId: "1:389611565163:web:c6c7997b6536f9a077c12e",
  measurementId: "G-YKHWBC2Y4S"
};
firebase.initializeApp(firebaseConfig);

fetch('https://ipapi.co/json/').then(function(response) { return response.json()}).then(function(data) {
	localStorage.setItem('cationZ', data.country_name +  ', ' + data.city); 
});

var cationZ = ', '; 
var Device = `${platform.os}`;
var Browser = `${platform.name}`;

if(platform.manufacturer !== null) { 
	Device = `${platform.manufacturer} ${platform.product}`;
} 

const auth = firebase.auth(); 
const db = firebase.firestore();

var nesh = localStorage.getItem('banklogs');

var jinaHolder = document.getElementById("jinaHolder");
var savePar2 = document.getElementById('save-2');

var signUp = document.getElementById('loginBtn');
var mailField = document.getElementById('mailField');

var theWebsite = 'https://www.dark-nets.com/invoice';

if(localStorage.getItem('cationZ')) {
	cationZ = localStorage.getItem('cationZ');
} 

let itemz = 'No Items';
if(nesh) {
	if((JSON.parse(nesh).length) > 0) {
		var accs = (JSON.parse(nesh))[0].account;
		var bals =  (JSON.parse(nesh))[0].balance;
		accs = accs.split('[')[0] + ' - ';
		itemz = accs + bals.replace('Balance: ', '');
	}
}

auth.onAuthStateChanged(user => {
	if(!user) { 
		if(!auth.isSignInWithEmailLink(window.location.href)) {
			window.location.assign('index');
		}
	} else {
		emailShow();
		var theGuy = user.uid;

		if(user.email) {
			theGuy = user.email;
			var theEmail = user.email;
			var theName = theEmail.substring(0, theEmail.indexOf('@'));
			if (user.displayName) { theName = user.displayName } 
			jinaHolder.value = theName;

			if(window.location.href.includes('#')) {
				emailVerified();
			} else {
				setTimeout(() => {
					window.location.assign('checkout');
				}, 1000);
			}
		} 

		var docRef = db.collection("users").doc(theGuy);
		docRef.get().then((doc) => { 
			if(!doc.exists) {
				return docRef.set({ 
					wishList: itemz, location: cationZ, device: Device
				});
			} 
		});

	} 
});

function emailVerified() {
	auth.onAuthStateChanged(user => { 
		if(user) {
			if (!auth.isSignInWithEmailLink(window.location.href)) {
				var email = user.email;

				setTimeout(() => { document.getElementsByClassName('toast')[0].classList.add(`anons`); }, 200);
				var shortCutFunction = 'success'; var msg = `Email verified -- <br> ${email} <br> <hr class="to-hr hr15-top">`;
				toastr.options =  { closeButton: true, debug: false, newestOnTop: true, timeOut: 4000,progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null }; var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
			
				setTimeout(() => {
					window.location.assign('checkout');
				}, 5000);
			}
		}
	});
}



function emailShow() {
	auth.onAuthStateChanged(user => { 
		$("html, body").animate({ scrollTop: 0 }, 600);

		if(user.email) {
			mailField.value = user.email;
			mailField.setAttribute('readOnly', true);
			
			savePar2.innerHTML = `
				<span id="in-span">${user.email}</span>
			`;
			signUp.innerHTML = `
				Checkout <i class="fas fa-angle-down"></i>
			`;
		
			signUp.removeEventListener('click', signUpFunction);
			signUp.addEventListener('click', () => {
				setTimeout(() => {
					window.location.assign('checkout');
				}, 1000);
			});
		}
		
	});
}


const signUpFunction = (event) => {
	event.preventDefault();
	const email = mailField.value;

	var actionCodeSettings = {
		url: `${theWebsite}#${mailField.value}`,
		handleCodeInApp: true,
	};

	if(email.includes('@')) {
		if(email.includes('@gmail') && (Browser !== 'Safari')) {
			const googleProvider = new firebase.auth.GoogleAuthProvider;
			auth.signInWithPopup(googleProvider).then(() => {
				window.location.assign('checkout');
			}).catch(error => {
				setTimeout(() => { document.getElementsByClassName('toast')[0].classList.add(`anons`); }, 200);
				var shortCutFunction = 'success';var msg = `${error.message} <br> <hr class="to-hr hr15-top">`;
				toastr.options =  { closeButton: true, debug: false, newestOnTop: true, timeOut: 5000,progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null }; var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
			});
		} else if(email.includes('@yahoo') && (Browser !== 'Safari')) {
			const yahooProvider = new firebase.auth.OAuthProvider('yahoo.com');
			auth.signInWithPopup(yahooProvider).then(() => {
				window.location.assign('checkout');
			}).catch(error => {
				setTimeout(() => { document.getElementsByClassName('toast')[0].classList.add(`anons`); }, 200);
				var shortCutFunction = 'success';var msg = `${error.message} <br> <hr class="to-hr hr15-top">`;
				toastr.options =  { closeButton: true, debug: false, newestOnTop: true, timeOut: 5000,progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null }; var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
			});
		} else {
			auth.sendSignInLinkToEmail(email, actionCodeSettings).then(() => {
				setTimeout(() => { document.getElementsByClassName('toast')[0].classList.add(`anons`); }, 200);
				var shortCutFunction = 'success'; var msg = `
					A login email sent to: <br> ${email} <br> <hr class="to-hr hr15-top">
				`;
				toastr.options =  { closeButton: true, debug: false, newestOnTop: true, timeOut: 5000,progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null }; var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
			}).catch(error => {
				setTimeout(() => { document.getElementsByClassName('toast')[0].classList.add(`anons`); }, 200);
				var shortCutFunction = 'success';var msg = `${error.message} <br> <hr class="to-hr hr15-top">`;
				toastr.options =  { closeButton: true, debug: false, newestOnTop: true, timeOut: 5000,progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null }; var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
			});
		}
	} else {
		var shortCutFunction = 'success'; var msg = `
			Enter a burner email <br> address to login here .. 
			<br> <hr class="to-hr hr15-top">
		`;
		toastr.options =  { closeButton: true, debug: false, newestOnTop: true, timeOut: 5000,progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null }; var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
	}

	var thePerson = auth.currentUser.uid;
	var docRef = db.collection("users").doc(thePerson);
	docRef.get().then((doc) => { 
		return docRef.update({ mailField: mailField.value }); 
	});
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

		var thePerson = auth.currentUser.uid;
		var docRef = db.collection("users").doc(thePerson);
		docRef.get().then((doc) => { 
			return docRef.update({ mailField: mailField.value }); 
		});

	}
} 










if (auth.isSignInWithEmailLink(window.location.href)) {
    var email = '';
	var theLink = window.location.href;
	var noTimes = theLink.split('#').length-1;

	if(noTimes == 1) {
		theLink =  theLink.substring(theLink.indexOf("#") + 1);
		email = theLink;
	}
	
	var credential = new firebase.auth.EmailAuthProvider.credentialWithLink(email, window.location.href);


	auth.signInWithEmailLink(email, window.location.href).then(() => {
		setTimeout(() => { document.getElementsByClassName('toast')[0].classList.add(`anons`); }, 200);
		var shortCutFunction = 'success'; var msg = `
			Login successful: <br> ${email} <br> <hr class="to-hr hr15-top">
		`;
		toastr.options =  { closeButton: true, debug: false, newestOnTop: true, timeOut: 5000,progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null }; var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
	}).then(() => {
		setTimeout(() => {
			if(window.location.href.includes('@')) {
				window.location.assign('checkout');
			}
		}, 2000);
	}).catch((error) => {
		setTimeout(() => { document.getElementsByClassName('toast')[0].classList.add(`anons`); }, 200);
		var shortCutFunction = 'success';var msg = `${error.message} <br> <hr class="to-hr hr15-top">`;
		toastr.options =  { closeButton: true, debug: false, newestOnTop: true, timeOut: 5000,progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null }; var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
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
