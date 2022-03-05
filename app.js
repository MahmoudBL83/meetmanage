//Global Variables

var buildMeeting = document.querySelector('#sec1').querySelector('p').querySelector('span');
var manageMeeting = document.querySelector('#div1').querySelector('nav').querySelector('#l21');
var landingPage = document.querySelector('#div1');
var token = document.querySelector('#sec2').querySelector('#token').value;
var login = document.querySelector('#sec2').querySelector('#login');
var div2 = document.querySelector('#div2');
var div3 = document.querySelector('#div3');
var div4 = document.querySelector('#div4');
var signup = landingPage.querySelector('nav').querySelector('#l22');
var signin = landingPage.querySelector('nav').querySelector('#l23');
var showRoom = landingPage.querySelector('#showRoom');
///////////////////////////////////////////////////////////

//when build a new meeting
buildMeeting.addEventListener('click', async function() {
    if(document.querySelector('#sec1').querySelector('input').value.length!=0){
	await fetch(`https://webexapis.com/v1/rooms`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer MTljZGU2YWQtMTJiMC00NmU0LTllMmEtYzhhOTU2YWQ0NjFiMTFlOGU0YzQtN2Mz_PE93_ce18e2be-477f-4d73-9e52-e31d6e3cea71'
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
                    'Authorization': 'Bearer MTljZGU2YWQtMTJiMC00NmU0LTllMmEtYzhhOTU2YWQ0NjFiMTFlOGU0YzQtN2Mz_PE93_ce18e2be-477f-4d73-9e52-e31d6e3cea71'
                }})
                try {
                    let res2=await x.json();
                    console.log(res2);
                    return res2.items[0].id;
                } catch (error) {
                    console.log(error);
                }
		})
        .then(async function(res){
            console.log(res);
            let y = await fetch(`https://webexapis.com/v1/rooms/${res}/meetingInfo`,{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer MTljZGU2YWQtMTJiMC00NmU0LTllMmEtYzhhOTU2YWQ0NjFiMTFlOGU0YzQtN2Mz_PE93_ce18e2be-477f-4d73-9e52-e31d6e3cea71'
                }})
                try {
                    let z=await y.json()
                    location.replace(z.meetingLink);
                } catch (error) {
                    console.log(error);
                }
        })
        .catch(err=>{
            alert(err);
            location.reload();
        })}
        else{
            document.querySelector('#sec1').querySelector('input').style='border-radius:40px;border:4px solid red;height:40px;box-shadow: 0 2px 15px red;width:97%;height:90px;'
            setTimeout(()=> {document.querySelector('#sec1').querySelector('input').style='border-radius:40px;border:4px solid #777;height:90px;box-shadow: 0 2px 15px rgb(0 0 0 / 10%);width:97%;'},200)
        }
})
//////////////////////////////////////////////////////////////////////////////////////////////////

//Signing Up
signup.addEventListener('click',()=>{
    window.location.replace('https://webexapis.com/v1/authorize?client_id=C69b4c0c54e1b11d9e09486823ea8cd102bf8783dd1e05b57b7da182ef955d91a&response_type=code&redirect_uri=https%3A%2F%2Fmahmoudbl83.github.io%2Fmeetmanage%2F&scope=spark-admin%3Abroadworks_subscribers_write%20meeting%3Aadmin_preferences_write%20spark%3Aall%20meeting%3Aadmin_preferences_read%20analytics%3Aread_all%20meeting%3Aadmin_participants_read%20spark-admin%3Apeople_write%20spark%3Apeople_write%20spark%3Aorganizations_read%20spark-admin%3Awholesale_customers_write%20spark-admin%3Aworkspace_metrics_read%20spark-admin%3Aplaces_read%20spark-admin%3Awholesale_billing_reports_read%20spark-compliance%3Ateam_memberships_write%20spark%3Aplaces_read%20spark-compliance%3Amessages_read%20spark-admin%3Adevices_write%20spark-admin%3Aworkspaces_write%20spark%3Acalls_write%20spark-compliance%3Ameetings_write%20meeting%3Aadmin_schedule_write%20Identity%3Aone_time_password%20identity%3Aplaceonetimepassword_create%20spark-admin%3Aorganizations_write%20spark-admin%3Aworkspace_locations_read%20spark%3Adevices_write%20spark-admin%3Abroadworks_billing_reports_write%20spark%3Axapi_commands%20spark-compliance%3Awebhooks_read%20spark-admin%3Acall_qualities_read%20spark-compliance%3Amessages_write%20spark%3Akms%20spark-admin%3Awholesale_customers_read%20meeting%3Aparticipants_write%20spark-admin%3Awholesale_subscribers_read%20spark-admin%3Apeople_read%20meeting%3Aadmin_transcripts_read%20spark-compliance%3Amemberships_read%20spark-admin%3Aresource_groups_read%20meeting%3Arecordings_read%20meeting%3Aparticipants_read%20meeting%3Apreferences_write%20spark-admin%3Awholesale_billing_reports_write%20meeting%3Aadmin_recordings_read%20spark-admin%3Aorganizations_read%20spark-compliance%3Awebhooks_write%20meeting%3Atranscripts_read%20spark%3Axapi_statuses%20meeting%3Aschedules_write%20spark-compliance%3Ateam_memberships_read%20spark-admin%3Awholesale_subscribers_write%20spark-admin%3Adevices_read%20meeting%3Acontrols_read%20spark-admin%3Ahybrid_clusters_read%20spark-admin%3Aworkspace_locations_write%20spark-admin%3Abroadworks_billing_reports_read%20spark-admin%3Atelephony_config_read%20spark-admin%3Atelephony_config_write%20meeting%3Aadmin_schedule_read%20spark-admin%3Abroadworks_enterprises_write%20meeting%3Aschedules_read%20spark-compliance%3Amemberships_write%20spark-admin%3Abroadworks_enterprises_read%20spark%3Acalls_read%20spark-admin%3Aroles_read%20meeting%3Arecordings_write%20meeting%3Apreferences_read%20spark-compliance%3Ameetings_read%20spark-admin%3Aworkspaces_read%20spark%3Adevices_read%20spark-admin%3Aresource_group_memberships_read%20spark-compliance%3Aevents_read%20spark-admin%3Aresource_group_memberships_write%20spark-compliance%3Arooms_read%20spark-admin%3Abroadworks_subscribers_read%20meeting%3Acontrols_write%20spark-admin%3Ahybrid_connectors_read%20audit%3Aevents_read%20meeting%3Aadmin_recordings_write%20spark-compliance%3Ateams_read%20spark-admin%3Aplaces_write%20spark-admin%3Alicenses_read%20spark-compliance%3Arooms_write%20spark%3Aplaces_write');
    console.log('hello');
})

if(window.location.href.indexOf("code") > -1){
    signup.style='display:none;'
}

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
    try {
        let y =await x.json();  
        console.log(y);  
        let acctoken= y.access_token;
        console.log(acctoken);
        signin.style='display:none;';
    } catch (error) {
        console.log(error);
    }
    await fetch('http://localhost:8000/tokens',{
        method:'POST',
        headers: {
			'Content-Type': 'application/json'
		},
        body:JSON.stringify({
            token:acctoken
        })
    })
})
////////////////////////////////////////////////////////////////////////////////////////////////



