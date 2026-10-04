let x="Prashant Bhattarai";

console.log(typeof(x));

let z=1.45;
console.log(typeof(z));

let courses= ['hld', 'lld', 'dsa', 6, true, null];

console.log(courses[3]);
console.log(courses[4]);
console.log(courses[5]);

function createCourse(coursename)
{
    console.log('creating'+coursename);
}
createCourse('Webdesign');
createCourse('App Development');


function add(x,y)
{
    console.log(x+y);
}

add(2,3);


let student={name:"Kanchan", des:"BIT", rating:100};



console.log(student);
console.log(`Datatype = ${typeof(student)}`);
console.log(student["name"]);



