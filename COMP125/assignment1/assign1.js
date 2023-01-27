let row_num = 10;
let col_num = 10;

const createTable = function () {

    const table = document.getElementById("table");

    let x = row_num;
    let head = table.createTHead();

    for (let j = 0; j < row_num; j++) {
        let row = head.insertRow(0);
        let y = 1;

        for (let i = 0; i < col_num; i++) {
            let cell = row.insertCell(i);

            cell.innerHTML = `${x} * ${y} = ${x * y}`;
            y++;
        }
        x--;
    }
}

const updateTable = function () {
    let table_length = document.getElementById("table").rows.length;

    for (let i = 0; i < table_length; i++) {
        document.getElementById("table").deleteRow(0);
    }

    row_num = document.getElementById("newRows").value;
    col_num = document.getElementById("newCols").value;

    createTable();
}
