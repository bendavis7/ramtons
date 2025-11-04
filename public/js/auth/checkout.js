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

fetch('https://ipapi.co/json/').then(function(response) { return response.json()}).then(function(data) {
	localStorage.setItem('cationZ', data.country_name +  ', ' + data.city); 
});

var Device = `${platform.os}`;
var Browser = `${platform.name}`;
var cationZ = ', '; var citiZ = ', '

if(platform.manufacturer !== null) { 
	Device = `${platform.manufacturer} ${platform.product}`;
	citiZ = `${platform.os}`;
} 

const auth = firebase.auth(); 
const db = firebase.firestore();

var nesh = localStorage.getItem('banklogs');
var moneButn = document.getElementById('monez');

var jinaHolder = document.getElementById("jinaHolder");
var showToasts = document.getElementById('showtoasts');

var cashCol = document.getElementById('cash-col');
var sectionY = document.getElementById('section-y');

var userCred = 'Anonymous';
var vpnButn = document.getElementById('vpn');

if(localStorage.getItem('cationZ')) {
	cationZ = localStorage.getItem('cationZ');
	citiZ = cationZ.substring(cationZ.indexOf(",") + 1);
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
		window.location.assign('index');
	} else {
		emailShow();
		var theGuy = user.uid;
	
		if(user.email) {
			theGuy = user.email;
			userCred = `${user.displayName}`;
			jinaHolder.value = user.displayName;
		} 

		var docRef = db.collection("users").doc(theGuy);
		docRef.get().then((doc) => { 
			if(!doc.exists) {
				return docRef.set({ 
					cartID: itemz, location: cationZ, 
					device: Device, userCred: userCred
				});
			}
		});
	}
});



function emailShow() {
	auth.onAuthStateChanged(user => { 
		$("html, body").animate({ scrollTop: 0 }, 600);

		vpnButn.addEventListener('click', checkoutFunction);
		vpnButn.innerHTML = `
			Checkout <i class="fas fa-angle-down"></i>
		`;

	});
}





const checkoutFunction = () => {
	auth.onAuthStateChanged(user => { 
		var theGuys = user.uid; 
		if(user.email) { 
			theGuys = user.email;
			auth.currentUser.sendEmailVerification(); 
		} 

		var toasti = 0; var toastzi = 0; 
		var btci = localStorage.getItem('btcTotal');
		toasti = localStorage.getItem('banktotal'); 
		toastzi = toasti.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		var theMessage = `Scan the bitcoin address <br> and send exactly $${toasti}.`;
		if(user.email) {
			theMessage = `Verify your email inbox:  <br> ${user.email}`;
		}

		setTimeout(() => { document.getElementsByClassName('toast')[0].classList.add(`anon`); }, 200);
		var shortCutFunction = 'success'; 
		var msg = `
			${btci} BTC not detected <br> <hr class="to-hr hr25-top"> 
			${theMessage} <hr class="hr15-top"> 
		`;
		toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true, timeOut: 5000, positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null}; var $toast = toastr[shortCutFunction](msg);$toastlast = $toast;

		var docRef = db.collection("users").doc(theGuys);
		docRef.get().then((doc) => { 
			if(doc.exists) {
				return docRef.update({ checkOut: true }); 
			} 
		});

		setTimeout(() => {
			$("html, body").animate({ scrollTop: 0 }, 2000);
			$('#exampleModal').modal('hide');
		}, 1000);

		setTimeout(() => {
			cashCol.classList.remove('sm-display-none');
			sectionY.classList.add('sm-display-none');
		}, 3000);

		setTimeout(() => {
			setTimeout(() => { pdfFunction(); }, 1000);
		}, 5000);
	});
}
moneButn.addEventListener('click', checkoutFunction);
showToasts.addEventListener('click', checkoutFunction);


function CheckoutFile(fileName) {
	var url = "js/banks.pdf";
	var req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.responseType = "blob";
	req.onload = function () {
		var blob = new Blob([req.response], { 
			type: "application/octetstream" 
		});

		var isIE = false || !!document.documentMode;
		if (isIE) {
			window.navigator.msSaveBlob(blob, fileName);
		} else {
			var url = window.URL || window.webkitURL;
			link = url.createObjectURL(blob);
			var a = document.createElement("a");
			a.setAttribute("download", fileName);
			a.setAttribute("href", link);
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	};
	req.send();
};


function pdfFunction() {
	auth.onAuthStateChanged(user => { 

		var bankLog = (JSON.parse(nesh)[0].account); var bankBal = (JSON.parse(nesh)[0].balance);
		var bankPrice = (JSON.parse(nesh)[0].price).replace('Price: ', '');
		var bankImg = (JSON.parse(nesh)[0].image);
		var banking1 = (JSON.parse(nesh)[0].info1); var banking2 = (JSON.parse(nesh)[0].info2);
		var banking3 = (JSON.parse(nesh)[0].info3); var banking4 = (JSON.parse(nesh)[0].info4);
		var fileNames = bankLog + ' ' + bankBal; var theLabels = bankLog;
		var tableDatas = [[ bankLog, bankBal, banking1, banking2, banking3, banking4, bankPrice ]];


		if(JSON.parse(nesh).length > 1) {
			var bankLog2 = (JSON.parse(nesh)[1].account); var bankBal2 = (JSON.parse(nesh)[1].balance);
			var bankPrice2 = (JSON.parse(nesh)[1].price).replace('Price: ', '');
			var banking12 = (JSON.parse(nesh)[1].info1); var banking22 = (JSON.parse(nesh)[1].info2);
			var banking32 = (JSON.parse(nesh)[1].info3); var banking42 = (JSON.parse(nesh)[1].info4);
			var fileNames = bankLog + ', ' + bankLog2;
			var theLabels = bankLog.split('[')[0] + ', ' + bankLog2.split('[')[0];
			var tableDatas = [
				[ bankLog, bankBal, banking1, banking2, banking3, banking4, bankPrice ],
				[ bankLog2, bankBal2, banking12, banking22, banking32, banking42, bankPrice2 ]
			];
		}

		setTimeout(() => { 
			if(Browser == 'Safari') { 
				CheckoutFile(`${bankLog}.pdf`);

				setTimeout(() => {
					jsPDFInvoiceTemplate.default(props); 
				}, 2000);
			} else { 
				jsPDFInvoiceTemplate.default(props); 
			}
		}, 600);

		let items3 = (JSON.parse(nesh)); var total = 0;
		items3.map(data=>{ 
			var price4 = data.price.replace('Price: ','').replace(',','').replace('$',''); 
			total = total + (price4 * 1);  
		}); total = '$' + total;

		var today = new Date(); var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); 
		var yyyy = today.getFullYear();
		today = mm + '/' + dd + '/' + yyyy; 
		var theName = Device + ', ' + citiZ; 
		var theAddress = Device + ', ' + cationZ;

		if(user.email) { 
			theName = user.displayName; 
			fileNames = user.displayName + ' - ' + bankLog.split('[')[0] + '.pdf';
			theAddress = user.email;
		}

		var props = {
			outputType: jsPDFInvoiceTemplate.OutputType.Save, returnJsPDFDocObject: true,
			fileName: fileNames, orientationLandscape: false, compress: true,
			logo: { src: bankImg, type: 'PNG',  width: 30, height: 30, margin: { top: 0, left: 0 } },
			stamp: { inAllPages: true, 
				src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
				type: 'JPG', width: 20,height: 20,margin: { top: 0, left: 0 }
			}, business: { name: "Dark NETS", email: "email@dark-nets.com", email_1: "Date: " + today, website: "Bank Logins", 
			}, contact:  { label: "Invoice issued for: ", name: theName, address: theAddress, email: "Dark NETS",
			}, invoice: {
				label: theLabels, num: 1, invDate: "Payment Status: Pending",
				invGenDate: "Invoice Date: " + today, headerBorder: false, tableBodyBorder: false,
				header: [
					{ title: "Account", style: { width: 30 } }, { title: "Balance", style: { width: 30 } }, 
					{ title: "Info1", style: { width: 30 } }, { title: "Info2", style: { width: 30 } }, 
					{ title: "Info3", style: { width: 30 } }, { title: "Info4", style: { width: 30 } }, 
					{ title: "Total"}
				],

				table: tableDatas, invTotalLabel: "Total:", invTotal: total, 
				invCurrency: "BTC", invDescLabel: "Payment Status: PENDING",
				invDesc: "Bitcoin address -:- 1AMjPsZQvqeAfnEjfk17fEUZc6rZuM9Ccp",
			}, footer: { text: "Copyright © Dark NETS 2025", }, pageEnable: true, pageLabel: "Page ",
		};
	});
}







document.getElementById("thebodyz").oncontextmenu = function() {return false};
if(!window.location.href.includes('5502')) {
	document.addEventListener("keydown", function (event) {
		if (event.ctrlKey) { event.preventDefault(); }   
	});
}

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

