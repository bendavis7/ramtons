var firebaseConfig = {
  apiKey: "AIzaSyAGuqvMgfujV6iNhkgRenksekS6n49E0ys",
  authDomain: "dark-netss.firebaseapp.com",
  projectId: "dark-netss",
  storageBucket: "dark-netss.firebasestorage.app",
  messagingSenderId: "971358489577",
  appId: "1:971358489577:web:ba3dff8c032bc5e7ca5978",
  measurementId: "G-Q98VGFEHLT"
};
firebase.initializeApp(firebaseConfig);

if(!localStorage.getItem('banklogs')) {
	localStorage.setItem('banklogs',[]);
} 

const signAnony = document.getElementById('signAnony');
const signGoogle = document.getElementById('signGoogle');
const signYahoo = document.getElementById('signYahoo');

const auth = firebase.auth();

auth.onAuthStateChanged(user => {
	if(user) {
		if(user.email) {
			window.location.assign('home');
		} 
	} 
});

const signInAnony = () => {
	auth.signInAnonymously().then(() => {
		setTimeout(() => {
			window.location.assign('home');
		}, 600);
    }).catch(error => {
		setTimeout(() => { document.getElementsByClassName('toast')[0].classList.add(`anons`); }, 200);
        var shortCutFunction = 'success';var msg = `${error.message} <br> <hr class="to-hr hr15-top">`;
		toastr.options =  { closeButton: true, debug: false, newestOnTop: true, timeOut: 5000,progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null };
		var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
    });
};
signAnony.addEventListener("click", signInAnony);



const signInWithGoogle = () => {
	const googleProvider = new firebase.auth.GoogleAuthProvider;
	auth.signInWithPopup(googleProvider).then(() => {
		setTimeout(() => {
			window.location.assign('home');
		}, 600);
    }).catch(error => {
		setTimeout(() => { document.getElementsByClassName('toast')[0].classList.add(`anons`); }, 200);
        var shortCutFunction = 'success';var msg = `${error.message} <br> <hr class="to-hr hr15-top">`;
		toastr.options =  { closeButton: true, debug: false, newestOnTop: true, timeOut: 5000,progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null };
		var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
    });
};
signGoogle.addEventListener("click", signInWithGoogle);





const signInWithYahoo = () => {
	const yahooProvider = new firebase.auth.OAuthProvider('yahoo.com');
	auth.signInWithPopup(yahooProvider).then(() => {
		setTimeout(() => {
			window.location.assign('home');
		}, 600);
	}).catch(error => {
		setTimeout(() => { document.getElementsByClassName('toast')[0].classList.add(`anons`); }, 200);
        var shortCutFunction = 'success';var msg = `${error.message} <br> <hr class="to-hr hr15-top">`;
		toastr.options =  { closeButton: true, debug: false, newestOnTop: true, timeOut: 5000,progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null };
		var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
    });
};
signYahoo.addEventListener("click", signInWithYahoo);






document.getElementById("thebodyz").oncontextmenu = function() {
	return false
};
if(!window.location.href.includes('5502')) {
	document.addEventListener("keydown", function (event) {
		if (event.ctrlKey) {
			event.preventDefault();
		}   
	});
}



if(!window.location.href.includes('5502')) {
	function disableCtrlKeyCombination(e){
		var forbiddenKeys = new Array('a', 'n', 'c', 'x', 'i', 'v', 'j' , 'w', 'i');
		var key; var isCtrl;
		if(window.event){
			key = window.event.keyCode;
			if(window.event.ctrlKey) { isCtrl = true;
			} else { isCtrl = false; }
		} else {
			key = e.which; 
			if(e.ctrlKey) { isCtrl = true;
			} else { isCtrl = false; }
		}
		if(isCtrl) {
			for(i=0; i<forbiddenKeys.length; i++) {
				if(forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase()) {
					alert('Key combination CTRL + '+String.fromCharCode(key) +' has been disabled.');
					return false;
				}
			}
		}
		return true;
	}
}
