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

//  Check to enable or not Message textfield

  checkEmpty = function() {
    var emailInput1 = document.getElementById('inputEmail').value;
    var nameInput1 = document.getElementById('nameInput').value;
    if (emailInput1.length === 0 || nameInput1.length === 0) {
      $('#focusedInput').attr('disabled', 'disabled');
      return true;
    } else {
      $('#focusedInput').removeAttr('disabled');
      return false;
    }
  };

//Make connection between bg and popup
  var port = chrome.extension.connect({name: "Sample Communication"});
  port.postMessage("new mes");

  port.onMessage.addListener(function(msg) {
    globalUrl = msg;
  });
//  Load data from REST server and check to add new Div
// to check new div I create counter
// that if counter < our table, when load only element
  loadData = function(){
    var countMes = 0;
    setText(globalUrl);
    //create GET request with current url 
    //and get object, which has url
    $.ajax({url: 'http://127.0.0.1:8000/api/v1/comment/?url='+globalUrl, 
    // $.ajax({url: 'http://127.0.0.1:8000/api/v1/comment/', 
      
      success: function(result){
        countMes = result.objects.length;
        if (counter<countMes){
          for (var i=counter;i<result.objects.length;i++){
            // console.log (globalUrl + " " + result.objects[i].url);
              var contDiv, dd, email, globalDiv, gravatar, img, imgDiv, mesDiv, mesString, mm, nameString, nameUser, newDiv, sep, timeDiv,replyBut;
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
              mesDiv.setAttribute('style', 'word-wrap:break-word;width: 80%;');
              mesDiv.appendChild(document.createTextNode(result.objects[i].text));
              contDiv.appendChild(mesDiv);


              // check to create button or not 
              // if email equal yours email will not create
              // but it not correctly work
              if (document.getElementById('inputEmail').value != result.objects[i].email){
                replyBut = document.createElement('a');
                replyBut.setAttribute('class','btn btn-flat btn-primary');
                replyBut.setAttribute('style','margin-left:45%;margin-top:-8%;position:absolute;');
                replyBut.setAttribute('onclick','doSomething();');
                replyBut.onclick = function(){  
                  // console.log('opopop');
                  document.getElementById('focusedInput').className = 'form-control'; 
                  document.getElementById('focusedInput').value = "@";
                  document.getElementById("focusedInput").focus();
                  
                }
                replyBut.innerHTML = 'reply';
                contDiv.appendChild(replyBut);
              }

              yourGlobalVariable++;

              counter = result.objects[i].id;
            // localStorage.setItem('counter', counter);
          }
          document.getElementById('header-body').innerHTML = result.objects.length + " comments"

        }
        // console.log(countMes);
        // setBadgeText(""+countMes); 
        counter = countMes;
    }
  });
    
  }

//load data when open html
  loadData();

//check to disable input text field and save to localstorage
  $('.col-lg-10 > input').keyup(function() {
    user.email = document.getElementById('inputEmail').value;
    user.nameString = document.getElementById('nameInput').value;
    localStorage.setItem('memory', JSON.stringify(user));
    var empty;
    checkEmpty();
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


// just trying to make OAuth2 google


  // $('#auo').click(function(event)){
  //   console.log("asdas");
    // chrome.browserAction.onClicked.addListener(function() {
    //    chrome.windows.create({'url': 'http://google.com/', 'type': 'popup'}, function(window) {
    //  });
    // });
  // }

  // $("#auo").click(function () {
    //  $.ajax({url: 'http://127.0.0.1:8000/api/v1/comment/?url='+globalUrl, 
    //   success: function(result){

    //   };
    // // $.ajax({url: 'http://127.0.0.1:8000/api/v1/comment/', 
      
    //   success: function(result){
    // chrome.windows.create({

    //   type: 'popup',
    //   url:
    //    "https://accounts.google.com/o/oauth2/auth?redirect_uri=http%3A%2F%2Fmysite.com%2Fgglogin&response_type=code&client_id=730737195564-gqb6cgtjhoatc1id5smmgka1skbb42k2.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile"
    // }, function (newWindow) {
    //   console.log(newWindow);
    //   // chrome.tabs.executeScript(newWindow.tabs[0].id, {
    //   //   code: 'document.write("hello world");'
    //   // });
    // });
  


//   $(function () {
//     var extractToken = function(hash) {
//       var match = hash.match(/access_token=([\w-]+)/);
//       return !!match && match[1];
//     };

//     var CLIENT_ID = "730737195564-gqb6cgtjhoatc1id5smmgka1skbb42k2.apps.googleusercontent.com";
//     var AUTHORIZATION_ENDPOINT = "https://soundcloud.com/connect";
//     var RESOURCE_ENDPOINT = "https://api.soundcloud.com/me";

//     var token = extractToken(document.location.hash);
//     if (token) {
//       // $('div.authenticated').show();
//       chrome.windows.create({
//         type: 'popup',
//         url: ""
//       });

//       $('span.token').text(token);

//       $.ajax({
//           url: RESOURCE_ENDPOINT
//         , beforeSend: function (xhr) {
//             xhr.setRequestHeader('Authorization', "OAuth " + token);
//             xhr.setRequestHeader('Accept',        "application/json");
//           }
//         , success: function (response) {
//             var container = $('span.user');
//             if (response) {
//               container.text(response.username);
//             } else {
//               container.text("An error occurred.");
//             }
//           }
//       });
//     } else {
//       $('div.authenticate').show();

//       var authUrl = AUTHORIZATION_ENDPOINT + 
//         "?response_type=token" +
//         "&client_id="    + clientId +
//         "&redirect_uri=" + window.location;

//       $("a.connect").attr("href", authUrl);
//     }
//   });
// });

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
          "url": globalUrl,
          "email":emailInput1
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
  
  checkEmpty();

//set interval to check empty inputs
  setInterval (checkEmpty,100000);

  return;

}).call(this);