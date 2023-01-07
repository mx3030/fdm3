 //Check for reloads if browser not restarted --> 0 score

if (typeof(Storage) != "undefined") {

    //check if the user already has visited
    if (localStorage.getItem("count") === "undefined") {
        //set the first time if it dfoes not exisit yet
        localStorage.setItem("count", "1");
    }

    //get current count
    var count = localStorage.getItem("count");

    //increment count by 1
    count++;

    //set new value to storage
    localStorage.setItem("count", count);
    console.log(count);

    //display value
    //document.getElementById("result").innerHTML = count

} else {

    //document.getElementById("result").innerHTML = "Sorry, your browser does not support";
};

ex 1b)


