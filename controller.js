export class FortuneController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindStartGame(this.handleStartGame.bind(this));
        this.view.bindSelectOption(this.handleSelectOption.bind(this));
        this.view.bindShareButtons(
            this.handleFacebookShare.bind(this),
            this.handleLineShare.bind(this)
        );
    }

    async handleStartGame() {
        const question = await this.model.getRandomQuestion();
        this.view.displayQuestion(question);
        this.view.resultElement.textContent = "";
    }

    handleSelectOption(index) {
        this.model.setResult(index);
        this.view.displayResult(this.model.result);
    }

    handleFacebookShare() {
        const shareUrl = encodeURIComponent(window.location.href);
        const shareText = encodeURIComponent(`我在神秘占卜遊戲中得到了結果：${this.model.result}`);
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`;
        window.open(facebookShareUrl, '_blank');
    }

    handleLineShare() {
        const shareUrl = encodeURIComponent(window.location.href);
        const shareText = encodeURIComponent(`我在神秘占卜遊戲中得到了結果：${this.model.result}`);
        const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${shareUrl}&text=${shareText}`;
        window.open(lineShareUrl, '_blank');
    }
}