function showPage(page){

document.querySelectorAll("body > div").forEach(d=>{
d.classList.add("hidden")
})

document.getElementById(page).classList.remove("hidden")

}

let map = L.map('map').setView([10.3157,123.8854],13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map)

let marker

map.on('click',function(e){

if(marker) map.removeLayer(marker)

marker = L.marker(e.latlng).addTo(map)

})

function submitLead(){

let name=document.getElementById("name").value
let phone=document.getElementById("phone").value
let address=document.getElementById("address").value
let plan=document.getElementById("plan").value

let leads=JSON.parse(localStorage.getItem("leads")||"[]")

leads.push({
name,
phone,
address,
plan,
status:"Application Received"
})

localStorage.setItem("leads",JSON.stringify(leads))

alert("Application Submitted")

loadDashboard()

}

function track(){

let phone=document.getElementById("trackPhone").value

let leads=JSON.parse(localStorage.getItem("leads")||"[]")

let found=leads.find(l=>l.phone===phone)

if(found){

document.getElementById("trackResult").innerHTML=
`Status: ${found.status}`

}else{

document.getElementById("trackResult").innerHTML="No record found"

}

}

function generatePromo(){

let canvas=document.getElementById("poster")
let ctx=canvas.getContext("2d")

ctx.fillStyle="#2563eb"
ctx.fillRect(0,0,400,400)

ctx.fillStyle="white"
ctx.font="20px Arial"

ctx.fillText("CONVERGE FIBER",100,80)
ctx.fillText("UP TO 800 Mbps",100,120)

let name=document.getElementById("agentName").value
let phone=document.getElementById("agentPhone").value

ctx.fillText(name,100,200)
ctx.fillText(phone,100,240)

}

function generateQR(){

let link="https://fiberagent.ph/"+document.getElementById("agentLink").value

document.getElementById("qrcode").innerHTML=""

new QRCode(document.getElementById("qrcode"),{
text:link,
width:200,
height:200
})

}

function loadDashboard(){

let leads=JSON.parse(localStorage.getItem("leads")||"[]")

document.getElementById("leadCount").innerText=leads.length

let list=""

leads.forEach(l=>{

list+=`
<div class="bg-white p-2 mt-2 shadow">
${l.name} - ${l.plan}
<br>
${l.phone}
</div>
`

})

document.getElementById("leadList").innerHTML=list

}

loadDashboard()