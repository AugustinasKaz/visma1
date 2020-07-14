window.addEventListener("load", function () {

    let removeContact = function (){
        var contact_id = this.getAttribute("id");
        let contacts = JSON.parse(localStorage.getItem('contacts'))

        let new_contact_list = contacts.filter(el => el.PhoneNumber !== contact_id)
        localStorage.setItem('contacts', JSON.stringify(new_contact_list));

        let contact_divID = contacts.find(el => el.PhoneNumber == contact_id)
        let contact_div = document.getElementById(contact_divID.Email);
        contact_div.remove()
    }

    let editButtons = document.getElementsByClassName("delete_btn");
    Array.from(editButtons).forEach(function(elem) {
        elem.addEventListener('click', removeContact);
      });
    

});