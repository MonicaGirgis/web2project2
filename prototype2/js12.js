var charList="abcdefghijklmnopqrstuvwxyz";

function rand(){
	return Math.floor((Math.random()*26));
}


var numOfLetters;
var btn=document.getElementById("btn");
var numTextbox=document.getElementById("text");
var btnsdiv=document.getElementById("btns");
var charLetters=[];

numTextbox.addEventListener("focus",function(){
	this.value="";
	this.setAttribute("placeholder","Enter Number here");
	btnsdiv.textContent="";
	imagediv.textContent= "";
});

//generating letters

btn.addEventListener("click",function(){
	btnsdiv.textContent="";
	imagediv.textContent= "";
	numOfLetters=numTextbox.value;                  //console.log(numOfLetters);
	
	if(numOfLetters>26 || numOfLetters<1){
		btnsdiv.textContent="Number should be within range 1 and 26";
	}else{
		var string='';
	for(var i=0 ; i<numOfLetters ; i++){
		var letter=charList[rand()];
		var flag=false;
		
		
		for(var j=0;j<string.length;j++){
			if(letter==string[j]){
				i--;
				flag=true;
				break;
			}
		}
		if(flag==false){
			string+=letter;
			var newbtn=document.createElement("input");
			btnsdiv.appendChild(newbtn);
			newbtn.setAttribute("type","button");
			newbtn.setAttribute("id","letter"+i);
			newbtn.setAttribute("class","letter");
			newbtn.setAttribute("value",letter);
			btnsdiv.innerHTML+=" ";
		}
	
	}		
	
}
});

var imagediv=document.getElementById("images");

btnsdiv.addEventListener("click",function(e){
	var letter=e.target.value;
	imagediv.innerHTML = "<img src='images/"+letter+".jpg'>";
});



//Handling interactioins

//var loaded=[];
//var left=[];
var generate=[];
var lettersButn=[]

//Generate Button interactioins

 btn.addEventListener("click",function(e){

	 var today = new Date();
	 var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	 var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	 var dateTime = date+' '+time;
	 
	var b=new btns(e.type,e.target.value,dateTime);
	generate.push(b);
	window.localStorage.setItem("generateButton",JSON.stringify(generate));
 });                                                      
 
 
 //Letters Buttons interactioins
btnsdiv.addEventListener("click",function(e){
	 var today = new Date();
	 var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	 var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	 var dateTime = date+' '+time;
	 
	 var b=new btns(e.type,e.target.value,dateTime);
	 lettersButn.push(b);
	 window.localStorage.setItem("LettersButtons",JSON.stringify(lettersButn));
});
 
 function btns(type,target,time){
	 this.type=type;
	 this.target=target;
	 this.time=time;
 }
 
 window.addEventListener("load",function(e){
	 var loaded=[];
	 	 var today = new Date();
		 var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		 var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		 var dateTime = date+' '+time;
		 if(JSON.parse(localStorage.getItem("windowOpened")!=null)){
		
			loaded=JSON.parse(localStorage.getItem("windowOpened"));
		 }
		loaded.push(new btns(e.type,e.target.value,dateTime));
		window.localStorage.setItem("windowOpened",JSON.stringify(loaded));

 });
 
 window.addEventListener("unload",function(e){
	 var left=[];		
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date+' '+time;
		if(JSON.parse(localStorage.getItem("windowLeave")!=null)){
			
			left=JSON.parse(localStorage.getItem("windowLeave"));
		 }
		left.push(new btns(e.type,e.target.value,dateTime)); 
		window.localStorage.setItem("windowLeave",JSON.stringify(left));
		
 });
 
 var interval= setInterval(function(){
	var arr=[];          //array contains all localStorage objects
	arr.push(JSON.parse(window.localStorage.getItem("generateButton")));
	arr.push(JSON.parse(window.localStorage.getItem("LettersButtons")));
	arr.push(JSON.parse(window.localStorage.getItem("windowOpened")));
	arr.push(JSON.parse(window.localStorage.getItem("windowLeave")));
	// arr.push(localStorage.getItem("generateButton"));
	// arr.push(localStorage.getItem("LettersButtons"));
	// arr.push(localStorage.getItem("windowOpened"));
	// arr.push(localStorage.getItem("windowLeave"));
	//console.log(arr);  // prints array of JSON strings that json_parse won't understand

	 $.ajax({
		"type":"POST",
		"url":"data.php",
		"data":{"object":JSON.stringify(arr)},
		//"data":{"object":arr},
		"success":function(response){
			 localStorage.clear();
			//console.log(JSON.stringify(arr)); // prints continuous JSON strings
		}
	});
 },5000);

$('#show').on("click",function(){

	$.ajax({
		"type":"GET",
		"url":"data.php",
		"data":{"object":""},
		"success":function(response){
			if(response){
				var temp=JSON.parse(response);
				var str='';
			   $.each( temp, function( ) {
				console.log(this);
				//str+="ID: "+this['id']+" Type:"+this['type']+" Target value:"+this['target']+" Time generated"+this['time']+"<br>";
				str+="ID:"+this['id']+"  || Type:"+this['type']+" ||  Target value:"+this['target']+" ||  Time generate:"+this['time']+"<br>";
			})
			$('#db').html(str);
				}
				//console.log(response);
			}
		});

	});
 