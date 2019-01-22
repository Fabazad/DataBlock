const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function waitForElement(selector){
    var $element = $(selector)[0];
    while(!$element){
        await wait(100);
        $element = $(selector)[0];
    }
    return new Promise((resolve) => resolve($element));
}

async function waitForCloseElement(selector){
    var $element = $(selector)[0];
    while($element){
        await wait(100);
        $element = $(selector)[0];
    }
    return new Promise();
}