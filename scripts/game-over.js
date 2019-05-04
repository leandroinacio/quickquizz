(function() {
  // Page elements
  const username = document.getElementById("username");
  const submitBtn = document.getElementById("submit");
  const score = document.getElementById("final-score");

  // Add events
  username.addEventListener("keyup", e => {
    submitBtn.disabled = !e.target.value;
  });

  saveHighScore = e => {
    e.preventDefault();
    console.log(e);
  };

  initPage = () => {
    score.innerText = `Final Score: ${localStorage.getItem("score")}`;
  };

  initPage();
})();
