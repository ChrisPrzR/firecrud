const firebaseConfig = {
    apiKey: "XXXXXX",
    authDomain: "XXXXXX",
    databaseURL: "XXXXX",
    projectId: "XXXXX",
    storageBucket: "XXXX",
    messagingSenderId: "X",
    appId: "X",
    measurementId: "X"
  };
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const dbRef = firebase.database().ref();
    const productsRef = dbRef.child('products');

    const newData = function(name, price){
        productsRef.push({
            name: name,
            price: price,      
          });
    }
    const displayItems = function(){
            productsRef.once('value')
            .then(function(dataSnapshot) {
                dataSnapshot.forEach(function(child){
                    addItemToList(child.val())
                    })
            })       
    }
   
    const addItemToList = function(item){
            productsRef.on("child_added", snap => {
                
                const list = document.querySelector('#item-list');
    
                const row = document.createElement('tr');
    
                row.setAttribute("itemid", snap.key)
        
                row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
                `;
        
                list.appendChild(row);          
            });
           
    }
    
        const deleteItem = function(el) {
        if(el.classList.contains('delete')) {
          el.parentElement.parentElement.remove();
            }
        }

    
    document.addEventListener('DOMContentLoaded', displayItems)

    document.querySelector("#item-form").addEventListener("submit", (e) => {
        e.preventDefault()
        const title = document.querySelector('#item-name').value
        const price = document.querySelector('#item-price').value
        newData(title, price)
        


})