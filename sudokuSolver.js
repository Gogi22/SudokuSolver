const isValid = () => {
    for(let i=1; i<=9; i++){
        const row = new Set()
        const col = new Set()
        for(let j=1; j<=9; j++){
            let rboxVal = $(`.box-${i}-${j}`).text()
            let cboxVal = $(`.box-${j}-${i}`).text()
            if (row.has(rboxVal) || col.has(cboxVal))
                return false
            if (rboxVal !== '')
                row.add(rboxVal)
            if (cboxVal != '')
                col.add(cboxVal)
        }
    }

    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            const square = new Set()
            for(let r=0; r<3; r++){
                for(let c=0; c<3; c++){
                    let boxVal = $(`.box-${i*3+r+1}-${j*3+c+1}`).text()
                    if (square.has(boxVal))
                        return false
                    if (boxVal != '')
                        square.add(boxVal)
                }
            }
        }
    }
    return true
}

var done = false
var speedup = false;

const sudokuSolver = async (r=1, c=1) => {
    if (r == 10){
        done = true
    }
    else if($(`.box-${r}-${c}`).hasClass('pre-set')){
        if(done) return
        if(c==9) await sudokuSolver(r+1, 1)
        else await sudokuSolver(r, c+1)
    }
    else {
        for(let i=1; i<=9; i++){
            $(`.box-${r}-${c}`).text(i)
            if (!speedup) await new Promise(r => setTimeout(r, 4))
            if(isValid()){
                if(speedup) await new Promise(r => setTimeout(r, 4))
                if(c==9) await sudokuSolver(r+1, 1)
                else await sudokuSolver(r, c+1)
            }
            if(done) return
            else $(`.box-${r}-${c}`).text('')
        }
    }
}