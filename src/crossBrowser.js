class CrossBrowser{
    constructor(){
        this.browser =  chrome ? chrome : browser;
    }

    static tabsQuery(detail){
        if(chrome) {
            return new Promise((resolve) => chrome.tabs.query(detail, resolve));
        } else {
            return browser.tabs.query(detail)
        }
    }

    static getBrowser(){
        return chrome ? chrome : browser;
    }
}