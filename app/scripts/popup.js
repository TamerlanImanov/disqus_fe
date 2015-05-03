(function() {
  var checkEmpty, email, foo, name, retrievedObject, user, yourGlobalVariable,loadData,deleteAllData,counter,globalUrl;

  // counter = localStorage.getItem('counter');
  counter = 0;
  yourGlobalVariable = 0;

// Create User for storing in localstorage
  user = {
    email: null,
    nameString: null
  };
//
  Stat = {
    data: {},
    cur: null
  };
 // console.log (testVar);


  //  Get Name & Email from localStorage 
retrievedObject = localStorage.getItem('memory', user);

if (retrievedObject != null){
  foo = JSON.parse(retrievedObject);

  email = document.getElementById('inputEmail');

  name = document.getElementById('nameInput');

  name.setAttribute('value', foo.nameString);

  email.setAttribute('value', foo.email);
}


//  Check to enable or not Message textfield
  var emailInput, nameInput;
  emailInput = document.getElementById('inputEmail').value;
  nameInput = document.getElementById('nameInput').value;
  if (emailInput.length === 0 || nameInput.length === 0) {
      $('#focusedInput').attr('disabled', 'disabled');
  } else {
      $('#focusedInput').removeAttr('disabled');
  }


//  Check to enable or not Message textfield

  checkEmpty = function() {
    if (emailInput.length === 0 || nameInput.length === 0) {
      return true;
    } else {
      return false;
    }
  };


//Make connection between bg and popup


  var port = chrome.extension.connect({name: "Sample Communication"});

  port.postMessage("Hi BackGround");

  port.onMessage.addListener(function(msg) {
    globalUrl = msg;
  });
  // var op= functionUrl();

//  Load data from REST server and check to add new Div
// to check new div i create counter and save it to localstorage
// that if counter < our table, when load only element


  loadData = function(){
    $.ajax({url: 'http://127.0.0.1:8000/api/v1/comment/', 
      success: function(result){
        var smth = result.objects.length-1;
        smth = result.objects[smth].id;
        if (counter<smth){
          for (var i=counter;i<result.objects.length;i++){
            console.log (globalUrl + " " + result.objects[i].url);
            if (globalUrl == result.objects[i].url){
              var contDiv, dd, email, globalDiv, gravatar, img, imgDiv, mesDiv, mesString, mm, nameString, nameUser, newDiv, sep, timeDiv, today, yyyy;
              mesString = document.getElementById('focusedInput').value;

              globalDiv = document.getElementById('omg');

              if (yourGlobalVariable > 0) {
                sep = document.createElement('div');
                sep.setAttribute('class', 'list-group-separator');
                globalDiv.appendChild(sep);
              }

              newDiv = document.createElement('div');
              newDiv.setAttribute('class', 'list-group-item');
              globalDiv.appendChild(newDiv);

              imgDiv = document.createElement('div');
              imgDiv.setAttribute('class', 'row-action-primary');
              newDiv.appendChild(imgDiv);

              img = document.createElement('img');
              img.setAttribute('class', 'circle');
              gravatar = result.objects[i].image;
              img.setAttribute('src', gravatar);
              imgDiv.appendChild(img);

              contDiv = document.createElement('div');
              contDiv.setAttribute('class', 'row-content');
              newDiv.appendChild(contDiv);

              timeDiv = document.createElement('div');
              timeDiv.setAttribute('class', 'least-content');
              var time = result.objects[i].pub_time;
              time = time.substring (0,10);
              var day = time.substring (8,10);
              var month = time.substring (5,7);
              var year = time.substring (2,4);
              timeDiv.appendChild(document.createTextNode(day+"."+month+"."+year));
              contDiv.appendChild(timeDiv);

              nameUser = document.createElement('h4');
              nameUser.setAttribute('class', 'list-group-item-heading');
              nameUser.appendChild(document.createTextNode(result.objects[i].author_title));
              contDiv.appendChild(nameUser);

              mesDiv = document.createElement('p');
              mesDiv.setAttribute('class', 'list-group-item-text');
              mesDiv.appendChild(document.createTextNode(result.objects[i].text));
              contDiv.appendChild(mesDiv);

              yourGlobalVariable++;

              counter = result.objects[i].id;
            }
            // localStorage.setItem('counter', counter);
          }
          document.getElementById('header-body').innerHTML = result.objects.length-1 + " comments"
        }
    }});
  }

//load data when open html
  

  loadData();

//check to disable input text field and save to localstorage

  $('.col-lg-10 > input').keyup(function() {
    user.email = document.getElementById('inputEmail').value;
    user.nameString = document.getElementById('nameInput').value;
    localStorage.setItem('memory', JSON.stringify(user));
    var empty;
    empty = checkEmpty();
    $('.col-lg-10 > input').each(function() {
      if ($(this).val() === '') {
        empty = true;
      }
    });
    if (empty) {
      $('#focusedInput').attr('disabled', 'disabled');
    } else {
      $('#focusedInput').removeAttr('disabled');
    }
  });

//change class when empy message textfield or not 

  $('#focusedInput').keyup(function() {
    var empty;
    empty = false;
    if ($(this).val() === '') {
      empty = true;
    }
    if (empty) {
      document.getElementById('focusedInput').className = 'form-control empty';
    } else {
      document.getElementById('focusedInput').className = 'form-control';
    }
  });

// autorefresh 
  setInterval(loadData, 100);
 
// check to empty message text field, cant send empty text field
// when we press Enter we send data to our server
// loaddata to refresh our body

  $('#focusedInput').keyup(function(event) {
    if (document.getElementById('focusedInput').value !== '') {
      if (event.keyCode === 13) {
        var emailInput1, nameInput1;
        emailInput1 = document.getElementById('inputEmail').value;
        nameInput1 = document.getElementById('nameInput').value;
        var data = JSON.stringify({
          "text": document.getElementById('focusedInput').value,
          "author_title": nameInput1,
          "image":'http://www.gravatar.com/avatar/' + CryptoJS.MD5(emailInput1),
          "url": globalUrl
        });

        $.ajax({
          url: 'http://127.0.0.1:8000/api/v1/comment/',
          type: 'POST',
          contentType: 'application/json',
          data: data,
          dataType: 'json',
          processData: false
        })

        loadData();
        document.getElementById('focusedInput').value = "";
        document.getElementById("focusedInput").blur();
        document.getElementById('focusedInput').className = 'form-control empty'; 
      }
    }
  });
  

  return;

}).call(this);