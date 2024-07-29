solutions = []
cache = new Map();

function generateTable() {

    const container = document.getElementById('table-container');    
    let n = Number(document.getElementById('n-number').value);    

    if(cache.has(n)) {
        populateRandomSolution(n);
        return;
    }
    solutions = [];
    if(n<=0)    n = 10;
    if(n>13)    n = 13;
    container.innerHTML = "";
    const table = document.createElement('table');        

    for(let i=0; i<n; i++) {
        const row = document.createElement('tr');
        for(let j=0; j<n; j++) {
            const cell = document.createElement('td');                        
            cell.id=`${i}_${j}`;            
            cell.textContent = '';            
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    container.appendChild(table);   
    if(!cache.has(n)) {
        solveNQueen(0, n);
        cache.set(n, solutions);
    }
    populateRandomSolution(n);
}

function populateRandomSolution(n) {
    let totalSolutions = solutions.length;
    let ran = Math.floor(Math.random() * totalSolutions);    
    let sub = solutions[ran];    

    for(let i=0; i<n; i++) {
        for(let j=0; j<n; j++) {
            document.getElementById(`${i}_${j}`).className = sub[i][j]=='Q'?'queen': 'not-queen';
        }
    }
}

function getCurrentState(n) {
    let subset = [];
    for(let i=0; i<n; i++) {
        let tmp = []
        for(let j=0; j<n; j++) {
            const val = document.getElementById(`${i}_${j}`).className;            
            tmp.push(val=='queen'?'Q':'');
        }
        subset.push(tmp);
    }    
    return subset;
}

function solveNQueen(row, n) {
    if(row===n) {        
        solutions.push(getCurrentState(n));
        return;
    }    
    for(let j=0; j<n; j++) {        
        document.getElementById(`${row}_${j}`).className = 'queen';
        if(!isValid(n, row, j)) {                            
            document.getElementById(`${row}_${j}`).className = 'not-queen';
            continue;
        }
        solveNQueen(row+1, n);        
        document.getElementById(`${row}_${j}`).className = 'not-queen';
    }    
}

function isValid(n, row, col) {

    let count = 0;

    // Check row-wise
    for(let i=0; i<n; i++) {
        const cell = document.getElementById(`${i}_${col}`);
        if(cell.className=='queen') {
            count++;
            if(count>1) {
                return false;
            }
        }
    }

    count = 0;
    // Check col-wise
    for(let i=0; i<n; i++) {
        const cell = document.getElementById(`${row}_${i}`);
        if(cell.className=='queen') {
            count++;
            if(count>1) {
                return false;
            }
        }
    }
    
    //Check up-left diagonally
    count = 0;
    let i = row;
    let j = col;

    while(j>=0 && i>=0) {
        const cell = document.getElementById(`${i}_${j}`);
        if(cell.className=='queen') {
            count++;
            if(count>1) {
                return false;
            }
        }
        i--; j--;
    }

    //Check down-right diagonally
    count = 0;
    i = row;
    j = col;

    while(j<n && i<n) {
        const cell = document.getElementById(`${i}_${j}`);
        if(cell.className=='queen') {
            count++;
            if(count>1) {
                return false;
            }
        }
        i++; j++;
    }


    //Check up-right diagonally
    count = 0;
    i = row;
    j = col;

    while(j<n && i>=0) {
        const cell = document.getElementById(`${i}_${j}`);
        if(cell.className=='queen') {
            count++;
            if(count>1) {
                return false;
            }
        }
        i--; j++;
    }

    //Check down-left diagonally
    count = 0;
    i = row;
    j = col;

    while(i<n && j>=0) {
        const cell = document.getElementById(`${i}_${j}`);
        if(cell.className=='queen') {
            count++;
            if(count>1) {
                return false;
            }
        }
        i++; j--;
    }

    return true;
}