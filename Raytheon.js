// ---------------- Application Questions 1 of 2 ---------------- //

let clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
});

// select dropdown options
const firstDropdownOptions = [
    { labelText: "", optionText: "no" }  // default option
]
const secondDropdownOptions = [
    { labelText: "are you a citizen", optionText: "yes" },
    { labelText: "willing to relocate", optionText: "yes" },
    { labelText: "willing to travel", optionText: "yes" },
    { labelText: "possess an existing and active security clearance", optionText: "yes" },
    { labelText: "", optionText: "no" }  // default option
]

async function clickOption(button, optionText) {
    button.dispatchEvent(clickEvent);
    await new Promise(resolve => setTimeout(resolve, 250));
    let option = Array.from(document.querySelectorAll('div.wd-popup li[role="option"]'))
        .find(option => option.textContent.trim().toLowerCase() === optionText);
    if (option) {
        option.dispatchEvent(clickEvent);
        await new Promise(resolve => setTimeout(resolve, 250));
        document.body.dispatchEvent(clickEvent);
    } else {
        console.warn('Option not found');
    }
}

async function processFirstElements() {
    const elements = Array.from(document.querySelectorAll('[data-automation-id="primaryQuestionnairePage"] div.css-7t35fz'));
    for (let element of elements) {
        // skip elements that aren't required
        if (!element.querySelector('abbr.requiredAsterisk')) {
            continue;
        }
        let labelText = element.querySelector('label')?.textContent.trim().toLowerCase();
        if (labelText) {
            let selectedOption;
            for (let option of firstDropdownOptions) {
                if (labelText.includes(option.labelText.toLowerCase())) {
                    selectedOption = option;
                    break;
                }
            }
            selectedOption = selectedOption || firstDropdownOptions[firstDropdownOptions.length - 1];  // default to yes if no match found
            await clickOption(element.querySelector('button'), selectedOption.optionText.toLowerCase());
        }
    }
    // next page
    setTimeout(() => document.querySelector('button[data-automation-id="bottom-navigation-next-button"]').click(), 500);
    setTimeout(processSecondElements, 5000);
}

async function processSecondElements() {
    const elements = Array.from(document.querySelectorAll('[data-automation-id="secondaryQuestionnairePage"] div.css-7t35fz'));
    for (let element of elements) {
        // skip elements that aren't required
        if (!element.querySelector('abbr.requiredAsterisk')) {
            continue;
        }
        let labelText = element.querySelector('label')?.textContent.trim().toLowerCase();
        if (labelText) {
            let selectedOption;
            for (let option of firstDropdownOptions) {
                if (labelText.includes(option.labelText.toLowerCase())) {
                    selectedOption = option;
                    break;
                }
            }
            selectedOption = selectedOption || firstDropdownOptions[firstDropdownOptions.length - 1];  // default to yes if no match found
            await clickOption(element.querySelector('button'), selectedOption.optionText.toLowerCase());
        }
    }
    // next page
    setTimeout(() => document.querySelector('button[data-automation-id="bottom-navigation-next-button"]').click(), 500);
}

processSecondElements();

processFirstElements();
