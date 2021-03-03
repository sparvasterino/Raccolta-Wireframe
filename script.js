
let init = function () {

  $('#rotateDiv input[type=text]').bind('keyup', 'keydown', function (event) {
    var inputLength = event.target.value.length;

    var oldstr = $(this).val();
    var str = "";

    for (var i = 0; i < oldstr.length; i++) {
      var c = oldstr.charAt(i);

      if(!(c >= '0' && c <= '9')) //check if the char is not a number, in that case do not apply the rotation
      { 
        
        // it is NOT a number
        
        switch(c)
        {
          case '°':
            break;

          default:
            $(this).val('°');
            alert("Please use only numbers to fill the angle value");
            return;
        }
      }
    }

    if ($(this).val()[0] == "0") {  //if there's only a 0 and I'm modifying the text I wanna spawn a ° symbol
      str = oldstr.replace('0', '');
      $(this).val(str);
    }

    oldstr = $(this).val();
    str = oldstr.replace('°', '');     // putting the ° symbol at the end of the string
    $(this).val(str + '°');    

    if (event.target.value.length >= 4) {
      oldstr = $(this).val();
      str = oldstr.replace('°', '');
      $(this).val(str.replaceAt(inputLength - 1, "°"));
    }

    if (event.key == "Backspace") {  //when I delete I always want the ° symbol to be at the end of the string

      oldstr = $(this).val();
      str = oldstr.replace('°', '');
      $(this).val(str.replaceAt(inputLength - 1, "°"));

    } else if (event.keyCode === 13) { //Pressed Enter->
      oldstr = $(this).val();

      if(oldstr == '°' || oldstr == "360°" || oldstr == "-360°") //if there're no numbers I want to spawn a 0
      {   
        $(this).val("0°");
        console.log("Set to 0");
        updateLamaRotation($(this).val().replace('°', '')); //to take only the numbers
        return;
      }

      var toFloatString = parseFloat(oldstr.replace('°', ''));
      if(toFloatString >= 360)
      {
        console.log("Greater than 360 :" + toFloatString);
        while(toFloatString - 360 >= 0)
        {
          toFloatString = toFloatString - 360;
          console.log(toFloatString);
        }

        $(this).val(toFloatString.toString() + "°");
      }

      updateLamaRotation($(this).val().replace('°', ''));
    }
  });
}

function updateLamaRotation(newAngle) {

  // var tr = $("#lamaImage").css("transform");

  // //console.log('Matrix: ' + tr);

  // var values = tr.split('(')[1].split(')')[0].split(',');
  // var a = values[0];
  // var b = values[1];

  // var scale = Math.sqrt(a*a + b*b);

  // var radians = Math.atan2(b, a);
  // if ( radians < 0 ) {
  //   radians += (2 * Math.PI);
  // }

  // var angle = Math.round( radians * (180/Math.PI));
  // if(angle < 0)
  // {
  //   angle = angle + 360;
  // }

  // var retunAngle = newAngle;

  // if(Math.abs(angle - newAngle) > 180)
  // {
  //   console.log("Antiorario");
  // //   retunAngle = -(360 - newAngle) + angle;
  // //   if(retunAngle == -360)
  // //   {
  // //     retunAngle = -0;
  // //   }
  //    console.log(retunAngle);
  // }

  $("#lamaImage").css({ transform: 'translate(-50%, -50%) rotate(' + Math.abs(newAngle) + 'deg)' });
  console.log('Rotate: ' + newAngle + 'deg');
}

String.prototype.replaceAt = function (index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function myFunction(x) {
  x.classList.toggle("change");
}

var slider = document.getElementById("opacityRange");

slider.oninput = function () {
  console.log(this.value / 100.0);
  $("#lamaImage").css("opacity", this.value / 100.0);
}

$(document).ready(init);