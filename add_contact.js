window.addEventListener("load", function () {

    function namesValid(data, error) {
        const error_msg = error;
        if (data.length === 0 || data.length >= 15) {
            error_msg.textContent = "Error: field is required and can not exceed 15 characters";
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
        const emailsList = [];
        contacts.forEach(el => emailsList.push(el.Email))
        const found = emailsList.find(el => el === email_test);
        if (found !== undefined){
            const unique_msg = document.getElementById('unique_validation');
            unique_msg.textContent = "Error: email already exists!";
            return false;
        }
        else
            return true;

    }
    function phoneUnique(contacts, phone_test) {
        const phonesList = [];
        contacts.forEach(el => phonesList.push(el.PhoneNumber))
        const found = phonesList.find(el => el === phone_test);
        if (found !== undefined){
            const unique_msg = document.getElementById('unique_validation');
            unique_msg.textContent = "Error: phone number already exists!";
            return false;
        }
        else
            return true;

    }



    function validateForm(event) {
        let fname = document.getElementById('fname').value; let ferror = document.getElementById('fname_error');
        let lname = document.getElementById('lname').value; let lerror = document.getElementById('lname_error');
        let bdate = document.getElementById('bdate').value;
        let pnumber = document.getElementById('pnumber').value;
        let email = document.getElementById('email').value;
        let faddr = document.getElementById('faddr').value;
        if (namesValid(fname, ferror) && namesValid(lname, lerror) && bdateValid(bdate) && pnumberValid(pnumber) && emailValid(email)) {
            Contact ={
                FirstName: fname,
                LastName: lname,
                BirthDate: bdate,
                PhoneNumber: pnumber,
                Email: email,
                Address: faddr,
            }
            var storedContacts = JSON.parse(localStorage.getItem("contacts"));
            if (storedContacts === null){
                storedContacts = []
                storedContacts.push(Contact)
                localStorage.setItem('contacts', JSON.stringify(storedContacts));
            }
            else{
                if(emailUnique(storedContacts, Contact.Email) && phoneUnique(storedContacts, Contact.PhoneNumber)) {
                    storedContacts.push(Contact)
                    localStorage.setItem('contacts', JSON.stringify(storedContacts));
                    const unique_msg = document.getElementById('unique_validation');
                    unique_msg.textContent = "Conact was added successfully!";
                }
            }
        }
        event.preventDefault();
    }


    const form = document.getElementById('contact_form');
    form.addEventListener('submit', validateForm);
});