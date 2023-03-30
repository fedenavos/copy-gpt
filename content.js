// Add the button to the chat interface
function addButtonToChat() {
    const targetElement = document.querySelector('form');

    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerHTML = `
    <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
    <g transform="matrix(1 0 0 1 12 12)" >
    <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" translate(-12, -12)" d="M 4 2 C 2.895 2 2 2.895 2 4 L 2 18 L 4 18 L 4 4 L 18 4 L 18 2 L 4 2 z M 8 6 C 6.895 6 6 6.895 6 8 L 6 20 C 6 21.105 6.895 22 8 22 L 20 22 C 21.105 22 22 21.105 22 20 L 22 8 C 22 6.895 21.105 6 20 6 L 8 6 z M 8 8 L 20 8 L 20 20 L 8 20 L 8 8 z" stroke-linecap="round" />
    </g>
    </svg>
    `;

    const copyTextButton = document.createElement('button');
    copyTextButton.className = 'copy-button';
    copyTextButton.innerHTML = `
    <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
    <g transform="matrix(0.77 0 0 0.77 12 12)" >
    <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" translate(-13, -13)" d="M 7 0 C 4.796875 0 3 1.796875 3 4 L 3 22 C 3 24.203125 4.796875 26 7 26 L 19 26 C 21.203125 26 23 24.203125 23 22 L 23 8 C 23 6.9375 22.027344 5.929688 20.28125 4.21875 C 20.039063 3.980469 19.777344 3.714844 19.53125 3.46875 C 19.285156 3.222656 19.019531 2.992188 18.78125 2.75 C 17.070313 1.003906 16.0625 0 15 0 Z M 7 2 L 14.28125 2 C 15.003906 2.183594 15 3.050781 15 3.9375 L 15 7 C 15 7.550781 15.449219 8 16 8 L 19 8 C 19.996094 8 21 8.003906 21 9 L 21 22 C 21 23.105469 20.105469 24 19 24 L 7 24 C 5.894531 24 5 23.105469 5 22 L 5 4 C 5 2.894531 5.894531 2 7 2 Z M 7.8125 10 C 7.261719 10.050781 6.855469 10.542969 6.90625 11.09375 C 6.957031 11.644531 7.449219 12.050781 8 12 L 18 12 C 18.359375 12.003906 18.695313 11.816406 18.878906 11.503906 C 19.058594 11.191406 19.058594 10.808594 18.878906 10.496094 C 18.695313 10.183594 18.359375 9.996094 18 10 L 8 10 C 7.96875 10 7.9375 10 7.90625 10 C 7.875 10 7.84375 10 7.8125 10 Z M 7.8125 14 C 7.261719 14.050781 6.855469 14.542969 6.90625 15.09375 C 6.957031 15.644531 7.449219 16.050781 8 16 L 16 16 C 16.359375 16.003906 16.695313 15.816406 16.878906 15.503906 C 17.058594 15.191406 17.058594 14.808594 16.878906 14.496094 C 16.695313 14.183594 16.359375 13.996094 16 14 L 8 14 C 7.96875 14 7.9375 14 7.90625 14 C 7.875 14 7.84375 14 7.8125 14 Z M 7.8125 18 C 7.261719 18.050781 6.855469 18.542969 6.90625 19.09375 C 6.957031 19.644531 7.449219 20.050781 8 20 L 18 20 C 18.359375 20.003906 18.695313 19.816406 18.878906 19.503906 C 19.058594 19.191406 19.058594 18.808594 18.878906 18.496094 C 18.695313 18.183594 18.359375 17.996094 18 18 L 8 18 C 7.96875 18 7.9375 18 7.90625 18 C 7.875 18 7.84375 18 7.8125 18 Z" stroke-linecap="round" />
    </g>
    </svg>
    `;

    copyButton.addEventListener('click', () => {
        messages = extractMessages();

        copyConversationText(messages);
    });

    copyTextButton.addEventListener('click', () => {
        messages = extractMessages();

        copyGPTText(messages);
    });

    targetElement.appendChild(copyButton);
    targetElement.appendChild(copyTextButton);
}


// Observer to detect when the chat is loaded, and add the button to the chat
function addObserver() {
    const targetNode = document.querySelector('body');

    const config = { childList: true, subtree: true };

    const callback = (mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const targetElement = document.querySelector('form');
                if (targetElement && !document.querySelector('.copy-button')) {
                    addButtonToChat();
                }
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}


// Scrape the messages from the page (messages has class "min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap")
function extractMessages() {
    const messageElements = document.querySelectorAll(
        '[class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap"]'
    );
    const messages = [];

    messageElements.forEach((element) => {
        messages.push(element.innerHTML);
    });

    return messages;
}


// Format the code blocks to be more readable
function handleCodeBlock(codeBlock) {
    const codeElement = codeBlock.querySelector("code");
    const language = codeBlock.querySelector("span").textContent;
    const codeText = codeElement.textContent;
    return `[${language}]\n${codeText}\n`;
}


// Format the <p> elements to be more readable
function handleParagraphs(paragraphs) {
    paragraphs.forEach((paragraph) => {
        // If the next element is not a <ul> or <ol> tag, add two new lines
        if (paragraph.nextElementSibling && paragraph.nextElementSibling.tagName != "UL" && paragraph.nextElementSibling.tagName != "OL") {
            paragraph.outerHTML = paragraph.innerHTML + "\n \n";
        } else {
            paragraph.outerHTML = paragraph.innerHTML + "\n";
        }
    });
}


// Format the lists to be more readable
function handleLists(lists) {
    lists.forEach((list) => {
        // if the ul or ol tag is the last element, add two new lines
        let neededNewLines = "";
        if (list.nextElementSibling == null) {
            neededNewLines = "";
        } else {
            neededNewLines = "\n \n";
        }
        const items = list.querySelectorAll("li");
        let listText = "";

        items.forEach((item, index) => {
            if (list.tagName == "OL") {
                if (index == items.length - 1) {
                    listText += `\n${index + 1}. ${item.innerHTML} ${neededNewLines}`;
                } else {
                    listText += `\n${index + 1}. ${item.innerHTML}`;
                }
            } else {
                if (index == items.length - 1) {
                    listText += `\n• ${item.innerHTML} ${neededNewLines}`;
                } else {
                    listText += `\n• ${item.innerHTML}`;
                }
            }
        });

        list.outerHTML = listText;
    });
}


// Format the message HTML to be more readable
function formatMessageHTML(html) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Remove all the <br> tags
    const brs = tempDiv.querySelectorAll("br");
    brs.forEach((br) => {
        br.outerHTML = "\n";
    });

    // Print all the <p> tags on a new line
    const paragraphs = tempDiv.querySelectorAll("p");
    handleParagraphs(paragraphs);

    // Format code blocks
    const codeBlocks = tempDiv.querySelectorAll("pre");
    codeBlocks.forEach((codeBlock) => {
        codeBlock.outerHTML = handleCodeBlock(codeBlock);
    });

    // Print all the <ul> and <ol> tags on a new line
    const lists = tempDiv.querySelectorAll("ul, ol");
    handleLists(lists);

    return tempDiv.textContent;
}


// Copy the conversation to the clipboard
function copyConversationText(messages) {
    let text = "";

    messages.forEach((message, index) => {
        const formattedMessage = formatMessageHTML(message);

        if (index % 2 == 0) {
            text += "You: " + formattedMessage + "\n \n";
        } else {
            text += "ChatGPT: " + formattedMessage + "\n \n";
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


// Copy only the Chat messages to the clipboard
function copyGPTText(messages) {
    let text = "";

    messages.forEach((message, index) => {
        const formattedMessage = formatMessageHTML(message);

        if (index % 2 != 0) {
            text += formattedMessage + "\n \n";
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


// main
try {
    addButtonToChat();
    addObserver();
}
catch (e) {
    console.log(e);
    console.log("Error adding CopyGPT buttons to chat");
}