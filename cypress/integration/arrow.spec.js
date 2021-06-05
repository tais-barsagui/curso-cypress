
//it('nada agora', function() { })

// function soma(a, b){
//     return a + b;
// }

// const soma = function(a, b){
//     return a + b
// }

//arrow function da forma mais básica
// const soma = (a, b) => {
//     return a + b
// }

//arrow function de forma reduzida
// const soma = (a, b) => a + b

//somente 1 parâmetro
//const soma = a => a + a

const soma = () => 5 + 5

console.log(soma(1,4))

it('a function test..', function() {
    console.log('Function', this)
})

it('an arrow test..', () => {
    console.log('Arrow', this)
})