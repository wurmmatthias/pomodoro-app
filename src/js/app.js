$(document).ready(function() {

  var relaxController = false;
  //Hide sections that aren't needed
  $("#s-2").hide();
  $("#s-3").hide();

  function StartPomodoro(task) {
      $("#s-2").show();
      $("#s-1").hide();

      $("#pomodoro_task").html(task);
  }

  function Relax() {
    $("#s-1").hide();
    $("#s-2").hide();
    $("#s-3").show();//Show relaxation panel

    var relax_minutes = 60 * 5,
        display = $('#relax_time');
    startTimer(relax_minutes, display);
  }

    relaxController = false;
    $("#s-1").show();
    $("#s-2").hide();
    $("#s-3").hide();//Show relaxation panel
  }

  function Notify(message, icon, title) {
    var options = {
     body: message,
     icon: icon
     }
    // Let's check if the browser supports notifications
     if (!("Notification" in window)) {
       alert("This browser does not support desktop notification");
     }
     // Let's check whether notification permissions have already been granted
     else if (Notification.permission === "granted") {
       // If it's okay let's create a notification
       var notification = new Notification(title, options);
     }
     // Otherwise, we need to ask the user for permission
     else if (Notification.permission !== "denied") {
       Notification.requestPermission().then(function (permission) {
         // If the user accepts, let's create a notification
         if (permission === "granted") {
           var notification = new Notification(title, options);
         }
       });
     }
  }

  function startTimer(duration, display) {
      var timer = duration, minutes, seconds;
      setInterval(function () {
          minutes = parseInt(timer / 60, 10)
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          display.text(minutes + ":" + seconds);

          if (--timer < 0) {
              timer = duration;
          } else if (timer == 0 && relaxController == false) {
            Notify("The timer has run out!", "https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/clock-512.png", "Pomodoro App");
            Relax();
          } else if (timer == 0 && relaxController == true) {
            Notify("Your relaxation time is over! Get back to work, please.", "https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/check-512.png", "Pomodoro App");
            Reset();
          }
      }, 1000);
  }

  $("#start_pomodoro").click(function() {
      StartPomodoro($("#goal_input").val());

      var tf_minutes = 60 * 0.1,
          display = $('#time');
      startTimer(tf_minutes, display);
  });

});
