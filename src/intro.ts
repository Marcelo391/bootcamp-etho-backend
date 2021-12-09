let num: number = 10;
let texto: string = "45";

let isFalsy: boolean = false;
let langName: string = 'Typescript';


console.log(typeof num);
console.log(typeof texto);

console.log(typeof isFalsy);
console.log(typeof langName);

function greeter1(receiver: any): string{
    return "Hello " + receiver + "."
}

console.log(greeter1('world'));
console.log(greeter1(12));
console.log(greeter1(true));


const booleanArray: boolean[] = [true, false];

type AllowedTypes = string | string[];

function analyzer(receiver: AllowedTypes){
   return "Hello " + receiver + " friend";
}

let speak = 'Teste';
let speak2 = ['Teste2','Teste3'];
let speak3 = 12;

console.log(analyzer(speak));
console.log(analyzer(speak2));


enum CardSuit {
    Clubs,
    Diamonds,
    Hearts,
    Spades
}
//console.log(CardSuit.Hearts);

enum NatureTypes {
    Human = 'human',
	Robot = 'robot',
	Animal = 'animal'
}

interface Entity {
 natureType: NatureTypes;
 name: string;
 code?: number;
 birthdate?: number;
}

const person: Entity = {
	natureType: NatureTypes.Human,
	name: 'Lara',
	birthdate: 14081997
}

const android: Entity = {
	natureType: NatureTypes.Robot,
	name: 'JSBot',
	code: 1111
}

function analyzer2(receiver: Entity): string {
	return `Hello, ${receiver.name}. You are ${receiver.natureType}.`;
}

console.log(analyzer2(person));

