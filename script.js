document.addEventListener("DOMContentLoaded", function () {
    const editor = document.getElementById('editor');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');
    const output = document.getElementById('output');
    const boldBtn = document.getElementById('boldBtn');
    const italicBtn = document.getElementById('italicBtn');
    const underlineBtn = document.getElementById('underlineBtn');
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    let history = [];
    let historyIndex = -1;

    const savedText = localStorage.getItem('editorText');
    if (savedText) {
        editor.innerHTML = savedText;
    }

    function saveText() {
        const text = editor.innerHTML;
        localStorage.setItem('editorText', text);
        output.textContent = 'Saved Text: ' + text; // Use textContent to display plain text
    }

    function clearText() {
        editor.innerHTML = '';
        localStorage.removeItem('editorText');
        output.textContent = 'Text cleared';
    }

    function toggleFormatting(button, command) {
        const isActive = document.queryCommandState(command);
        if (isActive) {
            document.execCommand('removeFormat');
        } else {
            document.execCommand(command);
        }
        updateButtonState(button, command);
    }

    function updateButtonState(button, command) {
        const isActive = document.queryCommandState(command);
        button.classList.toggle('active', isActive);
    }

    boldBtn.addEventListener('click', function () {
        toggleFormatting(boldBtn, 'bold');
    });

    italicBtn.addEventListener('click', function () {
        toggleFormatting(italicBtn, 'italic');
    });

    underlineBtn.addEventListener('click', function () {
        toggleFormatting(underlineBtn, 'underline');
    });

    // Handle undo and redo
    undoBtn.addEventListener('click', function () {
        if (historyIndex > 0) {
            historyIndex--;
            editor.innerHTML = history[historyIndex];
        }
    });

    redoBtn.addEventListener('click', function () {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            editor.innerHTML = history[historyIndex];
        }
    });

    // Listen for changes and save to history
    editor.addEventListener('input', function () {
        const text = editor.innerHTML;
        if (history[historyIndex] !== text) {
            history = history.slice(0, historyIndex + 1);
            history.push(text);
            historyIndex++;
        }
    });

    // Save text when the Save button is clicked
    saveBtn.addEventListener('click', saveText);

    // Clear text when the Clear button is clicked
    clearBtn.addEventListener('click', clearText);
});
