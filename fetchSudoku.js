try{
    $.get('https://sugoku.herokuapp.com/boagrd?difficulty=easy')
        .done((data) => console.log(data))
        .fail((error) => console.log(error,24234234234))
        .always(() => console.log('Done'))
}
catch (error){
    console.log('caught')
}
