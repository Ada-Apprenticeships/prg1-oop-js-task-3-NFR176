PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };


function validInteger (value) { // accepts a string or numeric value and returns a boolean- showing if the 'value' can be positive
  return Number.isInteger(parseInt(value))  && String(parseInt (value)) === String(value) && Number(value) >=0;
}  // parseint converts a string to an integer-converts (value) to an integer


function validatePriority(priority) { // accept a string or a numerical value- then returns[1,3,5,7]
  const validPriority= Number(priority);
  return[1, 3, 5, 7].includes(validPriority) ? validPriority : PRIORITY["LOW"]
}//if value is invalid- print 'LOW'

function todaysDate () {
  return new Date().toLocaleString('en-GB', { //tolocalestring converts the date object to a string - en-gb just refers to the dd/mm/yy format
    timeZone: 'UTC', hour12: false, //appears as false because it should be in a 24 hour clock format
    year: 'numeric', month: '2-digit',//2-digit- thats how it will be displayed 09/07 etc etc
    day:  '2-digit', hour: '2-digit',
    minute: '2-digit', second: '2-digit',
}).replace(',','');//removes comma that would seperate date and time

}

class Task  {
  #added;//hash used for private fiels within classes//
  #title;
  #priority;
  
  constructor(title, priority) { 
    this.#added= todaysDate();
    this.#title=title;
    this.#priority=validatePriority(priority);
  
  }

  get added() {
  return this.#added;

}
get title() {
  return this.#title
} 

get priority() {
  return this.#priority;  
}

set priority(priority) {
 this.#priority = validatePriority(priority);

}
}

 class ToDo {
  constructor() {
    this.tasks = []//empty array to hold all the tasks
  }
  add(task) {
    if (task instanceof Task) {
    this.tasks.push(task);
    return this.tasks.length;
    } else {
      throw new Error (`Invalid Task instance`);
    }
  }
  remove(title){
    const taskIndex = this.tasks.findIndex(task => task.title.toLowerCase() === title.toLowerCase());
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);// used to remove specific tasks from a list of tasks//
      return true;
    }
    return false;

  }
  list(priority = 0) {
    return this.tasks
    .filter(task => priority === 0 || task.priority === priority)
    .map(task =>[task.added, task.title,task.priority]); //will take the first element from the listed task. and make into an array//
 }
 task(title) {
    const task = this.tasks.find(task => task.title.toLowerCase() === title.toLowerCase());
    if (!task) {
      throw new Error(`Task '${title}' Not Found`);
  }
  return task;
}
}
  
  // Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
  
}

