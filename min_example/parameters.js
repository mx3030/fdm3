var parameters = {
        "id":"app",
        "filename":"test.ggb",
        "width":500,
        "height":500,
        "prerelease":false,
        "showAlgebraInput":false,
        "showToolBar":true,
        "customToolBar":"1|6|40|41|42",
        "borderColor":"white",
        "showMenuBar":false,
        "showResetIcon":false,
        "enableLabelDrags":false,
        "enableShiftDragZoom":false,
        "enableRightClick":false,
        "capturingThreshold":null,
        "showToolBarHelp":false,
        "errorDialogsActive":false,
        "useBrowserForJS":true,
        };

var applet = new GGBApplet(parameters,true);

window.onload = function() {
        applet.inject('applet_container');
};

