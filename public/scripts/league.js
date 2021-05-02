const pathname = window.location.pathname.split("/")
const league = pathname[pathname.length - 1]
console.log(league)

var url;
var division;

switch (league) {
    case 'liga-argentina':
        var url = "https://bullstats-default-rtdb.firebaseio.com/tables/LARG.json";
        var division = "LEAGUE"
        break;
    case 'liga-argentina-conferencia-norte':
        var url = "https://bullstats-default-rtdb.firebaseio.com/tables/LARG.json";
        var division = "NORTE"
        break;
    case 'liga-argentina-conferencia-sur':
        var url = "https://bullstats-default-rtdb.firebaseio.com/tables/LARG.json";
        var division = "SUR"
        break;
}

function sectionBuilder(data) {
    console.log(data);
    // defino el main y creo dentro un section
    var main = document.getElementById('app');
    var section = document.createElement('section');
    // Llamo a la funcion que crea headers y mando a hacer uno y lo appendeo al section
    section.appendChild(headerBuilder(data.name));
    // creo la tabla dentro de un componente responsive

    var responsive_div = document.createElement('div');
    responsive_div.style["overflow-x"] = "auto";
    section.appendChild(responsive_div);
    var table = document.createElement('table');
    responsive_div.appendChild(table);

    // creo las columns
    var columns_row = document.createElement('tr');
    for (column in data.data.columns) {
        var column_data = data.data.columns[column];
        var node = document.createElement('th');
        var node_text = document.createTextNode(column_data)
        node.appendChild(node_text);
        columns_row.appendChild(node);
    }
    table.appendChild(columns_row);

    // Creo el resto de las rows

    for(row in data.data.data) {
        var row = data.data.data[row];
        rowBuilder(row);
        table.appendChild(rowBuilder(row));
    }

    // meto el section que estuve creando dentro del main
    main.appendChild(section);
}

function rowBuilder(row) {
    var row_node = document.createElement('tr');
    for (concept in row) {
        var cell = document.createElement('td');
        var cell_text = document.createTextNode(row[concept])
        cell.appendChild(cell_text);
        row_node.appendChild(cell);
    }
    return row_node
}

function headerBuilder(name) {
    var heading_node = document.createElement('h3');
    var heading_text = document.createTextNode(name)
    heading_node.appendChild(heading_text);
    return heading_node
}

fetch(url).then((resp) => resp.json()).then(function (data) {
    for(data_section in data) {
        if (typeof data[data_section][division] !== "undefined") {
            sectionBuilder(data[data_section][division]);
        }
    };
}).catch(function (error) {
    console.log(error);
});

switch (division) {
    case 'NORTE':
        var elements = document.getElementsByClassName('conference-card');
        var requiredElement = elements[0];
        requiredElement.style.opacity = "50%";


        var links = document.getElementsByClassName('conference-link');

        links[0].href = "/leagues/liga-argentina-conferencia-sur";
        links[1].href = "/leagues/liga-argentina"

        break;

    case 'SUR':
        var elements = document.getElementsByClassName('conference-card');
        var requiredElement = elements[1];
        requiredElement.style.opacity = "50%";

        var links = document.getElementsByClassName('conference-link');

        links[0].href = "/leagues/liga-argentina";
        links[1].href = "/leagues/liga-argentina-conferencia-norte"

        break;

    default:
        var elements = document.getElementsByClassName('conference-card');
        elements[0].style.opacity = "50%";
        elements[1].style.opacity = "50%";
}
