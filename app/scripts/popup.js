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
    var contDiv, dd, email, globalDiv, gravatar, img, imgDiv, mesDiv, mesString, mm, nameString, nameUser, newDiv, sep, timeDiv, today, yyyy;
    mesString = document.getElementById('focusedInput').value;
    if (document.getElementById('focusedInput').value !== '') {
      if (event.keyCode === 13) {
        globalDiv = document.getElementById('omg');
        today = new Date;
        dd = today.getDate();
        mm = today.getMonth() + 1;
        yyyy = today.getFullYear();
        if (dd < 10) {
          dd = '0' + dd;
        }
        if (mm < 10) {
          mm = '0' + mm;
        }
        today = dd + '.' + mm + '.' + yyyy;
        
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
        gravatar = 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(emailInput);
        img.setAttribute('src', gravatar);
        imgDiv.appendChild(img);

        contDiv = document.createElement('div');
        contDiv.setAttribute('class', 'row-content');
        newDiv.appendChild(contDiv);

        timeDiv = document.createElement('div');
        timeDiv.setAttribute('class', 'least-content');
        timeDiv.appendChild(document.createTextNode(today));
        contDiv.appendChild(timeDiv);

        nameUser = document.createElement('h4');
        nameUser.setAttribute('class', 'list-group-item-heading');
        nameUser.appendChild(document.createTextNode(nameInput));
        contDiv.appendChild(nameUser);

        mesDiv = document.createElement('p');
        mesDiv.setAttribute('class', 'list-group-item-text');
        mesDiv.appendChild(document.createTextNode(mesString));
        contDiv.appendChild(mesDiv);
        yourGlobalVariable++;
      }
    }
  });

  return;

}).call(this);
