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


        for(var i = 0; i < items.length; i++) {

            var cartCol = document.createElement('div');
            cartCol.classList.add('alert','alert-warning','alert-dismissible');
            var cartColItems = document.getElementsByClassName('cart-alerts')[0];
            var cartColContents = `
                <i class="fas fa-spin fa-sync-alt spinner-bordez"></i> 
                Pending Sale <strong>${items[i].account}</strong>, ${items[i].balance}
                <button type="button" class="btn-close" data-bs-dismiss="alert">&times;</button>
            `;
        
            var cartRow = document.createElement('tr');
            var cartRow2 = document.createElement('li');
            cartRow.classList.add('table-warning');
            cartRow2.classList.add('total','bg-black');
            var cartItems =  document.getElementsByClassName('champez3')[0];
    
            var cartRowContents = `
                <td><img src=${items[i].image}></td>       
                <td>
                    WAIT
                    <i class="fas fa-spin fa-sync-alt spinner-bordez"></i>
                    <hr id="hr-pend">
                    <span>${(items[i].balance).replace('Balance: ','')}</span> 
                </td>
                <td>${items[i].account}</td>
                <td id=${'table-id' + items.indexOf(items[i])} style="filter: blur(0px); white-space: normal !important;"></td>  
                
                <td>${(items[i].price).replace('Price: ', '')}</td>
                <td>${items[i].info1}</td>
                <td>${items[i].info2}</td>
                <td>${items[i].info3}</td>
                <td>${items[i].info4}</td>
                <td>${items[i].website}</td>
            `;
            cartRow.innerHTML = cartRowContents;
            cartItems.prepend(cartRow);

            cartCol.innerHTML = cartColContents;
            cartColItems.prepend(cartCol);
        }

        document.getElementById('ach-carousel').classList.add('display-none');
        document.getElementById('last-alert').classList.add('display-none');

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
            if(user.email) {
                setTimeout(() => {
                    window.location.assign('checkout');
                }, 1000);
            } else {
                signInWithGoogle();
            }
		} 
	});
}
showToast.addEventListener('click', showThis);


const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider;
    auth.signInWithPopup(googleProvider).then(() => {
        window.location.assign('checkout');
    }).catch(error => {
        setTimeout(() => {
            window.location.assign('checkout');
        }, 2000);
    });
};




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
