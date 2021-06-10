const idElement = document.getElementById("task_id");
const dateElement = document.getElementById("birthday");
const button = document.getElementById("submit_btn");

var arr = [];

document.querySelector("#submit_btn").addEventListener('click', function (event) {
    event.preventDefault();

    const id = idElement.value;
    const date = dateElement.value;

    arr.push({
        id: id,
        date: date
    })

    displayTable(arr);
})


function displayTable(arr) {
    if (arr.length > 1) {
        sortArray(arr);
    }

    //Remove existing tbody 
    var t = document.getElementById("tableBody");
    if (t) {
        t.remove();
    }

    const table_body = document.createElement('tbody');
    table_body.setAttribute('id', "tableBody");
    for (var i = 0; i < arr.length; i++) {

        table_body.innerHTML += `<tr>
    <td>${arr[i].id}</td>
    <td>${arr[i].date}</td>
    </tr>
`;
    }
    const table = document.getElementById("mytable");
    table.appendChild(table_body);
}

// Sort array based on the date. If dates are eual then do it on basis of id 
function sortArray(arr) {
    arr.sort(function (a, b) {
        console.log(a.date + " " + b.date);
        var valA = a.date.split('-');
        var valB = b.date.split('-');

        const aDate = new Date(valA[2], valA[1] - 1, valA[0]);
        const bDate = new Date(valB[2], valB[1] - 1, valB[0]);

        if (aDate - bDate == 0) {
            return (a.id - b.id);
        }
        else {
            return aDate - bDate;
        }
    })

    //console.log(arr);
}