// client side js
document.querySelector('button').addEventListener('click', getFetch)


function getFetch(){
    const myFavs = document.querySelector('#enter-movie').value

    const url = 'https://fav-movie-api.herokuapp.com/api'+myFavs

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            // for I Am Legend
            document.querySelector('.name-of-movie').innerText = 'Movie: ' + data.movieTitle
            // Celebs in movie
            document.querySelector('.name1').innerText = 'Name: ' + data.notableCelebs.name1
            document.querySelector('.name2').innerText = 'Name: ' + data.notableCelebs.name2
            document.querySelector('.name3').innerText = 'Name: ' + data.notableCelebs.name3
        })

        .catch(err => {
            console.log(`error ${err}`)
        })
}