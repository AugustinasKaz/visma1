window.addEventListener("load", function () {

  function namesValid(data, error) {
    const error_msg = error;
    if (data.length === 0) {
      error_msg.textContent = "Error: field is required";
      return false;
    }
    else if (!/^[a-z]+$/i.test(data)) {
      error_msg.textContent = "Error: must contain only non-numeric values";
      return false;
    }
    else
      error_msg.textContent = "";
    return true;
  }
  function bdateValid(data) {
    const error_msg = document.getElementById('bdate_error');
    let dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if (data.length === 0) {
      error_msg.textContent = "Error: field is required";
      return false;
    }
    else if (data.match(dateformat)) {
      var pdate = data.split('-');
      var dd = parseInt(pdate[0]);
      var mm = parseInt(pdate[1]);
      var yy = parseInt(pdate[2]);
      var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (mm == 1 || mm > 2) {
        if (dd > ListofDays[mm - 1]) {
          error_msg.textContent = "Error: Invalid format";
          return false;
        }
      }
      if (mm == 2) {
        var lyear = false;
        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
          lyear = true;
        }
        if ((lyear == false) && (dd >= 29)) {
          error_msg.textContent = "Error: Invalid format";
          return false;
        }
        if ((lyear == true) && (dd > 29)) {
          error_msg.textContent = "Error: Invalid format";
          return false;
        }
      }
    }
    else {
      error_msg.textContent = "Error: Invalid format";
      return false;
    }
    error_msg.textContent = "";
    return true;
  }
  function pnumberValid(data) {
    let regex = /^[0-9]+$/;
    const error_msg = document.getElementById('pnumber_error');;
    if (data.length === 0) {
      error_msg.textContent = "Error: field is required";
      return false;
    }
    else if (!data.match(regex)) {
      error_msg.textContent = "Error: must contain only numeric values";
      return false;
    }
    else
      error_msg.textContent = "";
    return true;
  }
  function emailValid(data) {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const error_msg = document.getElementById('email_error');
    if (data.length === 0) {
      error_msg.textContent = "Error: field is required";
      return false;
    }
    else if (!pattern.test(data)) {
      error_msg.textContent = "Error: Invalid format";
      return false;
    }
    else
      error_msg.textContent = "";
    return true;
  }

  function emailUnique(contacts, email_test) {
    let currentValue = data.Email;
    if (currentValue !== email_test) {
      const emailsList = [];
      contacts.forEach(el => emailsList.push(el.Email))
      const found = emailsList.find(el => el === email_test);
      if (found !== undefined) {
        const unique_msg = document.getElementById('Uunique_validation');
        unique_msg.textContent = "Error: email already exists!";
        return false;
      }
      else
        return true;
    }
    else
      return true;

  }

  function phoneUnique(contacts, phone_test) {
    let currentValue = data.PhoneNumber;
    if (currentValue !== phone_test) {
      const phonesList = [];
      contacts.forEach(el => phonesList.push(el.PhoneNumber))
      const found = phonesList.find(el => el === phone_test);
      if (found !== undefined) {
        const unique_msg = document.getElementById('Uunique_validation');
        unique_msg.textContent = "Error: phone number already exists!";
        return false;
      }
      else
        return true;
    }
    else
      return true;
  }

  function updateDiv(number, email, fname, lname, bdate, addr) {
    let list_item = document.getElementById(data.Email);
    list_item.setAttribute("id", email);
    list_item.innerHTML = "<p>" + number + " " + email + "</p><br>" +
      "<p>Name: " + fname + " " + lname + " Date: " + bdate + " Address: " + addr +
      "</p> <button class='edit_btn' id="+number+">EDIT</button> <button class='delete_btn' id="+number+">DELETE</button>";
    }

  function validateForm(event) {
    let fname = document.getElementById('Ufname').value; let ferror = document.getElementById('Ufname_error');
    let lname = document.getElementById('Ulname').value; let lerror = document.getElementById('Ulname_error');
    let bdate = document.getElementById('Ubdate').value;
    let pnumber = document.getElementById('Upnumber').value;
    let email = document.getElementById('Uemail').value;
    let faddr = document.getElementById('Ufaddr').value;
    let modal = document.getElementById("myModal");


    if (namesValid(fname, ferror) && namesValid(lname, lerror) && bdateValid(bdate) && pnumberValid(pnumber) && emailValid(email)) {
      let storedContacts = JSON.parse(localStorage.getItem('contacts'))

      if (emailUnique(storedContacts, email) && phoneUnique(storedContacts, pnumber)) {
        storedContacts.forEach(elem => {
          if (elem.PhoneNumber === data.PhoneNumber) {
            elem.FirstName = fname;
            elem.LastName = lname;
            elem.BirthDate = bdate;
            elem.PhoneNumber = pnumber;
            elem.Email = email;
            elem.Address = faddr;
          }
          localStorage.setItem('contacts', JSON.stringify(storedContacts));
          modal.style.display = "none";
        });
      }
    }
    updateDiv(pnumber, email,  fname, lname, bdate, faddr)
    event.preventDefault();
  }


  let editContact = function () {
    contact_id = this.getAttribute("id");
    let info = document.getElementById("contactToUpdate")
    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];
    let contacts = JSON.parse(localStorage.getItem('contacts'))

    data = contacts.find(el => el.PhoneNumber == contact_id)
    info.textContent = "Current information: " + data.PhoneNumber + " | " + data.Email + " | " + data.FirstName + " | " + data.LastName + " | " + data.BirthDate + " | " + data.Address

    modal.style.display = "block";
    span.onclick = function () {
      modal.style.display = "none";
    }
    const Updatebutton = document.getElementById('UpdateButton');
    Updatebutton.addEventListener('click', validateForm);

  }
  var contact_id = null;
  var data = null;

  //timer function
  window.setInterval(function(){ 
    let editButtons = document.getElementsByClassName("edit_btn");
    Array.from(editButtons).forEach(function (elem) {
    elem.addEventListener('click', editContact);
    });
  }, 3000);

});