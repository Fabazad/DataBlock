const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function waitForElement(selector, index = 0){
    var $element = $(selector)[index];
    while(!$element){
        await wait(100);
        $element = $(selector)[index];
    }
    return Promise.resolve($element);
}

async function waitForCloseElement(selector){
    var $element = $(selector)[0];
    while($element){
        await wait(100);
        $element = $(selector)[0];
    }
    return Promise.resolve();
}