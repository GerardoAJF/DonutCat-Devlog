// Resize the titled-header border

const header =  document.querySelector('.titled-section header');
const titled_section = document.querySelector('.titled-section header p');
const titled_section_border = window.getComputedStyle(titled_section, '::after');

new_width = header.clientWidth - titled_section.clientWidth + "px"

const stylesheet = Array.from(document.styleSheets).find(sheet => 
    sheet.href && sheet.href.includes('style.css')
);

const rules = stylesheet.cssRules
for (let rule of rules) {
    if (rule.selectorText === '.titled-section header p::after') {
        rule.style.width = new_width;
    }
}
