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