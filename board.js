const sudoku = $('.sudoku')

let grid = ''
for(let i=1; i<=9;i++){
    let row = '"'
    for(let j=1; j<=9; j++){
        square=$(document.createElement('div'))
        if (i == 1){
            square.addClass('top-big') 
        }
        if (i%3 == 0){
            square.addClass('bottom-big') 
        }
        else{
            square.addClass('bottom')
        }
        if (j == 9){
            square.addClass('right-big') 
        }
        if (j%3 == 1){
            square.addClass('left-big') 
        }
        else{
            square.addClass('left')
        }
        
        let n = `box-${i}-${j}`
        square.addClass('box') 
        square.addClass(n)
        square.css('gridArea', n)
        sudoku.append(square)
        row += n + ' '
    }
    row += '"'
    grid += row
}
sudoku.css('grid-template-areas', grid)

$('.box-3-5').text('5')
$('.box-9-9').text('9')

let selectedBox = null;
const numColor = 'rgb(29,106,229)'

$('.box').on('click', e => {
    let toggle = $(e.currentTarget).hasClass('select-box');
    $('.box').removeClass('select-box')
    $(e.currentTarget).toggleClass('select-box', !toggle)
    selectedBox = !toggle ? e.currentTarget : null
})

$(document).on('keypress', e => {
    if(e.which >= 49 && e.which <= 57 && !$(selectedBox).hasClass('pre-set')){
        $(selectedBox).text(String.fromCharCode(e.which))
        $(selectedBox).css('color', numColor)
    }
})

let sudokuGrid = [[ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
                  [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
                  [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
                  [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
                  [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
                  [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
                  [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ] ]

for(let i = 0; i < 9; i++){
    for(let j = 0; j < 9; j++){
        if(sudokuGrid[i][j]){
            $(`.box-${i+1}-${j+1}`).text(sudokuGrid[i][j])
            $(`.box-${i+1}-${j+1}`).addClass('pre-set')
        }
    }
}