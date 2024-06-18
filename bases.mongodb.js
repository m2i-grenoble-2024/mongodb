/* global use, db */

//Indiquer la base de donnée à utiliser dans le fichier
use('damFirst')

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



const skills = ['PHP', 'JS', 'MongoDb', 'CSS', 'HTML', 'Cuisine'];
const firstNames = ['Odalis', 'Baylie', 'Junior', 'Johnson', 'Aysha', 'Miranda', 'Gilberto', 'Christin', 'Iyanna', 'Jaylyn', 'Amari', 'Duane', 'Willis', 'Coy', 'Bernadette', 'Aniya', 'Javion', 'Raphael', 'Gerald', 'Caelan', 'Josh', 'Nehemiah', 'Keyanna', 'Sierra', 'Heriberto', 'Aisha', 'Harris', 'Dustyn', 'Anders', 'Chaya'];
const names = ['Strom', 'Harley', 'Tharp', 'Lindquist', 'Armando', 'Nautica', 'Slack', 'Kaya', 'Potts', 'Burroughs', 'Theresa', 'Shen', 'Sommer', 'Pool', 'Fischer', 'Coy', 'Sturm', 'Alora', 'Mosher', 'Meg', 'Ly', 'Rebecca', 'Shanna', 'Hendrix', 'Lancaster', 'Destiney', 'Wooten', 'Isiah', 'Howe', 'Smyth'];

// Essayer de récupérer et afficher en console log un élément random de la liste de names

//Faire une boucle de 10 tours qui va à chaque tour faire un insertOne en assignant comme nom
//une valeur random du tableau, comme firstName, une valeur random du tableau firstName


//Avec un skills.filter trouver une manière de créer un nouveau tableau qui
//gardera des valeurs aléatoire dans skills, et assigner ça au skills des personnes générées

//Ajouter aussi un age aléatoire entre 10 et 100 à chaque personne

//Une fois que ça marche, on fait plutôt une boucle qui fait 1000 tours pour avoir quelques datas

/**
 * Requêtes à faire sur nos persons : 
 * 1. Avec un find récupérer toutes les persons qui sont plus de 50 ans
 * 2. Récupérer les persons qui ont comme prénom Jaylyn ou Amari
 * 3. Récupérer les persons qui possèdent le skill PHP
 * 4. Récupérer les persons qui ont plus de 4 skills
 * 5. Récupérer les persons dont le prénom termine par un a
 * 6. Faire un update pour incrémenter de 1 l'âge des personnes qui ont comme
 * name 'Sommer'
 */