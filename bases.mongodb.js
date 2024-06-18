/* global use, db */

//Indiquer la base de donnée à utiliser dans le fichier
use('test')

// Afficher les base de données existantes
db.getMongo().getDBs();
//Ajouter une entrée dans la collection person qui aura un name et un firstName
db.person.insertOne({name:'Duflanc', firstName:'Roger'});

//Ajouter plusieurs entrées dans la collection person
db.person.insertMany([
    {name:'test',firstName:'truc'}, 
    {name:'bidule', firstName:'bla'}
]);
//Contrairement au SQL, on peut mettre des valeurs complexes comme des arrays et des objets
db.person.insertOne({
    name:'Duflanc', 
    firstName:'Roger', 
    skills: ['PHP','JS','HTML','CSS'] 
});

//techniquement on est dans du JS, donc on peut écrire et exécuter de l'algo JS
//par exemple, ici on fait une boucle pour insert 10 personnes
// for (let index = 0; index < 10; index++) {
//     db.person.insertOne({name:'name'+index, firstName:'firstname'+index})
    
// }
//On utilise le find pour récupérer des entrées d'une collection
db.person.find();

db.person.find({firstName:'Roger'})

db.person.deleteMany({firstName:'Roger'})

//equivalent d'un SELECT * FROM person WHERE id=...
db.person.findOne(new ObjectId('667042e81e078566dc19d150'))
// db.person.updateMany({}, {age: 30})

/**
 * Requêtes à faire sur nos persons : 
 * 1. Avec un find récupérer toutes les persons qui sont plus de 50 ans
 * 2. Récupérer les persons qui ont comme prénom Jaylyn ou Amari
 * 3. Récupérer les persons qui possèdent le skill PHP, et faire aussi une requête
 * pour récupérer les personnes qui ont UNIQUEMENT le skill PHP
 * 4. Récupérer les persons qui ont plus de 4 skills
 * 5. Récupérer les persons dont le prénom termine par un a
 * 6. Faire un update pour incrémenter de 1 l'âge des personnes qui ont comme
 * name 'Sommer'
 */

db.person.find({
    age: {$gte: 50}
});

db.person.find({
    firstName:{
        $in: ['JayLin', 'Amari']
    }
});

db.person.find({skills:'PHP'});//Personnes qui ont PHP dans leurs skills
db.person.find({skills:['PHP']}); //Personnes qui ont QUE PHP comme skills

db.person.find({'skills.3': {$exists:true}});

db.person.find({firstName:/a$/});

db.person.updateMany({name:'Sommer'}, {$inc:{age:1}});

//Récupérer les persons qui n'ont pas d'age et afficher le temps d'exécution de la requête et d'autres informations
db.person.find({age:{$exists:false}}).explain('executionStats')