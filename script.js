const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const proposalInterface = document.getElementById('proposalInterface');
const successResponse = document.getElementById('successResponse');
const responseForm = document.getElementById('responseForm');
const formAnswer = document.getElementById('formAnswer');

// Playful "No" button escaping trick
function moveNoButton() {
    const container = document.getElementById('mainCard');
    const padding = 20;
    
    // Switch to absolute positioning dynamically ONLY when interacted with
    if (noBtn.style.position !== 'absolute') {
        noBtn.style.position = 'absolute';
    }
    
    const maxX = container.clientWidth - noBtn.clientWidth - padding;
    const maxY = container.clientHeight - noBtn.clientHeight - padding;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    moveNoButton();
});

// Capture the click event, update the hidden form, submit it, and change screens
yesBtn.addEventListener('click', () => {
    formAnswer.value = "Hamdalat said YES! 💖";

    const formData = new FormData(responseForm);
    fetch(responseForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).catch(error => console.log('Form submission handling:', error));

    proposalInterface.style.display = 'none';
    successResponse.style.display = 'block';
    createCelebrationHearts();
});

// Ambient background floating hearts
function createBgHeart() {
    const heart = document.createElement('div');
    heart.classList.add('bg-heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(createBgHeart, 800);

// Screen celebration effect
function createCelebrationHearts() {
    for(let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('bg-heart');
            heart.innerHTML = ['💖','💝','❤️','💕'][Math.floor(Math.random() * 4)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
            document.body.appendChild(heart);
        }, i * 50);
    }
}
