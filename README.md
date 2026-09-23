# Ganpati Modak Mania

Master Prompt: Ganesh Modak Catch Game

Build a polished, responsive Ganesh-themed browser game called “Ganpati Modak Catch”.

1. Project Goal

Create a fun game where the player controls a basket/plate at the bottom of the screen and catches falling modaks.

The game should be built as a frontend-only application for now.

Do NOT implement a backend, database, authentication, API, or leaderboard persistence yet.

The project will later be connected to a backend and database, so keep the code clean and modular and create clear placeholders for future API integration.

2. Tech Stack

Use:

React.js

Vite

JavaScript

HTML

CSS / Tailwind CSS

Lucide React icons where icons are required

Do not use unnecessary libraries.

Keep the application beginner-friendly so that students can understand the code.

3. Theme & Visual Design

Create a beautiful Indian Ganesh Chaturthi-inspired game theme.

Visual style:

Festive

Colorful

Playful

Modern

Kid-friendly

Premium-looking but simple

Mobile responsive

Use visual elements such as:

Modaks

Flowers

Diyas

Decorative patterns

Festive lights

Rangoli-inspired background elements

Subtle temple/festival-inspired decorations

Use a warm festive color palette such as:

Saffron/orange

Red

Yellow/gold

Cream

Green

White

Avoid making the interface visually overcrowded.

Use subtle animations and transitions.

4. Application Structure

Create the following screens/components:

Screen 1 — Home / Start Screen

Display:

Game logo/title:
“Ganpati Modak Catch”

Subtitle:
“Catch the falling modaks and score as many points as you can!”

Large festive illustration/design

Start Game button

How to Play button

Leaderboard button

The Home screen should immediately communicate that this is a modak-catching game.

5. How to Play Modal

When the user clicks How to Play, open a modal explaining:

How to Play

Move the basket left and right.

Catch the falling modaks.

Each modak gives points.

Missing a modak reduces a life.

The game becomes faster as the score increases.

Try to get the highest score!

Display simple controls:

Desktop

← Left Arrow

→ Right Arrow

Mobile

Provide:

Left button

Right button

Add a Got it button to close the modal.

6. Game Screen

Create the main gameplay area.

Layout:

-----------------------------------------
| Score       Lives       High Score    |
-----------------------------------------

             🍡
                  🍡

        🍡

                    🍡


             🧺
-----------------------------------------


The player-controlled basket should stay near the bottom.

The player should be able to move the basket:

Left

Right

The basket should not move outside the game boundaries.

7. Falling Modak Mechanics

Create falling modaks using React state.

Each modak should:

Spawn at a random horizontal position

Fall from the top

Move downward continuously

Be catchable by the basket

Disappear when caught

Increase the score when caught

Use a simple game loop.

Make the falling speed increase gradually as the player progresses.

Example:

Starting speed → Slow

Score 10 → Medium

Score 25 → Fast

Score 50 → Very Fast


Do not make the game impossible.

8. Scoring System

Implement:

Normal Modak

+10 points


Special Golden Modak

Occasionally spawn a golden modak.

+50 points


The golden modak should have:

Gold appearance

Glow effect

Slightly different animation

Display score prominently at the top.

9. Lives System

Start the player with:

❤️ ❤️ ❤️


The player has 3 lives.

When a normal modak reaches the bottom without being caught:

Lives - 1


When lives become:

0


End the game.

Display a clear:

Game Over

screen.

10. Game Over Screen

Show:

Game Over 🎉

Your Score
125

High Score
180


Buttons:

Play Again

Home

Leaderboard

Also show a motivational message depending on score.

Example:

Great job! 🙏


or

Amazing! You are a Modak Master! 🥳


Do not use negative or discouraging messages.

11. High Score

For the frontend-only version, store the high score using:

localStorage


Example:

High Score: 250


The high score should remain after refreshing the browser.

Create a small utility/helper for high-score management rather than putting all localStorage logic inside the main component.

12. Leaderboard Screen

Create a frontend-only mock leaderboard for now.

Do NOT connect it to a database yet.

Display sample data such as:

RankPlayerScore🥇 1Aarav450🥈 2Ananya390🥉 3Rahul3204Priya2805Arjun250

Clearly structure this component so that later we can replace the mock data with:

GET /api/leaderboard


Do not implement this API now.

Add a comment in the code:

// TODO: Replace mock leaderboard data with backend API


13. Player Name

Before starting the game, optionally ask the player for their name.

Create a simple input:

Enter your name
[________________]

[Start Game]


Validation:

Name cannot be empty

Maximum 20 characters

Trim unnecessary spaces

For now, store the name in frontend state/localStorage.

Later this will be sent to the backend when submitting scores.

Add a clear TODO comment:

// TODO: Send player name and score to backend


14. Game Controls

Desktop

Support:

ArrowLeft
ArrowRight


Also optionally support:

A → Move Left
D → Move Right


Mobile

Display two large touch-friendly buttons:

[ ◀ ]     [ ▶ ]


Buttons should be easy to press.

Do not rely only on keyboard controls.

15. Game Pause

Add a pause button during gameplay.

Example:

⏸ Pause


When clicked:

Freeze falling modaks

Freeze player movement

Display a pause overlay

Buttons:

Resume
Restart
Home


16. Game Start Countdown

When the user clicks Start Game, show:

3
2
1
GO!


Then start the game.

Make the countdown animated.

17. Animations

Add smooth animations for:

Falling modaks

Basket movement

Golden modak glow

Score increase

Button hover

Game start countdown

Game over

Modal opening/closing

Catch effect

When a modak is caught, display a small floating effect:

+10


For golden modak:

+50 ✨


The effect should disappear after a short duration.

18. Sound Design

Add optional sound support.

Include UI controls:

🔊 Sound ON/OFF


Do not make sound mandatory.

If sound assets are unavailable, create the functionality in a way that allows audio files to be added later.

Add comments showing where audio files should be placed.

Example:

// TODO: Add catch sound
// TODO: Add game-over sound
// TODO: Add background music


19. Responsive Design

The game must work properly on:

Desktop

Laptop

Tablet

Mobile

On mobile:

Game area should fit the screen

Controls should be easily accessible

Text should remain readable

Buttons should be touch-friendly

No horizontal scrolling

20. Component Structure

Keep the React application modular.

Prefer a structure similar to:

src/
│
├── components/
│   ├── Home.jsx
│   ├── Game.jsx
│   ├── GameHeader.jsx
│   ├── Basket.jsx
│   ├── FallingModak.jsx
│   ├── GameOver.jsx
│   ├── Leaderboard.jsx
│   ├── HowToPlay.jsx
│   ├── PlayerName.jsx
│   ├── Countdown.jsx
│   └── PauseMenu.jsx
│
├── utils/
│   ├── gameUtils.js
│   └── storage.js
│
├── data/
│   └── mockLeaderboard.js
│
├── App.jsx
├── main.jsx
└── index.css


You may adjust the structure if required, but keep responsibilities separated.

21. Game State

Use React state for:

score
lives
highScore
gameStatus
playerName
basketPosition
fallingModaks
isPaused
soundEnabled


Possible game states:

"home"
"countdown"
"playing"
"paused"
"gameover"
"leaderboard"


Keep the game state easy for students to understand.

22. Collision Detection

Implement basic collision detection between:

Falling Modak
        ↓
       🍡

       🧺
     Basket


If the modak overlaps the basket:

Catch → Score increases


If the modak reaches the bottom without being caught:

Miss → Life decreases


Keep the collision logic in a separate function such as:

checkCollision()


so students can understand it.

23. Code Quality

Important:

Write clean beginner-friendly React code.

Avoid:

Extremely complicated abstractions

Unnecessary state management libraries

Huge components

Hardcoded repeated values

Complex custom frameworks

Use meaningful variable names.

Add short comments explaining important game logic.

For example:

// Generate a random horizontal position for the modak


and:

// Check whether the falling modak touches the basket


24. Future Backend Integration

This is extremely important.

The current application is frontend-only, but prepare it for future backend integration.

Create clear TODO comments for:

Save Score

Later:

POST /api/scores


Example

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://modak-madness.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8e5725b2-8d7f-4aee-98fe-0a602483c07b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
