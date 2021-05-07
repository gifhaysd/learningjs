confirm("maybe");

console.log("Hello World");

//var justTesting = document.querySelector('');

function fact(n){
    if(n%1 != 0) return "not an integer";
    if (n===1) return 1;
    return n*fact(n-1);
}

console.log(fact(8));
confirm("test blah");
document.write("<ul><li>Huzzah?</li</ul>");
