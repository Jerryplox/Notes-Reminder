console.log('lets build a note app')
shownotes();

// if a user adds a notes, add it to the local storage

let addBtn = document.getElementById('addBtn')    // grabbing add button
addBtn.addEventListener('click', function (e) {     // adding click event
    // console.log('click')
    let addTxt = document.getElementById('addTxt');     // grabbing a textarea
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];  // array
    }
    else {
        notesObj = JSON.parse(notes)   //string converting into array notesobj contain all the notes
    }
    notesObj.push(addTxt.value);       // pusing textarea value into notesobj
    localStorage.setItem('notes', JSON.stringify(notesObj));  // notes is key : value
    addTxt.value = " ";
    console.log(notesObj);
    // console.log(typeof notesObj)   object type

    //shows notes 
    shownotes();



})

//shows notes function to show from local storage
function shownotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];  // array
    }
    else {
        notesObj = JSON.parse(notes)   //string hai converting into array
    }

    let html = '';


    notesObj.forEach(function (element, index) {   //ittirating elemenst as they can be multiple notes
        // index+1 as serial no shld be 1 but array index starts with 0 
        html += `
        <div class="notecard card text-light bg-dark   my-2 mx-2 " style="width: 15rem;">
            <div class="card-body">
              <h5 class="card-title">Your Note ${index + 1}</h5>  
              <p class="card-text">${element}</p>
              <button id= ${index} onclick = "deleteNote(this.id)" class="btn btn-primary ">Delete Note</button>
            </div>
          </div>`
    });
    let notesElem = document.getElementById('notes');

    if (notesObj.length != 0) {    // if notesobj array has element then make noteseleme innerhtml to above html
        notesElem.innerHTML = html;



    }
    else {
        notesElem.innerHTML = `<div id="notes" class="row container-fluid"> 
        <div class="notecard my-2 mx-2 " style="width: 18rem;">
        <h5 class="card-title">Nothing to show Add a Note Please!!</h5>
        </div>
        </div>`
    }
}

//funcntion to delete node
function deleteNote(index) {
    console.log('iam deleting', index)  // this.id = index
    let notes = localStorage.getItem("notes");  // just reading local storage
    if (notes == null) {
        notesObj = [];  // array
    }
    else {
        notesObj = JSON.parse(notes)   //string hai converting into array .notesobj contain all the notes
    }
    notesObj.splice(index, 1);  // (starting , end)
    localStorage.setItem('notes', JSON.stringify(notesObj));  // notes is key : value local storage will get update after deleting note delte karne k baad local storage to update karna padtha
    shownotes();  // wapis show karna

}


///search 
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {   // input is event listener
    let inputvalue = search.value.toLowerCase();
    console.log('input given', inputvalue)

    let notecards = document.getElementsByClassName('notecard'); // html collection
    Array.from(notecards).forEach(function (element) {
        let cardText = element.getElementsByTagName('p')[0].innerHTML// para tag
        if (cardText.includes(inputvalue)) {
            element.style.display = "block";

        }
        else {
            element.style.display = "none";
        }

    })
})
