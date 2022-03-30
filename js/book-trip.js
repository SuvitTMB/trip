var Eid="";
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });



$(document).ready(function () {
	alert(sessionStorage.getItem("EmpID")+" "+sessionStorage.getItem("EmpName"));
	if(sessionStorage.getItem("LineID")==null) { location.href = 'ba-trip.html'; }
	var str = "";
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
				str += '<div class="btn-t8" style="margin:15px 0;">คุณได้เลือก<br>ยืนยันเข้าร่วมทริป<br>เรียบร้อยแล้ว</div>';
				str += '<div class="text-notrip" style="font-size: 11px; color:#002d63;text-align:left;">';
				str += '<ul style="margin-left:-30px;">';
				str += '<li>ทริปท่องเที่ยวประเทศเนเธอแลนด์-เบลเยี่ยม จำนวน 8 วัน 5 คืน กำหนดเดินทางช่วงเดือนมิถุนายน 2565</li>';
				str += '<li>ผู้ได้รับรางวัลต้องคงสภาพการเป็นพนักงาน ttb จนถึงวันเดินทาง</li>';
				str += '<li>ผู้ได้รับรางวัลจะต้องมีพาสปอร์ตที่มีอายุการใช้งานคงเหลือไม่น้อยกว่า 6 เดือน นับจากวันเดินทางกลับ กรณียังไม่มีพาสปอร์ตหรือหมดอายุ ขอให้รีบดำเนินการ</li>';
				str += '<li>ผู้ได้รับรางวัลจะต้องรับผิดชอบค่าใช้จ่ายอื่นๆ ที่เกี่ยวข้องด้วยตนเอง เช่น ค่าทำพาสปอร์ต , ค่าเดินทางมาทำวีซ่า , ค่าเดินทางมาเข้าร่วมทริป , ค่าใช้จ่ายส่วนตัวระหว่างทริป , ค่าตรวจโควิด-19 (ถ้ามี)</li>';
				str += '<li>ประกันการเดินทางคุ้มครองค่ารักษาพยาบาลและอุบัติเหตุ ในกรณีที่ท่านติดโควิด-19 และมีความจำเป็นต้องรับการตรวจหรือรักษาที่ต่างประเทศ แบ่งเป็น 2 กรณี ดังนี้';
				str += '<ul>';
				str += '<li>กรณีอาการหนัก ต้องนำส่งโรงพยาบาลเพื่อแอดมิด ประกันการเดินทางคุ้มครองการรักษาโควิดตามเงื่อนไข  ทั้งนี้ผู้ได้รับรางวัลอาจต้องรับผิดชอบค่าใช้จ่ายในการรักษาที่นอกเหนือจากวงเงินที่ทำประกัน และค่าส่วนต่างในการเลื่อนตั๋วเครื่องบินขากลับ</li>';
				str += '<li>กรณีอาการไม่หนัก ต้องแยกที่พักและรักษาแบบ Home Isolation หรืออาจต้องเดินทางกลับประเทศไทยก่อนโปรแกรมทัวร์สิ้นสุด</li>';
				str += '</ul><li>ขอสงวนสิทธิ์ยกเลิกการจัดทริป กรณีมีผู้ตอบรับการเข้าร่วมไม่ถึง 40 ท่าน และทุกท่านที่ได้รับรางวัลจะได้รับเป็นเงินสด 100% หรือมูลค่า 85,000 บาท</li>';
				str += '<li>พรูเด็นเชียลประกันชีวิตจะเป็นผู้รับผิดชอบภาษีเงินได้ ตามฐานเงินเดือนของพนักงาน</li>';
				str += '<li>ภายหลังยืนยันการเข้าร่วมแล้ว กรณีไม่สามารถเดินทางได้เนื่องจากเหตุสุดวิสัยในช่วงก่อนเดินทาง เช่น ติดโควิด-19 , ติดภารกิจสำคัญ , ตั้งครรภ์ ขอสงวนสิทธิ์การเปลี่ยนแปลงก่อนการเดินทาง 1 เดือน กรณีที่แจ้งขอเปลี่ยนหลังจากนี้ จะไม่สามารถรับเงินคืนเป็นเงินสดและไม่สามารถเปลี่ยนผู้เดินทางได้ ทั้งนี้ผู้บริหารจะพิจารณาเป็น Case by Case</li>';
				str += '<li>คำตัดสินของผู้บริหาร BBD และ Prudential ถือเป็นที่สิ้นสุด</li>';
				str += '</ul></div>';
				str += '<div>ทำรายการเมื่อ : '+doc.data().DateConfirm+'</div>';
			} else if(doc.data().ConfirmTrip==2) { 
				str += '<div class="btn-t77" style="margin:15px 0;">คุณได้เลือก<br>ยืนยันเข้าร่วมทริปและขอเปลี่ยนแปลงชื่อผู้เดินทาง เรียบร้อยแล้ว</div>';
				str += '<div class="text-notrip" style="font-size: 11px; color:#002d63;text-align:left;">';
				str += '<ul style="margin-left:-30px;">';
				str += '<li>ขอให้ดำเนินการส่งอีเมลแจ้งความประสงค์ไปยัง ZH และ RH ตามลำดับ เมื่อได้รับอนุมัติแล้ว ส่งเรื่องมาที่อีเมล supattra.kan@ttbbank.com (คุณสุพัตรา กาญจนวีรวิทย์ รหัสพนักงาน 25718) ภายในวันที่ 05 เม.ย. 65</li>';
				str += '<li>ผู้ที่เดินทางแทน จะต้องเป็นพนักงาน ttb เท่านั้น และจะต้องคงสภาพการเป็นพนักงาน ttb จนถึงวันเดินทาง</li>';
				str += '<li>กรณีเปลี่ยนแปลงชื่อผู้เดินทางแล้ว จะไม่สามารถเปลี่ยนแปลงได้อีกในภายหลังทุกกรณี</li>';
				str += '<li>คำตัดสินของผู้บริหาร BBD และ Prudential ถือเป็นที่สิ้นสุด</li>';
				str += '</ul></div>';
				str += '<div>ทำรายการเมื่อ : '+doc.data().DateConfirm+'</div>';
			} else if(doc.data().ConfirmTrip==3) { 
				str += '<div class="btn-t7" style="margin:15px 0;">คุณได้เลือก<br>ยืนยันไม่เข้าร่วมทริปและ<br>ขอรับรางวัลเป็นเงินสด<br>เรียบร้อยแล้ว</div>';
				str += '<div class="text-notrip" style="font-size: 11px; color:#002d63;text-align:left;">';
				str += '<ul style="margin-left:-30px;">';
				str += '<li>ผู้ได้รับรางวัลจะได้รับรางวัลเป็นเงินสด 80% ของมูลค่าทริป (มูลค่าทริป 85,000 x 80% = 68,000 บาท)</li>';
				str += '<li>เงินรางวัลจะโอนเข้าบัญชีพนักงานในรอบเดือนพฤษภาคม 2565</li>';
				str += '<li>พรูเด็นเชียลประกันชีวิตจะเป็นผู้รับผิดชอบภาษีเงินได้ ตามฐานเงินเดือนของพนักงาน</li>';
				str += '<li>กรณียืนยันการรับเป็นเงินสด 80% แล้วจะไม่สามารถ เปลี่ยนแปลงขอเข้าร่วมเดินทางได้ในภายหลังทุกกรณี</li>';
				str += '<li>คำตัดสินของผู้บริหาร BBD และ Prudential ถือเป็นที่สิ้นสุด</li>';
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

			str += '<div class="btn-t8" style="margin:15px 0;">คุณได้เลือก<br>ยืนยันเข้าร่วมทริป<br>เรียบร้อยแล้ว</div>';
			str += '<div class="text-notrip" style="font-size: 11px; color:#002d63;text-align:left;">';
			str += '<ul style="margin-left:-30px;">';
			str += '<li>ทริปท่องเที่ยวประเทศเนเธอแลนด์-เบลเยี่ยม จำนวน 8 วัน 5 คืน กำหนดเดินทางช่วงเดือนมิถุนายน 2565</li>';
			str += '<li>ผู้ได้รับรางวัลต้องคงสภาพการเป็นพนักงาน ttb จนถึงวันเดินทาง</li>';
			str += '<li>ผู้ได้รับรางวัลจะต้องมีพาสปอร์ตที่มีอายุการใช้งานคงเหลือไม่น้อยกว่า 6 เดือน นับจากวันเดินทางกลับ กรณียังไม่มีพาสปอร์ตหรือหมดอายุ ขอให้รีบดำเนินการ</li>';
			str += '<li>ผู้ได้รับรางวัลจะต้องรับผิดชอบค่าใช้จ่ายอื่นๆ ที่เกี่ยวข้องด้วยตนเอง เช่น ค่าทำพาสปอร์ต , ค่าเดินทางมาทำวีซ่า , ค่าเดินทางมาเข้าร่วมทริป , ค่าใช้จ่ายส่วนตัวระหว่างทริป , ค่าตรวจโควิด-19 (ถ้ามี)</li>';
			str += '<li>ประกันการเดินทางคุ้มครองค่ารักษาพยาบาลและอุบัติเหตุ ในกรณีที่ท่านติดโควิด-19 และมีความจำเป็นต้องรับการตรวจหรือรักษาที่ต่างประเทศ แบ่งเป็น 2 กรณี ดังนี้';
			str += '<ul>';
			str += '<li>กรณีอาการหนัก ต้องนำส่งโรงพยาบาลเพื่อแอดมิด ประกันการเดินทางคุ้มครองการรักษาโควิดตามเงื่อนไข  ทั้งนี้ผู้ได้รับรางวัลอาจต้องรับผิดชอบค่าใช้จ่ายในการรักษาที่นอกเหนือจากวงเงินที่ทำประกัน และค่าส่วนต่างในการเลื่อนตั๋วเครื่องบินขากลับ</li>';
			str += '<li>กรณีอาการไม่หนัก ต้องแยกที่พักและรักษาแบบ Home Isolation หรืออาจต้องเดินทางกลับประเทศไทยก่อนโปรแกรมทัวร์สิ้นสุด</li>';
			str += '</ul><li>ขอสงวนสิทธิ์ยกเลิกการจัดทริป กรณีมีผู้ตอบรับการเข้าร่วมไม่ถึง 40 ท่าน และทุกท่านที่ได้รับรางวัลจะได้รับเป็นเงินสด 100% หรือมูลค่า 85,000 บาท</li>';
			str += '<li>พรูเด็นเชียลประกันชีวิตจะเป็นผู้รับผิดชอบภาษีเงินได้ ตามฐานเงินเดือนของพนักงาน</li>';
			str += '<li>ภายหลังยืนยันการเข้าร่วมแล้ว กรณีไม่สามารถเดินทางได้เนื่องจากเหตุสุดวิสัยในช่วงก่อนเดินทาง เช่น ติดโควิด-19 , ติดภารกิจสำคัญ , ตั้งครรภ์ ขอสงวนสิทธิ์การเปลี่ยนแปลงก่อนการเดินทาง 1 เดือน กรณีที่แจ้งขอเปลี่ยนหลังจากนี้ จะไม่สามารถรับเงินคืนเป็นเงินสดและไม่สามารถเปลี่ยนผู้เดินทางได้ ทั้งนี้ผู้บริหารจะพิจารณาเป็น Case by Case</li>';
			str += '<li>คำตัดสินของผู้บริหาร BBD และ Prudential ถือเป็นที่สิ้นสุด</li>';
			str += '</ul></div>';
			str += '<div>ทำรายการเมื่อ : '+dateString+'</div>';
		} else if(sSendAnswer==2) { 
			str += '<div class="btn-t9" style="margin-top:20px;cursor: none;">ยืนยันการทำรายการของคุณ</div>';
			str += '<div class="text-name"><b>'+sessionStorage.getItem("EmpName")+'</b><br>'+sessionStorage.getItem("EmpBranch")+'';
			str += '<br>'+sessionStorage.getItem("EmpZone")+'<br>'+sessionStorage.getItem("EmpRH")+'';
			str += '</div>';
			str += '<div class="btn-t77" style="margin:15px 0;">คุณได้เลือก<br>ยืนยันเข้าร่วมทริปและขอเปลี่ยนแปลงชื่อผู้เดินทาง เรียบร้อยแล้ว</div>';
			str += '<div class="text-notrip" style="font-size: 11px; color:#002d63;text-align:left;">';
			str += '<ul style="margin-left:-30px;">';
			str += '<li>ขอให้ดำเนินการส่งอีเมลแจ้งความประสงค์ไปยัง ZH และ RH ตามลำดับ เมื่อได้รับอนุมัติแล้ว ส่งเรื่องมาที่อีเมล supattra.kan@ttbbank.com (คุณสุพัตรา กาญจนวีรวิทย์ รหัสพนักงาน 25718) ภายในวันที่ 05 เม.ย. 65</li>';
			str += '<li>ผู้ที่เดินทางแทน จะต้องเป็นพนักงาน ttb เท่านั้น และจะต้องคงสภาพการเป็นพนักงาน ttb จนถึงวันเดินทาง</li>';
			str += '<li>กรณีเปลี่ยนแปลงชื่อผู้เดินทางแล้ว จะไม่สามารถเปลี่ยนแปลงได้อีกในภายหลังทุกกรณี</li>';
			str += '<li>คำตัดสินของผู้บริหาร BBD และ Prudential ถือเป็นที่สิ้นสุด</li>';
			str += '</ul></div>';
			str += '<div>ทำรายการเมื่อ : '+dateString+'</div>';
		} else if(sSendAnswer==3) { 
			str += '<div class="btn-t9" style="margin-top:20px;cursor: none;">ยืนยันการทำรายการของคุณ</div>';
			str += '<div class="text-name"><b>'+sessionStorage.getItem("EmpName")+'</b><br>'+sessionStorage.getItem("EmpBranch")+'';
			str += '<br>'+sessionStorage.getItem("EmpZone")+'<br>'+sessionStorage.getItem("EmpRH")+'';
			str += '</div>';
			str += '<div class="btn-t7" style="margin:15px 0;">คุณได้เลือก<br>ยืนยันไม่เข้าร่วมทริปและ<br>ขอรับรางวัลเป็นเงินสด<br>เรียบร้อยแล้ว</div>';
			str += '<div class="text-notrip" style="font-size: 11px; color:#002d63;text-align:left;">';
			str += '<ul style="margin-left:-30px;">';
			str += '<li>ผู้ได้รับรางวัลจะได้รับรางวัลเป็นเงินสด 80% ของมูลค่าทริป (มูลค่าทริป 85,000 x 80% = 68,000 บาท)</li>';
			str += '<li>เงินรางวัลจะโอนเข้าบัญชีพนักงานในรอบเดือนพฤษภาคม 2565</li>';
			str += '<li>พรูเด็นเชียลประกันชีวิตจะเป็นผู้รับผิดชอบภาษีเงินได้ ตามฐานเงินเดือนของพนักงาน</li>';
			str += '<li>กรณียืนยันการรับเป็นเงินสด 80% แล้วจะไม่สามารถ เปลี่ยนแปลงขอเข้าร่วมเดินทางได้ในภายหลังทุกกรณี</li>';
			str += '<li>คำตัดสินของผู้บริหาร BBD และ Prudential ถือเป็นที่สิ้นสุด</li>';
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

