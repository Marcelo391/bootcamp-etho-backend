
//1- Dado as variáveis abaixo, informe a tipagem de cada um para que o código fique correto.

    const sequence: number[] = Array.from(Array(10).keys());
    const animals: string[] = ['passaro', 'gato', 'cachorro', 'coelho'];
    const stringsAndNumbers: (string | number)[] = [1, 'one', 2, 'two', 3, 'three'];


//2- Crie uma Interface Book para que a função abaixo funcione corretamente. Adicione o parâmetro opcional "author".

interface Book {
    title: string;
    author?: string;
}

const book: Book ={
    title: 'Harry Potter'
}

function addToLibrary(item: Book): void {
    const response = `Adicionado o livro ${item.title} à sua biblioteca.`;
    console.log(response);
}

//console.log(addToLibrary(book));
addToLibrary(book);

//3- Crie uma Função que adicione dinheiro a uma conta de banco.
//A função deverá receber dois argumentos: o argumento obrigatório money e o argumento opcional message. 
//Caso message esteja presente, mostre uma mensagem avisando que o dinheiro foi adicionado à conta.

function addMoney(money: number, message?: string): void{
    if(message != undefined){
        console.log(message);
    }   
}

addMoney(12,'Dinheiro adicionado à contagem');

//4- Modifique a função baixo para que ela possa receber vários tipos de dados utilizando seu conhecimento de Generics. 

function passValue <T> (value: T): T {
    return value;
}

console.log(passValue<number>(12));
console.log(passValue<string>('teste'));
console.log(passValue<boolean>(true));