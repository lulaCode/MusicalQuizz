const questionsPack = {
    "questions": [{
            "question": "¿Con qué otro cantante comparte cumpleaños David Bowie?",
            "answers": [
                "Janis Joplin",
                "Tom Jones",
                "Elvis Presley",
                "Joan Baez"
            ],
            "correctAnswer": 2,
            "xplanation": "david Bowie cumple años el mismo día que Elvis Presley: el 8 de enero"
        },
        {
            "question": "¿Cuál de estas curiosidades sobre Elvis Presley es falsa?",
            "answers": [
                "Tuvo un hermano gemelo",
                "Era judío",
                "Usaba tres aceites diferentes para el pelo",
                "Era cinturón negro de kárate"
            ],
            "correctAnswer": 1,
            "xplanation": "te lo hemos puesto difícil! Elvis Presley no es judío pero todas las posibilidades eran bastante locas"
        },
        {
            "question": "Además de Elvis, ¿cuál de estos músicos no es judío?",
            "answers": [
                "Lenny Kravitz",
                "Pink",
                "Cat Stevens",
                "David Guetta"
            ],
            "correctAnswer": 2,
            "xplanation": "el que nunca fue judio es Cat Stevens que se convirtió al Islam en el año 1977, adoptando el nombre de Yussuf Islam"
        },
        {
            "question": "¿Cuál es el origen del nombre artístico de Cat Stevens?",
            "answers": [
                "Sus movimientos gatunos en el escenario",
                "El parecido con el personaje de una serie británica de animación",
                "Era su sobrenombre familiar cuando era pequeño",
                "Una novia suya decía que tenía \"Ojos de gato\""
            ],
            "correctAnswer": 3,
            "xplanation": "este nombre artístico surgió porque su novia decía que tenía ojos de gato"
        },
        {
            "question": "Hablando de ojos, ¿de quién es la versión orignal del tema \"Bette Davis eyes\"?",
            "answers": [
                "La estadounidense Jackie DeShannon",
                "Alvin y las ardillas",
                "La británica Kim Carnes",
                "La australiana Kylie Minogue"
            ],
            "correctAnswer": 0,
            "xplanation": "Alvin y las... nooo, este tema es original de Jackie DeShannon aunque la versión de Kim Carnes es la más popular"
        }
    ]
}

class QuestionPaint {
    // Declaro todas las variables que vamos a utilizar en los metodos
    constructor(questions) {
        this.questions = questions;
        this.questionNumber = 0;
        this.totalQuestions = this.questions.length;
        this.responseChecked = false;
        this.hits = 0;
        this.body = document.querySelector("body");
        this.contentQuestion;
        // Lanzamos las preguntas
        this.questionLauncher();
    }
    questionLauncher() {
        this.contentQuestion = this.questions[this.questionNumber];
        const divQuestions = document.createElement("div");
        const divTitle = document.createElement("div");
        const divAnswers = document.createElement("div");
        divQuestions.id = "questions";
        divTitle.id = "question";
        divAnswers.id = "answers";
        divTitle.innerText = this.contentQuestion.question;
        gameCanvas.appendChild(divQuestions);
        divQuestions.appendChild(divTitle);
        divQuestions.appendChild(divAnswers);
        for (let i = 0; i <= 3; i++) {
            const btnOpt = document.createElement("button");
            btnOpt.className = "btnResponse";
            btnOpt.innerText = this.contentQuestion.answers[i];
            btnOpt.id = `btnOpt${i}`;
            btnOpt.addEventListener("click", () => this.responseValidator(this.contentQuestion.correctAnswer, btnOpt, i, divAnswers, divQuestions));
            divAnswers.appendChild(btnOpt);
        }
        return divQuestions;
    };

    responseValidator(correctAnswer, btnOpt, selected, divAnswers, divQuestions) {
        if (!this.responseChecked) {
            //  Invalido el EventListener de los botones
            this.responseChecked = true;
            this.questionNumber++;
            this.introResponse = undefined;
            console.log(correctAnswer, selected);
            if (correctAnswer === selected) {
                btnOpt.className = "btnResponse ok";
                this.introResponse = "En efecto, ";
                this.hits++;
            } else {
                btnOpt.className = "btnResponse error";
                this.introResponse = "Pues no, ";
            }
            const xplanation = document.createElement("div");
            xplanation.className = "xplanation";
            xplanation.innerText = this.introResponse + this.contentQuestion.xplanation;
            divAnswers.appendChild(xplanation);
            const btContinue = document.createElement("button");
            if (this.questionNumber === this.totalQuestions) {
                const finishTitle = document.createElement("div");
                finishTitle.innerText = "¡Juego terminado! Has acertado " + this.hits + " preguntas";
                finishTitle.id = "hits";
                btContinue.innerText = "Volver a jugar";
                btContinue.id = "btnContinue";
                btContinue.addEventListener("click", () => this.removeQuizz());
                divAnswers.appendChild(btContinue);
                divAnswers.appendChild(finishTitle);
            } else {
                btContinue.innerText = "Continuar";
                btContinue.id = "btnContinue";
                btContinue.addEventListener("click", () => this.removeQuestions(divQuestions));
                divAnswers.appendChild(btContinue);
            }
        }
    }
    removeQuestions(divQuestions) {
        divQuestions.remove();
        //  Vuelvo a activar el EventListener de los botones
        this.responseChecked = false;
        this.questionLauncher();
    }

    removeQuizz() {
        gameCanvas.remove();
        this.questions = undefined;
        newGameWelcome = new GameWelcome();
    }

}

class GameWelcome {

    constructor() {
        this.body = document.querySelector("body");
        this.contentSpace;
        this.welcomeArea;
        this.welcomePaint();
    }

    welcomePaint() {
        this.contentSpace = document.createElement("div");
        this.welcomeArea = document.createElement("div");
        const imageContainer = document.createElement("div");
        const pic = document.createElement("img");
        const title = document.createElement("div");
        const xplain = document.createElement("div");
        const startBtn = document.createElement("button");
        this.contentSpace.id = "gameCanvas";
        this.welcomeArea.className = "welcomeArea";
        this.welcomeArea.id = "welcomeArea";
        pic.src = "ASSETS/IMGS/welcome.png"
        title.innerText = "El superquizz Musical";
        title.className = "title";
        xplain.innerText = "Descubre cuánto sabes de curiosidades musicales del siglo XX.";
        startBtn.preventDefault;
        startBtn.innerText = "Comenzar";
        startBtn.addEventListener("click", () => this.removeWelcome());
        startBtn.id = "btnStart";
        this.body.appendChild(this.contentSpace);
        gameCanvas.appendChild(this.welcomeArea);
        welcomeArea.appendChild(imageContainer);
        imageContainer.appendChild(pic);
        welcomeArea.appendChild(title);
        welcomeArea.appendChild(xplain);
        welcomeArea.appendChild(startBtn);
    }

    removeWelcome() {
        welcomeArea.remove();
        this.welcomeArea = undefined;
        new QuestionPaint(questionsPack.questions);
    }
}

let newGameWelcome = new GameWelcome();