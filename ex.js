function ggbOnInit(){
    var start_height = '6';
    console.log(app_1c.evalCommand("SetCoords(ul,"+start_height+",0)"));

    //app_1d.registerUpdateListener(updateListener_1d);
    //app_1e.registerUpdateListener(updateListener_3_points);

    //app_1d.registerAddListener("add2list");
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
    if(Math.abs(b-(21-2*h))>1){
        check = false;
    }else if(Math.abs(l-(29.7-2*h))>1){
        check = false;
    }
    else if(Math.abs(h*b*l-v)>(b*l*0.2+h*l*0.2+b*h*0.2)){
        check = false;
    };
    if(check==true){
        $('#zeile'+a).addClass('table-success');
    }
};


//ex 1c)
var element_number=0;
var check_last_element=false;
function add_element(){
    if(element_number<0){
        element_number=0;
    }
    var value = $("#text_value").val();
    app_1c.evalCommand("SetCoords(p_"+element_number+",10,10)");
    app_1c.setTextValue("j_"+element_number,value);
    app_1c.setVisible("j_"+element_number,true);
    app_1c.setVisible("p_"+element_number,true);
    if(element_number<7){    
        element_number++;
    }else{
        check_last_element=true;
    };
    console.log(element_number);
};

function remove_element(){  
    if(check_last_element==true){
        check_last_element=false;
    }else{
        element_number--;
    };
    app_1c.setVisible("j_"+element_number,false);
    app_1c.setVisible("p_"+element_number,false);
    console.log(element_number);
}

function check_1c_ggb(){
    var free_h1, free_h2, free_h3, free_h4, free_b, free_l;
    free_h1=free_h2=free_h3=free_h4=free_b=free_l=true;
    var check=true;
    var value = app_1c.getValueString("j_0");
    console.log(value);
    var check_pos = app_1c.evalCommandCAS("IsInRegion(p_0,sol_h1)");
    console.log(check_pos);
    for (var num=0;num<8;num++){
        var value = app_1c.getValueString("j_"+num);
        console.log(value);
        if(app_1c.evalCommandCAS("IsInRegion(p_"+num+",sol_h1)")=='true'){
            console.log("tekl");
            if(value!='h' || free_h1==false){
                check=false;
                break;
            } else {
                free_h1=false;
            }
        } else if (app_1c.evalCommandCAS("IsInRegion(p_"+num+",sol_h2)")=='true'){
            if(value!='h' || free_h2==false){
                check=false;
                break;
            } else {
                free_h2=false;
            }
        } else if (app_1c.evalCommandCAS("IsInRegion(p_"+num+",sol_h3)")=='true'){
            if(value!='h' || free_h3==false){
                check=false;
                break;
            } else {
                free_h3=false;
            }
        } else if (app_1c.evalCommandCAS("IsInRegion(p_"+num+",sol_h4)")=='true'){
            if(value!='h' || free_h4==false){
                check=false;
                break;
            } else {
                free_h4=false;
            }
        } else if (app_1c.evalCommandCAS("IsInRegion(p_"+num+",sol_b1)")=='true'){
            if(value!='b' || free_b==false){
                check=false;
                break;
            } else {
                free_b=false;
            }
        } else if (app_1c.evalCommandCAS("IsInRegion(p_"+num+",sol_l1)")=='true'){
            if(value!='l' || free_l==false){
                check=false;
                break;
            } else {
                free_l=false;
            }
        } else if (app_1c.evalCommandCAS("IsInRegion(p_"+num+",sol_b_ges)")=='true'){
            if(value!='21'){
                check=false;
                break;
            } 
        } else if(app_1c.evalCommandCAS("IsInRegion(p_"+num+",sol_l_ges)")=='true'){
            if(value!='29.7'){
                check=false;
                break;
            } 
        }
    };
    if(check==false || (free_h1==true || free_h2==true || free_h3==true || free_h4==true || free_b==true || free_l==true) ){
        console.log("Fehler.");
        //$('#check_1c_ggb').addClass('btn-danger');
    } else {
        console.log("Richtig.");
        $('#check_1c_ggb').removeClass('btn-outline-dark');
        $('#check_1c_ggb').addClass('btn-success disabled');
        for(var i=0;i<8;i++){
            app_1c.setVisible('i_'+i,true);
            app_1c.setVisible('j_'+i,false);
            app_1c.setVisible('p_'+i,false);
        }
        $("#input_help").css("display","none");
    }


}

function check_1c_ggb_old(){
    var free_h1, free_h2, free_h3, free_h4, free_b, free_l;
    free_h1=free_h2=free_h3=free_h4=free_b=free_l=true;
    var check=true;
    for (var num=0;num<6;num++){
        var value = app_1c.getValueString('i_'+num);
        var pobj='p_'+num;
        if(parseFloat(app_1c.getValue("Distance("+pobj+",h1)"))<0.001){
            if(value!='h' || free_h1==false){
                check=false;
                console.log(pobj+" keine Höhe (h1) oder bereits belegt.");
                break;
            } else {
                free_h1=false;
            }
        } else if(parseFloat(app_1c.getValue("Distance("+pobj+",h2)"))<0.001){
            if(value!='h' || free_h2==false){
                check=false;
                console.log(pobj+" keine Höhe (h2) oder bereits belegt.");
                break;
            } else {
                free_h2=false;
            }
        }  else if(parseFloat(app_1c.getValue("Distance("+pobj+",h3)"))<0.001){
            if(value!='h' || free_h3==false){
                check=false;
                console.log(pobj+" keine Höhe (h3) oder bereits belegt.");
                break;
            } else {
                free_h3=false;
            }
        } else if(parseFloat(app_1c.getValue("Distance("+pobj+",h4)"))<0.001){
            if(value!='h' || free_h4==false){
                check=false;
                console.log(pobj+" keine Höhe (h4) oder bereits belegt.");
                break;
            } else {
                free_h4=false;
            }
        } else if(parseFloat(app_1c.getValue("Distance("+pobj+",b1)"))<0.001){
            if(value!='b' || free_b==false){
                check=false;
                console.log(pobj+" keine Breite oder bereits belegt.");
                break;
            } else {
                free_b=false;
            }
        } else if(parseFloat(app_1c.getValue("Distance("+pobj+",l1)"))<0.001){
            if(value!='l' || free_l==false){
                check=false;
                console.log(pobj+" keine Länge oder bereits belegt.");
                break;
            } else {
                free_l=false;
            }
        } 
    }
    if(app_1c.getValueString('i_6')!="21 cm" || app_1c.getValueString('i_7')!="29.7 cm"){
        check=false;
    };
    if(check==false){
        console.log("Fehler.");
        //$('#check_1c_ggb').addClass('btn-danger');
    } else {
        console.log("Richtig.");
        $('#check_1c_ggb').removeClass('btn-outline-dark');
        $('#check_1c_ggb').addClass('btn-success disabled');
        for(var i=0;i<8;i++){
            app_1c.setVisible('i_'+i,true);
            app_1c.setVisible('input_'+i,false);
        }
    }
}

var MQ_b = MathQuill.getInterface(2);
var MQ_l = MathQuill.noConflict().getInterface(2);
var span_b = $('#mathfield_b');
var span_l = $('#mathfield_l');

var mathField_b=span_b.each(function() {
    MQ_b.MathField(this,{
        handlers: {
            enter: function() {check_1c_b_formel(mathField_b.text())}
            //enter: function() {
                //targetText=mathField.text();
                //var index;
                //for (index = 0; index < targetText.length; ++index) {
                    //console.log("char " + index + ": " + targetText.charCodeAt(index));
                    //}
                    //}

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

function check_1d_table(){
    var check=true;
    var h=0.5;
    for(var i=0;i<20;i++){
        if(parseFloat(app_1d.getValue("A"+(2+i)))!=h){
            check=false;
            break;
        } else if (parseFloat(app_1d.getValue("B"+(2+i)))!=(21-2*h)){
            console.log(app_1d.getValue("B"+(2+i)));
            console.log((21-2*h).toFixed(1));
            check=false;
            break;
        } else if (parseFloat(app_1d.getValue("C"+(2+i))).toFixed(1)!=(29.7-2*h).toFixed(1)){
            console.log(app_1d.getValue("C"+(2+i)));
            console.log((29.7-2*h).toFixed(1));
            check=false;
            break;
        } else if (parseFloat(app_1d.getValue("D"+(2+i))).toFixed(1)!=(h*(21-2*h)*(29.7-2*h)).toFixed(1)){
            console.log(app_1d.getValue("D"+(2+i)));
            console.log((h*(21-2*h)*(29.7-2*h)).toFixed(1));
            check=false;
            break;
        }
        h=h+0.5;
    };
    if(check==true){
        console.log("richtig");
        $('#check_1d_table').addClass('btn-success disabled')
    } else {
        console.log("falsch"); 
    };
}


var start_list;
var start_list_length;
var count_good_points=0;

function check_3_points(){ 
    $("#feedback").css("display","block");
    start_list = app_1e.getAllObjectNames(["Point"]);
    start_list_length=start_list.length;
    app_1e.registerAddListener(addListener_1e);
    app_1e.registerUpdateListener(updateListener_1e);
}

function addListener_1e(obj){
    //var value = app_1e.getValueString(obj);
    //console.log(value);
};

function updateListener_1e(obj){
    var point_list_all=app_1e.getAllObjectNames(["Point"]);
    var point_list=point_list_all.slice(start_list_length);
    //console.log(point_list);
    for(var i=0;i<point_list.length;i++){
        var point_x = app_1e.getXcoord(point_list[i]);
        //console.log(point_x);
        var point_y = app_1e.getYcoord(point_list[i]);
        //console.log(point_y);
        var v = point_x*(21-(2*point_x))*(29.7-(2*point_x));
        var dist = Math.abs(v-point_y);
        //console.log(dist);
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
        $("#feedback").html("Gut gemacht. Drücken um fortzufahren.");
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

            app_1e.unregisterAddListener(addListener_1e);
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
        app_1e.setColor("P_"+i,102,153,255);
    }
    app_1e.evalCommand("A=Point(list)");
    app_1e.setVisible("A",true);
    app_1e.setVisible("a",true);
    app_1e.setVisible("b",true);

    app_1c.registerObjectUpdateListener("ul","objectUpdateListener_1c");
    //app_1d.registerClickListener(clickListener);
    //app_1e.registerAddListener(addListener);
    //app_1e.registerUpdateListener(updateListener);
    app_1e.registerObjectUpdateListener("A","objectUpdateListener");

};


function objectUpdateListener_1c(obj){
    var obj_x = app_1c.getXcoord(obj);
    app_1e.setCoords("A",obj_x,0);
}

function objectUpdateListener(obj){
    console.log(obj);
    var obj_x = app_1e.getXcoord(obj);
    console.log(obj_x);
    if($('#applet_container_1d').is(':visible')){
        var index = app_1e.evalCommandCAS("IndexOf(("+obj_x+",0),list)");
        console.log(index);
        console.log(parseInt(index));
        var index_int = parseInt(index);
        if(index_int==index_int){
            highlight_table_row(index_int+1);
        }
    } else {
        app_1c.setCoords("ul",obj_x,0);        
    }
}
    

var last_row=2;

function highlight_table_row(row_number){
    
    app_1d.evalCommand("SetBackgroundColor(A"+last_row+",white)");
    app_1d.evalCommand("SetBackgroundColor(B"+last_row+",white)");
    app_1d.evalCommand("SetBackgroundColor(C"+last_row+",white)");
    app_1d.evalCommand("SetBackgroundColor(D"+last_row+",white)");

    app_1d.evalCommand("SetBackgroundColor(A"+row_number+",deepskyblue)");
    app_1d.evalCommand("SetBackgroundColor(B"+row_number+",deepskyblue)");
    app_1d.evalCommand("SetBackgroundColor(C"+row_number+",deepskyblue)");
    app_1d.evalCommand("SetBackgroundColor(D"+row_number+",deepskyblue)");

    last_row=row_number;
}




function clear_1d_table(){
    app_1d.reset();
    app_1e.reset();
    //app_1e.unregisterAddListener(addListener);
    //app_1e.unregisterUpdateListener(updateListener);
    app_1e.unregisterObjectUpdateListener("A","objectUpdateListener"); 
    //app_1d.unregisterClickListener(clickListener);
    app_1c.unregisterObjectUpdateListener("ul","objectUpdateListener_1c");
};


function switch2sketch(){
    var source_div = document.getElementById("applet_container_1c");   // order: first, second, third
    var target_div = document.getElementById("switch_div");
    $("#applet_container_1c").css("display","");
    $("#applet_container_1d").css("display","none");
    target_div.appendChild(source_div); // order: third, first, second
    var state = false;
    for(var i=0;i<4;i++){
        app_1c.setVisible("v_"+i,state);
    };
    for (var j=0;j<8;j++){
        app_1c.setVisible("i_"+j,state);
    }
    app_1c.setAxesVisible(true,true);

    $('#switch2table').css("display","inline");
    $('#switch2sketch').css("display","none");
    $('#clear_1d_table').css("display","none");
    $('#draw_table').css("display","none");



};

function switch2table(){
    $('#applet_container_1d').css("display","inline");
    $('#applet_container_1c').css("display","none");
    $('#switch2sketch').css("display","inline");
    $('#switch2table').css("display","none");
    $('#clear_1d_table').css("display","inline");
    $('#draw_table').css("display","inline");

}


/*end*/
$(".my-rating").starRating({
    starSize: 50,
    callback: function(currentRating, $el){
        // make a server call here
    }
});

function test(){
    console.log("test");
    highlight_table_row(2);
}
