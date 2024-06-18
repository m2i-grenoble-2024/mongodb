/* global use, db */
use('test');

/**
 * En utilisant les samples databases mflix (trouvable sur la doc officielle mongodb ou
 * sur github). Réaliser les requêtes suivante :
 * 
 * 1. Récupérer tous les films réalisés par George Miller
 * 2. Récupérer tous les films avec Emma Stone et Ryan Gosling
 * 3. Récupérer tous les films sortis avant 1950 durant plus de 2H
 * 4. Récupérer tous les films ayant gagné 3 récompenses ou plus
 * 5. Récupérer uniquement les titles des films français (faut chercher 
 *    comment faire des projections) 
 * 6. Récupérer les films qui ont été réalisés par n'importe lequel des frères Coen
 * 7. Récupérer les films qui ont un rating imdb supérieur à 7 et plus de 1000 votes
 * 8. Récupérer les films qui ont un score rottentomatoes (tomatoes dans la db)
 *    supérieur à 4 pour les viewers et 7 pour la critique
 * 9. Récupérer les films dont le synopsys mentionne le mot 'dragon'
 * 10. Afficher les 10 films avec le meilleurs rating imdb
 */

db.movies.find({directors: 'George Miller'})

db.movies.find({
    cast: {
        $all:['Emma Stone', 'Ryan Gosling']
    }
})
//Ou bien avec un $and
/*
db.movies.find({
    $and: [
        {cast: 'Emma Stone'}, 
        {cast:'Ryan Gosling'}
    ]
})
*/

db.movies.find({
    runtime:{$gt: 120}, 
    year: {$lt:1950}
})

db.movies.find({
    'awards.wins': {$gte:3}
});

db.movies.find({countries:['France']}, {title:true, _id:false});



db.movies.find({directors:/ Coen$/i});
db.movies.find({
    $or:[
        {directors:'Ethan Coen'}, 
        {directors:'Joel Coen'}
    ]   
});//avec un or pour une recherche précise

db.movies.find({
    'imdb.rating':{$gt:7}, 
    'imdb.votes':{$gt:1000}
})

db.movies.find({
    'tomatoes.viewer.rating':{$gt:4}, 
    'tomatoes.critic.rating':{$gt:7}
})

db.movies.find({
    plot: /dragon/i
})

db.movies.find({
    'imdb.rating':{$type:'number'}
}).sort({'imdb.rating': -1}).limit(10);