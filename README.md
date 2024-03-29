# dev.arthaud.life
Jeu de la vie en TS

## C'est quoi ?

Originelement une preuve de compétences, j'ai décidé de le convertir en jeu basé sur le "Jeu de la vie" de John Horton Conway.

## Détails techniques
### Technos
Développé avec VueJs, Tailwind, et Jest

### Principes, architecture
J'ai travaillé sur la séparation des responsabilités, les principes SOLID et le TDD:
- Toute la logique du jeu est dissociée de la logique UI, ce qui m'a permis de choisir au dernier moment comment afficher le jeu, après qu'il fonctionne.
- Toute la logique du jeu est testée, car j'ai fait du Test-First (je ne suis pas sûr que ce soit entièrement du TDD donc je reste sur Test-first). Je réfléchie et planifie mes fonctionnalités, et incrémentalement : j'écris un ou des tests qui échouent (que de logique, je ne cherche pas le 100% de coverage) puis je le fais passer au vert en codant.
- J'ai divisé mon code dans des parties spécifiques et éloquentes (j'essaie, c'est du de nommer des fois) qui ont leur utilité propre et leur raison de changer (Single Responsibility Principle). J'y arrive pas trop mal, quand j'ai dû modifier des fonctionnalités peu de fichiers étaient modifiés.
- J'ajoute du code, j'en remanie peu (Open Close Principle). Je pense m'être bien débrouillé avec le dossier Rules qui n'a plus touché après le début. J'ai ensuite englobé cette logique pour gérer une partie dans le service Game, puis j'ai englobé Game pour le rendre réactif pour VueJs. Donc je n'ai eu qu'à ajouter, rien à modifier.
- Pour les autres principes SOLID (Liskov Substitution Principle, Interface Segregation Principle, Dependency Inversion Principle) je n'ai pas vraiment eu l'opportunité de les appliquer pour l'instant.

## Genèse
J'ai eu envie de mettre en pratique plusieurs éléments du livre "Clean architecture" de Robert C. Martin, et un ami développait le Jeu de la vie. C'est un algorithme simple et rapide à développer, sur lequel j'ai pu travailler quelques principes SOLID et les tests unitaires.

## Déroulement
J'ai commencé par un boilerplate avec TS et Jest. J'ai écrit mes tests unitaires puis j'ai écrit le code de logique au coeur du jeu (logique d'une cellule, de la matrice, d'un tour, ...).

Au départ, pas besoin de front : mes tests unitaires me montraient que tout fonctionnait. Puis j'ai affiché les grilles dans la console. Ensuite, j'ai eu envie de profiter du découplage logique/front pour venir changer cette visualisation console par un front en vuejs qui serait plus interactif. Cela s'est opéré sans problème, et j'ai rapidement eu un front sobre et fonctionnel.

J'ai partagé le petit site à des amis. Malheureusement j'étais la tête dans le guidon et le projet n'avais pas beaucoup de but pour les utilisateur (en fait il n'avait pas d'utilisateur type). J'ai ajouté un tutoriel et puis je me suis demandé ce que je voulais faire. Continuer la preuve de compétence purement technique ? Aller vers un jeu avec une réelle utilisation ?

Alors je suis parti sur un jeu. Car un projet sans utilisateurs c'est un projet qui ne rapporte pas d'argent, qui n'a pas de retours, qui ne s'améliore pas ? En partie. Je dois me confronter à des problématiques réelles, des évolutions qui n'émanent pas de moi. J'ai donc cherché à gamifier le jeu : j'ai ajouté une logique pour calculer un score, créé des tips pour informer le joueur au fur et à mesure (plutôt que le bombarder d'infos dès le début), etc. Certaines fonctionnalités sont passées, d'autres sont plus complexes (comme le "pokédex" de patterns de cellules).

## Aboutissement
Ce projet est fini. J'ai beaucoup appris avec et c'était agréable de mettre en pratique des notions de clean code. Il n'y a pas de vrais joueurs, ni d'engouement autour de cette petite expérience mais c'est pas grave !  
Depuis, j'ai commencé d'autres projets qui me permettent de pousser encore plus mon apprentissage.
