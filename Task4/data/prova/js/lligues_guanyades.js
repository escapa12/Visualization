window.onload = function(){
     var canvas = document.getElementById("lligues");
     var context = canvas.getContext("2d");
     var imageObj = new Image();
     imageObj.onload = function(){
         context.drawImage(imageObj, 10, 10);
         context.font = "40pt Calibri";
         context.fillText("My TEXT!", 20, 20);
     };
     imageObj.src = "../imatges/copa_or.jpg";
}
