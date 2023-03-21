// Add the button to the page
function addButtonToChat() {
    const targetElement = document.querySelector('form');

    const shareButton = document.createElement('button');
    shareButton.className = 'share-button';
    shareButton.innerHTML = `
    <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
    <g transform="matrix(1 0 0 1 12 12)" >
    <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" translate(-12, -12)" d="M 4 2 C 2.895 2 2 2.895 2 4 L 2 18 L 4 18 L 4 4 L 18 4 L 18 2 L 4 2 z M 8 6 C 6.895 6 6 6.895 6 8 L 6 20 C 6 21.105 6.895 22 8 22 L 20 22 C 21.105 22 22 21.105 22 20 L 22 8 C 22 6.895 21.105 6 20 6 L 8 6 z M 8 8 L 20 8 L 20 20 L 8 20 L 8 8 z" stroke-linecap="round" />
    </g>
    </svg>
    `;

    shareButton.addEventListener('click', () => {
        messages = extractMessages();

        copyConversationText(messages);
    });

    targetElement.appendChild(shareButton);
}

// Scrape the messages from the page
function extractMessages() {
    const messageElements = document.querySelectorAll(
        '[class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap"]'
    );
    const messages = [];

    messageElements.forEach((element) => {
        messages.push(element.textContent);
    });

    return messages;
}

// Copy the conversation text to the clipboard
function copyConversationText(messages) {

    let text = "";

    messages.forEach((message, index) => {
        if (index % 2 == 0) {
            text += "You: " + message + "\n \n";
        } else {
            text += "ChatGPT: " + message + "\n \n";
        }
    });

    text = text.substring(0, text.length - 3);

    navigator.clipboard.writeText(text).then(() => {
        console.log('Text copied to clipboard');
        alert("Copied to clipboard!");
    }, (err) => {
        console.log('Could not copy text: ', err);
    });
}

addButtonToChat();

