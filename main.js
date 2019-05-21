
class FiboIterator {
    constructor() {
        this.index = 0;  
        this.init(); 
    }

    init() {
        this.errorNext = document.querySelector('#next-error');
        this.errorPrev = document.querySelector('#prev-error');
        this.keyMessage = document.querySelector('#key-message');
        
        this.isNextCheck = true;
        this.isPrevCheck = false;
        this.isStarted = false;

        this.startBtn = document.querySelector('#start-btn');
        this.startBtn.addEventListener('click', () => {
            iter.start();
        })
        this.nextBtn = document.querySelector('#next-btn');
        this.nextBtn.addEventListener('click', () => {
            iter.nextButton();
        })
        this.prevBtn = document.querySelector('#prev-btn');
        this.prevBtn.addEventListener('click', () => {
            iter.prevButton();
        })
        this.currentBtn = document.querySelector('#current-btn');
        this.currentBtn.addEventListener('click', () => {
            iter.currentButton();
        })
        this.rewindBtn = document.querySelector('#rewind-btn');
        this.rewindBtn.addEventListener('click', () => {
            iter.rewindButton();
        })
        this.keyBtn = document.querySelector('#key-btn');
        this.keyBtn.addEventListener('click', () => {
            iter.keyButton();
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

    nextButton() {
        const numberList = document.querySelectorAll('li');
       
        this.isPrevCheck = true;
        this.hideMessage(this.errorPrev);
        if(!this.isNextCheck) return false;
        
        if(this.index >= numberList.length - 1) {
            this.displayMessage(this.errorNext);
            return this.isNextCheck = false;
        }
        
        numberList[this.index].classList.remove('active');  
        this.index++;
        numberList[this.index].classList.add('active');  
    }

    prevButton() {
        const numberList = document.querySelectorAll('li');
      
        this.isNextCheck = true;
        this.hideMessage(this.errorNext);
        if(!this.isPrevCheck) return false;
        
        if(this.index == 0) {
           this.displayMessage(this.errorPrev);
           return this.isPrevCheck = false;
        }
        
        numberList[this.index].classList.remove('active');  
        this.index--;
       
        numberList[this.index].classList.add('active');  
    }

    //create fibonacci numbers and save in array
    start() {
        this.isStarted = true;
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
        this.fibonacciRow = arr; // variable for fibonacci row
        this.render();    
    }

    // return current element
    currentButton() {
        const numberList = document.querySelectorAll('li');
        numberList[this.index].classList.add('current'); 
        setTimeout(() => {
            numberList[this.index].classList.remove('current');  
        }, 500) 
                   
    }
    
    //refresh of iretator
    rewindButton() {
        const numberList = document.querySelectorAll('li');
        numberList[this.index].classList.remove('active');
        this.index = 0;
        numberList[this.index].classList.add('active');
        this.isNextCheck = true;
        this.hideMessage(this.errorNext);
    }

    //return index of element
    keyButton() {
        if(!this.isStarted) return null;
        this.keyMessage.innerHTML = `index of current element is <em>${this.index}</em>`;
        setTimeout(() => {
            this.keyMessage.textContent = ``;
        }, 1000);
    }   

    //return next element
    next() {
        this.isPrevCheck = true;
        if(!this.isNextCheck) return null;
        
        if(this.index >= this.fibonacciRow.length - 1) {
            this.isNextCheck = false;
            return null;
        }

        this.index++;
        return this.fibonacciRow[this.index];
    }

    //return previous element
    prev() {
        this.isNextCheck = true;
        if(!this.isPrevCheck) return null;
        
        if(this.index == 0) {
            this.isPrevCheck = false;
            return null;
        }

        this.index--;
        return this.fibonacciRow[this.index];  
    }

    current() {
        return this.fibonacciRow[this.index];
        
    }

    key() {
        if(!this.isStarted) return null;
        return this.index;
        
    }

    rewind() {
        this.index = 0;  
    }

}

const iter = new FiboIterator();

