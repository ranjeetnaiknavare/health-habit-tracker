// Initialize habits data structure
let habits = {
    water: { current: 0, target: 8 },
    exercise: { current: 0, target: 30 },
    sleep: { current: 0, target: 8 }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    updateDisplay();
    document.getElementById('current-date').textContent = new Date().toLocaleDateString();
});

// Load from localStorage
function loadProgress() {
    const savedData = localStorage.getItem('habits');
    if (savedData) {
        habits = JSON.parse(savedData);
    }
}

// Save to localStorage
function saveProgress() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

// Update display
function updateDisplay() {
    // Update water
    document.getElementById('water-count').textContent = habits.water.current;
    updateProgressBar('water', habits.water.current, habits.water.target);

    // Update exercise
    updateProgressBar('exercise', habits.exercise.current, habits.exercise.target);

    // Update sleep
    updateProgressBar('sleep', habits.sleep.current, habits.sleep.target);

    saveProgress();
}

function updateProgressBar(habit, current, target) {
    const progress = (current / target) * 100;
    const bar = document.getElementById(`${habit}-progress`);
    bar.style.width = `${Math.min(progress, 100)}%`;
}

// Habit update functions
function updateHabit(habit, amount) {
    habits[habit].current = Math.max(habits[habit].current + amount, 0);
    updateDisplay();
}

function logExercise() {
    const input = document.getElementById('exercise-input');
    const minutes = parseInt(input.value) || 0;
    habits.exercise.current += minutes;
    input.value = '';
    updateDisplay();
}

function logSleep() {
    const input = document.getElementById('sleep-input');
    const hours = parseInt(input.value) || 0;
    habits.sleep.current = hours;
    input.value = '';
    updateDisplay();
}

function resetDay() {
    if (confirm('Are you sure you want to reset all data for today?')) {
        habits.water.current = 0;
        habits.exercise.current = 0;
        habits.sleep.current = 0;
        updateDisplay();
    }
}