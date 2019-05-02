class TestClass {
    constructor() { };

    sum(a, b) {
        return a + b;
    };
}

var t = new TestClass();
var s = t.sum(2, 3);
var f = "sum(4,5)";
var t1 = eval("t." + f);
x = 10;

console.log(s);
console.log(t1);
console.log(x);

var money = 100;
if(money> 100){
    console.log('Wow! I can buy Pizza');
}else{
    console.log('Oh! I can not buy Pizza');
}


var str = "select * from Table where 1=1";
console.log(str.toLocaleLowerCase().indexOf('from'));
console.log("select count(*) " + str.substring(str.toLocaleLowerCase().indexOf('from')));

