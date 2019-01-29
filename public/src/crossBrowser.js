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

    static tabsGet(tabId){
        if(chrome) {
            return new Promise((resolve) => chrome.tabs.get(tabId, resolve));
        } else {
            return browser.tabs.get(tabId)
        }
    }

    static tabsCreate(detail){
        if(chrome) {
            return new Promise((resolve) => chrome.tabs.create(detail, resolve));
        } else {
            return browser.tabs.create(detail)
        }
    }

    static getBrowser(){
        return chrome ? chrome : browser;
    }
}

const bigBrowser = CrossBrowser.getBrowser();