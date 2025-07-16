age = 54;
if(age < 18) {
    console.log("Minor");
} else if (age > 60) {
    console.log("senior citizen");
} else {
    console.log("Middle");
}

let fruit = "apple";

switch(fruit) {
    case "banana" :
        console.log("banana");
        break;
    case "apple" :
        console.log("apple");
        break;
    case "mango" :
        console.log("mango");
        break;
    default :
        console.log("fruit");
}

marks = 88;
if(90 <= marks <= 100) {
    console.log("A");
} else if(80 <= marks <= 89) {
    console.log("B");
} else if(70 <= marks <= 79) {
    console.log("C");
} else if(60 <= marks <= 69) {
    console.log("D");
} else if(50 <= marks <= 59) {
    console.log("E");
} else {
    console.log("F");
}

function IsPrime(n) {
    for(j = 2;j < n;j++) {
        if(n % j == 0) {
            return false
        }
    }
    return true
}

for(i = 2;i <= 100;i++) {
    if(IsPrime(i)) {
        console.log(i)
    }
}