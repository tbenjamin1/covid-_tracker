let imgInput = document.getElementById('imageInput');
imgInput.addEventListener('change', function(e) {
  if(e.target.files) {
    //here we get the image file
    let imageFile = e.target.files[0]; 
    var reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = function (e) {
      // Creates image object
      var myImage = new Image(); 
      // Assigns converted image to image object
      myImage.src = e.target.result; 
      myImage.onload = function(ev) {
        // Creates a canvas object
        var myCanvas = document.getElementById("myCanvas"); 

        // Creates a contect object
        var myContext = myCanvas.getContext("2d"); 
        // Assigns image's width to canvas
        myCanvas.width = myImage.width; 
        // Assigns image's height to canvas
        myCanvas.height = myImage.height;
        // Draws the image on canvas 
        myContext.drawImage(myImage,0,0); 
        let imgData = myCanvas.toDataURL("image/jpeg",0.75); 
        
      }
    }
  }
});





// to do list
let imageInput=document.getElementById("imageInput");

const discriptionInput=document.getElementById("id03");
const priority=document.getElementById("priority");
const form = document.getElementById("id0");
const nameInput=document.getElementById("id02");
const addnewtask =document.getElementById("btnbutton");
let todoList = [];
let imagelist=[];
let discriptionlist=[];
let prioritlist=[];
form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    addTodo();
  });
  
    function addTodo() {
      
        // get input
        const newTodo =  nameInput.value;
        // return if nothing was entered
        if (!newTodo) return;
        // add the new task to todo list
        todoList.push({
          text: newTodo,
          completed: false,
        });
        // add the todo list to localstorage
        localStorage.setItem("todos", JSON.stringify(todoList));
        const image = imageInput.value;
        // return if nothing was entered
        if (!image) return;
        // add the new task to todo list
        imagelist.push({
          text: image,
          completed: false,
        });
        // add the todo list to localstorage
        localStorage.setItem("todoimage", JSON.stringify(image));
        //getdesp
        const discription = discriptionInput.value;
        // return if nothing was entered
        if (!discription) return;
        // add the new task to todo list
        discriptionlist.push({
          text: discription,
          completed: false,
        });
        // add the todo list to localstorage
        localStorage.setItem("tododiscription", JSON.stringify(discriptionlist));
        let priorit=priority.value;
        // return if nothing was entered
        if (!priorit) return;
        // add the new task to todo list
        prioritlist.push({
          text: priorit,
          completed: false,
        });
        // add the todo list to localstorage
        localStorage.setItem("todopriority", JSON.stringify(prioritlist));
        // render todo list
      
        showtask();
      }

   
    

    
    function showtask() {  
          let webtask=localStorage.getItem("todos");
          if(webtask==null){
            todoList=[];
          }
          else{
            todoList=JSON.parse(webtask);
               }
      // inner html all task
      let html='';
         let addedtasklist=document.getElementById("todo");
         todoList.forEach((item,index) => {
             html+=`
       
             <ol class="not completed">
             
               <li id="li">
               
               ${item} 
                   <button type="button" id="btnnn" onclick="deleteitem(${index})">detele</button>
                   <button type="button" id="btnnn" onclick="edittask(${index})">update</button>
                   <button type="checkbox" id="btnnn" >done</button>
                   <label for="date" id="day">date</label>
                   ${datebox}
                   </li>  
      
             </ol>
         `;
         
             
         });  
         addedtasklist.innerHTML=html;
      }
      // edit task
      function edittask(index){
        const newtask =document.getElementById("newbtn");
        const savetask =document.getElementById("savetask");
        let webtask=localStorage.getItem("todos");
        let todoList=JSON.parse(webtask);
        nameInput.value=todoList[index];
        newtask.style.display="none";
        savetask.style.display="block";
        
      }
      // delete item
      function deleteitem(index){
        let webtask=localStorage.getItem("todos");
        let todoList=JSON.parse(webtask);
        todoList.splice(index,1);
        localStorage.setItem("todos",JSON.stringify(todoList));
        showtask();
      }
      // search in list
      let searchtextbox=document.getElementById("searchtext");
      searchtextbox.addEventListener("input",function(){
        let list =document.querySelectorAll("ol");
        Array.from(list).forEach(function(item){
          let searchedtext =item.getElementsByTagName("li")[0].innerText;
          let searchtextval =searchtextbox.value;
          let re =new RegExp(searchtextval,'gi');
          if(searchedtext.match(re)){
            item.style.display="block";
          }
          else{
            item.style.display="none";
          }
        })
      })
      
      const date =  new Date();
      const day =date.getDay();
      const month=date.getMonth();
      const year =date.getFullYear();
      let datebox='+day+'-'+month+'-'+year+'
        
        
      