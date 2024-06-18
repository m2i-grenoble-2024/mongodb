/* global use, db */
use('test')

const skills = ['PHP', 'JS', 'MongoDb', 'CSS', 'HTML', 'Cuisine'];
const firstNames = ['Odalis', 'Baylie', 'Junior', 'Johnson', 'Aysha', 'Miranda', 'Gilberto', 'Christin', 'Iyanna', 'Jaylyn', 'Amari', 'Duane', 'Willis', 'Coy', 'Bernadette', 'Aniya', 'Javion', 'Raphael', 'Gerald', 'Caelan', 'Josh', 'Nehemiah', 'Keyanna', 'Sierra', 'Heriberto', 'Aisha', 'Harris', 'Dustyn', 'Anders', 'Chaya'];
const names = ['Strom', 'Harley', 'Tharp', 'Lindquist', 'Armando', 'Nautica', 'Slack', 'Kaya', 'Potts', 'Burroughs', 'Theresa', 'Shen', 'Sommer', 'Pool', 'Fischer', 'Coy', 'Sturm', 'Alora', 'Mosher', 'Meg', 'Ly', 'Rebecca', 'Shanna', 'Hendrix', 'Lancaster', 'Destiney', 'Wooten', 'Isiah', 'Howe', 'Smyth'];


console.log(Math.floor(Math.random()*91)+10)

// Essayer de récupérer et afficher en console log un élément random de la liste de names
console.log(names[Math.floor(Math.random()*names.length)]);
//Faire une boucle de 10 tours qui va à chaque tour faire un insertOne en assignant comme nom
//une valeur random du tableau, comme firstName, une valeur random du tableau firstName


//Avec un skills.filter trouver une manière de créer un nouveau tableau qui
//gardera des valeurs aléatoire dans skills, et assigner ça au skills des personnes générées

//Ajouter aussi un age aléatoire entre 10 et 100 à chaque personne

//Une fois que ça marche, on fait plutôt une boucle qui fait 1000 tours pour avoir quelques datas
for (let i = 0; i < 1000; i++) {
    db.person.insertOne({
        name: names[Math.floor(Math.random()*names.length)],
        firstName: firstNames[Math.floor(Math.random()*firstNames.length)],
        age: Math.floor(Math.random()*91)+10,
        skills: skills.filter(() => Math.random() > 0.5)
    })
    
}