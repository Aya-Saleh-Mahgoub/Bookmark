var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var bookmarks=[];
var mainIndex=0;
if(localStorage.getItem("bookmarks")!==null){
    bookmarks=JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmarks(bookmarks)
}
var nameRegex = /^[A-Za-z_]{1,}$/;
function nameValidate(){
    if(nameRegex.test(siteName.value)){
        
        return true;
    }else{
        
        return false;
    }
}
var urlRegex = /^(https|http):\/\/(www\.)[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/;

function urlValidate(){
    if(urlRegex.test(siteURL.value)){
        
        return true;
    }else{
    
        return false;
    }
}
siteName.onkeyup = function(){
    if(nameValidate() && urlValidate()){
        siteName.style.borderColor = "green";
        submitBtn.removeAttribute("disabled");
    }else{
        siteName.style.borderColor = "red";
        submitBtn.disabled="true";
    }
}
siteURL.onkeyup = function(){
    if(nameValidate() && urlValidate()){
        siteURL.style.borderColor = "green";
        submitBtn.removeAttribute("disabled");
    }else{
        siteURL.style.borderColor = "red";
        submitBtn.disabled="true";
    }
}
console.log('testURL',urlRegex.test('wwww.google.com'));
console.log(nameRegex.test("0mM00"));

submitBtn.onclick = function(){
    if(submitBtn.innerHTML == "Update"){
        submitBtn.innerHTML == "Submit";
        var bookmark = {
            name: siteName.value,
            url: siteURL.value
        }
        bookmarks.splice(mainIndex,1,bookmark)
    }else{
        var bookmark = {
            name: siteName.value,
            url: siteURL.value
        }
        bookmarks.push(bookmark);
    }
    
    console.log(bookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    clearData();
    displayBookmarks(bookmarks);
}

function displayBookmarks(arr){
    var marks=``;
    for(var i=0;i<arr.length;i++){
        console.log(i);
        console.log(arr[i].url);
     marks +=`
                 <tr>
                 <td>${i+1}</td>    
                     <td>${arr[i].name}</td>              
                      <td>
                      <a href="${arr[i].url}">
                        <button class="btn btn-visit">
                          <i class="fa-solid fa-eye pe-2"></i>Visit
                       </button>
                       </a
                     </td>
                     <td>
                        <button onclick="updateBook(${i})" class="btn btn-info pe-2">
                         <i class=""></i>
                         Update
                       </button>
                      </td>
                      <td>
                        <button onclick="deleteBook(${i})" class="btn btn-delete pe-2">
                         <i class="fa-solid fa-trash-can"></i>
                         Delete
                       </button>
                      </td>
                  </tr>
                 `
    }
    tableContent.innerHTML = marks;
}
function deleteBook(deletedIndex){
    bookmarks.splice(deletedIndex,1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayBookmarks(bookmarks);
}
function clearData(){
    siteName.value='';
    siteURL.value='';
}
function updateBook(index){
    siteName.value = bookmarks[index].name;
    siteURL.value = bookmarks[index].url;
    submitBtn.innerHTML = "Update";
    mainIndex=index;
}
function search(term){
    var searchedBook = [];
    for(var i=0;i<bookmarks.length;i++){
        if(bookmarks[i].name.toLowerCase().includes(term.toLowerCase())){
            searchedBook.push(bookmarks[i]);
        }
        displayBookmarks(searchedBook);
    }
}
// var deleteBtns;
// var visitBtns;
// var closeBtn = document.getElementById("closeBtn");
// var boxModal = document.querySelector(".box-info");
// var bookmarks = [];

// if (localStorage.getItem("bookmarksList")) {
//   bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
//   for (var x = 0; x < bookmarks.length; x++) {
//     displayBookmark(x);
//   }
// }

// // =====> Display Function and adding click event to visit and delete buttons

// function displayBookmark(indexOfWebsite) {
//   var userURL = bookmarks[indexOfWebsite].siteURL;
//   var httpsRegex = /^https?:\/\//g;
//   if (httpsRegex.test(userURL)) {
//     validURL = userURL;
//     fixedURL = validURL
//       .split("")
//       .splice(validURL.match(httpsRegex)[0].length)
//       .join("");
//   } else {
//     var fixedURL = userURL;
//     validURL = `https://${userURL}`;
//   }
//   var newBookmark = `
//               <tr>
//                 <td>${indexOfWebsite + 1}</td>
//                 <td>${bookmarks[indexOfWebsite].siteName}</td>              
//                 <td>
//                   <button class="btn btn-visit" data-index="${indexOfWebsite}">
//                     <i class="fa-solid fa-eye pe-2"></i>Visit
//                   </button>
//                 </td>
//                 <td>
//                   <button class="btn btn-delete pe-2" data-index="${indexOfWebsite}">
//                     <i class="fa-solid fa-trash-can"></i>
//                     Delete
//                   </button>
//                 </td>
//             </tr>
//             `;
//   tableContent.innerHTML += newBookmark;

//   // =====> Adding Click Event to All delete buttons every time a new bookmark being added

//   deleteBtns = document.querySelectorAll(".btn-delete");
//   if (deleteBtns) {
//     for (var j = 0; j < deleteBtns.length; j++) {
//       deleteBtns[j].addEventListener("click", function (e) {
//         deleteBookmark(e);
//       });
//     }
//   }

//   // =====> Adding Click Event to All visit buttons every time a new bookmark being added

//   visitBtns = document.querySelectorAll(".btn-visit");
//   if (visitBtns) {
//     for (var l = 0; l < visitBtns.length; l++) {
//       visitBtns[l].addEventListener("click", function (e) {
//         visitWebsite(e);
//       });
//     }
//   }
// }

// // =====> Clear Input Function

// function clearInput() {
//   siteName.value = "";
//   siteURL.value = "";
// }

// // =====> Capitalize Function ==> take string and makes it capitalize

// function capitalize(str) {
//   let strArr = str.split("");
//   strArr[0] = strArr[0].toUpperCase();
//   return strArr.join("");
// }

// // =====> Submit Function

// submitBtn.addEventListener("click", function () {
//   if (
//     siteName.classList.contains("is-valid") &&
//     siteURL.classList.contains("is-valid")
//   ) {
//     var bookmark = {
//       siteName: capitalize(siteName.value),
//       siteURL: siteURL.value,
//     };
//     bookmarks.push(bookmark);
//     localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
//     displayBookmark(bookmarks.length - 1);
//     clearInput();
//     siteName.classList.remove("is-valid");
//     siteURL.classList.remove("is-valid");
//   } else {
//     boxModal.classList.remove("d-none");
//   }
// });

// // =====> Delete Function

// function deleteBookmark(e) {
//   tableContent.innerHTML = "";
//   var deletedIndex = e.target.dataset.index;
//   bookmarks.splice(deletedIndex, 1);
//   for (var k = 0; k < bookmarks.length; k++) {
//     displayBookmark(k);
//   }
//   localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
// }

// // =====> Visit Function

// function visitWebsite(e) {
//   var websiteIndex = e.target.dataset.index;
//   var httpsRegex = /^https?:\/\//;
//   if (httpsRegex.test(bookmarks[websiteIndex].siteURL)) {
//     open(bookmarks[websiteIndex].siteURL);
//   } else {
//     open(`https://${bookmarks[websiteIndex].siteURL}`);
//   }
// }

// // =====> Making sure that user enter the correct data

// var nameRegex = /^\w{3,}(\s+\w+)*$/;
// var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

// siteName.addEventListener("input", function () {
//   validate(siteName, nameRegex);
// });

// siteURL.addEventListener("input", function () {
//   validate(siteURL, urlRegex);
// });

// function validate(element, regex) {
//   var testRegex = regex;
//   if (testRegex.test(element.value)) {
//     element.classList.add("is-valid");
//     element.classList.remove("is-invalid");
//   } else {
//     element.classList.add("is-invalid");
//     element.classList.remove("is-valid");
//   }
// }

// //Close Modal Function

// function closeModal() {
//   boxModal.classList.add("d-none");
// }

// // 3 ways to close modal => close button -  Esc key - clicking outside modal

// closeBtn.addEventListener("click", closeModal);

// document.addEventListener("keydown", function (e) {
//   if (e.key == "Escape") {
//     closeModal();
//   }
// });

// document.addEventListener("click", function (e) {
//   if (e.target.classList.contains("box-info")) {
//     closeModal();
//   }
// });
