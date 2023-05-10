// gather the custom fields and their values
const customFields = {
    "What is your most significant technical achievement?": "My most noteworthy technical accomplishment has been the end-to-end development of an external portal for my current company's flagship product. Guided solely by leadership requirements, I led a team of four in conceptualizing, designing, and engineering the full-stack solution. We successfully deployed the application ahead of schedule and established a robust CI/CD pipeline for seamless updates and maintenance. I'm most proud of the fact that users have consistently praised the software as the best they have seen or used in their industry.",
    "Where can we find samples of your code?": " You can find samples of my code on my personal GitHub profile: https://github.com/davidmvenegas. Please be aware that some of my most impressive work is kept private due to its incorporation in commercial systems.",
    "Please share anything else you want us to know, such as your motivation to apply or additional context for your application.": "I am a diligent and passionate engineer driven by the desire to make a meaningful impact. My diverse skill set, proficiency, and proven track record of performing effectively both independently and collaboratively under tight deadlines give me confidence that I would be an excellent fit for this role.",
    "When can you start a new role?": "I am able to start effectively immediately",
    "Where can we learn more about you?": "Here is my personal LinkedIn profile: https://www.linkedin.com/in/david-venegas-m/",
    "Please provide an example or evidence of your exceptional ability.": "Here is a link to my portfolio page, which showcases some of my early work, although it only partially represents my current skill set as it was created a few years ago: https://www.davidmvenegas.com/\n\nAdditionally, I developed a Chrome extension for ChatGPT that is being utilized by thousands of users globally.You can check it out here https://chrome.google.com/webstore/detail/chatgpt-microphone/kpnejlajlhnpfphbhgfipmlogplmidin. The source code for the extension is available at the following GitHub repository: https://github.com/davidmvenegas/chatgpt-microphone",
};

// fill in the custom fields
for (const labelText in customFields) {
    try {
        const labelElement = Array.from(document.querySelectorAll("#custom_fields label")).find(
            (label) => label.textContent.includes(labelText)
        );
        if (labelElement) {
            const inputElement = labelElement.querySelector("input[type='text'], textarea");
            if (inputElement) {
                inputElement.value = customFields[labelText];
            } else {
                console.warn(`No input or textarea element found for label: "${labelText}"`);
            }
        } else {
            console.warn(`No label element found for text: "${labelText}"`);
        }
    } catch (error) {
        console.error(`Error while processing label: "${labelText}"`, error);
    }
}

// select "Yes" for "Are you authorized to work lawfully in the US?" (ignore the error after dispatching the event, it still works)
try {
    const labelElement = Array.from(document.querySelectorAll("label")).find(label => label.textContent.includes("Are you authorized to work lawfully in the US?"));
    if (labelElement) {
        const selectElement = labelElement.querySelector("select");
        if (selectElement) {
            const yesOption = Array.from(selectElement.options).find(option => option.textContent === "Yes");
            if (yesOption) {
                yesOption.selected = true;
                const event = new Event('change', { bubbles: true });
                selectElement.dispatchEvent(event);
            }
        } else {
            console.error("Select element not found");
        }
    } else {
        console.error("Label element not found");
    }
} catch (err) {
    console.error("An error occurred:", err);
}

// select "OpenAI Blog" for "How did you hear about OpenAI?"
try {
    const labelElement = Array.from(document.querySelectorAll('label')).find(l => l.textContent.includes('How did you hear about OpenAI?'));
    if (labelElement) {
        const selectElement = Array.from(document.querySelectorAll('select')).find(s => Array.from(s.options).some(opt => opt.textContent.includes('OpenAI Blog')));
        if (selectElement) {
            const openAIBlogOption = Array.from(selectElement.options).find(opt => opt.textContent === 'OpenAI Blog');
            if (openAIBlogOption) {
                openAIBlogOption.selected = true;
                const event = new Event('change', { bubbles: true });
                selectElement.dispatchEvent(event);
            } else {
                console.warn('OpenAI Blog option not found');
            }
        } else {
            console.warn(`No select element found for: "How did you hear about OpenAI?"`);
        }
    } else {
        console.warn(`No label element found for: "How did you hear about OpenAI?"`);
    }
} catch (error) {
    console.error(`Error while processing label: "How did you hear about OpenAI?"`, error);
}

// answer demographics questions
["Latinx", "White / Caucasian", "a man"].forEach(labelText => {
    try {
        const labelElement = Array.from(document.querySelectorAll("label")).find(label => label.textContent.includes(labelText));
        if (labelElement) {
            const inputElement = labelElement.querySelector("input[type='checkbox']");
            if (inputElement) {
                inputElement.checked = true;
            } else {
                console.warn(`No checkbox found for label: "${labelText}"`);
            }
        } else {
            console.warn(`No label element found for text: "${labelText}"`);
        }
    } catch (error) {
        console.error(`Error while processing label: "${labelText}"`, error);
    }
});

// submit the application
setTimeout(() => document.getElementById('submit_app').click(), 500);