# dev.arthaud.life
Life Game in JS

## What is it ?

Originaly a proof of skills (see #Technical details), I decided to convert it to a a game based on the "Game of life". 

## Technical details
### Technos
Made with VueJs, Tailwind, and Jest to test my game logic.

### Principles, artchitecture
I work on the separation of concerns, SOLID principles, TDD :  
- All the game logic is dissociated from the UI logic, that allowed me to choose how to render the game after coding a working game.
- All the game logic is tested because I do TDD : I think and plan my features, then I write core unit tests (I try to only test useful and code behaviours, not each function), finally I develop the feature to make my tests pass.
- I manage to divide code into specific parts so that each has its own utility and its own reasons to change (Single Responsibility Principle). I did it not so bad (but I can improve a lot) because I rarely modify a lot of files in the same feature (for example, logic in is Rules, Services and Utils, while UI is in Vue side).
- I manage to add code, not to modify code (Open Close Principle). I think I did well that principle with the Rules folder, that I didn't touch since the beginning. I only added the Game service that wrap over rules. Then, I wrapped Game service in my Life component. But since I added features to the game service, I have modified it.
- For others SOLID principles (Liskov Substitution Principle, Interface Segregation Principle, Dependency Inversion Principle) I did not have the opportunity to use them until now in this project.

