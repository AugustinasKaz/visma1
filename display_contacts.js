window.addEventListener("load", function () {
    let list = document.getElementById('Conlist');
    let contacts = JSON.parse(localStorage.getItem('contacts'))
    contacts.forEach(elem => {
        var list_item = document.createElement('li');
        list_item.setAttribute("id", elem.Email);
        list_item.innerHTML = "<p>"+elem.PhoneNumber+" "+elem.Email+"</p><br>"+
        "<p>Name: "+elem.FirstName+" "+elem.LastName+" Date: "+elem.BirthDate+" Address: "+elem.Address+
        "</p> <button class='edit_btn' id="+elem.PhoneNumber+">EDIT</button> <button class='delete_btn' id="+elem.PhoneNumber+">DELETE</button>";    

        list.append(list_item)
    });
    window.onstorage = () => {
        // When local storage changes, dump the list to
        // the console.
        console.log(JSON.parse(localStorage.getItem('contacts')));    
      };

});