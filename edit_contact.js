window.addEventListener("load", function () {

    let editContact = function (){
        var contact_id = this.getAttribute("id");
        let info = document.getElementById("contactToUpdate")
        let modal = document.getElementById("myModal");
        let span = document.getElementsByClassName("close")[0];
        let contacts = JSON.parse(localStorage.getItem('contacts'))

        let data = contacts.find(el => el.PhoneNumber == contact_id)
        info.textContent = "Current information: "+data.PhoneNumber+" | "+data.Email+" | "+data.FirstName+" | "+data.LastName+" | "+data.BirthDate+" | "+data.Address

        
        modal.style.display = "block";
        
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          }

    }

    let editButtons = document.getElementsByClassName("edit_btn");
    Array.from(editButtons).forEach(function(elem) {
        elem.addEventListener('click', editContact);
      });
    

});