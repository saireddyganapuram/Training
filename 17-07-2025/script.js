let a = [43,5,2,75,23,0]
console.log(a.length);
console.log(a.toString());
console.log(a.join("_"));
a.pop()
console.log(a)
a.push(100)
console.log(a)
a.shift()
console.log(a)
a.unshift()
console.log(a)


let fruits = ["apple","banana","orange"]

let  n = parseInt(prompt("enter the number of tablets"))
let price = 0
for(let i=1;i<n+1;i++){
    let p = parseInt(prompt(`enter the price of tablet ${i}`))
    price+=p
}
if (price>1000){
    console.log("Total Bill",price)
    console.log("Discount",(price*20)/100);
    console.log("Amount To Be Paid",price-(price*20)/100)
}else{
    console.log("Total Bill",price)
    console.log("Discount",(price*10)/100);
    console.log("Amount To Be Paid",price-(price*10)/100)
}
