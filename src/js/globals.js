
var app;
var previousStatus;
var originFile;
var xmlns = "http://www.w3.org/2000/svg";
var hranabymove;
var canvas; //TODO refactor to app.canvas
var transitions = [];
var places = [];
var arcs = [];
var bod = new Point(0,0);
var kresli_sa_hrana = 0;
var source_hrany;
var polomer = 18;
var velkost = 36;
var posunutie_suradnic = 20;
var arrowHeadSize = 9;
var pocetmousedown = 0;
var sirkatextu = 0;
var fontfamily = "verdana";
var fontsize = 12;
var korekcia = 0.75 * fontsize;
var fontsizeoffset = 18;
var vahaoffset = 10;
var posuva_sa_hrana = 0;
var pocetmousedownposuv = 0;
var pocetmousedownposuvtran = 0;
var pocetmousedownposuvplace = 0;

var posuvanahrana;
var tokenpolomer = 3;
var tokenposuv = 7;
var hybesaprechod = 0;
var hybesamiesto = 0;
var movedprechod;
var movedmiesto;
var id = 0;

var text = "";
var menofilu = "newmodel.xml";
var downloadLink;
var appwidth = 10000;
var appheight = 5000;
var maxwidth = 10000;
var maxheight = 5000;
var minwidth = 640;
var minheight = 360;
var gridstep = 2 * posunutie_suradnic;
var maxx = maxwidth - posunutie_suradnic;
var maxy = maxheight - posunutie_suradnic;
var modal;
var shade;
var insidemodal;
var helptext;

var processdata = [];
var arc_for_data;