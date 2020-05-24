    'use strict'

  const jsonText1 =  `[
      {
        "id":"1",
        "theme":"Тема 1",
        "inserted":"", 
        "info": "Они существуют, в основном, чтобы унифицировать синтаксис. На практике часто используется только insertAdjacentHTML. Потому что для элементов и текста у нас есть методы append/prepend/before/after – их быстрее написать, и они могут вставлять как узлы, так и текст.",
        "order":"1"
    
    
      },
      {
        "id":"2",
        "theme":"Тема 2",
        "inserted":"", 
        "info": "Как сделать список Li ссылкой с помощью стилей CSS, чтобы клик был не по самой ссылке, а по блоку списка?",
        "order":"2"
      }
    ]`;

   
    const data;
    console.log('data2'+ data);
    const ListTasks = document.getElementById('Tasks');
    let menuState = 0;
    var taskItemClassName = 'newTaskId';

    //Построение списка задач с json
    const tasks = JSON.parse(jsonText1);   
    let arrTask = [];  
    let onclickTask;
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
          info:div.innerHTML,
          order:div.id,
      };  
debugger;
      //Увеличение списка задач
      arrTask.push(newTask);
    
      //в будущем отправка на сервер
      SaveJson(arrTask); 

    };


    //Редактирование темы
    function changeTheme(){
      closeContextMenu();
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

    if(findTask == undefined) return false;

    let infoText = findTask.info;
   
    divInfo.textContent = infoText;
    let button = document.getElementById('buttonInfo');
  
    button.classList.remove("button_info_not_active");
    button.classList.add("button_info");

  };



    /* Кнопки в боковом меню*/
    function changeInfo(){
        let buttonChangeText = document.getElementById('infoSave');
        let editInfo = document.getElementById('info');
        let active = "info_task--active";  
        let buttonchangeStatus =  document.getElementById('infochangeStatus'); 
        let buttoninfoSend = document.getElementById('infoSendMail'); 


          //Добавить проверку на нажатие задачи!!!!!!!!!
          if(buttonChangeText.value != 'Сохранить'){
            buttonChangeText.value = 'Сохранить';
            editInfo.contentEditable = "true"; 
            editInfo.classList.add(active);
            
            //Возможность редактирование кнопок
            buttonchangeStatus.disabled = true;
            buttoninfoSend.disabled = true;
            buttonchangeStatus.classList.add("infobutton_not_active"); 
            buttoninfoSend.classList.add("infobutton_not_active"); 

          }else{

            let isSave = confirm("Точно сохранить?");

            if (isSave){                     
              buttonChangeText.value = 'Изменить'; 
              editInfo.classList.remove(active); 
              SaveInfo();   
              //Возможность редактирование кнопок
              buttonchangeStatus.disabled = false;
              buttoninfoSend.disabled = false;
              buttonchangeStatus.classList.remove("infobutton_not_active"); 
              buttoninfoSend.classList.remove("infobutton_not_active"); 
            }
                  
          } 
    };

    function changeStatus(){

      return alert('Статус ?');
    };

    function sendMail(){

      return alert('Почта ?');
    };


  //
  function SaveInfo(){
    let idTask = onclickTask;
    let findTask = arrTask.find(item => item.id == idTask);
    let elemUpdate = document.getElementById('info');  

    for(let i=0; i<= arrTask.length; i++){
   
      if(arrTask[i] == findTask){
        arrTask[i].info = elemUpdate.innerHTML;
      }
    }

    SaveJson(arrTask);
  };


  /*Действие клика нажатие на контекное меню*/
  document.querySelectorAll("context").forEach(function(el){
    el.addEventListener( "click", function(e) {
        var button = e.which || e.button;


        if ( button === 1 ) {
          closeContextMenu();
          }
        
          // debugger;
      });  
  });
  


    /*Действие клика на нажатие на div */
    document.querySelectorAll("div").forEach(function(el){
      el.addEventListener( "click", function(e) {
            var button = e.which || e.button;
    
         
     
            if(this.tagName=='DIV' && this.id !='buttonInfo' && event.target.id != 'infoSave'
            
            ){
              if(event.target.id.match('[0-9]')){
              //let idTask = document.getElementById(event.target.id); 
              //let active = "newTaskId--active";
              //idTask.classList.add(active); 
          
              openTaskInfo(event.target.id); 
              onclickTask = event.target.id;               
            }
          }
    debugger;
            if ( button === 1 ) {
              closeContextMenu();
              }
            
              // debugger;
          });  
      });



    //Отправка на сервер
    function SaveJson(){
        let jsonText2 = JSON.stringify(arrTask);
        return(alert('Изменение сохранилось! '+ jsonText2));
    };
   // debugger;