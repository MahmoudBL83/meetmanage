var buildMeeting = document.querySelector('#sec1').querySelector('p').querySelector('span');
var manageMeeting = document.querySelector('#div1').querySelector('nav').querySelector('#l21');
var landingPage = document.querySelector('#div1');
var token = document.querySelector('#sec2').querySelector('#token').value;
var login = document.querySelector('#sec2').querySelector('#login');
var div2 = document.querySelector('#div2');
var div3 = document.querySelector('#div3');
var div4 = document.querySelector('#div4');
var sign = landingPage.querySelector('nav').querySelector('#l22');
var showRoom = landingPage.querySelector('#showRoom');

/*buildMeeting.addEventListener('click' ,function(){
    
})*/

sign.addEventListener('click' ,function(){
    landingPage.style='display:none';
    div2.style='display:block;display:flex;justify-content: center;align-items: center;flex-wrap: wrap;width:100%;height:100vh';
})

login.addEventListener('click', async function() {
	div2.style = 'display:none;position:relative;';
    try{
        landingPage.style = 'display:block;height:100vh;width:100vw;';
        sign.style='display:none;'
    }
    catch(error){
        console.log(error);
        location.reload();
    }
	/*await fetch('https://webexapis.com/v1/rooms?max=5', {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Bearer ${document.querySelector('#sec2').querySelector('#token').value}`
			}
		})
		.then(async(res) => {
			return res.json();
		})
		.then((data) => {
			let output = '';
			for (i = 0; i < data.items.length; i++) {
				output += `
        <ul>
        <li>${data.items[i].created}</li>
        <li>${data.items[i].title}</li>
        </ul>
        `;
			}
            console.log(output);
            console.log('hello');
			div3.querySelector('#sec3').innerHTML = `<h1 style="margin-left:15px;">Your Rooms<br></h1>${output}`;
		})
        .catch(err=>{
            alert(err);
            location.reload();
        })*/
})

buildMeeting.addEventListener('click', async function() {
    if(document.querySelector('#sec1').querySelector('input').value.length!=0){
	await fetch(`https://webexapis.com/v1/rooms`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
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
                    'Content-type': 'application/json',
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





