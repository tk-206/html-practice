// 페이지 관리
function showPage(pageId) {
    // 모든 페이지 숨기기
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // 선택된 페이지 보이기
    document.getElementById(pageId).classList.add('active');
    
    // 네비게이션 활성 상태 변경
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    event.target.classLisßt.add('active');
    
    // 모바일 메뉴 닫기
    document.getElementById('navMenu').classList.remove('show');
}

// 모바일 메뉴 토글
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('show');
}

// 틱택토 게임 로직
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = '🐱';
let gameActive = true;
let scores = { cat: 0, fish: 0, tie: 0 };

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function makeMove(cellIndex) {
    if (board[cellIndex] !== '' || !gameActive) return;
    
    board[cellIndex] = currentPlayer;
    document.querySelectorAll('.game-cell')[cellIndex].textContent = currentPlayer;
    
    if (checkWinner()) {
        gameActive = false;
        if (currentPlayer === '🐱') {
            scores.cat++;
            document.getElementById('catScore').textContent = scores.cat;
            document.getElementById('gameStatus').textContent = '🎉 고양이 승리!';
        } else {
            scores.fish++;
            document.getElementById('fishScore').textContent = scores.fish;
            document.getElementById('gameStatus').textContent = '🎉 물고기 승리!';
        }
    } else if (board.every(cell => cell !== '')) {
        scores.tie++;
        document.getElementById('tieScore').textContent = scores.tie;
        document.getElementById('gameStatus').textContent = '😸 무승부!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === '🐱' ? '🐟' : '🐱';
        document.getElementById('gameStatus').textContent = 
            currentPlayer === '🐱' ? '고양이의 차례입니다! 🐱' : '물고기의 차례입니다! 🐟';
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = '🐱';
    gameActive = true;
    document.querySelectorAll('.game-cell').forEach(cell => cell.textContent = '');
    document.getElementById('gameStatus').textContent = '고양이의 차례입니다! 🐱';
}

// 연락처 폼 처리
function sendMessage(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // 실제로는 서버로 전송하겠지만, 여기서는 알림만
    alert(`메시지가 전송되었습니다! 🎉\n\n보낸 사람: ${name}\n제목: ${subject}\n\n감사합니다! 곧 연락드리겠습니다. 😸`);
    
    // 폼 초기화
    document.querySelector('form').reset();
}


// 페이지 로드 시 배경 고양이들 랜덤 위치 설정
document.addEventListener('DOMContentLoaded', function() {
    const floatingCats = document.querySelectorAll('.floating-cat');
    floatingCats.forEach(cat => {
        const randomTop = Math.random() * 60 + 10;
        const randomLeft = Math.random() * 80 + 10;
        const randomDelay = Math.random() * 5;
        cat.style.top = randomTop + '%';
        cat.style.left = randomLeft + '%';
        cat.style.animationDelay = randomDelay + 's';
    });
});