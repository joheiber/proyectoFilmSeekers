import './style.css'

$(document).ready(() => {
  const generos = {
    28: "Acción",
    12: "Aventura",
    16: "Animación",
    35: "Comedia",
    80: "Crimen",
    99: "Documental",
    18: "Drama",
    10751: "Familiar",
    14: "Fantasía",
    36: "Historia",
    27: "Terror",
    10402: "Música",
    9648: "Misterio",
    10749: "Romance",
    878: "Ciencia ficción",
    10770: "Película de TV",
    53: "Suspense",
    10752: "Bélica",
    37: "Western"
  };
  
  function obtenerGeneros(ids) {
    return ids
      .map(id => `<span class="badge bg-secondary me-1">${generos[id]}</span>`)
      .join(""); // Esto une todas las píldoras sin separadores
  }

  $("#inputBusqueda").on("input", function () {

    const valor = $(this).val();

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDdhZmZiYjYzNGZlMzFjMjFlMjY5ZDEwZTg4MzRkZSIsIm5iZiI6MTczMjA1MzM4NS4zMTAwMDAyLCJzdWIiOiI2NzNkMDk4OTI0ODViODViM2NhOGU5YWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RBeg3DLGhEjsTJAWtAql3m1fGJ6TAxgPFynNdnDY1pQ'
      }
    };
    let peliculas
    fetch(`https://api.themoviedb.org/3/search/movie?query=${valor}&include_adult=false&language=es&page=1`, options)
      .then(res => res.json())
      .then(res => {
        peliculas = res.results
        console.log(peliculas)

        $("#tableroPeliculas").empty()

        peliculas.forEach((pelicula) => {
          let overview = pelicula.overview.length > 150
            ? pelicula.overview.substring(0, 150) + "..."
            : pelicula.overview;
          $("#tableroPeliculas").append(`
            <div class="card my-1 card text-bg-dark " style="max-width: 540px;" >
            <div class="row g-0">
                <div class="col-md-5">
                    <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                      <h3 class="card-title" >${pelicula.title}</h3>
                      <h6 class="card-subtitle mb-2">${pelicula.release_date}</h6>
                      <p class="card-text">${overview}</p>
                      <p class="card-text">${obtenerGeneros(pelicula.genre_ids)}</p>
                    </div>
                  </div>
              </div>
            </div>
      
            `);
        })
      })
      .catch(err => console.error(err));
  });

})