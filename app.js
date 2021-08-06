showNotes();
// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");


addBtn.addEventListener("click", showError);

//Show error if the username is more then 8 characters

let showErr = document.getElementById('showErr');
function showError() {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let addName = document.getElementById("addName");
  if (addName.value.length > 8) {
    showErr.classList.replace("hide", "show");
    setTimeout(() => {
      showErr.classList.replace("show", "hide");
    }, 5000);
    addTxt.value = "";
    addTitle.value = "";
    impChecker = 0;
  } else {
    btnAdder();
  }
}


//This will return current time of adding the note
function getTime() {
  let currentdate = new Date();
  let datetime = currentdate.getDay() + "/" + currentdate.getMonth()
    + "/" + currentdate.getFullYear() + " "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
  return datetime;
}

function btnAdder() {
  let notes = localStorage.getItem("notes");
  let markImp = document.getElementById('markImp');
  let impChecker = 0;
  let current_time = getTime();
  console.log(current_time);
  if (markImp.checked) {
    impChecker = 1;
  }
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
    important: impChecker,
    name: addName.value,
    time: current_time
  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  impChecker = 0;
  current_time = "";
  //console.log(notesObj);
  showNotes();
};


// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  let text_val;
  notesObj.forEach(function (element, index) {
    if (element.text.length > 155) {
      text_val = String(element.text.substring(0, 155));
      text_val += ` <a href='#' style='text-decoration:none;' onclick="textShower(\` ${element.title} \`,\`  ${element.text} \`,\`  ${element.name} \`,\`  ${element.time} \`)">read more...</a>`;

    } else if (element.text.length <= 155) {
      text_val = element.text;
      let length_get = (181 - (text_val.length)) / 30;
      text_val += " ";
      for (let i = 0; i < length_get; i++) {
        text_val += "<br>";
      }
    }
    html += `<div class="FixWid noteCard my-2 mx-2 card ImpChk${element.important}" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">${element.title}</h5>
    <p class="card-text">${text_val}</p>
    <div class="is_flex">
    <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
    <p class="card-text username"><b>${element.name}</b></p>
    </div>
    </div>
    </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}
function textShower(title, text, username, time) {
  let new_text = `
  <div id="main_readmore_body">                
  <div id="readmore_body" class="big_card noteCard my-5 mx-2 card" style="width: 18rem;">
  <div class="card-body">
  <div class="is_flex">
  <h5>Title: </h5>
  <p class="card-title zoomed_title">${title}</p>
  <button type="button" class="btn-close zoomed_close_btn" data-bs-dismiss="alert" onclick="rdclbtn()" aria-label="Close"></button>
  </div>
  <div class="is_flex">
  <h6>Username: </h6>
  <p class="card-title zoomed_username">${username}</p>
  </div>
  <div class="is_flex">
  <h6>Added Date: </h6>
  <p class="card-title zoomed_time">${time}</p>
  </div>
  <h3 class="text-center zoomed_heading">NOTE</h3>
  </div>
  <hr class="mx-3">
  <p class="card-text mx-3 zoomed_text">${text}</p>
  <hr class="mx-3">
  </div>
  </div>
  </div>
  </div>`;
  let overlap_text = document.getElementById("overlap_text");
  overlap_text.innerHTML = new_text;
  let main_body = document.getElementById('main_body');
  main_body.className += " on_readmore";
}
function rdclbtn() {
  console.log("click");
  let readmore_body = document.getElementById('main_readmore_body');
  readmore_body.parentElement.removeChild(readmore_body);
  let main_body = document.getElementById('main_body');
  main_body.classList.remove("on_readmore")
}

// Function to delete a note
function deleteNote(index) {
  //   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

  let inputVal = search.value;
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  })
})

/*
Further Features:
3. Separate notes by user
4. Sync and host to web server
*/
