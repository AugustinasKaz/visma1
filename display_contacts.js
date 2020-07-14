window.addEventListener("load", function () {
    function initializeList(){
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
        contacts_normal = contacts;

    }
    function updateList(){
        let list = document.getElementById('Conlist');
        let contacts = JSON.parse(localStorage.getItem('contacts'))
        let tmp = contacts[contacts_normal.length];
        var list_item = document.createElement('li');
        list_item.setAttribute("id", tmp.Email);
            list_item.innerHTML = "<p>"+tmp.PhoneNumber+" "+tmp.Email+"</p><br>"+
            "<p>Name: "+tmp.FirstName+" "+tmp.LastName+" Date: "+tmp.BirthDate+" Address: "+tmp.Address+
            "</p> <button class='edit_btn' id="+tmp.PhoneNumber+">EDIT</button> <button class='delete_btn' id="+tmp.PhoneNumber+">DELETE</button>";    
        list.append(list_item)
        contacts_normal = contacts;

    }
    let contacts_normal = JSON.parse(localStorage.getItem('contacts'))
    initializeList();

    //timer function
    window.setInterval(function(){ 
        let tmp = JSON.parse(localStorage.getItem('contacts'));
        if(contacts_normal.length !== tmp.length)
            updateList();
    }, 3000);
    
});