function $(anID){
	return document.querySelector(anID);
}
/* after default randomize the color order */
function changePositionOrder(){
	var color   = ['#225378','#8E2800','#FFD34E','#468966','#FF6138'];
	var colorName= ['Blue','Red','Yellow','Green','Orange'];
    var randomize = shuffle(['0','1','2','3','4']);
    console.log(randomize);
    for(i = 0; i < 5; i++){
    	  	$('#spot'+randomize[i]).style.backgroundColor = color[i];
    	  	$('#spot'+randomize[i]).innerHTML = colorName[i]; 

    }
   console.log('current order : ' + randomize);
   playColorSound();
}
// grabs the array being pass
function shuffle(array){
	// determine the array length
	var i = array.length;
	var j = 0;
	// temp to hold different array number
	var temp;
	// grow through the counter comparing it to math.floor
	while (i--){
		 j = Math.floor(Math.random() * (i+1));
		 temp = array[i];
		 array[i] = array[j];
		 array[j] = temp;
	}
	  return array;
	  // to see shuffle results [console.log(array)];
	  // you would call this function then pass the array like shuffle(['1','2','3']);
}
//testing 
function playColorSound(start){
	if(start){
	    $('#sound').src = 'blue.mp3';
        $('#sound').play();
        $('#start').style.marginLeft = "400%";
	}
	var colorName = shuffle(['blue','red','yellow','green','orange']);
	for(var i = 0; i < 5; i++){
	    $('#sound').src = 'https://ssl.gstatic.com/dictionary/static/sounds/de/0/'+colorName[i]+'.mp3';
		  $('#sound').play();
		}
}

// this function puts the rounds in a local storage once the round
// hits 5 it resets 
function roundCount(x){ 
	if (typeof localStorage.count == 'undefined') {
	 var count = 0;
	} else {
	 var count = localStorage.count;
	}
    count++;
    localStorage.count = count;
    console.log(localStorage.count);
     if(localStorage.count == 6){
     	//reset just the round
     	//localStorage.removeItem('count');
     	//reset all storage
     	localStorage.clear();
       $('.round').innerHTML = "Round 1";
     }else{
       $('.round').innerHTML = "Round " + count;
     }
    return count;
}

function score(x){
	var colorSound = $('#sound').src.split('/');
	var sound = colorSound[8];
    var o = true;
    console.log(x);
    //x.stopPropagation();
    var selected = x.innerHTML.toLowerCase() +'.mp3';
if(selected != sound ){
	o = false;
}
   
// determins if the answer is correct or not
if (typeof localStorage.correct == 'undefined') {
	 var correct = 0;
	} else {
	 var correct = localStorage.correct;
	}
if (typeof localStorage.wrong == 'undefined') {
	 var wrong = 0;
	} else {
	 var wrong = localStorage.wrong;
	}   
if(o == true){
		// correct
		$('#scoreBox').style.opacity = '1';
		$('#scoreBox').style.backgroundColor = "#8DC63F";
		$('#scoreBox').className= "animate";
		$('#score').src="correct.mp3";
		$('#score').play();
		$('#alert').innerHTML = "CORRECT";

		setTimeout(function(){
	            $('#scoreBox').classList.remove('animate');
	            $('#scoreBox').style.backgroundColor = "#f5f5f5";
	            $('#scoreBox').style.opacity = '0';
	                correct++;
                    localStorage.correct = correct;
	            changePositionOrder();
	            roundCount(); 
	     },2000);
		
     }
    else{
		// wrong
		$('#scoreBox').style.opacity = '1';
	    $('#scoreBox').style.backgroundColor = "#FF0000";
	    $('#score').src="wrong.mp3";
	    $('#score').play();
		$('#scoreBox').className= "animate";
		$('#alert').innerHTML = "TRY AGAIN";

		setTimeout(function(){
			$('#scoreBox').style.opacity = '0';
	        $('#scoreBox').classList.remove('animate');

	        $('#scoreBox').style.backgroundColor = "#f5f5f5";
	            wrong++;
                localStorage.wrong = wrong;
                changePositionOrder();
                roundCount(); 
	    },2000);
         
    }
}

