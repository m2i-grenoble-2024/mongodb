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
// SELECT title FROM movies
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

db.comments.find();
//Les aggregations sont une manière de faire des requête sur une collection en appliquant
//des opérations en chaîne sur les résultats. C'est avec ça qu'on pourra faire des group by
//par exemple

//ici on utilise l'opération $match qui permet de faire l'équivalent d'un find (filtrer
//les résultats) suivi d'un $lookup qui permet de faire l'équivalent d'un LEFT JOIN
//Attention, l'ordre des opérations dans le pipeline a une importance et influera et sur
//le résultat et sur les performances
db.movies.aggregate([

    {
        $match: {title:'Les vampires'}
    },
    //équivalent d'un LEFT JOIN en SQL
    {
        $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField:'movie_id',
            as: 'comments'
        }
    }
])

//Ici, on fait deux fois la même requête, une fois via un find et une fois via une
//aggregation. Par défaut, mieux vaut utiliser le find, plus simple, quand on peut
db.movies.find({directors: 'George Miller'}).sort({'imdb.rating':-1})
db.movies.aggregate({
    $match: {directors: 'George Miller'},
    $sort: {'imdb.rating':{$gt:7}}
})

//Ici on fait l'équivalent d'un GROUP BY en regroupant ensemble tous les films par
//leur année de sortie. On peut utiliser des fonction de group sur les résultats 
//(count, sum, avg, max, min, etc.)
db.movies.aggregate([
    {
        $group: {_id:'$year', moviePerYear: {$sum:1}}
    }
])


db.movies.aggregate([
    {
        $unwind:'$cast'
    },
    //Rajouter un group by pour compter dans combien de film chaque acteur et actrice ont joué.
]);

/**
 * Quelques aggregations à faire
 * 1. Afficher la note imdb moyenne des films par années puis faire un classement 
 * (avec un $sort) pour savoir c'est quoi les meilleures années de cinéma apparemment
 * 2. Compter combien de films il y a par genres de film, puis faire la somme du nombre
 * d'award gagné par ces films (on peut même essayer de faire un calcul pour savoir
 * en moyenne combien d'award sont gagné par genre proportionnelement au total de film )
 * 3. Faire une aggregation pour afficher les acteurs et actrices avec lesquels le 
 * réalisateur Martin Scorsese a le plus collaboré (aide: on va d'abord faire un match
 * pour récupérer les films du réal puis unwind et group par cast)
 * 4. Faire une aggregation pour afficher le title des films et le nombre de comments
 * associé par film (il va falloir utiliser un $lookup aussi donc)
 */