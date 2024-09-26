export class FortuneView {
    constructor() {
        this.questionElement = document.getElementById("question");
        this.optionsElement = document.getElementById("options");
        this.resultElement = document.getElementById("result");
        this.startButton = document.getElementById("start-btn");
        this.shareButtons = document.getElementById("share-buttons");
        this.facebookShareButton = document.getElementById("facebook-share");
        this.lineShareButton = document.getElementById("line-share");
    }

    displayQuestion(question) {
        this.questionElement.textContent = question.question;
        this.optionsElement.innerHTML = "";
        question.options.forEach((option, index) => {
            const optionElement = document.createElement("div");
            optionElement.classList.add("option");
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            this.optionsElement.appendChild(optionElement);
        });
    }

    displayResult(result) {
        this.resultElement.textContent = result;
        this.shareButtons.style.display = "block";
    }

    bindStartGame(handler) {
        this.startButton.addEventListener("click", handler);
    }

    bindSelectOption(handler) {
        this.optionsElement.addEventListener("click", (event) => {
            if (event.target.classList.contains("option")) {
                handler(event.target.dataset.index);
            }
        });
    }

    bindShareButtons(facebookHandler, lineHandler) {
        this.facebookShareButton.addEventListener("click", facebookHandler);
        this.lineShareButton.addEventListener("click", lineHandler);
    }
}