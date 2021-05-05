const pathname = window.location.pathname.split("/")
const league = pathname[pathname.length - 1]
console.log(league)

let url;
let division;

switch (league) {
    case 'liga-argentina':
        let url = "https://bullstats-default-rtdb.firebaseio.com/tables/LARG.json";
        let division = "LEAGUE"
        break;
    case 'liga-argentina-conferencia-norte':
        let url = "https://bullstats-default-rtdb.firebaseio.com/tables/LARG.json";
        let division = "NORTE"
        break;
    case 'liga-argentina-conferencia-sur':
        let url = "https://bullstats-default-rtdb.firebaseio.com/tables/LARG.json";
        let division = "SUR"
        break;
}

function sectionBuilder(data) {
    console.log(data);
    // defino el main y creo dentro un section
    let main = document.getElementById('app');
    let section = document.createElement('section');
    // Llamo a la funcion que crea headers y mando a hacer uno y lo appendeo al section
    section.appendChild(headerBuilder(data.name));
    // creo la tabla dentro de un componente responsive

    let responsive_div = document.createElement('div');
    responsive_div.style["overflow-x"] = "auto";
    section.appendChild(responsive_div);
    let table = document.createElement('table');
    responsive_div.appendChild(table);

    // creo la row de columnas en una funcion aparte y la appendeo a la tabla
    
    table.appendChild(columnsBuilder(data.data.columns));

    // Creo el resto de las rows

    for(row in data.data.data) {
        let row = data.data.data[row];
        rowBuilder(row);
        table.appendChild(rowBuilder(row));
    }

    // meto el section que estuve creando dentro del main
    main.appendChild(section);
}

function columnsBuilder(data) {
    let columns_row = document.createElement('tr');
    for (column in data) {
        let column_data = data[column];
        let node = document.createElement('th');
        let node_text = document.createTextNode(column_data)
        node.appendChild(node_text);
        columns_row.appendChild(node);
    }
    return columns_row
}

function rowBuilder(row) {
    let row_node = document.createElement('tr');
    for (concept in row) {
        let cell = document.createElement('td');
        let cell_text = document.createTextNode(row[concept])
        cell.appendChild(cell_text);
        row_node.appendChild(cell);
    }
    return row_node
}

function headerBuilder(name) {
    let headingNode = document.createElement('h3');
    let heading_text = document.createTextNode(name)
    headingNode.appendChild(heading_text);
    return headingNode
}

function teamSection(data) {

    let main = document.getElementById('app');
    let section = document.createElement('section');
    section.appendChild(headerBuilder("Teams"));

    let teams_grid = document.createElement('div');
    teams_grid.className = "teams-grid";

    section.appendChild(teams_grid);

    let equipos = data[0][division].data.data;

    for (row in equipos) {
        let equipo = equipos[row];
        teams_grid.appendChild(equipoCardBuilder(equipo));
    }

    main.appendChild(section);
}

function equipoCardBuilder(equipoData) {
    let equipo_name = equipoData[1];
    let equipo_abbreviation = equipoData[2];
    console.log(equipo_name);

    // Creo la card container de el logo
    let equipo_link = document.createElement('a');
    equipo_link.className = "equipo-link"
    equipo_link.href = "/teams/"+equipo_abbreviation

    let equipo_card = document.createElement('div');
    equipo_card.className  = "equipo-card";

    // le meto la imagen a la card
    let equipo_img = document.createElement('img');
    equipo_img.src = "/images/logos/equipos/" + equipo_abbreviation + ".png"
    equipo_img.className = "equipo-img"
    equipo_img.loading = "lazy"
    equipo_card.appendChild(equipo_img);

    let equipo_name_node = document.createElement('p');
    equipo_name_node.appendChild(document.createTextNode(equipo_name));
    equipo_name_node.className = "equipo-name";
    equipo_card.appendChild(equipo_name_node);

    equipo_link.appendChild(equipo_card);

    return equipo_link;
}

fetch(url).then((resp) => resp.json()).then(function (data) {

    // En base a todas las secciones que hay en el json voy creando secciones de heading + tabla
    for(data_section in data) {
        if (typeof data[data_section][division] !== "undefined") {
            sectionBuilder(data[data_section][division]);
        }
    };

    // Creo una seccion de teams enviandole los equipos que hay en esta pagina
    teamSection(data);


}).catch(function (error) {
    console.log(error);
});

switch (division) {
    case 'NORTE':
        let elements = document.getElementsByClassName('conference-card');
        let requiredElement = elements[0];
        requiredElement.style.opacity = "50%";


        let links = document.getElementsByClassName('conference-link');

        links[0].href = "/leagues/liga-argentina-conferencia-sur";
        links[1].href = "/leagues/liga-argentina"

        break;

    case 'SUR':
        let elements = document.getElementsByClassName('conference-card');
        let requiredElement = elements[1];
        requiredElement.style.opacity = "50%";

        let links = document.getElementsByClassName('conference-link');

        links[0].href = "/leagues/liga-argentina";
        links[1].href = "/leagues/liga-argentina-conferencia-norte"

        break;

    default:
        let elements = document.getElementsByClassName('conference-card');
        elements[0].style.opacity = "50%";
        elements[1].style.opacity = "50%";
}
