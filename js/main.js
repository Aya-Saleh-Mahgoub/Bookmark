var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var trueNameRegex = document.querySelector('.icons-name-regex i.fa-solid.fa-check');
var falseNameRegex = document.querySelector('.icons-name-regex i.fa-solid.fa-xmark');
var trueUrlRegex = document.querySelector('.icons-url-regex i.fa-solid.fa-check');
var falseUrlRegex = document.querySelector('.icons-url-regex i.fa-solid.fa-xmark');
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
    if(nameValidate()){
        siteName.style.borderColor = "green";
        trueNameRegex.style.display = "block";
        falseNameRegex.style.display = "none";
        submitBtn.removeAttribute("disabled");
    }else{
        siteName.style.borderColor = "red";
        trueNameRegex.style.display = "none";
        falseNameRegex.style.display = "block";
        submitBtn.disabled="true";
    }
}
siteURL.onkeyup = function(){
    if(urlValidate()){
        siteURL.style.borderColor = "green";
        trueUrlRegex.style.display = "block";
        falseUrlRegex.style.display = "none";
        submitBtn.removeAttribute("disabled");
    }else{
        siteURL.style.borderColor = "red";
        trueUrlRegex.style.display = "none";
        falseUrlRegex.style.display = "block";
        submitBtn.disabled="true";
    }
}
console.log('test http://www',urlRegex.test('www.google.com'));
console.log('test https://www',urlRegex.test('www.google.com'));
console.log(nameRegex.test("route"));

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
                        <button onclick="updateBook(${i})" class="btn btn-success  pe-2">
                         <i class="fas fa-edit"></i>
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
