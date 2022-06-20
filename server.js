const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')

// so the app can use cors
app.use(cors())

// so the server can read the client side js
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(express.static('public'))


const movies = {
    'I Am Legend': {
        'movieTitle': 'I Am Legend',
        'dateReleased': 'December 14, 2007',
        'notableCelebs': {
            'name1': 'Will Smith',
            'name2': 'Alice Braga',
            'name3': 'Charlie Tahan'
        },
        'shortBio': 'Will Smith plays as a scientist who survives a man-made plague that transforms humans into mutants. Now he wanders NY looking for survivors while on the hunt for a possible cure but the infected watch his every move hoping for his one mistake that will make Will become one of them',
        'rottenTomatoesRating': '68%'
        
    },
    'Avengers: Infinity War': {
        'movieTitle': 'Avengers: Infinity War',
        'dateReleased': 'April 23, 2018',
        'notableCelebs': {
            'name1': 'Robert Downey Jr.',
            'name2': 'Chris Hemsworth',
            'name3': 'Chris Evans'
        },
        'shortBio': 'Iron Man, Thor, Hulk and the rest of the Avengers unite to battle their most powerful enemy yet, Thanos who is on a mission to collect 6 infinity stones to wipe out half population on Earth.',
        'rottenTomatoesRating': '85%'
        
    },
    'Fast & Furious: Tokyo Drift': {
        'movieTitle': 'Fast & Furious: Tokyo Drift',
        'dateReleased': 'June 16, 2006',
        'notableCelebs': {
            'name1': 'Lucas Black',
            'name2': 'Sung Kang',
            'name3': 'Bow Wow'
        },
        'shortBio': 'Lucas always feels like an outsider, but defines himself through his victories in street races. Due to his unpopularity with authorities, he moves to Tokyo with his father and discovers another exciting but dangerous style of racing which is drifting. The stakes get higher when Lucas takes on a local racer and falls for his girlfriend.',
        'rottenTomatoesRating': '38%'

    },
    'Really Love': {
        'movieTitle': 'Really Love',
        'dateReleased': 'August 25, 2021',
        'notableCelebs': {
            'name1': 'Kofi Siriboe',
            'name2': 'Yootha Wong-Loi-Sing',
            'name3': 'Michael Ealy'
        },
        'shortBio': 'A rising black painter tries to break into the competitive art world while balancing an unexpected romance with an ambitious law student.',
        'rottenTomatoesRating': '86%'
    },
    'Rush Hour 2': {
        'movieTitle': 'Rush Hour 2',
        'dateReleased': 'August 3, 2001',
        'notableCelebs': {
            'name1': 'Jackie Chan',
            'name2': 'Chris Tucker',
            'name3': 'Roselyn Sanchez'
        },
        'shortBio': 'An explosion in the U.S. Embassy in Hong Kong kills 2 cutoms agents investigating currency smuggling. Inspector Lee and James Carter search for the mastermind. Minions are sent out to try and prevent them from finding out who did it.',
        'rottenTomatoesRating': '52%'
    },
    'Other Movies': {
        'movieTitle': 'Blahh The Movie',
        'dateReleased': 'May Blah Blah',
        'notableCelebs': {
            'name1': 'bre',
            'name2': 'corson',
            'name3': 'iguess'
        },
        'shortBio': 'A movie about nothing',
        'rottenTomatoesRating': '0%'
    }
}

// setting up server to hear request
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

// creating a different path
// route is tailored to the user typing in one of my favorite movies
app.get('/api/:movieName', (request, response) => {
    const nameOfMovie = request.params.movieName


    if (movies[nameOfMovie]){
        response.json(movies[nameOfMovie])
    }else {
        response.json(movies['Other Movies'])
    }
})

// telling the app to listen
app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on ${PORT}!`)
})