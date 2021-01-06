//lays out times for the day
//
times = [
    { displayTime: '9:00AM',
    check:'9',
     tasks:''},
     { displayTime: '10:00AM',
     check:'10',
     tasks:''},
     { displayTime: '11:00AM',
     check:'11',
     tasks:''},
     { displayTime: '12:00PM',
     check:'12',
     tasks:''},
     { displayTime: '1:00PM',
     check:'13',
     tasks:''},
     { displayTime: '2:00PM',
     check:'14',
     tasks:''},
     { displayTime: '3:00PM',
     check:'15',
     tasks:''},
     { displayTime: '4:00PM',
     check:'16',
     tasks:''},
     { displayTime: '5:00PM',
     check:'17',
     tasks:''},

]

//retieves saved string and formats it back into an array
retrieve = localStorage.getItem("tasks")
console.log(retrieve)
if(retrieve != null || retrieve != undefined){
times = JSON.parse(retrieve)
}
//sets the current day on the jumbotron
date = dayjs().format('dddd[, ]MMMM[ ]DD[, ]YYYY')

$('#displayDate').text(date)

//saves the hour of the current day
hour = dayjs().hour()

times.forEach(function(item){
    //creates the row for the hour
    row = $('<div>').addClass('shadow-lg row row-class rounded')

    //creates the column for the time
    //grabs the time for this row
    timeCol=$('<div>').addClass('col-md-2 blockquote').text(item.displayTime)
    row.append(timeCol)

    //creates task box
    taskCol = $('<textarea>').addClass('col-md-9 boards task rounded').attr('rows', '4').val(item.tasks)
    shownTime = item.displayTime[0] + item.displayTime[1]

    //checks too see if time before or after current blcok. changes color accordingly
    if(hour == item.check){
        taskCol.addClass('present')
        }
    else if(hour < item.check){
        taskCol.addClass('future')
    }
    else if(hour > item.check){
        taskCol.addClass('past')
    }

    //creates button column and the button
    buttonCol = $('<div>').addClass('col-md-1 boards rounded')
    button = $('<button>').addClass('btn-primary btn-lg btn-block listening').attr('type', 'button')
    button.append('<i class="fas fa-save"></i>')
    buttonCol.append(button)
    
    //final row setup and append
    row.attr('id', item.displayTime)
    row.append(taskCol)
    row.append(buttonCol)
    //adds the whole row to the container div
    $('#holder').append(row)
    //listens for button click
    $('.listening').click(save)
});

function save(e){
    e.stopPropagation()
    console.log('hi')
     //grabs the id of the row and the text entered in the text area
    let verify = $(this).parent().parent().attr('id')
    let newTask = $(this).parent().siblings('.task').val()
//sets the row task in the array and saves it to local storage
    times.forEach(function(item){
        if(item.displayTime == verify){

            item.tasks = newTask
            localStorage.setItem('tasks', JSON.stringify(times))
            retrieve2 = localStorage.getItem("tasks")
            times = JSON.parse(retrieve2)

        }
    })
    
}


