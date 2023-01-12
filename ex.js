function ggbOnInit(){

};

/*ex 1b*/
var v_formel = document.getElementById('v_formel');

new Sortable(v_formel, {
    group: 'shared', // set both lists to same group
    animation: 150
});


$("#v_formel").sortable({
    stop: function(event, ui) {
        var pos1 = $('.pos1').index();
        console.log(pos1);
        var pos2 = $('.pos2').index();
        console.log(pos2);
        var pos3 = $('.pos3').index();
        console.log(pos3);
        var pos5 = $('.pos5').index();
        if(pos1==0 && pos2==1 && (pos3==3 || pos3==5) && (pos5==3 || pos5==5)){
            var list = document.getElementsByClassName('list-group-item');
            var list_length = list.length;
            for (var i=0;i<list_length;i++){
                list[i].classList.add('list-group-item-success');
            }
        }
    }
});

$('#check_1b_switches').on('click',function(event){
    var val1 = $('.form-check-input').eq(0).prop("checked");
    var val2 = $('.form-check-input').eq(1).prop("checked");
    var val3 = $('.form-check-input').eq(2).prop("checked");
    var val4 = $('.form-check-input').eq(3).prop("checked");
    console.log("test");
    if ((val1==true && val3==true)){ 
        $('#check_1b_switches').removeClass('btn-outline-dark');      
        $('#check_1b_switches').addClass('btn-success disabled');      
    };
});

function check_1b_table_row(a){
    check=true;
    var h = parseFloat($('#zeile'+a+'_h').val());
    var b = parseFloat($('#zeile'+a+'_b').val());
    var l = parseFloat($('#zeile'+a+'_l').val());
    var v = parseFloat($('#zeile'+a+'_v').val());
    if(b.toFixed(1)!=(21-2*h).toFixed(1)){
        check = false;
    }else if(l.toFixed(1)!=(29.7-2*h).toFixed(1)){
        check = false;
    }
    else if(v.toFixed(0)!=(h*b*l).toFixed(0)){
        check = false;
    };
    if(check==true){
        $('#zeile'+a).addClass('table-success');
        $('#zeile'+a).removeClass('table-danger');
    } else {
        $('#zeile'+a).removeClass('table-success');
        $('#zeile'+a).addClass('table-danger');
    }
};

function move_on(){
    $("#switch1").prop('disabled', true);
    $("#switch2").prop('disabled', true);
    $("#switch3").prop('disabled', true);
    $("#switch4").prop('disabled', true);
    $("#switch5").prop('disabled', true);
    $("#switch6").prop('disabled', true);
    $("#move_on").addClass('disabled');

}

//ex 1c)

function check_1c_ggb(){
    // variables are true if sol_hi is free and false if used
    var free_sol_h0, free_sol_h1, free_sol_h2, free_sol_h3, free_sol_b1, free_sol_l1, free_sol_b, free_sol_l;
    free_sol_h0=free_sol_h1=free_sol_h2=free_sol_h3=free_sol_b1=free_sol_l1=free_sol_b=free_sol_l = true;
    var check = true;
    // check text fields ans_i with h (connect to point p_i)
    for (var i=0; i<4;i++){
        if(app_1c.evalCommandCAS("IsInRegion(p_"+i+",sol_h0)")=='true'){
            if(free_sol_h0==false){
                console.log("h0 not free");
                check=false;
                break;
            } else {
                free_sol_h0=false;
            }
        } else if (app_1c.evalCommandCAS("IsInRegion(p_"+i+",sol_h1)")=='true'){
            if(free_sol_h1==false){
                console.log("h1 not free");
                check=false;
                break;
            } else {
                free_sol_h1=false;
            }
        } else if (app_1c.evalCommandCAS("IsInRegion(p_"+i+",sol_h2)")=='true'){
            if(free_sol_h2==false){
                console.log("h2 not free");
                check=false;
                break;
            } else {
                free_sol_h2=false;
            }
        } else if (app_1c.evalCommandCAS("IsInRegion(p_"+i+",sol_h3)")=='true'){
            if(free_sol_h3==false){
                console.log("h3 not free");
                check=false;
                break;
            } else {
                free_sol_h3=false;
            }
        }
    };
    if (app_1c.evalCommandCAS("IsInRegion(p_b1,sol_b1)")=='false'){
        check=false;
    } else {
        free_sol_b1=false;
    };
    if (app_1c.evalCommandCAS("IsInRegion(p_l1,sol_l1)")=='false'){
        check=false;
    } else {
        free_sol_l1=false;
    };
    if (app_1c.evalCommandCAS("IsInRegion(p_b,sol_b)")=='false'){
        check=false;
    } else {
        free_sol_b=false;
    };
    if (app_1c.evalCommandCAS("IsInRegion(p_l,sol_l)")=='false'){
        check=false;
    } else {
        free_sol_l=false;
    };

    // check for line position (lu=links unten; lue=links unten eck)
    var ul_x = app_1c.getXcoord("ul");
    var ur_x = app_1c.getXcoord("ur");
    var lu_y = app_1c.getYcoord("lu");
    var lo_y = app_1c.getYcoord("lo");
    var lue_x = app_1c.getXcoord("lue");
    var lue_y = app_1c.getYcoord("lue");
    var loe_y = app_1c.getYcoord("loe");
    var rue_x = app_1c.getXcoord("rue");
    if ((ul_x-lue_x)!=(rue_x-ur_x) || ul_x==ur_x || ul_x==lue_x || ul_x==rue_x){
        console.log(ul_x);
        console.log(ur_x);
        console.log(lue_x);
        console.log(rue_x);
        console.log("fehler unten");
        check = false;
    } else if ((lu_y-lue_y)!=(loe_y-lo_y) || lu_y==lo_y || lu_y == lue_y || lu_y == loe_y){
        console.log((lu_y-lue_y)!=(loe_y-lo_y));
        console.log("fehler links");
        check = false;
    }

    if(check==false){
        console.log("Fehler.");
        //$('#check_1c_ggb').addClass('btn-danger');
    } else {
        console.log("Richtig.");
        $('#check_1c_ggb').removeClass('btn-outline-dark');
        $('#check_1c_ggb').addClass('btn-success disabled');
        app_1c.setCoords("lu",0,6);
        app_1c.setCoords("lo",0,14);
        app_1c.setCoords("ul",6,0);
        app_1c.setCoords("ur",24,0);
        app_1c.setVisible("ans0",false);
        app_1c.setVisible("ans1",false);
        app_1c.setVisible("ans2",false);
        app_1c.setVisible("ans3",false);
        app_1c.setVisible("ans_b",false);
        app_1c.setVisible("ans_b1",false);
        app_1c.setVisible("ans_l",false);
        app_1c.setVisible("ans_l1",false);
        app_1c.setVisible("end0",true);
        app_1c.setVisible("end1",true);
        app_1c.setVisible("end2",true);
        app_1c.setVisible("end3",true);
        app_1c.setVisible("end4",true);
        app_1c.setVisible("end5",true);
        app_1c.setVisible("end6",true);
        app_1c.setVisible("end7",true);
        app_1c.setGridVisible(false);
    };
}

var MQ_b = MathQuill.getInterface(2);
var MQ_l = MathQuill.getInterface(2);
var span_b = $('#mathfield_b');
var span_l = $('#mathfield_l');

var mathField_b=span_b.each(function() {
    MQ_b.MathField(this,{
        handlers: {
            enter: function() {check_1c_b_formel(mathField_b.text())} 
        }
    });
});

var mathField_l=span_l.each(function() {
    MQ_b.MathField(this,{
        handlers: {
            enter: function() {check_1c_l_formel(mathField_l.text())}
        }
    });
});


function check_1c_b_formel(input){
    console.log(typeof(input));
    console.log(input);
    var sol="21-2h";
    if(input.replace(/−/, "-").replace(/\u200B/g,'')===sol){
        console.log("richtig");
        $("#mathfield_b").css("background","#D1E7DD");
        $("#mathfield_b").css("pointer-events","none");
    } else {
        console.log("falsch");
    }
};

function check_1c_l_formel(input){
    console.log(typeof(input));
    console.log(input);
    var sol="29.7-2h";
    //check chars because of non-standard string in input 
    //var index;
    //for (index = 0; index < input.length; ++index) {
        //console.log("char " + index + ": " + input.charCodeAt(index));
        //}
        //var index2;
        //for (index2 = 0; index2 < sol.length; ++index2) {
            //console.log("char " + index2 + ": " + sol.charCodeAt(index2));
            //};
            if(input.replace(/−/, "-").replace(/\u200B/g,'')===sol){
                console.log("richtig");
                $("#mathfield_l").css("background","#D1E7DD");
                $("#mathfield_l").css("pointer-events","none");
            } else {
                console.log("falsch");
            }
};


//ex 1d
function check_1d_h(){
    var value=$('#check_1d_h').val();
    if(value=='h'){
        $("#check_1d_h").css("background","#D1E7DD");
        $("#mathfield_b").css("pointer-events","none");

        console.log("1d richtig");

        check_3_points();
    }
}

function check_h_max_real(){
    var value = $("#h_max_real").val();
    if (value=="10.5"){
        $("#h_max_real").css("background","#D1E7DD");
    }
}

function check_h_min_real(){
    var value = $("#h_min_real").val();
    if (value=="0"){
        $("#h_min_real").css("background","#D1E7DD");
    }
}


function check_1d_table(){

    var check=true;
    var i = 0;
    var value = app_1d.getValue("A"+(2+i));
    while(value==value){
        if (parseFloat(app_1d.getValue("B"+(2+i)))!=(21-2*value)){
            check=false;
            break;
        } else if (parseFloat(app_1d.getValue("C"+(2+i))).toFixed(1)!=(29.7-2*value).toFixed(1)){
            check=false;
            break;
        } else if (parseFloat(app_1d.getValue("D"+(2+i))).toFixed(1)!=(value*(21-2*value)*(29.7-2*value)).toFixed(1)){
            check=false;
            break;
        }
        i++;
        value=app_1d.getValue("A"+(2+i));

    } 
    if(check==true){
        console.log("richtig");
        $('#check_1d_table').addClass('btn-success disabled')
    } else {
        console.log("falsch"); 
    };
}

function fill_table(){
    console.log("Fülle Tabelle");
    var h = 0.5;
    for(var i=0;i<20;i++){
        var row_number = i+2;
        var b = 21-2*h;
        var l = 29.7-2*h;
        var v = h*b*l;
        app_1d.evalCommand("FillRow("+row_number+",{"+h+","+b+","+l+","+v+"})");
        h=h+0.5;
    };
}

function check_selection_1d(){
    var element = $('#selection_1d');
    var value = element.val();
    if (value=='1'){ 
        //element.addClass("w-25");
        element.removeClass("w-75");
        element.css("background","#D1E7DD");
        element.css("width","300px");
        element.prop('disabled', true);
        check_3_points(); 
    }
}


var start_list;
var start_list_length;
var count_good_points=0;

function check_3_points(){ 
    $("#feedback").css("display","inline");
    start_list = app_1e.getAllObjectNames(["Point"]);
    start_list_length=start_list.length;
    app_1e.registerUpdateListener(updateListener_check_3_points);
}

function updateListener_check_3_points(obj){
    var point_list_all=app_1e.getAllObjectNames(["Point"]);
    var point_list=point_list_all.slice(start_list_length);
    for(var i=0;i<point_list.length;i++){
        var point_x = app_1e.getXcoord(point_list[i]);
        var point_y = app_1e.getYcoord(point_list[i]);
        var v = point_x*(21-(2*point_x))*(29.7-(2*point_x));
        var dist = Math.abs(v-point_y);
        if(dist<50){
            count_good_points++;
        }
    }
    console.log(count_good_points);
    if (count_good_points==0 && point_list.length<=3){ 
        $("#feedback").html("Es fehlen noch 3 Punkte");
        $("#feedback").css("background","#ff8080");
    } else if (count_good_points==1){ 
        $("#feedback").html("Es fehlen noch 2 Punkte.");
        $("#feedback").css("background","#ff8080");
    } else if (count_good_points==2){ 
        $("#feedback").html("Es fehlt noch 1 Punkt");
        $("#feedback").css("background","#ff8080");
    } else if (count_good_points>=3 && count_good_points==point_list.length){
        $("#feedback").html("Gut gemacht.");
        $("#feedback").css("background","#D1E7DD");
        $("#feedback").css("cursor","pointer");
        $("#feedback").click(function(){
            //console.log("click_test");
            source_div=document.getElementById("feedback");
            target_div=document.getElementById("feedback_target");
            target_div.appendChild(source_div); 
            $("#feedback").removeClass("position-absolute");
            $("#feedback").css("top","");
            $("#feedback").css("right","");
            $("#feedback").html("Gut gemacht.");
            $("#feedback").removeClass("w-50");
            $("#feedback").css("display","inline-block");
            app_1e.showToolBar(false);

            // stop event listener for check_3_points
            app_1e.unregisterUpdateListener(updateListener_1e);
        });
    } else {
        $("#feedback").html("Lösche oder korrigiere zusätzliche Punkte!");
        $("#feedback").css("background","#ff8080");
    }
    count_good_points=0;
}

function generate_list(){
    var list=[];
    var i=2;
    var value = parseFloat(app_1d.getValue("A"+i));
    while(value!='' && value==value){
        console.log(value);
        list.push(value);
        // generate list in applet
        app_1e.evalCommand("SetValue(list, Length(list)+1,("+value+",0))");
        i++;
        value = parseFloat(app_1d.getValue("A"+i));   
    }
    return list; 
};

function draw_table(){    
    app_1e.showToolBar(false);
    app_1e.reset();
    var list=generate_list();
    for (var i=0;i<list.length;i++){
        var h = list[i];
        var v = (h*(21-2*h)*(29.7-2*h)).toFixed(1);
        app_1e.evalCommand("P_"+i+"=("+h+","+v+")");
        app_1e.setLabelVisible("P_"+i,false);
        var row_number = i+2;
        if(app_1d.getColor("A"+row_number)=="#FF0000"){
            app_1e.setColor("P_"+i,255,0,0);
        } else {
            app_1e.setColor("P_"+i,0,191,255);
        };
        app_1e.setFixed("P_"+i,true,false);
    }
    app_1e.evalCommand("A=Point(list)");
    app_1e.setVisible("A",true);
    app_1e.setVisible("a",true);
    app_1e.setVisible("b",true);

    // register listeners
    app_1e.registerObjectUpdateListener("A","objectUpdateListener_table");
};

function draw_graph(){
    app_1e.evalCommand("V_part=If[x>0 && x<10.5,V(h)]");
    app_1e.setColor("V_part",121, 49, 223);
}


// reset table and kill listeners
function clear_table(){
    app_1d.reset();
    app_1e.reset();
    $('#check_1d_table').removeClass('btn-success disabled')
    app_1e.unregisterObjectUpdateListener("A","objectUpdateListener_table"); 
    //app_1c.unregisterObjectUpdateListener("ul","objectUpdateListener_1c");
    //app_1c_light.unregisterObjectUpdateListener("ul","objectUpdateListener_1c_light");
};


function switch2sketch(){
    // switch listener
    app_1e.unregisterObjectUpdateListener("A","objectUpdateListener_table");
    app_1c_light.registerObjectUpdateListener("ul","objectUpdateListener_sketch");

    $('#applet_container_1c_light').show();
    $('#applet_container_1d').hide();
    $('#switch2table').show();
    $('#switch2sketch').hide();
    $('#clear_table').hide();
    $('#draw_table').hide();
    $('#fill_table').hide();
    $('#marker_button').hide();
    $('#marker_input_div').hide();


};

function objectUpdateListener_sketch(obj){
    var obj_x = app_1c_light.getXcoord(obj);
    app_1e.setCoords("A",obj_x,0);
}

function switch2table(){
    app_1c_light.unregisterObjectUpdateListener("ul","objectUpdateListener_sketch");
    app_1e.registerObjectUpdateListener("A","objectUpdateListener_table");

    $('#applet_container_1d').show();
    $('#applet_container_1c_light').hide();
    $('#switch2table').hide();
    $('#switch2sketch').show();
    $('#draw_table').show();
    $('#clear_table').show();
    $('#fill_table').show();
    $('#marker_button').show();
    $('#marker_input_div').show();

}

function objectUpdateListener_table(obj){
    // listener app_1e not working smooth with sketch --> only table
    var obj_x = app_1e.getXcoord(obj);
    // sync app_1e only with table
    var index = app_1e.evalCommandCAS("IndexOf(("+obj_x+",0),list)");
    var index_int = parseInt(index);
    if(index_int==index_int){
        highlight_table_row(index_int+1);
    } 
}

var last_row=2;
function highlight_table_row(row_number){ 
    app_1d.evalCommand("SetBackgroundColor(A"+last_row+",white)");
    app_1d.evalCommand("SetBackgroundColor(B"+last_row+",white)");
    app_1d.evalCommand("SetBackgroundColor(C"+last_row+",white)");
    app_1d.evalCommand("SetBackgroundColor(D"+last_row+",white)");

    app_1d.evalCommand("SetBackgroundColor(A"+row_number+",lightskyblue)");
    app_1d.evalCommand("SetBackgroundColor(B"+row_number+",lightgray)");
    app_1d.evalCommand("SetBackgroundColor(C"+row_number+",lightgray)");
    app_1d.evalCommand("SetBackgroundColor(D"+row_number+",lightskyblue)");

    last_row=row_number;
}

function marker(){
    var row_number = $("#marker_input").val();
    console.log(row_number);
    var color_state=app_1d.getColor("A"+row_number);
    console.log(color_state);
    if(color_state=="#000000"){
        app_1d.setColor("A"+row_number,255,0,0);
        app_1d.setColor("B"+row_number,255,0,0);
        app_1d.setColor("C"+row_number,255,0,0);
        app_1d.setColor("D"+row_number,255,0,0);
    } else { 
        app_1d.setColor("A"+row_number,0,0,0);
        app_1d.setColor("B"+row_number,0,0,0);
        app_1d.setColor("C"+row_number,0,0,0);
        app_1d.setColor("D"+row_number,0,0,0);
    }
}


/*ex_b*/
function check_h_max(){
    var value = $("#h_max").val();
    if(value=='4'){
        $("#h_max").css("background","#D1E7DD");
    }
}

function check_b_max(){
    var value = $("#b_max").val();
    if(value=='13'){
        $("#b_max").css("background","#D1E7DD");
    }
}

function check_l_max(){
    var value = $("#l_max").val();
    if(value=='21.7'){
        $("#l_max").css("background","#D1E7DD");
        activate_switches_1b();
    }
}

function activate_switches_1b(){
    $("#switch1").prop('disabled', false);
    $("#switch2").prop('disabled', false);
    $("#switch3").prop('disabled', false);
    $("#switch4").prop('disabled', false);
    $("#switch5").prop('disabled', false);
    $("#switch6").prop('disabled', false);
    $("#check_1b_ans").css("display","inline");
    $("#1b_text").css("display","none");

}

function check_1b_ans(){
    var check = true;
    if ($("#switch1").is(":checked")==false){
        check = false;
    } else if ($("#switch2").is(":checked")==true){
        check = false;
    } else if ($("#switch3").is(":checked")==true){
        check = false;
    } else if ($("#switch4").is(":checked")==false){
        check = false;
    } else if ($("#switch5").is(":checked")==false){
        check = false;
    } else if ($("#switch1").is(":checked")==false){
        check = false;
    }
    if (check==true){
        $("#check_1b_ans").addClass("btn-success disabled");
    }
}


/*ex_f*/
//var MQ_v = MathQuill.getInterface(2);
var MQ_v = MathQuill.noConflict().getInterface(2);
var span_v = $('#mathfield_v');
var mathField_v=span_v.each(function() {
    MQ_b.MathField(this,{
        handlers: {
            enter: function() {check_1f_v_formel(mathField_v.text())}
            //enter: function() {
                //check_1f_v_formel(mathField_v.text());
                //targetText=mathField_v.text();
                //var index;
                //for (index = 0; index < targetText.length; ++index) {
                    //console.log("char " + index + ": " + targetText.charCodeAt(index));
                    //};
                    //}
        }
    })
});

function check_1f_v_formel(input){
    console.log(typeof(input));
    console.log(input);
    var sol="h(21-2h)(29.7-2h)";
    var input_replace = input.replace(/−/, "-").replace(/\u200B/g,'');
    var check = true;
    var index;
    for (index = 0; index < sol.length; ++index) {
        user_input=input_replace.charCodeAt(index);
        sol_input=sol.charCodeAt(index);
        if(user_input!=sol_input){
            console.log(input_replace.charCodeAt(index));
            console.log(sol.charCodeAt(index));
            if(user_input==8722 && sol_input==45){
                check=true;
            } else {
                check = false;

            }
            break;
        }
    };
    if (check==true){
        $("#mathfield_v").css("background","#D1E7DD");
        $("#mathfield_v").css("pointer-events","none");
    }

    //if(input.replace(/−/, "-").replace(/\u200B/g,'')===sol){
        //console.log("richtig");
        //$("#mathfield_v").css("background","#D1E7DD");
        //$("#mathfield_v").css("pointer-events","none"); 
        //} else {
            //console.log("falsch");

            //}
};



/*end*/
$(".my-rating").starRating({
    starSize: 50,
    callback: function(currentRating, $el){
        // make a server call here
    }
});



/*--------move on------------*/
function move_on_1a(){
    $("#aufgabe1b").css("display","");
    $("#move_on_1a").css("display","none");
}

function move_on_1b_1(){ 
    $("#aufgabe1b_2").css("display","");
    $("#move_on_1b_1").css("display","none");
}

function move_on_1b_2(){ 
    $("#aufgabe1c").css("display","");
    $("#move_on_1b_2").css("display","none");
}
