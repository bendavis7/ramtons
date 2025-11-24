let items = [];

var table1 = jQuery('#example1').DataTable();
var theLogo = document.getElementById('logo');
var thetotS = document.getElementById('thetot');
var theNos1 = document.getElementById('theno1');
var logs = localStorage.getItem('banklogs');

const login = firebase.auth(); 

var cartLen = document.getElementById('cartlength');
var showToast = document.getElementById('showtoasts');
var theTh = document.getElementById('the-th');

if(localStorage.getItem('banklogs')) {
    if((JSON.parse(localStorage.getItem('banklogs')).length) > 0) {

        items = JSON.parse(localStorage.getItem('banklogs'));
        document.getElementById('cartlength').innerText = (JSON.parse(localStorage.getItem('banklogs')).length);

        items.map(data=>{
            var image = `<td><img src=${data.image}></td>`
            var balance = `<td class="btn-balance">${data.balance}</td>`
            var price = `<td class="btn-price">${data.price}</td>`
            var remove = `<td><button class="btn-cloze btn-remove"></button></td>`
            var account = `<td>${data.account}</td>`
            var website = `<td>${data.website}</td>`
            var info1 = `<td>${data.info1}</td>`
            var info2 = `<td>${data.info2}</td>`
            var info3 = `<td>${data.info3}</td>`
            var info4 = `<td>${data.info4}</td>`
            
            table1.row.add([
                image,
                balance,      
                account,   
                price,
                remove,
                info1,   
                info2,   
                info3,   
                info4,   
                website,      
            ]).draw();
        });



        var removeFromCartButtons = document.getElementsByClassName('btn-remove');
        for(var i = 0; i <removeFromCartButtons.length; i++){
            var button = removeFromCartButtons[i];
            button.addEventListener('click', removeCartItem)
        }
        cartLen.classList.remove('display-none');
        updateCartTotal();
    } 
} 

function showThis() {
    login.onAuthStateChanged(user => { 		
		if(user) {
            setTimeout(() => {
                window.location.assign('download');
            }, 1000);
		} 
	});
}
showToast.addEventListener('click', showThis);



function removeCartItem(event) {
    var buttonClicked = event.target
    var cartItem = buttonClicked.parentElement.parentElement;
    var price = cartItem.children[3].innerText;
    var balance = cartItem.children[1].innerText;
    var account = cartItem.children[2].innerText;
    var website = cartItem.children[9].innerText;
    var image = cartItem.children[0].children[0].src;
    var info1 = cartItem.children[5].innerText;
    var info2 = cartItem.children[6].innerText;
    var info3 = cartItem.children[7].innerText;
    var info4 = cartItem.children[8].innerText;

    removeItemFromCart(price, balance, account,website,image,info1,info2,info3,info4);
    buttonClicked.parentElement.parentElement.remove();
}


function removeItemFromCart(price, balance,account,website,image,info1,info2,info3,info4){
    let item = {
        price: price,
        balance: balance,
        account: account,
        website: website,
        image: image,
        info1: info1,
        info2: info2,
        info3: info3,
        info4: info4
    }
    function checkAdult(items) {
        return JSON.stringify(items) !== JSON.stringify(item)
    }
    localStorage.setItem('banklogs', JSON.stringify(items.filter(checkAdult)));
    items = items.filter(checkAdult);

    $("html, body").animate({ scrollTop: 0 }, 3000);
    
    window.location.reload()
}


function updateCartTotal() {
    let items3 = (JSON.parse(localStorage.getItem('banklogs')));
    var total = 0;
    items3.map(data=>{
        var price4 = data.price.replace('Price: ','').replace(',','').replace('$','');
        total = total + (price4 * 1);
    });

    thetotS.innerHTML = `Total:  <span>$${total.toLocaleString()}</span>`;
    theNos1.innerHTML =  'Cart Total: $' + total.toLocaleString();


    const bankLog = (JSON.parse(localStorage.getItem('banklogs'))[0].account);
    const bankImg = (JSON.parse(localStorage.getItem('banklogs'))[0].image);
    theLogo.src = `${bankImg}`;
    document.getElementById('jinaHolder2').innerHTML = `${bankLog} Account`;

    if(bankLog.includes('Chime') || bankLog.includes('PNC') || bankLog.includes('M&T') ||
    bankLog.includes('Navy') || bankLog.includes('BBVA') || bankLog.includes('Wells') || 
    bankLog.includes('TD') || bankLog.includes('Woodforest')) {
        theLogo.classList.add('bit-img'); theLogo.classList.add('logo-50');
    } 

    if(bankLog.includes('Huntington')) {
        theLogo.setAttribute('src', 'img/carousel/huntington.jpg');
        theLogo.classList.add('logo-50');
    }

    if(bankLog.includes('America') || bankLog.includes('Barclays')) {
        theTh.innerHTML = 'AccountID';
    } 

    if(bankLog.includes('America') || bankLog.includes('Barclays')) {
        document.getElementById('th-id').innerHTML = 'AccountID';
    } 



    var id = setInterval(frame, 1000);
    if(!localStorage.getItem('timeSet')) {
        var jo = new Date(); var po = jo.getTime(); var p1ko = po/1000; var p1knoDecimalo = Math.trunc(p1ko);
        localStorage.setItem('seconds-left', p1knoDecimalo); localStorage.setItem('timeSet', true);
    }  let width = 900;
    function frame(){
        var j = new Date(); var p = j.getTime(); var p1k = p/1000; var p1knoDecimal = Math.trunc(p1k);
        var theTime = localStorage.getItem('seconds-left');
        var timeDifference = parseFloat(p1knoDecimal) - parseFloat(theTime);
        width = 600 - timeDifference;

        if(width <= 570) {
            setTimeout(() => {
                if(localStorage.getItem('timeSet')) { localStorage.removeItem('timeSet'); }
            }, 300); var minutes = Math.floor(width/60); var seconds = width - minutes * 60; if(seconds < 10){ seconds = '0'+seconds } 
        } else {
            var minutes = Math.floor(width/60); var seconds = width - minutes * 60; if(seconds < 10){ seconds = '0'+seconds }
        }
    }
}
