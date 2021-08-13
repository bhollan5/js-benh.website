var fade = false;
var aboutFade = false;
var scale = 1.0;
var currentStyle = 1;
var pastStyle = 0;
var inital = false;

function init() {
  design3setup();
  
}

function newstyle() {
  pastStyle = currentStyle;
  currentStyle++;
  
  if (currentStyle >= 6) {
    currentStyle = 1;
  }
  
  $("#BenH").removeClass("threed" + pastStyle);
    $("#BenH").addClass("threed" + currentStyle);
  $("#about").removeClass("threedDown" + pastStyle);
  $("#about").addClass("threedDown" + currentStyle);
  $("#projects").removeClass("threedDown" + pastStyle);
  $("#projects").addClass("threedDown" + currentStyle);
  $("#resume").removeClass("threedDown" + pastStyle);
  $("#resume").addClass("threedDown" + currentStyle);
  $("#ground").removeClass("ground" + pastStyle);
  $("#ground").addClass("ground" + currentStyle);
  $("#qbutton").removeClass("qbutton" + pastStyle);
  $("#qbutton").addClass("qbutton" + currentStyle);
  $("#qbutton").removeClass("threedDownButton" + pastStyle);
  $("#qbutton").addClass("threedDownButton" + currentStyle);
  $("body").removeClass("bg" + pastStyle);
  $("body").addClass("bg" + currentStyle);
  
  if (currentStyle == 1) {
    $("#flowers").css("display", "block");
    $(".cloud").css("display", "block");
  }
  else {
    $("#flowers").css("display", "none");
    $(".cloud").css("display", "none");
  }
  
  if (currentStyle == 2) {
    $(".spheres").css("display", "block");
  }
  else {
    $(".spheres").css("display", "none");
  }
  
  if (currentStyle == 3) {
    $(".design3").css("display", "block");
  }
  else {
    $(".design3").css("display", "none");
  }
if (currentStyle == 4) {
    $(".design4").css("display", "block");
  }
  else {
    $(".design4").css("display", "none");
  }
  
  
  
  
}


var q = 0;
// Runs once every 10 milliseconds
function click() {
  
  if (!inital) {
    ++q
    
    init();
    inital = true;
  }
//  design4ground();
}

function toAbout() {
  $("#container").delay(1000).fadeOut();
  $("#aboutPage").delay(0).animate({width:'toggle'},2050);
    
    $("#abtcontent").delay(1400).fadeIn();
    $("#suit").delay(2000).fadeIn(1000);

}
function toProjects() {
    //alert("honk");
  $("#projectsPage").fadeIn();
    $("#projectsContent").delay(100).fadeIn();

    

}
function toResume() {
    $("#x").fadeIn();
    $("#resumePage").fadeIn();
}

function design3setup() {
  
  var colors = ["lavender", "thistle", "plum", "violet", "orchid", "magenta", "mediumorchid", "mediumpurple", "blueviolet", "darkmagenta", "indigo"]
  
  for (var i = 0; i < 50; ++i) {
    var size = Math.floor((Math.random() * 200) + 30);
    var posX = Math.floor(Math.random() * $(window).width());
    var posY = Math.floor(Math.random() * $(window).height());
    var clr = Math.floor(Math.random() * colors.length)
    var delay = Math.floor(Math.random() * 100);
    var speed = Math.floor(100 * size/200) + 50;
    
    $(".design3").html(
      $(".design3").html() + "<div id='floaty' class='floaty" + i + "'></div>");
    
    $(".floaty" + i).css("width", size + "px");
    $(".floaty" + i).css("height", size + "px");
    
    $(".floaty" + i).css("top", posY + "px");
    $(".floaty" + i).css("left", posX + "px");
    $(".floaty" + i).css("background-color", colors[clr]);
    
    $(".floaty" + i).css("filter", "blur(" + (size / 50) + "px)");
    $(".floaty" + i).css("opacity", .8 - size/ 300);
      $(".floaty" + i).css("z-index", "-110");
      $(".floaty" + i).css("transform", "translateZ(-100px)");
    
    $(".floaty" + i).css("animation", "floatDown " + speed + "s linear infinite");
    $(".floaty" + i).css("animation-delay", "-" + delay + "s");
    
    
  }
}

var floor = [1, 3, 6];
var colors = ["yellow", "hotpink", "cyan"]

function design4ground() {
    console.log("run");
    for (var i = 0; i < floor.length; i++) {
        floor[i] = (floor[i] * 1.005);
        if (floor[i] > 10) {
            floor[i] = 1;
            var tempColor = colors.pop();
            colors.unshift(tempColor);
            floor.sort();
            console.log(floor[0] + " " + floor[1] + " " + floor[2]);
        }
    }
    var boxShad = (-(floor[0] * 3) + "px " + (floor[0] * 9) + "px 0px " + colors[0] + ", " + -(floor[1] * 3) + "px " + (floor[1] * 9) + "px 5px " + colors[1] + ", " + -(floor[2] * 3) + "px " + (floor[2] * 9) + "px 10px " + colors[2])
    $(".ground4").css('box-shadow', boxShad);
    
    
//    box-shadow: 
//        -3px 9px yellow,
//        -6px 18px hotpink,
//        -9px 27px cyan;
}

function main() {
  $("#aboutPage").fadeOut();
    $("#suit").fadeOut();
    $("#projectsPage").fadeOut();
    $("#x").fadeOut();
    $("#resumePage").fadeOut();
  $("#container").css("display", "block");
    $("#abtcontent").fadeOut();
  scale = 1.0
}
