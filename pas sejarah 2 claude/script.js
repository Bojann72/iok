const questions = {
    1: [
        {
            question: "Kapan Indonesia merdeka?",
            options: ["17 Agustus 1945", "17 Agustus 1944", "18 Agustus 1945", "16 Agustus 1945"],
            correct: 0
        },
        {
            question: "Siapa yang menjahit bendera merah putih?",
            options: ["Fatmawati", "Megawati", "Cut Nyak Dien", "R.A. Kartini"],
            correct: 0
        }
        // Tambahkan lebih banyak pertanyaan untuk setiap level
    ],
    2: [
        {
            question: "Siapa proklamator Indonesia?",
            options: ["Soekarno-Hatta", "Soeharto-Habibie", "Soekarno-Soeharto", "Hatta-Habibie"],
            correct: 0
        }
    ],
    3: [
        {
            question: "Dimana teks proklamasi diketik?",
            options: ["Rumah Laksamana Maeda", "Istana Merdeka", "Rengasdengklok", "Pegangsaan Timur"],
            correct: 0
        }
    ],
    4: [
        {
            question: "Apa nama peristiwa penculikan Soekarno-Hatta sebelum proklamasi?",
            options: ["Peristiwa Rengasdengklok", "Peristiwa Madiun", "Peristiwa G30S", "Peristiwa Supersemar"],
            correct: 0
        }
    ],
    5: [
        {
            question: "Siapa yang mengetik teks proklamasi?",
            options: ["Sayuti Melik", "Ahmad Soebardjo", "Fatmawati", "Soekarno"],
            correct: 0
        }
    ]
};

let currentLevel = 1;
let currentQuestion = 0;
let score = 0;
let health = 3;
let unlockedLevels = 1;

function showNotification(message, isCorrect) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${isCorrect ? 'correct' : 'wrong'} show`;
    
    setTimeout(() => {
        notification.className = 'notification';
    }, 2000);
}

function createConfetti() {
    for(let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

function updateHealthBar() {
    const healthUnits = document.querySelectorAll('.health-unit');
    healthUnits.forEach((unit, index) => {
        if (index >= health) {
            unit.classList.add('lost');
        } else {
            unit.classList.remove('lost');
        }
    });
}

function unlockNextLevel() {
    if (unlockedLevels < 5) {
        unlockedLevels++;
        const levelButtons = document.querySelectorAll('.level-btn');
        levelButtons[unlockedLevels - 1].disabled = false;
    }
}

function resetHealth() {
    health = 3;
    updateHealthBar();
}

function showMainMenu() {
    document.getElementById('main-menu').style.display = 'block';
    document.getElementById('levels').style.display = 'none';
    document.getElementById('settings').style.display = 'none';
    document.getElementById('question-container').style.display = 'none';
}

function showLevels() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('levels').style.display = 'grid';
    document.getElementById('settings').style.display = 'none';
    document.getElementById('question-container').style.display = 'none';
}

function showSettings() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('levels').style.display = 'none';
    document.getElementById('settings').style.display = 'block';
    document.getElementById('question-container').style.display = 'none';
}

function startLevel(level) {
    if (level > unlockedLevels) return;
    
    currentLevel = level;
    currentQuestion = 0;
    score = 0;
    resetHealth();
    showQuestion();
}

function showQuestion() {
    const questionData = questions[currentLevel][currentQuestion];
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('levels').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';

    document.getElementById('question').innerHTML = `<h2>Level ${currentLevel} - Pertanyaan ${currentQuestion + 1}</h2>
        <p>${questionData.question}</p>`;

    const optionsHtml = questionData.options.map((option, index) =>
        `<button onclick="checkAnswer(${index})">${option}</button>`
    ).join('');

    document.getElementById('options').innerHTML = optionsHtml;
}

function checkAnswer(selectedIndex) {
    const questionData = questions[currentLevel][currentQuestion];
    const buttons = document.querySelectorAll('.options button');
    
    if (selectedIndex === questionData.correct) {
        score++;
        buttons[selectedIndex].classList.add('correct-answer');
        showNotification('Jawaban Benar! 🎉', true);
        createConfetti();
        
        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < questions[currentLevel].length) {
                showQuestion();
            } else {
                // Level selesai
                unlockNextLevel();
                alert(`Level ${currentLevel} selesai!\nSkor: ${score}/${questions[currentLevel].length}`);
                showLevels();
            }
        }, 1500);
    } else {
        buttons[selectedIndex].classList.add('wrong-answer');
        showNotification('Jawaban Salah! 😢', false);
        health--;
        updateHealthBar();
        
        buttons.forEach(button => button.disabled = true);
        
        setTimeout(() => {
            if (health <= 0) {
                alert('Game Over! Anda kehabisan nyawa. Silakan coba lagi.');
                currentQuestion = 0;
                resetHealth();
            }
            showQuestion();
        }, 1500);
    }
}

function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    if (musicToggle.checked) {
        music.play();
    } else {
        music.pause();
    }
}

// Inisialisasi
showMainMenu();
updateHealthBar();