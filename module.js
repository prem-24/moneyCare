

const person = (function(){
    const firstName = "Jagan";
    const lastName = "Javid";

    // const greet = "";

    return {
        getFullname: function(){
            return firstName + " " + lastName;
        }
    }

})();


const person2 = (function(){
    const firstName = "Jagan-1";
    const lastName = "Javid-2";

    // const greet = "";
    return {
        getFullname: function(){
            return firstName + " " + lastName;
        }
    }

})();

console.log(person.getFullname());
console.log(person2.getFullname());