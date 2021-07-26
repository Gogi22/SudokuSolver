const generateSudokuLayout = () => {
    let grid = ''
    for (let i = 1; i <= 9; i++) {
        let row = '"'
        for (let j = 1; j <= 9; j++) {
            square = $(document.createElement('div'))
            if (i == 1) {
                square.addClass('top-big')
            }
            if (i % 3 == 0) {
                square.addClass('bottom-big')
            }
            else {
                square.addClass('bottom')
            }
            if (j == 9) {
                square.addClass('right-big')
            }
            if (j % 3 == 1) {
                square.addClass('left-big')
            }
            else {
                square.addClass('left')
            }

            let n = `box-${i}-${j}`
            square.addClass(`box ${n}`).css('gridArea', n)
            sudoku.append(square)
            row += n + ' '
        }
        row += '"'
        grid += row
    }
    sudoku.css('grid-template-areas', grid)
}

const generateControls = () => {
    for (let i = 1; i <= 9; i++) {
        let key = $(document.createElement('div'))
        let keyName = `key-${i}`
        key.text(i).addClass(keyName).addClass('key keypad').css('grid-area', keyName)
        controls.append(key)
    }
    let delet = $(document.createElement('div'))
    let restart = $(document.createElement('div'))
    let check = $(document.createElement('div'))
    let answer = $(document.createElement('div'))
    let timer = $(document.createElement('div'))

    delet.addClass('btn delete keypad').css('gridArea', 'delete').text('Delete')
    restart.addClass('btn restart keypad').css('gridArea', 'restart').text('Restart')
    check.addClass('btn check keypad').css('gridArea', 'check').text('Check')
    answer.addClass('btn answer keypad').css('gridArea', 'answer').text('Reveal the Answer')
    timer.addClass('timer').css('gridArea', 'timer')

    controls.append(delet, restart, check, answer, timer)
}

const sudokuReset = () => {
    for (let i = 0; i < 81; i++) {
        if (!$(sudoku.children()[i]).hasClass('pre-set'))
            $(sudoku.children()[i]).text('')
    }

    if (selectedBox != null)
        selectedBox.click()

}


const sudoku = $('.sudoku')
const controls = $('.controls')
let selectedBox = null;

generateSudokuLayout()
generateControls()
generateSudoku()
const timer = $('.timer')
$('.timer').hide()

window.onload = () => {
    let time = 0
    setInterval(() => {
        $('.timer').show()
        let seconds = time % 60
        let minutes = Math.floor(time / 60) % 60
        let hours = Math.floor(time / 3600)
        seconds = seconds < 10 ? '0' + seconds : seconds
        minutes = minutes < 10 ? '0' + minutes : minutes
        hours = hours < 10 ? '0' + hours : hours
        hours = hours == '00' ? '' : hours + ':'
        timer.text(`${hours}${minutes}:${seconds}`)
        time += 1
    }, 1000)
}

$('.box').on('click', e => {
    let toggle = $(e.currentTarget).hasClass('select-box');
    $('.box').removeClass('select-box')
    $(e.currentTarget).toggleClass('select-box', !toggle)
    selectedBox = !toggle ? e.currentTarget : null
    selectedBox = $(e.currentTarget).hasClass('pre-set') ? null : selectedBox
})

$(document).on('keypress', e => {
    if (e.which >= 49 && e.which <= 57) {
        $(selectedBox).text(String.fromCharCode(e.which))
    }
})

$(document).on('keydown', e => {
    if ((e.which == 8 || e.which == 46))
        $(selectedBox).text('')

    // reset restart
    $('.restart').text('Restart').removeClass('restart-selected')
})

$(document).on('click', (e) => {
    // reset restart if clicked outside
    if ($(e.target)[0] !== $('.restart')[0]) {
        $('.restart').text('Restart').removeClass('restart-selected')
    }
})

$('.key').on('click', e => {
    let keyClass = $(e.currentTarget).attr('class').split(/\s+/)[0];
    $(selectedBox).text(keyClass.substring(keyClass.length - 1))
})

$('.delete').on('click', (e) => {
    $(selectedBox).text('')
})

$('.restart').on('click', () => {
    if ($('.restart').text() == 'Confirm?') {
        $('.restart').text('Restart').toggleClass('restart-selected')
        sudokuReset()
    }
    else {
        $('.restart').text('Confirm?').toggleClass('restart-selected')
    }
})

$('.check').on('click', () => {
    if (isValid()) {
        for (let i = 0; i < 81; i++) {
            if ($(sudoku.children()[i]).text() == '') {
                alert("It doesn't look right")
                return
            }
        }
        alert('Well Done!')
    }
    else {
        alert("It doesn't look right")
    }
})

$('.answer').on('click', () => {
    if ($('.answer').text() != 'Reveal the Answer') {
        speedup = !speedup
        let text = speedup ? 'Speed Down' : 'Speed Up'
        $('.answer').text(text)
    }
    else {
        sudokuReset()
        $('.answer').text('Speed Up')
        $('.restart').css('pointer-events', 'none')
        sudokuSolver()
    }
})

$('.easy').on('click', () => {
    $('.easy').addClass('active')
    $('.medium').css('pointer-events', 'none')
    $('.hard').css('pointer-events', 'none')
    sudokuReset()
    generateSudoku('easy')
})

$('.medium').on('click', () => {
    $('.medium').addClass('active')
    $('.easy').css('pointer-events', 'none')
    $('.hard').css('pointer-events', 'none')
    sudokuReset()
    generateSudoku('medium')
})

$('.hard').on('click', () => {
    $('.hard').addClass('active')
    $('.easy').css('pointer-events', 'none')
    $('.medium').css('pointer-events', 'none')
    sudokuReset()
    generateSudoku('hard')
})


