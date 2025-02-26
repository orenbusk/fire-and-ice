# Fire and Ice Game

A web implementation of the classic board game "Fire and Ice", where two players compete to control territory on a triangular board.

## Game Rules

1. **Setup**
   - The game is played between two players: Fire (Red) and Ice (Blue)
   - The game starts with a red peg in the center of the center triangle
   - Fire player takes the first turn

2. **Gameplay**
   - On your turn, you can:
     - Move one of your pegs along the lines within its current small triangle
     - Move a peg to the same position in any other triangle
   - After moving your peg, you must place an opponent's peg in the space you just left

3. **Winning**
   - Control a triangle by having three connected pegs in it
   - Win by controlling three connected triangles

## How to Play

1. **Local Play**
   - Download or clone this repository
   - Open `index.html` in a web browser
   - Two players can play on the same device, taking turns

2. **Controls**
   - Click on one of your pegs to select it (it will be highlighted)
   - Click on an empty position to move your selected peg there

## Technical Details

- Built with vanilla JavaScript and HTML5 Canvas
- No dependencies required
- Works in all modern browsers

## Files
- `index.html` - Main game page
- `game.js` - Game logic and rendering

## Development

To run the game locally:
1. Clone this repository
2. Open `index.html` in a web browser
   - Directly double-click the file, or
   - Use a local server (e.g., `python -m http.server`)

## Credits

- Original board game designed by Jens-Peter Schliemann
- Web implementation by [Your Name]

## License

[Choose an appropriate license for your implementation]
