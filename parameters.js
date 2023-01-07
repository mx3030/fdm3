var parameters_1c = {
    "id":"app_1c",
    "filename":"ggb_files/1c.ggb",
    "height":400,
    "borderColor":"white",
    "enableShiftDragZoom":false,
    "useBrowserForJS":true,
    "showAlgebraInput":false,
};

var parameters_1d={
    "id":"app_1d",
    "filename":"ggb_files/1d.ggb",
    "height":500,
    "borderColor":"white",
    "showResetIcon":true,
};

var parameters_1e = {
        "id":"app_1e",
        "filename":"ggb_files/1e.ggb",
        "height":500,
        "prerelease":false,
        "showAlgebraInput":false,
        "showToolBar":true,
        "customToolBar":"1|6",
        "borderColor":"white",
        "showMenuBar":false,
        "showResetIcon":false,
        "enableLabelDrags":false,
        "enableShiftDragZoom":false,
        "enableRightClick":false,
        "capturingThreshold":null,
        "showToolBarHelp":false,
        "errorDialogsActive":true,
        "useBrowserForJS":false,
        };

var applet_1c = new GGBApplet(parameters_1c,true);
var applet_1d = new GGBApplet(parameters_1d,true);
var applet_1e = new GGBApplet(parameters_1e,true);

window.onload = function() {
        applet_1c.inject('applet_container_1c');
        applet_1d.inject('applet_container_1d');
        applet_1e.inject('applet_container_1e');
};


