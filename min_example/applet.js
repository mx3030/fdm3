// Diese Funktion wird beim Laden der Seite ausgeführt
function ggbOnInit(){
    app.evalCommand("g(x)=x");

    // Registrierung eines EventListeners.
    // Bei Hinzufügen eines Objekts, wird Funktion objectAddListener1()
    // ausgeführt.
    app.registerAddListener(objectAddListener1);
}

function objectAddListener1(obj){
    alert("Punkt wurde hinzugefügt.");
}

//Diese Funktion kann z.B. ausgeführt werden, wenn Button gedrückt wird.
function test(){
    app.registerAddListener(objectAddListener2);
}

function objectAddListener2(obj){
    alert("Punkt wurde hinzugefügt.");
}
