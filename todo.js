const form= document.getElementById("form");
const todo= document.getElementById("todo"); 
const all_items= document.getElementById("all_items");   
const task_container_header= document.getElementById("task_container_header");
const todo_list_icon= document.getElementById("todo_list_icon");


let task_id=0;

let all_tasks_array=[];
let count_obj={
    highest_count:0,
    lowest_count:0,
    medium_count:0,
    total_count:0
}

// console.log(form);

form.addEventListener("submit", on_clicking_add);
function on_clicking_add(event){
    event.preventDefault();
    // console.log("form submitted");
    let task_info={
        task: form.task.value,
        dateTime: form.dateTime.value,
        select_priority: form.select_priority.value,
        id:++task_id
    }
    // console.log(task_info);

    all_tasks_array.push(task_info);
    if(task_info.select_priority==="Highest"){
        ++(count_obj.highest_count);
        
    }
    else if(task_info.select_priority==="Medium"){
        ++(count_obj.medium_count);
    }
    else if(task_info.select_priority==="Lowest"){
        ++(count_obj.lowest_count);
    }
    ++(count_obj.total_count); 
    if(count_obj.total_count>0){
        todo_list_icon.classList.add("hide");
        task_container_header.classList.remove("hide");
    }
    


    let count_span= document.getElementById("html_count_span");
    count_span.innerHTML="";
    count_span.innerHTML=`${count_obj.total_count} of ${count_obj.total_count}`;
    // console.log(count_obj);
    // console.log(all_tasks_array);
    add_task_toContainer(task_info);
    form.reset();


}

function add_task_toContainer(task_info){
    

    let add_this_task_div= document.createElement("div");
    add_this_task_div.className="container_item";
    add_this_task_div.id=task_info.id;
    add_this_task_div.innerHTML=`
                                <div>
                                    <p>${task_info.task}</p>
                                    <span>${task_info.dateTime}</span>
                                </div>
                                <span id="task_options">
                                    <span>${task_info.select_priority}</span>
                                    <button class="material-icons editTask" id="">edit</button>
                                    <button class="material-icons deleteTask_btn" id="">delete</button>
                                </span>`
    // console.log(add_this_task_div);
    all_items.appendChild(add_this_task_div);
    let delete_btn= document.querySelectorAll(".deleteTask_btn");
    delete_btn.forEach(Eachbtn=>{
        Eachbtn.addEventListener("click", deleteTask);
    });

    let edit_btn= document.querySelectorAll(".editTask");
    edit_btn.forEach(edit=>{
        edit.addEventListener("click", editTask);
    })



    
    
}

function deleteTask(event){
    // console.log("hello");
    
    let parent= event.target.parentNode.parentNode;
    // console.log(parent.id);
    for(let i=0;i<all_tasks_array.length;i++){
        if(Number(all_tasks_array[i].id)===Number(parent.id)){
            if(all_tasks_array[i].select_priority==="Highest"){
                // console.log(true);
                --(count_obj.highest_count);
                all_tasks_array.splice(i,1);
            }
            else if(all_tasks_array[i].select_priority==="Medium"){
                // console.log(true);
                --(count_obj.medium_count);
                all_tasks_array.splice(i,1);
            }
            else if(all_tasks_array[i].select_priority==="Medium"){
                // console.log(true);
                --(count_obj.lowest_count);
                all_tasks_array.splice(i,1);
            }
        }
        
    }
    --(count_obj.total_count);
    let count_span= document.getElementById("html_count_span");
    count_span.innerHTML="";
    count_span.innerHTML=`${count_obj.total_count} of ${count_obj.total_count}`;
    // console.log(count_obj);
    parent.remove();

    if(count_obj.total_count==0){
        todo_list_icon.classList.remove("hide");
        task_container_header.classList.add("hide");
    }
    
}
function editTask(event){
    // console.log(event.target);
}


//          functionality for priority filter

let highest_priority = document.getElementById("highest");
highest_priority.addEventListener("change",()=>{
    let filtered_highest_priority;
    if(highest_priority.checked){
        filtered_highest_priority= all_tasks_array.filter(task=>{
            return task.select_priority==="Highest";
        });
        // console.log(filtered_highest_priority);
        all_items.innerHTML="";
        filtered_highest_priority.forEach(task=>{
            add_task_toContainer(task);
        });

        let count_span= document.getElementById("html_count_span");
        let h4_div= document.getElementById("h4_div");
        h4_div.innerText="";
        h4_div.innerText="Highest Priority"
        count_span.innerHTML="";
        count_span.innerHTML=`${count_obj.highest_count} of ${count_obj.total_count}`;
        // console.log(count_obj);

    }
    

});
let medium_priority = document.getElementById("medium");
medium_priority.addEventListener("change",()=>{
    let filtered_highest_priority;
    if(medium_priority.checked){
        filtered_highest_priority= all_tasks_array.filter(task=>{
            return task.select_priority==="Medium";
        });
        // console.log(filtered_highest_priority);
        all_items.innerHTML="";
        filtered_highest_priority.forEach(task=>{
            add_task_toContainer(task);
        });

        let count_span= document.getElementById("html_count_span");
        let h4_div= document.getElementById("h4_div");
        h4_div.innerText="";
        h4_div.innerText="Medium Priority"
        count_span.innerHTML="";
        count_span.innerHTML=`${count_obj.medium_count} of ${count_obj.total_count}`;
        // console.log(count_obj);

    }
    

});
let lowest_priority = document.getElementById("low");
lowest_priority.addEventListener("change",()=>{
    let filtered_highest_priority;
    if(lowest_priority.checked){
        filtered_highest_priority= all_tasks_array.filter(task=>{
            return task.select_priority==="Lowest";
        });
        // console.log(filtered_highest_priority);
        all_items.innerHTML="";
        filtered_highest_priority.forEach(task=>{
            add_task_toContainer(task);
        });
        

        let count_span= document.getElementById("html_count_span");
        let h4_div= document.getElementById("h4_div");
        h4_div.innerText="";
        h4_div.innerText="Lowest Priority"
        count_span.innerHTML="";
        count_span.innerHTML=`${count_obj.lowest_count} of ${count_obj.total_count}`;
        // console.log(count_obj);

    }
    

});
// console.log(highest_priority);
// console.log(medium_priority);
// console.log(lowest_priority);

//          adding functionality for search bar--

let search_bar= document.getElementById("search_bar");
search_bar.addEventListener("input" , ()=>{
    let searched_text= search_bar.value.toLowerCase();
    // console.log(searched_text);
    let searched_task=all_tasks_array.filter(each_tasks=>{
        return each_tasks.task.toLowerCase().includes(searched_text);
    });

    if(searched_task.length>0){
        all_items.innerText="";
        searched_task.forEach(task=>{
            add_task_toContainer(task);
        });
    }else{
        return;
    }
    
});
