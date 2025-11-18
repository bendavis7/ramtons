let items = [];

var logs = localStorage.getItem('banklogs');
var theLogo = document.getElementById('logo');

var table1 = jQuery('#example1').DataTable();
var cartLen = document.getElementById('cartlength');
var jinaHolders2 = document.getElementById('jinaHolder2');

var theNos1 = document.getElementById('theno1');
var theTh = document.getElementById('the-th');
var thetotS = document.getElementById('thetot');

const login = firebase.auth(); 

if(localStorage.getItem('banklogs')){
    if((JSON.parse(localStorage.getItem('banklogs')).length) > 0) {
        items = JSON.parse(localStorage.getItem('banklogs'));
        document.getElementById('cartlength').innerText = (JSON.parse(localStorage.getItem('banklogs')).length);

        
        for(var i = 0; i < items.length; i++) {
            if((items[i].account).includes('CHECKING') || (items[i].account).includes('SPENDING') || (items[i].account).includes('CHEQUING') || (items[i].account).includes('CURRENT')){
                var cartRow3 = document.createElement('div');
                cartRow3.classList.add('col-lg-10', 'col-xl-8', 'col-md-4', 'col-6', 'center-col');
                var balance2 = items[i].balance;
                var price2 = items[i].price;
                var balance3 = balance2.replace('Balance: ', '');
                var price3 = price2.replace('Price: ', 'Cart: ');
                var cartItems3 = document.getElementsByClassName('xenon4')[0];
                var cartRowContents3 = `
                    <div class="pricing-list highlight" id="the-logs">
                        <div class="pricing-list-price">
                            <h2 class="text-white">${balance3}</h2>
                            <img src=${items[i].image} class="borderp">
                        </div>
                        <ul>
                            <li class="text-white">${items[i].website} </li>
                            <li class="text-white">${items[i].info1} </li>
                            <li class="text-white">${items[i].info2} </li>
                            <li class="text-white">${items[i].info3} </li>
                            <li class="text-white">${items[i].info4} </li>
                            <li class="text-white">${(items[i].account).replace('[','<br>[').replace(']',' ACCOUNT]')}</li>
                            <button type="submit" class="butn white" id="modem" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                ${price3} <i class="fas fa-angle-down"></i>
                            </button>
                        </ul>
                    </div>
                `;
                cartRow3.innerHTML = cartRowContents3;
                cartItems3.prepend(cartRow3);
            } else {
                var cartRow3 = document.createElement('div');
                cartRow3.classList.add('col-lg-10', 'col-xl-8', 'col-md-4', 'col-6', 'center-col');
                var balance2 = items[i].balance;
                var price2 = items[i].price;
                var balance3 = balance2.replace('Balance: ', '');
                var price3 = price2.replace('Price: ', 'Cart: ');
                var cartItems3 = document.getElementsByClassName('xenon4')[0];
                var cartRowContents3 = `
                    <div class="pricing-list" id="the-logs">
                        <div class="pricing-list-price">
                            <h2>${balance3}</h2>
                            <img src=${items[i].image} class="borderp">
                        </div>
                        <ul>
                            <li>${items[i].website} </li>
                            <li>${items[i].info1} </li>
                            <li>${items[i].info2} </li>
                            <li>${items[i].info3} </li>
                            <li>${items[i].info4} </li>
                            <li>${(items[i].account).replace('[','<br>[').replace(']',' ACCOUNT]')}</li>
                            <button type="submit" class="butn" id="modem" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                ${price3} <i class="fas fa-angle-down"></i>
                            </button>
                        </ul>
                    </div>
                `;
                cartRow3.innerHTML = cartRowContents3;
                cartItems3.prepend(cartRow3);
            }    
        }



        for(var i = 0; i < items.length; i++) {
            var cartRow = document.createElement('tr');
            cartRow.classList.add('big-margin');
            var cartRow2 = document.createElement('li');
            cartRow.classList.add('table-warning');
            cartRow2.classList.add('total','bg-black');
            var cartItems =  document.getElementsByClassName('champez3')[0];
    
            var cartRowContents = `
                <td><img src=${items[i].image}></td>       
                <td>
                    Balance:
                    <span>${(items[i].balance).replace('Balance: ','')}</span> 
                </td>
                <td>${items[i].account}</td>
                <td id=${'table-id' + items.indexOf(items[i])} style="filter: blur(0px); white-space: normal !important;"></td>  
                
                <td>${(items[i].price)}</td>

                <td><button class="btn-cloze btn-remove"></button></td>

                <td>${items[i].info1}</td>
                <td>${items[i].info2}</td>
                <td>${items[i].info3}</td>
                <td>${items[i].info4}</td>
                <td>${items[i].website}</td>
            `;
            cartRow.innerHTML = cartRowContents;
            cartItems.prepend(cartRow);
        }

        
        var removeFromCartButtons = document.getElementsByClassName('btn-remove');
        for(var i = 0; i <removeFromCartButtons.length; i++){
            var button = removeFromCartButtons[i];
            button.addEventListener('click', removeCartItem)
        }

        cartLen.classList.remove('display-none');
        updateCartTotal();

        var modems = document.getElementById('modem');
        var theLogs = document.getElementById('the-logs');

        thetotS.addEventListener('click', ()=> { modems.click(); });
        theLogs.addEventListener('click', ()=> { modems.click(); });
    } else {
        setTimeout(() => { emptyCart(); }, 1000);
    }
} else {
    setTimeout(() => { emptyCart(); }, 1000);
}

function emptyCart() {
    login.onAuthStateChanged(user => { 		
        var shortCutFunction = 'success'; var msg = `Your cart is empty.. <br> add bank logs to cart. <hr class="hr15-bot">`; 
        toastr.options =  {closeButton: true, debug: false, newestOnTop: true, timeOut: 4000,progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null}; var $toast = toastr[shortCutFunction](msg);$toastlast = $toast; 
        setTimeout(() => { 
            window.location.assign('home'); 
        }, 5000);
	});
}





document.getElementById('balance1').innerHTML = '$5,540';
document.getElementById('balance2').innerHTML = '$6,280';
document.getElementById('balance3').innerHTML = '$6,609';
document.getElementById('balance4').innerHTML = '$6,523';
document.getElementById('balance5').innerHTML = '$7,702';
document.getElementById('balance6').innerHTML = '$6,340';
document.getElementById('balance7').innerHTML = '$8,087';
document.getElementById('balance8').innerHTML = '$5,259';
document.getElementById('balance9').innerHTML = '$5,820';

document.getElementById('balance10').innerHTML = '$6,805';
document.getElementById('balance11').innerHTML = '$7,214';
document.getElementById('balance12').innerHTML = '$6,390';
document.getElementById('balance13').innerHTML = '$5,832';
document.getElementById('balance14').innerHTML = '$6,439';
document.getElementById('balance15').innerHTML = '$6,228';
document.getElementById('balance16').innerHTML = '$7,910';
document.getElementById('balance17').innerHTML = '$5,104';
document.getElementById('balance18').innerHTML = '$6,724';
document.getElementById('balance19').innerHTML = '$5,863';
document.getElementById('balance20').innerHTML = '$5,270';

document.getElementById('balance21').innerHTML = '$6,309';
document.getElementById('balance22').innerHTML = '$5,340';
document.getElementById('balance23').innerHTML = '$4,739';

var jobs = document.getElementsByClassName('prized');
for(j=0; j< jobs.length; j++) {
    var theJob = jobs[j];
    var thePrize = theJob.parentElement.children[1].children[2].innerText;
    
    var thePr = parseFloat((thePrize.replace("$", "").replace(",", "") / 37).toFixed(0)).toLocaleString();
    theJob.innerHTML = '$'+ thePr;
}




function removeCartItem(event) {
    var buttonClicked = event.target
    var cartItem = buttonClicked.parentElement.parentElement;
    var pric = cartItem.children[4].innerText;
    var price = "Price: " + pric;
    var balanc = cartItem.children[1].children[2].innerText;
    var balance = "Balance: " + balanc;
    var account = cartItem.children[2].innerText;
    var website = cartItem.children[10].innerText;
    var image = cartItem.children[0].children[0].src;
    var info1 = cartItem.children[6].innerText;
    var info2 = cartItem.children[7].innerText;
    var info3 = cartItem.children[8].innerText;
    var info4 = cartItem.children[9].innerText;

    
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

    const bankLog = (JSON.parse(localStorage.getItem('banklogs'))[0].account);
    const bankBal = (JSON.parse(localStorage.getItem('banklogs'))[0].balance);
    const bankImg = (JSON.parse(localStorage.getItem('banklogs'))[0].image);
    var modalAmount = document.getElementById('modal-amount');

    theNos1.innerHTML =  'Cart Total: $' + total.toLocaleString();
    thetotS.innerHTML = `Total:  <span>$${total.toLocaleString()}</span>`;

    jinaHolders2.innerHTML = `
        ${bankLog} - ${bankBal}
    `;
    
    theLogo.src = `${bankImg}`;

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

    if(bankLog.includes('America')) {
        document.getElementById('bank-carousel').classList.remove('display-none');
    } else if(bankLog.includes('Chime')) {
        document.getElementById('chime-carousel').classList.remove('display-none');
    } else if(bankLog.includes('Barclays') 
        || bankLog.includes('M&T') 
        || bankLog.includes('PNC')) {
        document.getElementById('coin-carousel').classList.remove('display-none');
    } else if(bankLog.includes('BBVA') 
        || bankLog.includes('Chase') 
        || bankLog.includes('Scotia') 
        || bankLog.includes('TD') 
        || bankLog.includes('Truist')) {
        document.getElementById('ach-carousel').classList.remove('display-none');
    } else if(bankLog.includes('Citi')) {
        document.getElementById('wire-carousel').classList.remove('display-none');
    } else if(bankLog.includes('Huntington')) {
        document.getElementById('hunt-carousel').classList.remove('display-none');
    } else if(bankLog.includes('Navy')) {
        document.getElementById('navy-carousel').classList.remove('display-none');
    } else if(bankLog.includes('Wells')) {
        document.getElementById('wells-carousel').classList.remove('display-none');
    } else if(bankLog.includes('Woodforest')) {
        document.getElementById('wood-carousel').classList.remove('display-none');
    } else if(bankLog.includes('RBC')) {
        document.getElementById('paypal-carousel').classList.remove('display-none');
    }



    modalAmount.innerHTML = `
        Total:  $<span id="omanyala" class="countup"> 
        ${parseInt(total).toLocaleString()}</span>
    `;

    localStorage.setItem('banktotal',total);
}



var elemj = document.getElementById('pablos');        
var id = setInterval(frame, 1000);

if(!localStorage.getItem('timeSet')) {
    var jo = new Date();
    var po = jo.getTime();
    var p1ko = po/1000;
    var p1knoDecimalo = Math.trunc(p1ko);
    localStorage.setItem('seconds-left', p1knoDecimalo);
    localStorage.setItem('timeSet', true);
}
let width = 600;

function frame(){
    var j = new Date();
    var p = j.getTime();
    var p1k = p/1000;
    var p1knoDecimal = Math.trunc(p1k);
    var theTime = localStorage.getItem('seconds-left');
    var timeDifference = parseFloat(p1knoDecimal) - parseFloat(theTime);
    width = 600 - timeDifference;

    if(width <= 10) {
        window.location.assign('home');
    } else if(width < 200) {
        elemj.classList.add("bg-danger");
        var minutes = Math.floor(width/60); var seconds = width - minutes * 60;
        if(seconds < 10){ seconds = '0'+seconds } elemj.style.width = (width/6) + "%";
        document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}  <i class="fas fa-spin fa-sync-alt spinner-bordez"></i> `;
    } else if(width < 400) {
        elemj.classList.add("bg-warning");
        var minutes = Math.floor(width/60); var seconds = width - minutes * 60;
        if(seconds < 10){ seconds = '0'+seconds } elemj.style.width = (width/6) + "%";
        document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}  <i class="fas fa-spin fa-sync-alt spinner-bordez"></i> `;
    } else {
        var minutes = Math.floor(width/60); var seconds = width - minutes * 60;
        if(seconds < 10){ seconds = '0'+seconds } elemj.style.width = (width/6) + "%";
        document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}  <i class="fas fa-spin fa-sync-alt spinner-bordez"></i> `;
    }
}