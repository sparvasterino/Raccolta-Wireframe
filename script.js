
let init = function () {

  $('#rotateDiv input[type=text]').bind('keyup', 'keydown', function (event) {
    var inputLength = event.target.value.length;

    if ($(this).val()[0] == "0") {  //if there's a 0 and I'm modifying the text I don't want it
      var oldstr = $(this).val();
      var str = oldstr.replace('0', '');
      $(this).val(str);
    }

    var oldstr = $(this).val();
    var str = oldstr.replace('°', '');     // putting the ° symbol at the end of the string
    $(this).val(str + '°');    

    if (event.key == "Backspace") {  //when I delete I always want the ° symbol to be at the end of the string

      var oldstr = $(this).val();
      var str = oldstr.replace('°', '');
      $(this).val(str.replaceAt(inputLength - 1, "°"));

    } else if (event.keyCode === 13) { //Pressed Enter->
      var oldstr = $(this).val();

      switch(oldstr)
      {
        case '°': //if there're no numbers I want to spawn a 0
          $(this).val("0°");
          break;
        case "360°":
          $(this).val("0°");
          break;
      }

      updateLamaRotation($(this).val().replace('°', '')); //to take only the numbers
      console.log($(this).val().replace('°', ''));
    }

    if (event.target.value.length >= 4) {
      var _oldstr = $(this).val();
      var newStr = _oldstr.replace('°', '');
      var _str = newStr.replaceAt(inputLength - 1, "°");
      $(this).val(_str);
    }
  })
}

function updateLamaRotation(newAngle) {
  $("#lamaImage").css({ transform: 'translate(-50%, -50%) rotate(' + newAngle + 'deg)' });
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