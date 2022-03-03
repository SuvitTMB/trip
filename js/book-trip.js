var Eid="";
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });



$(document).ready(function () {
	//alert(sessionStorage.getItem("EmpID"));
	var str = "";
	if(sessionStorage.getItem("LineID")==null) { location.href = 'ba-trip.html'; }
	str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
	//str += '<div class="NameLine">'+ sessionStorage.getItem("LineName") +'</div>';
	str += '<div class="text-name"><b>คุณ'+ sessionStorage.getItem("EmpName") +'</b></div>';
	$("#MyProfile").html(str);  

	Connect_DB();
});



function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbProfile = firebase.firestore().collection("CheckProfile");
  dbTripPrudential = firebase.firestore().collection("TripPrudential");
  CheckTripPrudential();
}



function CheckTripPrudential() {
  var str = "";
  dbTripPrudential.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID")))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
		Eid = doc.id;
		sessionStorage.setItem("EmpName", doc.data().EmpName);
		sessionStorage.setItem("EmpPosition", doc.data().EmpPosition);
		sessionStorage.setItem("EmpBranch", doc.data().EmpBranch);
		sessionStorage.setItem("EmpZone", doc.data().EmpZone);
		sessionStorage.setItem("EmpRH", doc.data().EmpRH);
		sessionStorage.setItem("ConfirmTrip", doc.data().ConfirmTrip);
		if(doc.data().ConfirmTrip==0) {
			document.getElementById('Loading').style.display='none';
			document.getElementById('ShowTrip').style.display='block';
			document.getElementById('ShowResult').style.display='none';
		} else {
			str += '<div class="btn-t9" style="margin-top:-10px;cursor: none;">ยืนยันการทำรายการของคุณ</div>';
			str += '<div style="margin-top:20px;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
			str += '<div class="text-name"><b>คุณ'+sessionStorage.getItem("EmpName")+'</b><br>'+sessionStorage.getItem("EmpBranch")+'';
			str += '<br>'+sessionStorage.getItem("EmpZone")+'<br>'+sessionStorage.getItem("EmpRH")+'';
			str += '</div>';

			if(doc.data().ConfirmTrip==1) {
				str += '<div class="btn-t8" style="margin:15px 0;">ระบบได้ยืนยันการเข้าร่วม<br>ทริปเนเธอร์แลนด์ของคุณ<br>เรียบร้อยแล้ว</div>';
				str += '<div>ทำรายการเมื่อ : '+doc.data().DateConfirm+'</div>';
			} else if(doc.data().ConfirmTrip==2) { 
				str += '<div class="btn-t7" style="margin:15px 0;">ระบบได้ยืนยันการไม่เข้าร่วม<br>ทริปเนเธอร์แลนด์ของคุณ<br>เรียบร้อยแล้ว</div>';
				str += '<div class="text-notrip">คุณจะได้รับเงินคืน 70% ของทริปท่องเที่ยว และจะนำรายได้นี้ไปคำนวณเพื่อเสียภาษีเงินได้ของคุณต่อไป</div>';
				str += '<div>ทำรายการเมื่อ : '+doc.data().DateConfirm+'</div>';
			}
    		$("#DisplayResultTrip").html(str);  
			document.getElementById('Loading').style.display='none';
			document.getElementById('ShowTrip').style.display='none';
			document.getElementById('ShowResult').style.display='block';
		}
    });
  });
}




function SendAnswer() {
    NewDate();
	var str = "";
	var sSendAnswer = "";
    var TimeStampDate = Math.round(Date.now() / 1000);
	sSendAnswer = document.querySelector('input[name="SendAnswer"]:checked').value;
	if(sSendAnswer==null) {
		alert("กรุณาเลือกรายการก่อนบันทึกรายการ");
	} else {
		dbTripPrudential.doc(Eid).update({
			LineID : sessionStorage.getItem("LineID"),
			LineName : sessionStorage.getItem("LineName"),
			LinePicture : sessionStorage.getItem("LinePicture"),
			ConfirmTrip : parseInt(sSendAnswer),
			DateConfirm : dateString,
			DateTimeStamp : TimeStampDate
		});     
		if(sSendAnswer==1) {
			str += '<div class="btn-t9" style="margin-top:20px;cursor: none;">ยืนยันการทำรายการของคุณ</div>';
			str += '<div class="text-name"><b>'+sessionStorage.getItem("EmpName")+'</b><br>'+sessionStorage.getItem("EmpBranch")+'';
			str += '<br>'+sessionStorage.getItem("EmpZone")+'<br>'+sessionStorage.getItem("EmpRH")+'';
			str += '</div>';
			str += '<div class="btn-t8" style="margin:15px 0;">ระบบได้ยืนยันการเข้าร่วม<br>ทริปเนเธอร์แลนด์ของคุณ<br>เรียบร้อยแล้ว</div>';
			str += '<div>ทำรายการเมื่อ : '+dateString+'</div>';
		} else if(sSendAnswer==2) { 
			str += '<div class="btn-t9" style="margin-top:20px;cursor: none;">ยืนยันการทำรายการของคุณ</div>';
			str += '<div class="text-name"><b>'+sessionStorage.getItem("EmpName")+'</b><br>'+sessionStorage.getItem("EmpBranch")+'';
			str += '<br>'+sessionStorage.getItem("EmpZone")+'<br>'+sessionStorage.getItem("EmpRH")+'';
			str += '</div>';
			str += '<div class="btn-t7" style="margin:15px 0;">ระบบได้ยืนยันการไม่เข้าร่วม<br>ทริปเนเธอร์แลนด์ของคุณ<br>เรียบร้อยแล้ว</div>';
			str += '<div class="text-notrip">คุณจะได้รับเงินคืน 70% ของทริปท่องเที่ยว และจะนำรายได้นี้ไปคำนวณเพื่อเสียภาษีเงินได้ของคุณต่อไป</div>';
			str += '<div>ทำรายการเมื่อ : '+dateString+'</div>';
		}
    	$("#DisplayResult").html(str);  
    	CheckTripPrudential();
		document.getElementById('id01').style.display='block';
	}
}


function buttonRemove() {
  var element = document.getElementById("SendAns");
  element.classList.remove("btn-t0");
  var element = document.getElementById("SendAns");
  element.classList.add("btn-t1");
}


function CloseAll() {
	document.getElementById('id01').style.display='none';
}



function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}

