//Global Variables

var buildMeeting = document.querySelector('#sec1').querySelector('p').querySelector('span');
var manageMeeting = document.querySelector('#div1').querySelector('nav').querySelector('#l21');
var landingPage = document.querySelector('#div1');
var div2 = document.querySelector('#div2');
var div3 = document.querySelector('#div3');
var div4 = document.querySelector('#div4');
var signup = landingPage.querySelector('nav').querySelector('#l22');
var signin = landingPage.querySelector('nav').querySelector('#l23');
var showRoom = landingPage.querySelector('#showRoom');
var meetlink =landingPage.querySelector('#meetlink');
var dashboard = landingPage.querySelector('nav').querySelector('#dashboard');
var messages=div2.querySelector('#messages');
var messageSend=div4.querySelector('#messageSend');
var text=div4.querySelector('#message');
var file=div4.querySelector('#file')
///////////////////////////////////////////////////////////



//Signing Up
signup.addEventListener('click',async()=>{
    signup.style='display:none;';
    signup.removeAttribute("id");
})
/*
if(window.location.href.indexOf("code") > -1){
    signup.style='display:none;';
}*/

//Signing In
signin.addEventListener('click',async()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    //send the code to webex to get access token
    let x=await fetch('https://webexapis.com/v1/access_token',{
        method:'POST',
        headers:{
             'Content-Type':'application/json',
             'Accept': 'application/json'
        },
        body:JSON.stringify({
            "grant_type":"authorization_code",
            "client_id":"C69b4c0c54e1b11d9e09486823ea8cd102bf8783dd1e05b57b7da182ef955d91a",
            "client_secret":"5ae102737a6d367cbc6eb40696c2c12b2d078eee328a0ba7046f9deab2474be6",
            "code":code,
            "redirect_uri":"https://mahmoudbl83.github.io/meetmanage/"
        })
    })
    //save the access token of the user
    try {
        let y =await x.json();    
        let acctoken= y.access_token;
        localStorage.setItem('storedItem',acctoken);
        console.log(acctoken);
        signin.style='display:none;';
        dashboard.style='display:block;position: absolute;right:10%;cursor:pointer;background-color: green;border:3px solid 777;border-radius: 40px;padding:20px;color:white;cursor: pointer;';
    } catch (error) {
        console.log(error);
    }
})
////////////////////////////////////////////////////////////////////////////////////////////////

//when build a new meeting
buildMeeting.addEventListener('click', async function() {
    if(document.querySelector('#sec1').querySelector('input').value.length!=0){
        let tok=localStorage.getItem('storedItem');
        localStorage.setItem('temptok',tok)
        localStorage.removeItem('storedItem')
        if(tok!=null&&signin.style.display=='none'){
	    await fetch('https://webexapis.com/v1/rooms', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${tok}`
			},
            body:JSON.stringify({
                "isLocked": false,
                "isAnnouncementOnly": false,
                "title": document.querySelector('#sec1').querySelector('input').value
            })
		})
		.then(async() => {
             let x= await fetch('https://webexapis.com/v1/rooms?sortBy=created&max=100',{
                 method:'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${tok}`
                }})
                try {
                    let res2=await x.json();
                    localStorage.setItem('roomId',res2.items[0].id)
                    return res2.items[0].id;
                } catch (error) {
                    console.log(error);
                }
		})
        .then(async function(res){
            let y = await fetch(`https://webexapis.com/v1/rooms/${res}/meetingInfo`,{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tok}`
                }})
                try {
                    let z=await y.json()
                    meetlink.innerHTML=`<a href='${z.meetingLink}'>انسخ الرابط</a>`;
                } catch (error) {
                    console.log(error);
                }
        })
        .catch(err=>{
            alert(err);
            location.reload();
        })}
    else{
        alert('Please, login first');
    }}
        else{
            document.querySelector('#sec1').querySelector('input').style='border-radius:40px;border:4px solid red;height:40px;box-shadow: 0 2px 15px red;width:97%;height:90px;'
            setTimeout(()=> {document.querySelector('#sec1').querySelector('input').style='border-radius:40px;border:4px solid #777;height:90px;box-shadow: 0 2px 15px rgb(0 0 0 / 10%);width:97%;'},200)
        }
})

//////////////////////////////////////////////////////////////////////////////////////////////////

//dashboard
dashboard.addEventListener('click',()=>{
    landingPage.style='display:none;';
    div2.style='display:flex;justify-content: center;align-items: center;background-color:azure;height:100vh';
})

div2.querySelector('#back').addEventListener('click',()=>{
    landingPage.style='display:block;height:100vh;width:100vw;';
    div2.style='display:none';
})

messages.addEventListener('click',()=>{
    div2.style='display:none;';
    div4.style='display:flex;height:100vh;width:100vw;justify-content:center;align-items:center;';
})

messageSend.addEventListener('click',async()=>{
    let tok=localStorage.getItem('temptok');
    let id=localStorage.getItem('roomId');
    await fetch('https://webexapis.com/v1/messages',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${tok}`
        },
        body:JSON.stringify({
            'roomId':id,
            'text':text.value,
        })
    })
    let res=await fetch('https://webexapis.com/v1/messages',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${tok}`
        },
        body:JSON.stringify({
            'roomId':id,
            'text':text.value,
        })
    })
    try{
        let u=await res.json();
        localStorage.setItem('messageid',u.id)
    }
    catch(err){
        console.log(err);
    }
})

div4.querySelector('#back2').addEventListener('click',()=>{
    div2.style='display:flex;justify-content: center;align-items: center;background-color:azure;height:100vh';
    div4.style='display:none';
})

//to delet las message sent
div4.querySelector('#deletmessage').addEventListener('click',()=>{
    let x=localStorage.getItem('messageid');
    let tok=localStorage.getItem('temptok');
    fetch(`https://webexapis.com/v1/messages/${x}`,{
        method:'DELETE',
        headers:{
            'Authorization':`Bearer ${tok}`
        }
    })
})





