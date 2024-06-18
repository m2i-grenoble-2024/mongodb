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
 *    supérieur à 4 et pour les viewers et 7 pour la critique
 * 9. Récupérer les films dont le synopsys mentionne le mot 'dragon'
 * 10. Afficher les 10 films avec le meilleurs rating imdb
 */

db.movies.find()


