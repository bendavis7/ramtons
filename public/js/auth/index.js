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
		toastr.options =  { closeButton: true, debug: false, newestOnTop: true, timeOut: 5000,progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null }; var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
    });
};
signAnony.addEventListener("click", signInAnony);



const signInWithGoogle = () => {
	const googleProvider = new firebase.auth.GoogleAuthProvider;
	auth.signInWithPopup(googleProvider).then(() => {
		auth.currentUser.sendEmailVerification();
		setTimeout(() => {
			window.location.assign('home');
		}, 600);
    }).catch(error => {
		setTimeout(() => { document.getElementsByClassName('toast')[0].classList.add(`anons`); }, 200);
        var shortCutFunction = 'success';var msg = `${error.message} <br> <hr class="to-hr hr15-top">`;
		toastr.options =  { closeButton: true, debug: false, newestOnTop: true, timeOut: 5000,progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null }; var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
    });
};
signGoogle.addEventListener("click", signInWithGoogle);





const signInWithYahoo = () => {
	const yahooProvider = new firebase.auth.OAuthProvider('yahoo.com');
	auth.signInWithPopup(yahooProvider).then(() => {
		auth.currentUser.sendEmailVerification();
		setTimeout(() => {
			window.location.assign('home');
		}, 600);
	}).catch(error => {
		setTimeout(() => { document.getElementsByClassName('toast')[0].classList.add(`anons`); }, 200);
        var shortCutFunction = 'success';var msg = `${error.message} <br> <hr class="to-hr hr15-top">`;
		toastr.options =  { closeButton: true, debug: false, newestOnTop: true, timeOut: 5000,progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null }; var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
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







if(window.location.href.includes('darkweb.fit')) {
	document.getElementsByClassName('is-visible')[0].innerHTML = 'DARK WEB.';
}