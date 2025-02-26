class FireAndIce {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.statusElement = document.getElementById('status');
        
        // Game state
        this.currentPlayer = 'fire'; // 'fire' or 'ice'
        this.selectedPeg = null;
        this.board = this.initializeBoard();
        
        // Constants for drawing
        this.triangleSize = 150;
        this.pegRadius = 10;
        this.centers = this.calculateTriangleCenters();
        
        // Add click handler
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        
        // Initial draw
        this.draw();
    }

    initializeBoard() {
        // Create empty board structure
        let board = new Array(7).fill(null).map(() => 
            new Array(7).fill(null)
        );
        
        // Place initial red peg in center of center triangle
        board[3][3] = 'fire';
        
        return board;
    }

    calculateTriangleCenters() {
        // Calculate centers for the 7 triangles
        const centers = [
            {x: 300, y: 300}, // Center
            {x: 300, y: 150}, // Top
            {x: 450, y: 225}, // Top right
            {x: 450, y: 375}, // Bottom right
            {x: 300, y: 450}, // Bottom
            {x: 150, y: 375}, // Bottom left
            {x: 150, y: 225}, // Top left
        ];
        return centers;
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw triangles
        this.centers.forEach((center, i) => {
            this.drawTriangle(center.x, center.y, this.triangleSize);
            this.drawPegHoles(center.x, center.y);
        });

        // Draw pegs
        this.drawPegs();
    }

    drawTriangle(centerX, centerY, size) {
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY - size/2);
        this.ctx.lineTo(centerX + size/2, centerY + size/4);
        this.ctx.lineTo(centerX - size/2, centerY + size/4);
        this.ctx.closePath();
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
    }

    drawPegHoles(centerX, centerY) {
        const positions = this.getPegPositions(centerX, centerY);
        positions.forEach(pos => {
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, this.pegRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#ddd';
            this.ctx.fill();
            this.ctx.stroke();
        });
    }

    getPegPositions(centerX, centerY) {
        const spacing = 30;
        return [
            {x: centerX, y: centerY - spacing},                    // Top
            {x: centerX - spacing, y: centerY},                    // Upper Left
            {x: centerX, y: centerY},                              // Upper Center
            {x: centerX + spacing, y: centerY},                    // Upper Right
            {x: centerX - spacing*1.5, y: centerY + spacing},      // Bottom Left
            {x: centerX, y: centerY + spacing},                    // Bottom Center
            {x: centerX + spacing*1.5, y: centerY + spacing},      // Bottom Right
        ];
    }

    // ... existing code ...

    drawPegs() {
        this.centers.forEach((center, triangleIndex) => {
            const positions = this.getPegPositions(center.x, center.y);
            positions.forEach((pos, pegIndex) => {
                const peg = this.board[triangleIndex][pegIndex];
                if (peg) {
                    this.ctx.beginPath();
                    this.ctx.arc(pos.x, pos.y, this.pegRadius, 0, Math.PI * 2);
                    
                    // Add highlight effect for selected peg
                    if (this.selectedPeg && 
                        this.selectedPeg.triangleIndex === triangleIndex && 
                        this.selectedPeg.pegIndex === pegIndex) {
                        // Draw highlight glow
                        this.ctx.shadowColor = 'yellow';
                        this.ctx.shadowBlur = 15;
                        // Draw larger circle behind the peg
                        this.ctx.strokeStyle = 'yellow';
                        this.ctx.lineWidth = 3;
                    } else {
                        this.ctx.shadowColor = 'transparent';
                        this.ctx.shadowBlur = 0;
                        this.ctx.strokeStyle = 'black';
                        this.ctx.lineWidth = 1;
                    }
                    
                    this.ctx.fillStyle = peg === 'fire' ? 'red' : 'blue';
                    this.ctx.fill();
                    this.ctx.stroke();
                    
                    // Reset shadow effects
                    this.ctx.shadowColor = 'transparent';
                    this.ctx.shadowBlur = 0;
                    this.ctx.lineWidth = 1;
                }
            });
        });
    }

// ... existing code ...

    handleClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Check each peg position
        this.centers.forEach((center, triangleIndex) => {
            const positions = this.getPegPositions(center.x, center.y);
            positions.forEach((pos, pegIndex) => {
                if (this.isClickInCircle(x, y, pos.x, pos.y, this.pegRadius)) {
                    this.handlePegClick(triangleIndex, pegIndex);
                    this.draw(); // Add this line to ensure immediate redraw
                }
            });
        });
    }

    isClickInCircle(clickX, clickY, circleX, circleY, radius) {
        const distance = Math.sqrt(
            Math.pow(clickX - circleX, 2) + Math.pow(clickY - circleY, 2)
        );
        return distance <= radius;
    }

    handlePegClick(triangleIndex, pegIndex) {
        if (!this.selectedPeg) {
            // Select a peg
            if (this.board[triangleIndex][pegIndex] === this.currentPlayer) {
                this.selectedPeg = {triangleIndex, pegIndex};
                console.log('Selected peg:', this.selectedPeg);
            }
        } else {
            // Move to new position if it's empty
            if (!this.board[triangleIndex][pegIndex]) {
                // Move the peg
                this.board[triangleIndex][pegIndex] = this.currentPlayer;
                this.board[this.selectedPeg.triangleIndex][this.selectedPeg.pegIndex] = 
                    this.currentPlayer === 'fire' ? 'ice' : 'fire';
                
                // Switch players
                this.currentPlayer = this.currentPlayer === 'fire' ? 'ice' : 'fire';
                this.statusElement.textContent = `Current Turn: ${
                    this.currentPlayer === 'fire' ? 'Fire (Red)' : 'Ice (Blue)'
                }`;
                
                // Reset selection
                this.selectedPeg = null;
            }
            this.draw();
        }
    }
}

// Start the game when the page loads
window.onload = () => {
    new FireAndIce();
};