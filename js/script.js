document.addEventListener('DOMContentLoaded', function () {
    const puzzleContainer = document.getElementById('puzzle-container');
    const shuffleButton = document.getElementById('shuffle-button');
    const imageSrc = 'images/puzzle-image.jpg';
    const rows = 3;
    const cols = 3;
    let puzzlePieces = [];
    let selectedPiece = null;

    // Initialize puzzle pieces
    function initPuzzle() {
        puzzlePieces = [];
        puzzleContainer.innerHTML = '';
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const piece = document.createElement('div');
                piece.classList.add('puzzle-piece');
                piece.style.backgroundImage = `url(${imageSrc})`;
                piece.style.backgroundPosition = `-${col * 98}px -${row * 98}px`; // Ukuran potongan yang lebih kecil
                piece.dataset.position = `${row}-${col}`;
                piece.addEventListener('click', handlePieceClick);
                puzzlePieces.push(piece);
                puzzleContainer.appendChild(piece);
            }
        }
    }

    // Shuffle puzzle pieces
    function shufflePuzzle() {
        for (let i = puzzlePieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [puzzlePieces[i], puzzlePieces[j]] = [puzzlePieces[j], puzzlePieces[i]];
        }
        puzzleContainer.innerHTML = '';
        puzzlePieces.forEach(piece => puzzleContainer.appendChild(piece));
    }

    // Handle piece click
    function handlePieceClick() {
        if (!selectedPiece) {
            selectedPiece = this;
            this.classList.add('border-blue-500');
        } else {
            swapPieces(selectedPiece, this);
            selectedPiece.classList.remove('border-blue-500');
            selectedPiece = null;
            checkWin();
        }
    }

    // Swap two pieces
    function swapPieces(piece1, piece2) {
        const tempPosition = piece1.dataset.position;
        piece1.dataset.position = piece2.dataset.position;
        piece2.dataset.position = tempPosition;

        const parent = piece1.parentElement;
        const sibling1 = piece1.nextSibling === piece2 ? piece1 : piece1.nextSibling;
        parent.insertBefore(piece1, piece2);
        parent.insertBefore(piece2, sibling1);
    }

    // Check if the puzzle is solved
    function checkWin() {
        const isSolved = puzzlePieces.every((piece, index) => {
            const [row, col] = piece.dataset.position.split('-').map(Number);
            return row * cols + col === index;
        });

        if (isSolved) {
            alert('Congratulations! You solved the puzzle!');
        }
    }

    // Initialize the puzzle on page load
    initPuzzle();

    // Add event listener to the shuffle button
    shuffleButton.addEventListener('click', shufflePuzzle);
});
