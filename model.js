export class FortuneModel {
    constructor() {
        this.questions = [];
        this.currentQuestion = null;
        this.result = "";
        this.loadQuestions();
    }

    async loadQuestions() {
        try {
            const response = await fetch('questions.md');
            const text = await response.text();
            this.questions = this.parseMarkdown(text);
        } catch (error) {
            console.error('Error loading questions:', error);
        }
    }

    parseMarkdown(markdown) {
        const questions = [];
        const sections = markdown.split('## ').slice(1);

        for (const section of sections) {
            const lines = section.trim().split('\n');
            const question = lines[0].replace('**問題**: ', '').trim();
            const optionsStartIndex = lines.indexOf('**選項**:') + 1;
            const optionsEndIndex = lines.indexOf('**結果**:');
            const options = lines.slice(optionsStartIndex, optionsEndIndex)
                .filter(line => line.trim().startsWith('- '))
                .map(line => line.replace('- ', '').trim());
            const results = lines.slice(lines.indexOf('**結果**:') + 1)
                .filter(line => line.trim().match(/^\d+\./))
                .map(line => line.replace(/^\d+\.\s/, '').trim());

            questions.push({ question, options, results });
        }

        return questions;
    }

    async getRandomQuestion() {
        if (this.questions.length === 0) {
            await this.loadQuestions();
        }
        this.currentQuestion = this.questions[Math.floor(Math.random() * this.questions.length)];
        return this.currentQuestion;
    }

    setResult(index) {
        this.result = this.currentQuestion.results[index];
    }
}