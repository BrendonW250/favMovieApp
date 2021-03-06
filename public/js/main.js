// client side js
document.querySelector('button').addEventListener('click', getFetch)


function getFetch(){
    const myFavs = document.querySelector('#enter-movie').value

    const url = `https://fav-movie-api.herokuapp.com/api/${myFavs}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            // for I Am Legend
            document.querySelector('.name-of-movie').innerHTML = 'Movie: ' + data.movieTitle

            // date released
            document.querySelector('.dateReleased').innerHTML = 'Release Date: ' + data.dateReleased
            // Celebs in movie
            document.querySelector('.celeb1').innerHTML = 'Name: ' + data.notableCelebs.name1
            document.querySelector('.celeb2').innerHTML = 'Name: ' + data.notableCelebs.name2
            document.querySelector('.celeb3').innerHTML = 'Name: ' + data.notableCelebs.name3

            // for short summary of movie
            document.querySelector('.movie-summary').innerHTML = 'Summary Of Movie: ' + data.shortBio

            // for movie rating 
            document.querySelector('.movie-rating').innerHTML = 'Rotten Tomatoes Rating: ' + data.rottenTomatoesRating
        })

        .catch(err => {
            console.log(`error ${err}`)
        })
}