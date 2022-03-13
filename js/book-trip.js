var Eid="";
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });



$(document).ready(function () {
	//alert(sessionStorage.getItem("EmpID"));
	if(sessionStorage.getItem("LineID")==null) { location.href = 'ba-trip.html'; }
	//var str = "";
	//str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
	//str += '<div class="text-name"><b>คุณ'+ sessionStorage.getItem("EmpName") +'</b></div>';
	//$("#MyProfile").html(str);  
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
  WelcomeTrip();
}


var checkapp = 0;
function WelcomeTrip() {
  dbTripPrudential.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID")))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
    	checkapp = 1;
		document.getElementById('Loading').style.display='none';
		document.getElementById('StopApp').style.display='none';
		if(doc.data().ConfirmTrip==0) {
			document.getElementById('WelcomeTrip').style.display='block';
		} else {
			document.getElementById('WelcomeTrip').style.display='none';
			CheckTripPrudential();
		}
    });
    if(checkapp==0) {
		document.getElementById('Loading').style.display='none';
		document.getElementById('StopApp').style.display='block';
    }
  });
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
		var str1 = "";
		str1 += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
		str1 += '<div class="text-name"><b>คุณ'+ sessionStorage.getItem("EmpName") +'</b></div>';
		$("#MyProfile").html(str1);  

		if(doc.data().ConfirmTrip==0) {
			document.getElementById('Loading').style.display='none';
			document.getElementById('WelcomeTrip').style.display='none';
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
				str += '<div class="text-notrip" style="font-size: 11px; color:#002d63;text-align:left;">';
				str += '<ul style="margin-left:-30px;">';
				str += '<li>ทริปประเทศเนเธอแลนด์-เบลเยี่ยม เดินทางช่วงเดือนพฤษภาคม - มิถุนายน 2565</li>';
				str += '<li>ผู้ได้รับรางวัลต้องคงสภาพการเป็นพนักงาน ttb จนถึงวันเดินทาง</li>';
				str += '<li>ผู้ได้รับรางวัลจะต้องมีพาสปอร์ตที่มีอายุการใช้งานเหลือไม่น้อยกว่า 6 เดือน นับจากวันเดินทางกลับ </li>';
				str += '<li>ผู้ได้รับรางวัลจะต้องรับผิดชอบค่าใช้จ่ายอื่นๆ ที่เกี่ยวข้องด้วยตนเอง เช่น ค่าทำพาสปอร์ต , ค่าเดินทางมาทำวีซ่า , ค่าเดินทางมาเข้าร่วมทริป , ค่าใช้จ่ายส่วนตัวระหว่างทริป , ค่าตรวจโควิด-19 (ถ้ามี) </li>';
				str += '<li>นระหว่างทริป หากเกิดอาการป่วย บาดเจ็บ ติดโควิด-19 หรือด้วยสาเหตุอื่นๆ ซึ่งมีความจำเป็นต้องรับการตรวจหรือรักษาที่ต่างประเทศ ผู้ได้รับรางวัลต้องรับผิดชอบค่าใช้จ่ายที่เกิดขึ้นทั้งหมด ที่เกินจากค่าประกันสุขภาพและประกันอุบัติเหตุที่ได้ทำไว้ระหว่างการเดินทาง เช่น ค่าเดินทางในการส่งตัวเข้ารับการรักษา  , ค่าตั๋วเครื่องบินขากลับ , ค่าใช้จ่ายส่วนตัวและอื่นๆ ที่เกี่ยวข้อง</li>';
				str += '<li>ขอสงวนสิทธิ์ยกเลิกการจัดทริป กรณีมีผู้ตอบรับการเข้าร่วมไม่ถึง 40 ท่าน</li>';
				str += '<li>พรูเด็นเชียลประกันชีวิตจะเป็นผู้รับผิดชอบภาษีเงินได้ ตามฐานเงินเดือนของพนักงาน</li>';
				str += '<li>ภายหลังยืนยันการเข้าร่วมแล้ว กรณีไม่สามารถเดินทางได้เนื่องจากเหตุสุดวิสัยในช่วงก่อนเดินทาง เช่น ติดโควิด-19 , ติดภารกิจสำคัญ , ตั้งครรภ์ ขอสงวนสิทธิ์การเปลี่ยนแปลงก่อนการเดินทาง 1 เดือน กรณีที่แจ้งขอเปลี่ยนหลังจากนี้ไม่สามารถรับเงินคืนเป็นเงินสดและไม่สามารถเปลี่ยนผู้เดินทางได้</li>';
				str += '</ul></div>';
				str += '<div>ทำรายการเมื่อ : '+doc.data().DateConfirm+'</div>';
			} else if(doc.data().ConfirmTrip==2) { 
				str += '<div class="btn-t7" style="margin:15px 0;">ระบบได้ยืนยันการไม่เข้าร่วม<br>ทริปท่องเที่ยวต่างประเทศ<br>ของคุณ<br>เรียบร้อยแล้ว</div>';
				str += '<div class="text-notrip">คุณจะได้รับเงินคืน 70% ของทริปท่องเที่ยว และจะนำรายได้นี้ไปคำนวณเพื่อเสียภาษีเงินได้ของคุณต่อไป</div>';
				str += '<div class="text-notrip" style="font-size: 11px; color:#002d63;text-align:left;">';
				str += '<ul style="margin-left:-30px;">';
				str += '<li>ขอรับรางวัลเป็นเงิน 70% ของมูลค่าทริป (มูลค่าทริป 85,000 x 70% = 59,500 บาท)</li>';
				str += '<li>เงินรางวัลจะโอนเข้าบัญชีพนักงานในรอบเดือนพฤษภาคม 2565</li>';
				str += '<li>เงินรางวัลจะถูกนำไปคำนวณเป็นรายได้ประจำปีและจะต้องเสียภาษีเงินได้ตามฐานเงินเดือนของพนักงาน</li>';
				str += '<li>กรณียืนยันการรับเป็นเงิน 70% แล้วจะไม่สามารถ เปลี่ยนแปลงขอเข้าร่วมเดินทางได้ในภายหลังทุกกรณี</li>';
				str += '</ul></div>';
				str += '<div>ทำรายการเมื่อ : '+doc.data().DateConfirm+'</div>';
			}
			document.getElementById('Loading').style.display='none';
			document.getElementById('ShowTrip').style.display='none';
			document.getElementById('WelcomeTrip').style.display='none';
			document.getElementById('ShowResult').style.display='block';
    		$("#DisplayResultTrip").html(str);  
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

			str += '<div class="text-notrip" style="font-size: 11px; color:#002d63;text-align:left;">';
			str += '<ul style="margin-left:-30px;">';
			str += '<li>ทริปประเทศเนเธอแลนด์-เบลเยี่ยม เดินทางช่วงเดือนพฤษภาคม - มิถุนายน 2565</li>';
			str += '<li>ผู้ได้รับรางวัลต้องคงสภาพการเป็นพนักงาน ttb จนถึงวันเดินทาง</li>';
			str += '<li>ผู้ได้รับรางวัลจะต้องมีพาสปอร์ตที่มีอายุการใช้งานเหลือไม่น้อยกว่า 6 เดือน นับจากวันเดินทางกลับ </li>';
			str += '<li>ผู้ได้รับรางวัลจะต้องรับผิดชอบค่าใช้จ่ายอื่นๆ ที่เกี่ยวข้องด้วยตนเอง เช่น ค่าทำพาสปอร์ต , ค่าเดินทางมาทำวีซ่า , ค่าเดินทางมาเข้าร่วมทริป , ค่าใช้จ่ายส่วนตัวระหว่างทริป , ค่าตรวจโควิด-19 (ถ้ามี) </li>';
			str += '<li>นระหว่างทริป หากเกิดอาการป่วย บาดเจ็บ ติดโควิด-19 หรือด้วยสาเหตุอื่นๆ ซึ่งมีความจำเป็นต้องรับการตรวจหรือรักษาที่ต่างประเทศ ผู้ได้รับรางวัลต้องรับผิดชอบค่าใช้จ่ายที่เกิดขึ้นทั้งหมด ที่เกินจากค่าประกันสุขภาพและประกันอุบัติเหตุที่ได้ทำไว้ระหว่างการเดินทาง เช่น ค่าเดินทางในการส่งตัวเข้ารับการรักษา  , ค่าตั๋วเครื่องบินขากลับ , ค่าใช้จ่ายส่วนตัวและอื่นๆ ที่เกี่ยวข้อง</li>';
			str += '<li>ขอสงวนสิทธิ์ยกเลิกการจัดทริป กรณีมีผู้ตอบรับการเข้าร่วมไม่ถึง 40 ท่าน</li>';
			str += '<li>พรูเด็นเชียลประกันชีวิตจะเป็นผู้รับผิดชอบภาษีเงินได้ ตามฐานเงินเดือนของพนักงาน</li>';
			str += '<li>ภายหลังยืนยันการเข้าร่วมแล้ว กรณีไม่สามารถเดินทางได้เนื่องจากเหตุสุดวิสัยในช่วงก่อนเดินทาง เช่น ติดโควิด-19 , ติดภารกิจสำคัญ , ตั้งครรภ์ ขอสงวนสิทธิ์การเปลี่ยนแปลงก่อนการเดินทาง 1 เดือน กรณีที่แจ้งขอเปลี่ยนหลังจากนี้ไม่สามารถรับเงินคืนเป็นเงินสดและไม่สามารถเปลี่ยนผู้เดินทางได้</li>';
			str += '</ul></div>';
			str += '<div>ทำรายการเมื่อ : '+dateString+'</div>';
		} else if(sSendAnswer==2) { 
			str += '<div class="btn-t9" style="margin-top:20px;cursor: none;">ยืนยันการทำรายการของคุณ</div>';
			str += '<div class="text-name"><b>'+sessionStorage.getItem("EmpName")+'</b><br>'+sessionStorage.getItem("EmpBranch")+'';
			str += '<br>'+sessionStorage.getItem("EmpZone")+'<br>'+sessionStorage.getItem("EmpRH")+'';
			str += '</div>';
			str += '<div class="btn-t7" style="margin:15px 0;">ระบบได้ยืนยันการไม่เข้าร่วม<br>ทริปเนเธอร์แลนด์ของคุณ<br>เรียบร้อยแล้ว</div>';
			str += '<div class="text-notrip" style="font-size: 11px; color:#002d63;text-align:left;">';
			str += '<ul style="margin-left:-30px;">';
			str += '<li>ขอรับรางวัลเป็นเงิน 70% ของมูลค่าทริป (มูลค่าทริป 85,000 x 70% = 59,500 บาท)</li>';
			str += '<li>เงินรางวัลจะโอนเข้าบัญชีพนักงานในรอบเดือนพฤษภาคม 2565</li>';
			str += '<li>เงินรางวัลจะถูกนำไปคำนวณเป็นรายได้ประจำปีและจะต้องเสียภาษีเงินได้ตามฐานเงินเดือนของพนักงาน</li>';
			str += '<li>กรณียืนยันการรับเป็นเงิน 70% แล้วจะไม่สามารถ เปลี่ยนแปลงขอเข้าร่วมเดินทางได้ในภายหลังทุกกรณี</li>';
			str += '</ul></div>';
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



$("ShowTrip").on("click", "#btnOK", function() {
  $("#MsgOK").toggle(); /*shows or hides #box*/
  /*$(this) refers to the targeted element: #toggleMessage*/
  var text = $(this).text();
  
  if (text=="Show") { /*if text inside #toggleMessage is Show...*/
    $(this).text("Hide"); /*Change button text to Hide*/
  }
  else {
    $(this).text("Show"); /*Change button text to Show*/
  }
});

function CloseAll() {
	document.getElementById('id01').style.display='none';
}




function showHideDiv(ele) {
	var srcElement = document.getElementById(ele);
	if (srcElement != null) {
	    if (srcElement.style.display == "block") {
	        srcElement.style.display = 'none';
	    }
	    else {
	        srcElement.style.display = 'block';
	    }
	    return false;
	}
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

