const sudoku = $('.sudoku')

let grid = ""
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
        row += n + " "
    }
    row += '"'
    grid += row
}
sudoku.css('grid-template-areas', grid)

$('.box-3-5').text("5")
$('.box-9-9').text("9")

// var elems = document.querySelectorAll('.box')

// Array.from(elems).forEach(v => v.addEventListener('click', () => {
//    v.classList.add('select-box')
// }));

$('.box').on('click', e => {
    let toggle = $(e.currentTarget).hasClass('select-box');
    $('.box').removeClass('select-box')
    $(e.currentTarget).toggleClass('select-box', !toggle)
})
