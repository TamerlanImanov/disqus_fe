(function() {
	var yourGlobalVariable;
	yourGlobalVariable=0;
 	$('.col-lg-10 > input').keyup(function() {
        var empty = false;
        $('.col-lg-10 > input').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });
        if (empty) {
            $('#focusedInput').attr('disabled', 'disabled');
        } else {
            $('#focusedInput').removeAttr('disabled');
        }
    });


    $('#focusedInput').keyup(function() {
        var empty = false;
            if ($(this).val() == '') {
                empty = true;
            }
        if (empty) {
            document.getElementById("focusedInput").className = "form-control empty";
        } else {
            document.getElementById("focusedInput").className = "form-control";
        }
    });

    $("#focusedInput").keyup(function(event){
    	var mesString = document.getElementById("focusedInput").value;
    	var email = document.getElementById("inputEmail").value;
    	if (document.getElementById("focusedInput").value!=''){
	    	if(event.keyCode == 13){
	   			var globalDiv = document.getElementById('omg');

	   			var nameString = document.getElementById("nameInput").value;
	   			
	   			var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!
				var yyyy = today.getFullYear();

				if(dd<10) {
				    dd='0'+dd
				} 

				if(mm<10) {
				    mm='0'+mm
				} 

				today = dd+'.'+mm+'.'+yyyy;

	            if(yourGlobalVariable>0){     
	                var sep = document.createElement("div");
	                sep.setAttribute("class","list-group-separator");
	                globalDiv.appendChild(sep);
	            }

	        	var newDiv = document.createElement("div");
	            newDiv.setAttribute("class","list-group-item");
	            globalDiv.appendChild(newDiv);

	            var imgDiv = document.createElement("div");
	            imgDiv.setAttribute("class","row-action-primary");
	            newDiv.appendChild(imgDiv);

	        	var img = document.createElement("img");
	        	img.setAttribute("class","circle");
				var gravatar = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(email);
				img.setAttribute("src",gravatar);
				console.log (gravatar);
	        	imgDiv.appendChild(img);

	        	var contDiv = document.createElement("div");
	        	contDiv.setAttribute("class","row-content");
	        	newDiv.appendChild(contDiv);

	        	var timeDiv = document.createElement("div");
	        	//var timeText = document.createTextNode(today);
	        	timeDiv.setAttribute("class","least-content");
	        	timeDiv.appendChild(document.createTextNode(today));
	        	contDiv.appendChild(timeDiv);

	        	var nameUser = document.createElement("h4");
	        	nameUser.setAttribute("class","list-group-item-heading");
	        	nameUser.appendChild(document.createTextNode(nameString));
	        	contDiv.appendChild(nameUser);

	        	var mesDiv = document.createElement("p");
	        	mesDiv.setAttribute("class","list-group-item-text");
	        	mesDiv.appendChild(document.createTextNode(mesString));
	        	contDiv.appendChild(mesDiv);

				yourGlobalVariable++;
	    	}
	    }
	});

}).call(this);
