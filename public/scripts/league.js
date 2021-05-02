const pathname = window.location.pathname.split("/")
const league = pathname[pathname.length - 1]
console.log(league)

var standings_url;


switch(league) {
    case 'liga-argentina':
        var standings_url = "https://bullstats-default-rtdb.firebaseio.com/tables/LARG/standings/LEAGUE.json";
        break;
}

console.log(standings_url)

fetch(standings_url)
.then((resp) => resp.json())
.then(function(data) {

    // selecciono la tabla
    var standings_table = document.getElementById('standings-table');

    //extraigo del json las columnas
    let columns = data.data.columns;
    console.log(columns)

    var table_header = document.createElement("tr");
    standings_table.appendChild(table_header);

    for (const column in columns) {
        console.log(columns[column])
        var node = document.createElement("th");
        var textnode = document.createTextNode(columns[column])
        node.appendChild(textnode);
        table_header.appendChild(node);
    }

    const standings_data = data.data.data

    for (row in standings_data) {
        let row_data = standings_data[row];
        console.log(row_data);
        let table_row = document.createElement("tr");
        standings_table.appendChild(table_row);

        for(datapoint in row_data) {
            var node = document.createElement("td");
            var textnode = document.createTextNode(row_data[datapoint])
            node.appendChild(textnode);
            table_row.appendChild(node);
        }

    }



})
.catch(function(error) {
  console.log(error);
});