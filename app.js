//Global Variables
var landingPage = document.querySelector('#homePage');
var buildMeeting = document.querySelector('#landingPage').querySelector('p').querySelector('span');
var div2 = document.querySelector('#div2');
var div4 = document.querySelector('#div4');
var signin = landingPage.querySelector('nav').querySelector('#signIn');
var showRoom = landingPage.querySelector('#showRoom');
var meetlink =landingPage.querySelector('#meetlink');
var dashboard = landingPage.querySelector('nav').querySelector('#dashboard');
var messages=div2.querySelector('#messages');
var messageSend=div4.querySelector('#messageSend');
var text=div4.querySelector('#message');
var file=div4.querySelector('#file')
///////////////////////////////////////////////////////////

//redirecting the user to webex page
if(window.location.href.indexOf("code") <= -1){
window.location.replace('https://webexapis.com/v1/authorize?client_id=C69b4c0c54e1b11d9e09486823ea8cd102bf8783dd1e05b57b7da182ef955d91a&response_type=code&redirect_uri=https%3A%2F%2Fmahmoudbl83.github.io%2Fmeetmanage%2F&scope=spark-admin%3Abroadworks_subscribers_write%20meeting%3Aadmin_preferences_write%20spark%3Aall%20meeting%3Aadmin_preferences_read%20analytics%3Aread_all%20meeting%3Aadmin_participants_read%20spark-admin%3Apeople_write%20spark%3Apeople_write%20spark%3Aorganizations_read%20spark-admin%3Awholesale_customers_write%20spark-admin%3Aworkspace_metrics_read%20spark-admin%3Aplaces_read%20spark-admin%3Awholesale_billing_reports_read%20spark-compliance%3Ateam_memberships_write%20spark%3Aplaces_read%20spark-compliance%3Amessages_read%20spark-admin%3Adevices_write%20spark-admin%3Aworkspaces_write%20spark%3Acalls_write%20spark-compliance%3Ameetings_write%20meeting%3Aadmin_schedule_write%20Identity%3Aone_time_password%20identity%3Aplaceonetimepassword_create%20spark-admin%3Aorganizations_write%20spark-admin%3Aworkspace_locations_read%20spark%3Adevices_write%20spark-admin%3Abroadworks_billing_reports_write%20spark%3Axapi_commands%20spark-compliance%3Awebhooks_read%20spark-admin%3Acall_qualities_read%20spark-compliance%3Amessages_write%20spark%3Akms%20spark-admin%3Awholesale_customers_read%20meeting%3Aparticipants_write%20spark-admin%3Awholesale_subscribers_read%20spark-admin%3Apeople_read%20meeting%3Aadmin_transcripts_read%20spark-compliance%3Amemberships_read%20spark-admin%3Aresource_groups_read%20meeting%3Arecordings_read%20meeting%3Aparticipants_read%20meeting%3Apreferences_write%20spark-admin%3Awholesale_billing_reports_write%20meeting%3Aadmin_recordings_read%20spark-admin%3Aorganizations_read%20spark-compliance%3Awebhooks_write%20meeting%3Atranscripts_read%20spark%3Axapi_statuses%20meeting%3Aschedules_write%20spark-compliance%3Ateam_memberships_read%20spark-admin%3Awholesale_subscribers_write%20spark-admin%3Adevices_read%20meeting%3Acontrols_read%20spark-admin%3Ahybrid_clusters_read%20spark-admin%3Aworkspace_locations_write%20spark-admin%3Abroadworks_billing_reports_read%20spark-admin%3Atelephony_config_read%20spark-admin%3Atelephony_config_write%20meeting%3Aadmin_schedule_read%20spark-admin%3Abroadworks_enterprises_write%20meeting%3Aschedules_read%20spark-compliance%3Amemberships_write%20spark-admin%3Abroadworks_enterprises_read%20spark%3Acalls_read%20spark-admin%3Aroles_read%20meeting%3Arecordings_write%20meeting%3Apreferences_read%20spark-compliance%3Ameetings_read%20spark-admin%3Aworkspaces_read%20spark%3Adevices_read%20spark-admin%3Aresource_group_memberships_read%20spark-compliance%3Aevents_read%20spark-admin%3Aresource_group_memberships_write%20spark-compliance%3Arooms_read%20spark-admin%3Abroadworks_subscribers_read%20meeting%3Acontrols_write%20spark-admin%3Ahybrid_connectors_read%20audit%3Aevents_read%20meeting%3Aadmin_recordings_write%20spark-compliance%3Ateams_read%20spark-admin%3Aplaces_write%20spark-admin%3Alicenses_read%20spark-compliance%3Arooms_write%20spark%3Aplaces_write');
}
////////////////////////////////////////////////////

//Signing In button
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
	    localStorage.setItem('reftok',y.refresh_token)
        signin.style='display:none;';
        dashboard.style='display:block;position: absolute;right:10%;cursor:pointer;background-color: #385a64;border:3px solid 777;border-radius: 40px;padding:20px;color:white;cursor: pointer;';
    } catch (error) {
        console.log(error);
    }
})

if(localStorage.getItem('storedItem')!='undefined'&&localStorage.getItem('reftok')!='undefined'){
    signin.style='display:none;'
    dashboard.style='display:block;position: absolute;right:10%;cursor:pointer;background-color: #385a64;border:3px solid 777;border-radius: 40px;padding:20px;color:white;cursor: pointer;';
}
////////////////////////////////////////////////////////////////////////////////////////////////

//when build a new meeting
buildMeeting.addEventListener('click', async function() {
    if(document.querySelector('#landingPage').querySelector('input').value.length!=0){
        let tok=localStorage.getItem('storedItem');
        if(tok!=null){
	    await fetch('https://webexapis.com/v1/rooms', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${tok}`
			},
            body:JSON.stringify({
                "isLocked": false,
                "isAnnouncementOnly": false,
                "title": document.querySelector('#landingPage').querySelector('input').value
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
                    let z=await y.json();
                    meetlink.innerHTML=`<a href='${z.meetingLink}'>انسخ الرابط</a>`;
                    if(meetlink.innerHTML!=''){
                        meetlink.removeAttribute("id");
                        meetlink.style='display: block!important;margin: 0 auto 0 auto;color: #ff735c;background-color: white;border: 4px solid #385a64;border-radius: 40px;box-shadow: 0 2px 15px rgb(0 0 0 / 10%);cursor: pointer;margin: 15px 0 10px 0;padding: 10px;'
                    }
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
        location.reload();
    }}
        else{
            document.querySelector('#landingPage').querySelector('input').style='border-radius:40px;border:4px solid red;height:40px;box-shadow: 0 2px 15px red;width:97%;height:90px;'
            setTimeout(()=> {document.querySelector('#landingPage').querySelector('input').style='border-radius:40px;border:4px solid #777;height:90px;box-shadow: 0 2px 15px rgb(0 0 0 / 10%);width:97%;'},200)
        }
})
//////////////////////////////////////////////////////////////////////////////////////////////////

//going to dashboard
dashboard.addEventListener('click',async()=>{
    landingPage.style='display:none;';
    document.querySelector('#roomsec').style='display:flex;flex-wrap:wrap;justify-content:center;align-items:center;height:100%;width:100%;background-color:#ececec;';
    let x=await fetch('https://webexapis.com/v1/rooms?sortBy=created&max=1000',{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('storedItem')}`
        }
    })
    try{
    let y=await x.json();
    for(i=0;i<y.items.length;i++){
        let z=document.createElement('div');
        z.setAttribute('id',`roomcard${i+1}`);
        z.innerHTML=`<span>${y.items[i].title}<br></span><span>${y.items[i].created.substr(0,10)}<br></span><article class=${i+1}>تحكم في الغرفة<br></article><footer class=${i+1}>انضم الي الفيديو</footer>`
        document.querySelector('#roomsec').appendChild(z)
        localStorage.setItem(`roomid${i+1}`,y.items[i].id);
    }
    let controls=document.querySelector('#roomsec').querySelectorAll('article');
    let joinings=document.querySelector('#roomsec').querySelectorAll('footer');
    for(i=0;i<controls.length;i++){
        //let ids=localStorage.getItem(`roomid${i+1}`);
        controls[i].addEventListener('click',(evt)=>{
        document.querySelector('#roomsec').style='display:none;';
        div2.style='display:flex;justify-content: center;align-content: center;background-color:#ececec;height:100vh;flex-wrap:wrap;width:100%;';
        let num=evt.target.classList.value;
        let activeid=localStorage.getItem(`roomid${num}`);
        localStorage.setItem('activeid',activeid);
        }
        )
    }
    //joining the meeting
    for(i=0;i<y.items.length;i++){
        joinings[i].addEventListener('click',(evt)=>{
            let num=evt.target.classList.value;
            let activeid=localStorage.getItem(`roomid${num}`);
            let res=await fetch(`https://webexapis.com/v1/rooms/${activeid}/meetinginfo`)
            res.json();
            let link=res.meetingLink;
            location.replace(meetingLink);
        })
    }
}
	catch(err){
		let x=await fetch('https://webexapis.com/v1/access_token',{
	method:'POST',
        headers:{
             'Content-Type':'application/json',
             'Accept': 'application/json'
        },
        body:JSON.stringify({
            "grant_type":"refresh_token",
            "client_id":"C69b4c0c54e1b11d9e09486823ea8cd102bf8783dd1e05b57b7da182ef955d91a",
            "client_secret":"5ae102737a6d367cbc6eb40696c2c12b2d078eee328a0ba7046f9deab2474be6",
            "refresh_token":`${localStorage.getItem('reftok')}`
        })
})
		x.json();
		console.log(x);
	}
})
///////////////////////////////////////////////////////////////////////////////////////

//backing to home-page
div2.querySelector('#back').addEventListener('click',()=>{
    document.querySelector('#roomsec').style='display:flex;flex-wrap:wrap;justify-content:center;align-items:center;height:100%;width:100%;background-color:#ececec;';
    div2.style='display:none';
})
///////////////////////////////////////////////////////////////////////////////////////

/*MESSAGES SECTION*/

//going to messages section
messages.addEventListener('click',()=>{
    div2.style='display:none;';
    document.querySelector('#msgsec').style='display:flex;height:100vh;width:100%;justify-content:center;align-items:center;background-color:azure;flex-wrap:wrap';
})

//sendmessages and delet messages
document.querySelector('#delmsg').addEventListener('click',()=>{
    document.querySelector('#msgsec').style='display:none;';
    div4.style='display:flex;flex-wrap:wrap;height:100vh;width:100%;background-color:azure;justify-content:center;align-items:center;';
})

//sending message to the room
messageSend.addEventListener('click',async()=>{
    let tok=localStorage.getItem('storedItem');
    let id=localStorage.getItem('roomId');
    let res=await fetch('https://webexapis.com/v1/messages',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${tok}`
        },
        body:JSON.stringify({
            'roomId':localStorage.getItem('activeid'),
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

//backing to dashboard
div4.querySelector('.back2').addEventListener('click',()=>{
    //div2.style='display:flex;justify-content: center;align-items: center;background-color:azure;height:100vh';
    document.querySelector('#msgsec').style='display:flex;height:100vh;width:100%;justify-content:center;align-items:center;background-color:azure;flex-wrap:wrap;';
    div4.style='display:none';
})

//to delet last message sent
div4.querySelector('#deletmessage').addEventListener('click',()=>{
    let x=localStorage.getItem('messageid');
    let tok=localStorage.getItem('storedItem');
    fetch(`https://webexapis.com/v1/messages/${x}`,{
        method:'DELETE',
        headers:{
            'Authorization':`Bearer ${tok}`
        }
    })
})
///////////////////////////////////////////

/*MEETING SECTION*/
document.querySelector('#showmsg').addEventListener('click',async()=>{
   let res= await fetch(`https://webexapis.com/v1/messages?roomId=${localStorage.getItem('activeid')}&max=100`,{
       method:'GET',
       headers:{
           'Authorization':`Bearer ${localStorage.getItem('storedItem')}`
       }
   })
   let res2=await res.json();
   document.querySelector('#listmsg').style='display:flex;flex-wrap:wrap;height:100%;width:100%;justify-content:center;align-content:center;background-color:azure;';
   document.querySelector('#msgsec').style='display:none;';
   for(i=0;i<res2.items.length;i++){
    let newelm=document.createElement('div');
    newelm.style='display:block;width:260px;height:fit-content;font-size: 3rem;color:red;background-color:white;box-shadow: 0 2px 15px rgb(0 0 0 / 10%);border-radius: 20px;border:4px solid #777;text-align: center;margin:0 20px 20px 20px;';
    newelm.innerHTML=`${res2.items[i].text}`;
    document.querySelector('#listmsg').appendChild(newelm);
   }
})

document.querySelector('#listmsg').querySelector('.back2').addEventListener('click',()=>{
    document.querySelector('#listmsg').style='display:none';
    document.querySelector('#msgsec').style='display: flex; height: 100vh; width: 100%; justify-content: center; align-items: center; background-color: azure; flex-wrap: wrap;';
})

document.querySelector('#roomsec').querySelector('.back2').addEventListener('click',()=>{
    document.querySelector('#roomsec').style='display:none;';
    landingPage.style='height:100vh;width:100vw;';
})

///////////////////////////////////////////////////////////////////////////////////
