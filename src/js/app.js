$(document).ready(function() {

  //Hide sections that aren't needed
  $("#s-2").hide();

  function StartPomodoro(task) {
      $("#s-2").show();
      $("#s-1").hide();

      $("#pomodoro_task").html(task);
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
          }
      }, 1000);
  }

  $("#start_pomodoro").click(function() {
      StartPomodoro($("#goal_input").val());

      var tf_minutes = 60 * 25,
          display = $('#time');
      startTimer(tf_minutes, display);
  });

});
