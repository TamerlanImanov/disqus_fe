(function() {
  var checkEmpty, email, foo, name, retrievedObject, user, yourGlobalVariable;

  yourGlobalVariable = 0;

  user = {
    email: null,
    nameString: null
  };

  retrievedObject = localStorage.getItem('memory', user);

  foo = JSON.parse(retrievedObject);

  email = document.getElementById('inputEmail');

  name = document.getElementById('nameInput');

  name.setAttribute('value', foo.nameString);

  email.setAttribute('value', foo.email);

  var emailInput, nameInput;
  emailInput = document.getElementById('inputEmail').value;
  nameInput = document.getElementById('nameInput').value;
  if (emailInput.length === 0 || nameInput.length === 0) {
      $('#focusedInput').attr('disabled', 'disabled');
  } else {
      $('#focusedInput').removeAttr('disabled');
  }

  checkEmpty = function() {
    if (emailInput.length === 0 || nameInput.length === 0) {
      return true;
    } else {
      return false;
    }
  };
  
  $.ajax({url: 'http://127.0.0.1:8000/api/v1/comment/', 
    success: function(result){
      for (var i=0;i<result.objects.length;i++){
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

      }
  }});


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

  $('#focusedInput').keyup(function(event) {
    if (document.getElementById('focusedInput').value !== '') {
      if (event.keyCode === 13) {

        var data = JSON.stringify({
          "text": document.getElementById('focusedInput').value,
          "author_title": nameInput,
          "image":'http://www.gravatar.com/avatar/' + CryptoJS.MD5(emailInput)
        });

        $.ajax({
          url: 'http://127.0.0.1:8000/api/v1/comment/',
          type: 'POST',
          contentType: 'application/json',
          data: data,
          dataType: 'json',
          processData: false
        })


        
        // today = new Date;
        // dd = today.getDate();
        // mm = today.getMonth() + 1;
        // yyyy = today.getFullYear();
        // if (dd < 10) {
        //   dd = '0' + dd;
        // }
        // if (mm < 10) {
        //   mm = '0' + mm;
        // }
        // today = dd + '.' + mm + '.' + yyyy;
        
        
      }
    }
  });

  return;

}).call(this);