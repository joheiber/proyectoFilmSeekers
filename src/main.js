import './style.css'

$(document).ready(() => {

  $("#inputBusqueda").on("input", function () {
    // Capturar el valor del input
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
        $("#tableroPeliculas").empty()
        peliculas.forEach((pelicula) => {
          $("#tableroPeliculas").append(`
            <div class="card my-1" style="width: 18rem;">
  <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" class="card-img-top" alt="...">
  <div class="card-body">
  <h5 class="card-title">${pelicula.title}</h5>
    <p class="card-text">${pelicula.overview}</p>
  </div>
</div>
            `);
        })
      })
      .catch(err => console.error(err));
  });

})