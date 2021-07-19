var sudokuEasy, sudokuMedium, sudokuHard;
let sudokuGrid = [[ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
                  [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
                  [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
                  [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
                  [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
                  [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
                  [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ] ]


const fetchSudoku = async () => {
    let easyResponse = await fetch(`https://sugoku.herokuapp.com/board?difficulty=easy`)
    let mediumResponse = await fetch(`https://sugoku.herokuapp.com/board?difficulty=medium`)
    let hardResponse = await fetch(`https://sugoku.herokuapp.com/board?difficulty=hard`)
    let easyData = await easyResponse.json()
    let mediumData = await mediumResponse.json()
    let hardData = await hardResponse.json()

    sudokuEasy = easyData['board']
    sudokuMedium = mediumData['board']
    sudokuHard = hardData['board']
}
fetchSudoku()

const generateSudoku = (difficulty = null) => {
    let sudoku = sudokuGrid;
    if(difficulty !== null) {
        if(difficulty == "easy") sudoku = sudokuEasy
        else if(difficulty == "medium") sudoku = sudokuMedium
        else sudoku = sudokuHard
    }

    // check if retrieved sudoku is just zeros
    let empty=true;
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(sudoku[i][j] != 0){
                empty=false;
                break
            }
        }
    }
    if(empty) sudoku = sudokuGrid
    
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            $(`.box-${i+1}-${j+1}`).removeClass('pre-set')
            $(`.box-${i+1}-${j+1}`).text('')
            if(sudoku[i][j]){
                $(`.box-${i+1}-${j+1}`).text(sudoku[i][j])
                $(`.box-${i+1}-${j+1}`).addClass('pre-set')
            }
        }
    }
}
