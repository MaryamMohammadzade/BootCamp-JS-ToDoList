var input= document.querySelector("input");
var all= document.querySelector(".all");
var pending= document.querySelector(".pending");
var completed= document.querySelector(".completed");
var clearAll= document.querySelector(".clear-all");
var taskList= document.querySelector("ul");
var inputCheckbox= document.querySelector("li input");
var taskArray=[];
 
input.addEventListener("keypress",  function(e){
    if(e.key=='Enter'&& input.value.trim() !== ''){
        var taskName = e.target.value;
        taskArray.push({
          name: taskName,
          taskStatus: 'pending'
        }) 
        creatLi(taskName);
        input.value="";
        show("all");
    }
}
)

all.addEventListener("click",  function(e){
  all.classList.add("blue");
  pending.classList.remove("blue");
  completed.classList.remove("blue");
  show("all");
}
)

pending.addEventListener("click",  function(e){
    pending.classList.add("blue");
    all.classList.remove("blue");
    completed.classList.remove("blue");
    show("pending");
  }
  )

  completed.addEventListener("click",  function(e){
      completed.classList.add("blue");
      all.classList.remove("blue");
      pending.classList.remove("blue");
      show("completed");
  }
  )

  clearAll.addEventListener("click",  function(e){
      completed.classList.add("blue");
      all.classList.remove("blue");
      pending.classList.remove("blue");
    
     
     }
  )

  taskList.addEventListener("click", function(e) {
    // تغییر استاتوس به completed
      e.target.classList.toggle("checked");
      var input = e.target.querySelector("input[type='checkbox']");
    if (input) {
      input.checked = !input.checked;
    }
     
    
  });

  function creatLi(myTaskName){
    const taskLi = document.createElement("li");
     const addCheckbox = document.createElement("input");
    addCheckbox.type = 'checkbox'; 
    addCheckbox.disabled = true;
    taskLi.append(addCheckbox ,myTaskName);
    taskList.appendChild(taskLi);
};

function show(filter){
   if(filter=='all'){
       for (let i = 0; i < taskArray.length; i++) {
        taskList.children[i].classList.remove("hidden");
       }
     }
   else{
      for (var j = 0; j < taskArray.length; j++) {
        taskList.children[j].classList.remove("hidden")
          if(taskArray[j].taskStatus!= filter){
            taskList.children[j].classList.add("hidden")
            console.log(taskList.children[j]);
          }
       }
    }
 };