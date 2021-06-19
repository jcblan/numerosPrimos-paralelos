
const NUMEROS = 1000000;
const listaNumeros = Array.from(Array(NUMEROS).keys());


function IsPrime(number) {

    if (number < 2) {
        return false;
    }
    for (var divisor = 2; divisor <= Math.sqrt(number); divisor++) {
        if ((number % divisor) == 0) {
            return false;
        }
    }
    return true;
}

function GetPrimeInList(numeros) {
    let primos = [];

    numeros.forEach(i => {
        if (IsPrime(i)) {
            primos.push(i);
        }
    });

    return primos;
}

function IsPrimeParallel(number) {
    return new Promise((resolve, reject) => {
        if (number < 2) {
            reject("no primo")
        }
        for (var divisor = 2; divisor <= Math.sqrt(number); divisor++) {
            if ((number % divisor) == 0) {
                reject("no primo")
            }
        }
        resolve(number);
    })

}

async function GetPrimeInListParallel(numeros) {

    let primos = [];
    console.time("Tiempo Paralelo");
    await Promise.all(numeros.map(async (i) => {
        try{
            const valor = await IsPrimeParallel(i);
            primos.push(valor); 
        }catch (err){
        }
    }));

    console.log("Cantidad de primos: ",  primos.length);
    console.timeEnd("Tiempo Paralelo");
}

console.log("\nFor Paralelo:");
GetPrimeInListParallel(listaNumeros);

console.log("\nFor Simple:");
console.time("Tiempo Simple");
console.log("Cantidad de numeros primos: ", GetPrimeInList(listaNumeros).length);
console.timeEnd("Tiempo Simple");






