document.getElementById("calculatorForm").addEventListener("submit", (e) => {
  e.preventDefault();
  calculateCalories();
});

function calculateCalories() {
  const gender = document.getElementById("gender").value;
  const age = parseFloat(document.getElementById("age").value);
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const activityLevel = document.getElementById("activityLevel").value;
  const targetWeight = parseFloat(
    document.getElementById("targetWeight").value
  );
  const weightLossPace = parseFloat(
    document.getElementById("weightLossPace").value
  );

  const bmr =
    gender === "male"
      ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
      : 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;

  const activityMultiplier = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    heavy: 1.725,
    athlete: 1.9,
  };

  const tdee = bmr * activityMultiplier[activityLevel];
  const deficit = tdee - tdee * (1 - 0.2);
  const weeksToTarget = (weight - targetWeight) / weightLossPace;

  const resultDiv = document.getElementById("result");
  resultDiv.classList.add("result");
  resultDiv.style.display = "block";

  resultDiv.innerHTML = `
    <h2>My calorie deficit</h2><br>
    <p>Calories to maintain current weight: ${tdee.toFixed(0)} calories</p><br>
    <p>Recommended daily calories: ${(tdee * (1 - 0.2)).toFixed(
      0
    )} calories</p><br>
    <p>To reach your target weight of ${targetWeight} kg at a pace of ${weightLossPace} kg per week, you should aim for ${deficit.toFixed(
    0
  )} calories per day.</p><br>
    <p>This will take approximately ${Math.round(
      weeksToTarget
    )} weeks (around ${new Date(
    new Date().getTime() + weeksToTarget * 7 * 24 * 60 * 60 * 1000
  ).toLocaleDateString()})</p>
  `;
}
