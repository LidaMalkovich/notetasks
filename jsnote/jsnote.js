  'use strict'

  const jsonText1 =  `[
      {
        "id":"1",
        "theme":"Тема 1",
        "inserted":"", 
        "text": "Они существуют, в основном, чтобы унифицировать синтаксис. На практике часто используется только insertAdjacentHTML. Потому что для элементов и текста у нас есть методы append/prepend/before/after – их быстрее написать, и они могут вставлять как узлы, так и текст.",
        "order":"1"
    
    
      },
      {
        "id":"2",
        "theme":"Тема 2",
        "inserted":"", 
        "text": "Как сделать список Li ссылкой с помощью стилей CSS, чтобы клик был не по самой ссылке, а по блоку списка?",
        "order":"2"
      }
    ]`;



    const ListTasks = document.getElementById('Tasks');
    let menuState = 0;
    var taskItemClassName = 'newTaskId';
    //Построение списка задач с json
    const tasks = JSON.parse(jsonText1);   
    let arrTask = [];
    let idDeletedTask;
    let idUpdateTask;

    for (let task of tasks) {       
        
        let div = document.createElement('div');
        div.id = task.id;
        div.className = "newTaskId";
        div.contentEditable = "false";
        div.innerHTML = task.theme;
        ListTasks.append(div);  
        arrTask.push(task);      
    }



    //Создание новой задачи
    function openModal(){
  
      let lastIdTasks = arrTask.length + 1; 

      let div = document.createElement('div');
      div.id = lastIdTasks;
      div.className = "newTaskId";
      div.contentEditable = "false";  
      div.innerHTML = 'Новая задача';
      ListTasks.append(div);   

      let newTask = {
          id:  div.id,
          theme: div.innerHTML,
          inserted:"",
          text:div.innerHTML,
          order:div.id,
      };  

      //Увеличение списка задач
      arrTask.push(newTask);
      //в будущем отправка на сервер
      SaveJson(arrTask); 
    };


    //Редактирование темы
    function changeTheme(){
      let findTask = arrTask.find(item => item.id == idUpdateTask);

      let idUpdate = document.getElementById(idUpdateTask);

      idUpdate.contentEditable = "true"; 
      let active = "newTaskId--active";
      idUpdate.classList.add(active);      
        ///НАДО ПЕРЕНЕСТИ КУДА-ТО!!!!!!      
        let newTheme = document.getElementById(idUpdateTask).innerHTML;
        findTask.theme = newTheme;

        arrTask.splice(idUpdateTask, 1,findTask);
        SaveJson(arrTask);  
    };
    

    
    
    /* Контексное меню */
    document.oncontextmenu = function(e) { 
    if (clickInsideElement( e, taskItemClassName )){
      e.preventDefault();     
      openContextMenu(); 
    }else {
      closeContextMenu();      
      }     
    };
  
    function openContextMenu(){
      if(menuState != 1){
        menuState = 1; 
        let menu = document.querySelector(".context-menu");
        let active = "context-menu--active";
        menu.classList.add(active);
      }
    };

    function closeContextMenu() {
      if ( menuState !== 0 ) {
        menuState = 0;
        let menu = document.querySelector(".context-menu");
        let active = "context-menu--active";
        menu.classList.remove(active);
      }
    };
    function stopUpdate(){
      let idUpdate = document.getElementById(idUpdateTask);
      idUpdate.contentEditable = "true"; 
      let active = "newTaskId--active";
      idUpdate.classList.remove(active); 
    };

    function clickInsideElement(e,className){
      var el = e.srcElement || e.target;
     
      if (el.classList.contains(className)) {        
      
        idDeletedTask = event.target.id;
        idUpdateTask  = event.target.id;
        return el;
       
      } else {
        while ( el = el.parentNode ) {
          if ( el.classList && el.classList.contains(className) ) {
           // deleteTask(event.target.id);
            return el;
          }
        }
      }     
      return false;
    };

    function deleteTask(){
      let findTask = arrTask.find(item => item.id == idDeletedTask);
      let elemDelete = document.getElementById(idDeletedTask);   
      elemDelete.remove();
      arrTask.pop(findTask); 
      SaveJson(arrTask);        
  };

  //Открытие окна c текстом о задаче
  function openTaskInfo(taskId){
    let divInfo = document.getElementById('info');
    let findTask = arrTask.find(item => item.id == taskId);
    let infoText = findTask.text;
    console.log(infoText);
    divInfo.textContent = infoText;

   // return alert('нажата!'+ taskId);
    debugger;
  };

  /*Действие клика */
  document.addEventListener( "click", function(e) {
    var button = e.which || e.button;
    
    if(e.className = "newTaskId"){
      openTaskInfo(event.target.id);
    } 

    if ( button === 1 ) {
      closeContextMenu();
      }
    
      debugger;
  });  

    

    //Отправка на сервер
    function SaveJson(){
        let jsonText2 = JSON.stringify(arrTask);
       // return(alert('Изменение сохранилось! '+ jsonText2));
    };
   // debugger;