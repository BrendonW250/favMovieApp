const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const res = require('express/lib/response')


// 
app.set('view engine', 'ejs')
// so the app can use cors
app.use(cors())

// for body parser
app.use(bodyParser.urlencoded({ extended: true }))


// so the server can read the client side js
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(express.static('public'))

MongoClient.connect('mongodb+srv://beazy:crazyhead165@cluster0.yemmw.mongodb.net/?retryWrites=true&w=majority',  {
    useUnifiedTopology: true})

        .then(client => {
            console.log('Connected to Database')
            const db = client.db('favorite-movies')
            const movieCollection = db.collection('allMovies')

            // now incorporate the express methods
            app.get('/', (request, response) => {
                // response.sendFile(__dirname + '/index.html')

                const cursor = db.collection('allMovies').find()
                console.log(cursor)

                db.collection('allMovies').find().toArray()
                    .then(results => {
                        response.render('index.ejs', { allMovies: results })
                    })
                    .catch(error => console.log(error))
                
            })

            app.get('/api/:movieName', (request, response) => {
                const nameOfMovie = request.params.movieName
                
                
                if (movies[nameOfMovie]){
                    response.json(movies[nameOfMovie])
                }else {
                    response.json(movies['Other Movies'])
                }
            })

            app.post('/addmovies', (request, response) => {
                movieCollection.insertOne(request.body)
                    .then(result => {
                        response.redirect('/')
                        
                        
                    })
                    .catch(error => console.log(error))
                    console.log(request.body)
            })

            app.listen(process.env.PORT || PORT, () => {
                console.log(`The server is running on ${PORT}!`)
            })
    

        })
        .catch(error => console.error(error))

    // .then(client => {
    //     console.log('Connected to the database')

    //     const db = client.db('favorite-movies')
    //     const movieCollection = db.collection('movies')


        // beginning of express request handlers
        // app.get('/', (request, response) => {
        //     response.sendFile(__dirname + '/index.html')

        //     const cursor = db.collection('movies').find()
        //     console.log(cursor)

        //     // response.render(ejs, results)

        //     db.collection('favorite-movies').find().toArray()
        //         .then(results => {//movies represents all the data in the objects within the db
        //             response.render('index.ejs', { movies: results })
        //         })
        //         .catch(error => console.log(error))

        // })
        // .catch(error => console.error(error))

        // app.get('/api/:movieName', (request, response) => {
            
        //     const nameOfMovie = request.params.movieName
            
            
        //     if (movies[nameOfMovie]){
        //         response.json(movies[nameOfMovie])
        //     }else {
        //         response.json(movies['Other Movies'])
        //     }
        // })

        // app.post('/addmovies', (request, response) => {
        //     movieCollection.insertOne(request.body)

        //     .then(result => {
        //         console.log(result)
        //         // response.redirect('/')
                
        //     })
        //     .catch(error => console.log(error))
        // })
    

    




    // if (err) return console.log(err)
    // console.log('Connected to Database')

    // .then(client => {
    //     console.log('Connected to Database')
    //     const db = client.db('favorite-movies')
    //     const movieCollection = db.collection('different-movies')

        // placing the CRUD handlers in the db
        // app.use(bodyParser.urlencoded({ extended: true }))

        // app.get('/', (request, response) => {
        //     response.sendFile(__dirname + '/index.html')

        //     const cursor = db.collection('different-movies').find()
        //     console.log(cursor)

        //     db.collection('different-movies').find().toArray()
        //         .then(results => {//movies represents all the data in the objects within the db
        //             response.render('index.ejs', { movies: results })
        //         })
        //         .catch(error => console.log(error))
        // })

        // app.get('/api/:movieName', (request, response) => {
        //     const nameOfMovie = request.params.movieName
        
        
        //     if (movies[nameOfMovie]){
        //         response.json(movies[nameOfMovie])
        //     }else {
        //         response.json(movies['Other Movies'])
        //     }
        // })

        // app.post('/addmovies', (request, response) => {
        //     console.log(request)
        //     db.collection('favorite-movies').insertOne({movieTitle: request.body.movieTitle, 
        //     dateReleased: request.body.dateReleased, notableCelebs: request.body.notableCelebs, 
        //     shortBio: request.body.shortBio, rottenTomatoesRating: request.body.rottenTomatoesRating})
        //     .then(result => {
        //         console.log('Movie Added')
        //         response.redirect('/')
        //     })
        //     .catch(error => console.log(error))
        // })

        // app.post('/addmovies', (request, response) => {
        //     movieCollection.insertOne(request.body)
        //         .then(result => {
        //             response.redirect('/')
        //         })
        //         .catch(error => console.error(error))
        // })

        // app.listen(process.env.PORT || PORT, () => {
        //     console.log(`The server is running on ${PORT}!`)
        // })

        
    


// so the app can use cors
// app.use(cors())

// so the server can read the client side js
// app.use(express.urlencoded({
//     extended: true
// }))
// app.use(express.json())
// app.use(express.static('public'))


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
// app.get('/', (request, response) => {
//     response.sendFile(__dirname + '/index.html')
// })

// creating a different path
// route is tailored to the user typing in one of my favorite movies
// app.get('/api/:movieName', (request, response) => {
//     const nameOfMovie = request.params.movieName


//     if (movies[nameOfMovie]){
//         response.json(movies[nameOfMovie])
//     }else {
//         response.json(movies['Other Movies'])
//     }
// })

// code here if I wanted to add onto my current list


// telling the app to listen
// app.listen(process.env.PORT || PORT, () => {
//     console.log(`The server is running on ${PORT}!`)
// })