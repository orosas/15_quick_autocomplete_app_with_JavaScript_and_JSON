const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search states.json and filter it
const searchStates = async searchText => {
    // Nota: Las siguientes 2 líneas importan la información en
    //     formato JSON
    const res = await fetch('../data/state_capitals.json');
    const states = await res.json();

    // Get matches to current text input
    let matches = states.filter(state => {
        // Nota: gi por g:global para regresar todos los resultados
                // no nada más 1,  i: insensitive
        const regex = new RegExp(`^${searchText}`, 'gi');
        // Nota: ¿¿Por qué Regresa object?????
        // console.log(state.name.match(regex));

        return state.name.match(regex) || state.abbr.match(regex);
    });

    // Nota: Al eliminar todos los caractéres del Input, se evita regresar todo el json
    //         como respuesta el vaciar matches al borrar todo el input
    if(searchText.length === 0){
        matches = [];
        // Nota: Se elimina contenido de div matchList donde se muestran los resultados
        //         al momento de borrar el contenido del Input una vez que se escribió
        matchList.innerHTML = ''
    }
    console.log(matches);

    // Show results in HTML
    outputHtml(matches);

};

// Show results in HTML
const outputHtml = matches => {

    if(matches.length > 0){

        const html = matches.map(match => `
        <div class="card card-body mb-1">
            <h4>${match.name} (${match.abbr}) 
                <span class="text-primary">${match.capital}</span>
            </h4>
            <small>Lat: ${match.lat} / Long: ${match.long} </small>
        </div>
        `
        // Nota: Se usa .join('')para convertir todas las divs que están en un
                    // array, en un HTML string
        ).join('');
        // console.log(html);

        matchList.innerHTML = html;
    }
};

// Nota: input event se debe usar SIEMPRE para reaccionar a los cambios
    // de un input, debido a que algunos cambios no son detectados por keyup
    // Referencia: https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event
search.addEventListener('input', () => searchStates(search.value));


