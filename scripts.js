var input= document.querySelector(`input[type="text"]`);
var barButtons = document.querySelectorAll(".btn")
var clearAll= document.querySelector(".clear-all");
var taskList= document.querySelector("ul");
const storeArray = JSON.parse(localStorage.getItem('tasks'))
var taskArray= storeArray ?? [];
var isEdited = false;
var filterFlag=''
show();
input.value="";

input.addEventListener("keypress",  function(e){
    if(e.key=='Enter'&& input.value.trim() !== ''){
      var taskName = e.target.value;
       if(!isEdited){
        taskArray.push({name: taskName, taskStatus: 'pending' }) 
       }else{
        taskArray[editId].name = taskName;
        isEdited = false;
       }
       show(filterFlag);
       input.value="";
       localStorage.setItem('tasks', JSON.stringify(taskArray));
    }
});

function creatLi(myTaskName , id){
  if(taskArray[id].taskStatus=='completed'){
    var myTaskStatus = 'checked';
  }else{
    var myTaskStatus = '';
  }
  taskList.innerHTML +=`
  <li>
    <div>
      <input type="checkbox" ${myTaskStatus} onclick="changeStatus(this , ${id})"/>
      <span class="${myTaskStatus}">${myTaskName}</span>
    </div>
    <div>
      <div>
         <button class='drop-item' onclick="deleteFunction(${id})" >Delete</button>
         <button class='drop-item' onclick="editFunction(${id})" >Edit</button>
      </div>
    </div>
 </li>`;
};

function editFunction(id ){
  editId = id;
  input.focus();
  input.value=taskArray[id].name;
  isEdited = true;
};

function deleteFunction( id){
  taskArray.splice(id, 1);
  localStorage.setItem('tasks', JSON.stringify(taskArray));
  show(filterFlag);
};

function changeStatus(thisInput , id) {  

     if(taskArray[id].taskStatus=='pending'){
      thisInput.nextElementSibling.classList.add("checked");
      taskArray[id].taskStatus='completed'
    } else{
          thisInput.nextElementSibling.classList.remove("checked");
          taskArray[id].taskStatus='pending'
    }  
    localStorage.setItem('tasks', JSON.stringify(taskArray)); 
  };

function show(filter='all'){
  addBlue();
  if(taskArray.length>0){
    taskList.innerHTML =``;

    if( filter=='all'){
      taskArray.forEach( (task , id) => {
          creatLi(task.name, id);
        });
      }
      else {
        taskArray.forEach((t , id) => {
         if(t.taskStatus==filter){
          creatLi(t.name, id);
         }
        });
     }
    }else {
      taskList.innerHTML=`Please add a task...`
    }
};

clearAll.addEventListener("click",  function(e){
    taskArray=[];
    localStorage.setItem('tasks', JSON.stringify(taskArray));
    show("all");
     })

function addBlue(){
  barButtons.forEach(element => {
    element.addEventListener("click", function() {
      document.querySelector(".blue").classList.remove("blue");
      this.classList.add("blue");
      show(this.innerHTML.toLowerCase());
      filterFlag=this.innerHTML.toLowerCase();
    })
    
  });
}
  

