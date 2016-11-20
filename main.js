const Terminal = {
	dom: {},

	getElements() {
		this.dom.consoleInput = document.getElementById('js-consoleInput');
		this.dom.consoleOutput = document.getElementById('js-consoleOutput');
		this.dom.consoleBox = document.getElementById('js-consoleBox');
		this.dom.contentWrap = document.getElementById('js-contentWrap');
	},

	logToOutput() {
		const consoleInput = this.dom.consoleInput;
		const consoleOutput = this.dom.consoleOutput;
		const newLine = document.createElement('li');

		newLine.className = 'outputLine';
		newLine.appendChild(document.createTextNode(`USER $ ${consoleInput.value}`));
		consoleOutput.appendChild(newLine);
	},

	bindInputEvents() {
		const onKeyPress = function(event) {
			const input = event.target;

			if (event.keyCode !== 13) return;
			Terminal.logToOutput();
			input.value = '';
			Terminal.adjustContentPosition();
		};

		this.dom.consoleInput.addEventListener('keypress', onKeyPress);
	},

	giveInputFocus() {
		const consoleInput = this.dom.consoleInput;

		consoleInput.focus();

		this.dom.consoleBox.addEventListener('click', function(){
			consoleInput.focus();
		});
	},

	adjustContentPosition() {
		const contentWrap = this.dom.contentWrap;
		const consoleBox = this.dom.consoleBox;
		
		if (contentWrap.offsetHeight >= consoleBox.offsetHeight) {
			contentWrap.className += ' fixToBottom';
		}
	},

	init() {
		this.getElements();
		this.bindInputEvents();
		this.giveInputFocus();
	}
}

Terminal.init();