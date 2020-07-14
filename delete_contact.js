window.addEventListener("load", function () {

    let removeContact = function (){
        var contact_id = this.getAttribute("id");
        let contacts = JSON.parse(localStorage.getItem('contacts'))

        let new_contact_list = contacts.filter(el => el.PhoneNumber !== contact_id)
        localStorage.setItem('contacts', JSON.stringify(new_contact_list));

        let list_itemId = contacts.find(el => el.PhoneNumber == contact_id)
        let list_item = document.getElementById(list_itemId.Email);
        list_item.remove()
    }

    //timer function
    window.setInterval(function(){ 
        const editButtons = document.getElementsByClassName("delete_btn");
        Array.from(editButtons).forEach(function(elem) {
            elem.addEventListener('click', removeContact);
        });
    }, 3000);
});