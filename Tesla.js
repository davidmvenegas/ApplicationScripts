// ------------------------------ PAGE 1 ------------------------------ //

const setPageOneValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;

// set page one fields
const pageOneFields = {
    "Legal First Name": "David",
    "Legal Last Name": "Venegas",
    "Phone Number": "857-327-3414",
    "Contact Phone Type": "mobile",
    "Email": "david@venegas.com",
    "Country/Region of Residence": "US",
    "Profile Link": "https://www.linkedin.com/in/david-venegas-m/",
    "Profile Link Type": "linkedin",
}
Array.from(document.querySelectorAll("label")).forEach(label => {
    const key = label.textContent.trim();
    if (!pageOneFields.hasOwnProperty(key)) return;
    try {
        const input = document.getElementById(label.getAttribute("for"));
        const tagName = input.tagName;
        if (tagName === "INPUT") {
            setPageOneValue.call(input, pageOneFields[key]);
            input.dispatchEvent(new Event('input', { bubbles: true }));
        } else if (tagName === "SELECT") {
            input.value = pageOneFields[key];
            input.dispatchEvent(new Event('change', { bubbles: true }));
        } else {
            throw new Error(`Unsupported tag "${tagName}"`);
        }
    } catch (error) {
        console.error(`Error filling field "${key}": ${error.message}`);
    }
});

// set the "Evidence of Excellence" textarea
const setTextareaValue = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
Array.from(document.querySelectorAll("label")).filter((label) => label.textContent.trim() === "Evidence of Excellence").forEach((label) => {
    try {
        const textarea = document.getElementById(label.getAttribute("for"));
        const textareaValue = "As a highly skilled Senior Software Engineer, I bring a strong track record of delivering excellent results using popular and cutting-edge technologies. Holding a CompTIA Security+ certification, I emphasize the importance of security in all my projects. My passion for building modern applications, extensive full-stack development experience, and user-driven approach make me a valuable asset to any organization.\n\nI recently led a team of 4 engineers in developing a high-availability application portal for my company's flagship product. Within just four months, we brought the project from concept to production, collaborating with various stakeholders and earning praise from users. Additionally, I designed and implemented a widely-used Chrome extension called ChatGPT Microphone, which now has thousands of global users. My attention to detail, diligence, and passion for my work contribute to these projects’ success.\n\nThroughout my career, I have demonstrated expertise in working with the most in-demand technologies, such as React, Redux, Angular, Python, Django, NodeJS, and much more. With a solid foundation in security best practices, my leadership experience includes designing secure authentication systems, developing easy-to-understand wireframes, efficiently deploying full CI/CD pipelines, and being adaptable to work with various tools and platforms.\n\nIn summary, my passion for building modern applications using the most popular technologies and my proven track record in delivering complex projects with a user-driven approach make me an ideal candidate to contribute to any organization's ambitious vision. I am excited to leverage my skills and achievements to benefit your team and help drive success in future projects.";
        setTextareaValue.call(textarea, textareaValue);
        textarea.dispatchEvent(new Event("change", { bubbles: true }));
    } catch (error) {
        console.error(`Error filling field "${label.textContent.trim()}": ${error.message}`);
    }
});

// set the resume file
const pdfURL = 'https://docs.google.com/document/d/1Oe-zKdlp0BpDYQMK6FmnJpq2rV_KYMvbh3ElkJ0QXdw/export?format=pdf';
fetch(pdfURL)
    .then(response => response.blob())
    .then(blob => {
        const file = new File([blob], 'David_Venegas_resume.pdf', { type: 'application/pdf' });
        const fileInput = document.querySelector('input[type="file"][name="personal.resume"]');
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;
        fileInput.dispatchEvent(new Event('change', { bubbles: true }));
    })
    .catch(error => {
        console.error('Error fetching and uploading the PDF:', error);
    });

// click the "Next" button
setTimeout(() => document.querySelector('button[name="next"][class="tds-btn"]').click(), 4000);


// ------------------------------ PAGE 2 ------------------------------ //


setTimeout(() => {
    const setPageTwoValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;

    // set page two fields
    const pageTwoFields = {
        "What is your availability or notice period?": "In 1-2 weeks",
        "I have read and understand the statements above and accept them as conditions of employment.": true,
        "Legal Name": "David Venegas",
    };
    Array.from(document.querySelectorAll("label")).forEach(label => {
        const key = label.textContent.trim();
        if (!pageTwoFields.hasOwnProperty(key)) return;
        try {
            const input = document.getElementById(label.getAttribute("for"));
            const tagName = input.tagName;
            if (tagName === "INPUT" && input.type === "checkbox") {
                input.click();
            } else if (tagName === "INPUT") {
                setPageTwoValue.call(input, pageTwoFields[key]);
                input.dispatchEvent(new Event('input', { bubbles: true }));
            } else if (tagName === "SELECT") {
                input.value = input.querySelector(`option[label="${pageTwoFields[key]}"]`).value;
                input.dispatchEvent(new Event('change', { bubbles: true }));
            } else {
                throw new Error(`Unsupported tag "${tagName}"`);
            }
        } catch (error) {
            console.error(`Error filling field "${key}": ${error.message}`);
        }
    });

    // set page two radio buttons
    const pageTwoRadioButtons = {
        "legal.legalImmigrationSponsorship": "no",
        "legal.legalConsiderOtherPositions": "yes",
        "legal.legalFormerTeslaEmployee": "no",
        "legal.legalFormerTeslaInternOrContractor": "no",
        "legal.legalReceiveNotifications": "yes",
    };
    for (const key in pageTwoRadioButtons) {
        if (pageTwoRadioButtons.hasOwnProperty(key)) {
            const value = pageTwoRadioButtons[key];
            const radioButtons = Array.from(document.querySelectorAll(`input[type="radio"][name="${key}"]`));
            radioButtons.forEach(input => {
                if (input.value === value) {
                    input.click();
                }
            });
        }
    }

    // click the "Next" button
    setTimeout(() => document.querySelector('button[name="next"][class="tds-btn"]').click(), 500);
}, 6000);


// ------------------------------ PAGE 3 ------------------------------ //


setTimeout(() => {
    const setPageThreeValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;

    // check the EEO box
    const checkbox = document.querySelector("input[type='checkbox'][name='eeo.eeoAcknowledgment']");
    checkbox.disabled = false;
    checkbox.click();

    // set page three fields
    const pageThreeFields = {
        "Gender": "male",
        "Veteran Status": "no",
        "Race/Ethnicity": "hispanic_or_latino",
        "Disability": "no",
        "Legal Name": "David Venegas"
    }
    Array.from(document.querySelectorAll("label")).forEach(label => {
        const key = label.textContent.trim();
        if (!pageThreeFields.hasOwnProperty(key)) return;
        try {
            const input = document.getElementById(label.getAttribute("for"));
            const tagName = input.tagName;
            if (tagName === "INPUT") {
                setPageThreeValue.call(input, pageThreeFields[key]);
                input.dispatchEvent(new Event('input', { bubbles: true }));
            } else if (tagName === "SELECT") {
                input.value = pageThreeFields[key];
                input.dispatchEvent(new Event('change', { bubbles: true }));
            } else {
                throw new Error(`Unsupported tag "${tagName}"`);
            }
        } catch (error) {
            console.error(`Error filling field "${key}": ${error.message}`);
        }
    });

    // click the "Submit" button
    setTimeout(() => document.querySelector('button[type="submit"][class="tds-btn"]').click(), 500);
}, 8000);
