let sum=(a,b)=>a+b;

function operate(operationFunc, a,b){
    return operationFunc(a,b);
}
console.log(operate(sum,2,3));


let diff=(a,b)=>a-b;

function operate(operationFunc, a,b){
    return operationFunc(a,b);
}
console.log(operate(diff,2,3));



function outer(){
    function inner(){             
        console.log("Hello");
    }
    return inner;   // returns whole inner function not the output of inner function
}


let returnedFuncVar=outer();
returnedFuncVar();



let a=100;

function outer()
{
    a=200;
    function inner(){
        console.log(a)
    }
    return inner;
}


