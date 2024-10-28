PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };


function validInteger (value) { // value can be a string or a number (integer)
  const num = Number(value);
  return Number.isInteger(num) && num > 0;
}  


function validatePriority(priority) { // value can be a string or a number (integer)
  const validPriority= Number(priority);
  return[1, 3, 5, 7].includes(validPriority) ? validPriority : PRIORITY["LOW"]
}
console.log(validatePriority("3"));

function todaysDate () {
  return new Date().toLocaleString('en-GB', {
    timeZone: 'UTC',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day:  '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
}).replace(',','');

}


class Task  {
  _added;
  _title;
  _priority;
  
  constructor(added, title, priority=0) {
    this._added= new Date();
    this._title=title;
    this._priority=priority;
  
  }
  
  get added() {
      return this._added;
    
  }
  get title() {
      return this._title
  } 
  set title(title) {
    this._title = title;
  }
  
  get priority() {
      return this._priority
    
  }
  set priority(priority) {
    if (priority >=0 && priority <= 7) {
      this._priority = priority;
    } else {
      throw Error('Invalid priority as it must be in the range of 0-7.')
    }
  
  }
  
}
 
class ToDo {
  constructor() {
    this.tasks = [];
  }
  add(passedTask) {
    this.tasks.push(passedTask);
    return this.tasks.length;
    }

  list(priority = 0) {
    const filteredTasks = priority === 0
    ? this.tasks //true
    : this.tasks.filter(task => task.priority === priority);

    return filteredTasks.map(task => [task.added, task.title, task.priority]);
    }
  

   delete(taskTitle) {
    const taskIndex = this.tasks.findIndex(task => task.title === taskTitle);
    if (taskIndex !== -1) {
    this.tasks.splice(taskIndex, 1);
    }
    return this.tasks.length;
    }
  
  task(taskTitle) {
    const taskPresent = this.tasks.find(task=> task.title === taskTitle);
    if(taskPresent) {
      return taskPresent;
    } else {
      throw new Error(`Task '${taskTitle} not present`);
     }
   }
  }


// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}