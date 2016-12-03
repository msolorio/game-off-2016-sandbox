const Terminal = {
  commands: [
    {
      command: "login",
      func() {
        console.log('entered enteredLogin');
      }
		},
    {
      command: "name",
      func() {
        console.log('entered enteredName');
      }
		},
    {
      command: "join",
      func() {
        console.log('entered enteredJoin');
      }
		},
    {
      command: "start",
      func() {
        console.log('entered enteredStart');
      }
		},
    {
      command: "hack",
      func(inputValue, commandArray) {
        const successMessage = 'hacking node';
        this.validateNodeArgs(inputValue, commandArray, successMessage);
      }
		},
    {
      command: "ssh",
      func(inputValue, commandArray) {
        const successMessage = 'moving to node';
        this.validateNodeArgs(inputValue, commandArray, successMessage);
      }
		},
    {
      command: "scan",
      func(inputValue) {
        if (inputValue === 'scan') {
          console.log('scan enteredExit')
        } else {
          this.logToOutput(`-bash: ${inputValue}: scan takes no arguments`)
        }
      }
		},
    {
      command: "exit",
      func(inputValue) {
        if (inputValue === 'exit') {
          console.log('entered enteredExit')
        } else {
          this.logToOutput(`-bash: ${inputValue}: exit takes no arguments`)
        }
      }
		},
    {
      command: "clear",
      func(inputValue, commandArray) {
        if (inputValue === 'clear') {
          this.dom.consoleOutput.innerHTML = '';
        } else {
          this.logToOutput(`-bash: ${inputValue}: command not found`);
        }
      }
		}
	],

  dom: {},

  getElements() {
    this.dom.consoleInput = document.getElementById('js-consoleInput');
    this.dom.consoleOutput = document.getElementById('js-consoleOutput');
    this.dom.consoleBox = document.getElementById('js-consoleBox');
    this.dom.contentWrap = document.getElementById('js-contentWrap');
  },

  validateNodeArgs(inputValue, commandArray, successMessage) {
    const chosenNode = commandArray[1];

    if (commandArray.length != 2) {
      this.logToOutput(`-bash: ${inputValue}: invalid number of arguments`);
      return;
    }

    if (chosenNode.length != 4) {
      this.logToOutput(`-bash: ${inputValue}: node hash is invalid`);
      return;
    }
    return this.logToOutput(`${successMessage} ${chosenNode}`);
  },

  logToOutput(command) {
    const consoleOutput = this.dom.consoleOutput;
    const newLine = document.createElement('li');

    newLine.className = 'outputLine';
    newLine.appendChild(document.createTextNode(`USER > ${command}`));
    consoleOutput.appendChild(newLine);
  },

  giveInputFocus() {
    const consoleInput = this.dom.consoleInput;

    consoleInput.focus();

    this.dom.consoleBox.addEventListener('click', function() {
      consoleInput.focus();
    });
  },

  adjustContentPosition() {
    const consoleBox = this.dom.consoleBox;
    const input = this.dom.consoleInput;
    const topPos = input.offsetTop;
    consoleBox.scrollTop = topPos;
  },

  validateInput(inputValue) {
    const commands = this.commands;
    let baseCommandValid;
    let commandIndex;

    const findBaseCommand = (inputValue) => {
      return [inputValue.split(' ', 1)[0], inputValue.split(' ')];
    }

    const loopThroughCommands = () => {
      for (var i = 0, j = commands.length; i < j; i++) {
        if (baseCommand === commands[i].command) {
          baseCommandValid = true;
          commandIndex = i;
          return;
        }
        baseCommandValid = false;
      }
    };

    let [baseCommand, commandArray] = findBaseCommand(inputValue);

    loopThroughCommands();

    // if base command is found
    if (baseCommandValid) {
      // run function
      const runFunction = commands[commandIndex].func;
      runFunction.bind(this)(inputValue, commandArray);
    } else {
      // else return error
      this.logToOutput(`-bash: ${inputValue}: command not found`);
    }
  },

  bindInputEvents() {
    const onKeyPress = (event) => {
      const input = event.target;
      const inputValue = input.value;

      if (event.keyCode !== 13) return;

      this.logToOutput(inputValue);
      input.value = '';
      this.validateInput(inputValue);
      this.adjustContentPosition();
    };

    this.dom.consoleInput.addEventListener('keypress', onKeyPress.bind(this));
  },

  init() {
    this.getElements();
    this.bindInputEvents();
    this.giveInputFocus();
  }
}
window.Terminal = Terminal;
Terminal.init();

/*
TO DO
- blicking cursor
- regex for numbers and letters in node args
*/

