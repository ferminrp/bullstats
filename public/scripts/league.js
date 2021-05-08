const pathname = window.location.pathname.split("/")
const league = pathname[pathname.length - 1]


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

var leagueOperator = {
    sectionBuilder: function (data) {
        // defino el main y creo dentro un section
        var main = document.getElementById('app');
        var section = document.createElement('section');
        // Llamo a la funcion que crea headers y mando a hacer uno y lo appendeo al section
        section.appendChild(leagueOperator.headerBuilder(data.name));
        // creo la tabla dentro de un componente responsive

        var responsive_div = document.createElement('div');
        responsive_div.style["overflow-x"] = "auto";
        section.appendChild(responsive_div);
        var table = document.createElement('table');
        responsive_div.appendChild(table);

        // creo la row de columnas en una funcion aparte y la appendeo a la tabla

        table.appendChild(leagueOperator.columnsBuilder(data.data.columns));

        // Creo el resto de las rows

        for (row in data.data.data) {
            var row = data.data.data[row];
            table.appendChild(leagueOperator.rowBuilder(row));
        }

        // meto el section que estuve creando dentro del main
        main.appendChild(section);
    },
    columnsBuilder: function (data) {
        var columns_row = document.createElement('tr');
        for (column in data) {
            var column_data = data[column];
            var node = document.createElement('th');

            /*  Delego en otra funcion chequear si esta es la columna code
                Si es, me trae un texto vacio, sino el texto con la data */

            var node_text = this.codeColumnChecker(column_data)
            node.appendChild(node_text);
            columns_row.appendChild(node);
        }
        return columns_row
    },
    rowBuilder: function (row) {
        var row_node = document.createElement('tr');
        for (concept in row) {
            row_node.appendChild(leagueOperator.cellBuilder(row[concept]));
        }
        return row_node
    },
    headerBuilder: function (name) {
        var headingNode = document.createElement('h3');
        var headingText = document.createTextNode(name)
        headingNode.appendChild(headingText);
        return headingNode
    },
    teamSection: function (data) {

        var main = document.getElementById('app');
        var section = document.createElement('section');
        section.appendChild(leagueOperator.headerBuilder("Teams"));

        var teamsGrid = document.createElement('div');
        teamsGrid.className = "teams-grid";

        section.appendChild(teamsGrid);

        var equipos = data[0][division].data.data;

        for (row in equipos) {
            var equipo = equipos[row];
            teamsGrid.appendChild(equipoCardBuilder(equipo));
        }

        main.appendChild(section);
    },
    equipoCardBuilder: function (equipoData) {
        var equipoName = equipoData[1];
        var equipoAbbreviation = equipoData[2];

        // Creo la card container de el logo
        var equipoLink = document.createElement('a');
        equipoLink.className = "equipo-link"
        equipoLink.href = "/teams/" + equipoAbbreviation

        var equipoCard = document.createElement('div');
        equipoCard.className = "equipo-card";

        // le meto la imagen a la card
        var equipo_img = document.createElement('img');
        equipo_img.src = "/images/logos/equipos/" + equipoAbbreviation + ".png"
        equipo_img.className = "equipo-img"
        equipo_img.loading = "lazy"
        equipoCard.appendChild(equipo_img);

        var equipoName_node = document.createElement('p');
        equipoName_node.appendChild(document.createTextNode(equipoName));
        equipoName_node.className = "equipo-name";
        equipoCard.appendChild(equipoName_node);

        equipoLink.appendChild(equipoCard);

        return equipoLink;
    },
    codeColumnChecker: function (columnName) {
        /* Recibe el nombre de la columna, si es code la deja en blanco, sino le pone el nombre */
        return ( columnName === "code" ? document.createTextNode("") : document.createTextNode(columnName) )
    },
    cellBuilder: function (cellData) {
        let cell = document.createElement('td');
        let regexToMatch = new RegExp('([A-Z]{3})');
        let regexToExclude = new RegExp('([A-Z]{4})');
        if (regexToMatch.test(cellData) && !regexToExclude.test(cellData)) {
            let img = document.createElement('img');
            img.src = "/images/logos/equipos/" + cellData + ".png"
            img.className = "small-logo"
            img.loading = "lazy"
            cell.appendChild(img);
        } else {
            let cellText = document.createTextNode(cellData)
            cell.appendChild(cellText);
        }
        return(cell);
    }
}



fetch(url).then((resp) => resp.json()).then(function (data) {

    // En base a todas las secciones que hay en el json voy creando secciones de heading + tabla
    for (data_section in data) {
        if (typeof data[data_section][division] !== "undefined") {
            leagueOperator.sectionBuilder(data[data_section][division]);
        }
    };

    // Creo una seccion de teams enviandole los equipos que hay en esta pagina
    leagueOperator.teamSection(data);


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
