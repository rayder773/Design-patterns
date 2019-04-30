
class FiboIterator {
    constructor() {
        this.index = 0;  
        this.init(); 
    }

    init() {
        this.errorNext = document.querySelector('#next-error');
        this.errorPrev = document.querySelector('#prev-error');
        this.keyMessage = document.querySelector('#key-message');
        

        this.nextCheck = true;
        this.prevCheck = false;
        this.started = false;

        this.startBtn = document.querySelector('#start-btn');
        this.startBtn.addEventListener('click', () => {
            iter.start();
        })
        this.nextBtn = document.querySelector('#next-btn');
        this.nextBtn.addEventListener('click', () => {
            iter.next();
        })
        this.prevBtn = document.querySelector('#prev-btn');
        this.prevBtn.addEventListener('click', () => {
            iter.prev();
        })
        this.currentBtn = document.querySelector('#current-btn');
        this.currentBtn.addEventListener('click', () => {
            iter.current();
        })
        this.rewindBtn = document.querySelector('#rewind-btn');
        this.rewindBtn.addEventListener('click', () => {
            iter.rewind();
        })
        this.keyBtn = document.querySelector('#key-btn');
        this.keyBtn.addEventListener('click', () => {
            iter.key();
        })
    }

    displayMessage(error) {
        error.classList.add('message');
    }

    hideMessage(error) {
        error.classList.remove('message');
    }

    render() {
        const fiboList = document.querySelector('#fibNum');
        fiboList.innerHTML = '';
        this.fibonacciRow.forEach((element) => {
            const listItem = document.createElement('li');
            listItem.textContent = element;
            fiboList.append(listItem);
        })
        fiboList.firstElementChild.classList.add('active');
    }

    //create fibonacci numbers and save in array
    start() {
        this.started = true;
        this.index = 0;
        const input = document.querySelector('#input').value;
        
        if(!input || !Number.parseInt(input)) return false;
      
        let maxNum = Number.parseInt(input);
        
        let first = 0;
        let second = 1;
        let temp;

        let arr = [first, second];

        for(let i = 0; i < (maxNum - 2); i++) {
            arr.push(first + second);
            temp = second;
            second += first;
            first = temp;
        }
        this.fibonacciRow = arr;
        this.render();    
    }

    // return current element
    current() {
        const numberList = document.querySelectorAll('li');
        numberList[this.index].classList.add('current'); 
        setTimeout(() => {
            numberList[this.index].classList.remove('current');  
        }, 500) 
                   
    }

    //return next element
    next() {
        
        const numberList = document.querySelectorAll('li');
       
        this.prevCheck = true;
        this.hideMessage(this.errorPrev);
        if(!this.nextCheck) return false;
       

        
        if(this.index >= numberList.length - 1) {
            this.displayMessage(this.errorNext);
            return this.nextCheck = false;
        }
        
        numberList[this.index].classList.remove('active');  
        this.index++;
        numberList[this.index].classList.add('active');  
    }

    //return previous element
    prev() {
        const numberList = document.querySelectorAll('li');
      
        this.nextCheck = true;
        this.hideMessage(this.errorNext);
        if(!this.prevCheck) return false;
        
        
        if(this.index == 0) {
           this.displayMessage(this.errorPrev);
           return this.prevCheck = false;
        }
        
        numberList[this.index].classList.remove('active');  
        this.index--;
       
        numberList[this.index].classList.add('active');  
    }

    //refresh of iretator
    rewind() {
        const numberList = document.querySelectorAll('li');
        numberList[this.index].classList.remove('active');
        this.index = 0;
        numberList[this.index].classList.add('active');
    }

    //return index of element
    key() {
        if(!this.started) return false;
        this.keyMessage.innerHTML = `index of current element is <em>${this.index}</em>`;
        setTimeout(() => {
            this.keyMessage.textContent = ``;
        }, 1000);
    }   



}

const iter = new FiboIterator();


