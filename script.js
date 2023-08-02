const addItem=document.getElementById('button');
addItem.addEventListener('click',submitDetails);

//creating the function
function submitDetails(e){
     e.preventDefault();
    
    let todo=document.getElementById('todo').value;
    let desc=document.getElementById('description').value;

    //creating object
    let obj={
       "todo":todo,
       "description":desc
    }
    
    axios.post("http://localhost:4000/todo", obj)
    .then((responce)=>{
       console.log(responce);
      showDetails(responce.data);
    })
    .catch((err)=>{
      console.log(err);
    })

}

 //doing a get request
 window.addEventListener("DOMContentLoaded",()=>{
  axios.get("http://localhost:4000/todo")
  .then((response)=>{
    console.log(response);
    for(var i=0;i<response.data.length;i++){
      showDetails(response.data[i])
    }
  })
  .catch((err)=>{
    console.log(err)
  })
}) 

//showing the data on screen
function showDetails(obj){

  //creating elements
  let li=document.createElement('li');
  let done=document.createElement('button');
  let notDone=document.createElement('button');

  li.id="list";
  li.textContent = "ToDo: "+obj.name +" DESCRIPTION: " + obj.description  ;
 

  done.textContent="Done";
  done.style.margin="2px";
  li.appendChild(done);
  notDone.textContent="Not-Done";
  notDone.style.margin="2px";
  li.appendChild(notDone);
  
  document.getElementById('todo-list').appendChild(li);

  
  done.addEventListener("click",function(e){
    showTodosDone(obj);
   axios.delete(`http://localhost:4000/todo/${obj.id}`)
   .then((promis)=>{
     console.log(promis)
   })
   .catch((err)=>{
     console.log(err)
   })
   li.remove();
 })

 notDone.addEventListener("click",function(e){
   axios.delete(`http://localhost:4000/todo/${obj.id}`)
   .then((promis)=>{
     console.log(promis)
   })
   .catch((err)=>{
     console.log(err)
   })
   li.remove();
 })

}

function showTodosDone(obj){
   //creating elements
  let li=document.createElement('li'); 
  let delet=document.createElement('button');

  li.textContent = "ToDone: "+obj.name +" DESCRIPTION: " + obj.description  ;

  delet.textContent="Delete";
  delet.style.margin="2px";
  li.appendChild(delet);

  document.getElementById('todo-done').appendChild(li);
}


