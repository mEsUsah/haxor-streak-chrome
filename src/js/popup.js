(() => {
    const platforms = [
        {
            'name': "keybr.com",
            'handle': 'keybr',
        }
    ]

    const counterKeybrOutput = document.getElementById('counterKeybrOutput');
    const counterKeybrButton = document.getElementById('counterKeybrButton');
    const counterMinusKeybrButton = document.getElementById('counterKeybrButtonMinus');
    
    // get count from storage
    chrome.storage.sync.get('count', (result) =>{
        let counterKeybr = 0
        if(result.count){
            counterKeybr = result.count;
        } else {
            chrome.storage.sync.set({count: 0});
            counterKeybr = 0;
        }
        console.log(counterKeybr);
        counterKeybrOutput.innerHTML = counterKeybr;
    });

    // increment count
    counterKeybrButton.addEventListener('click', () => {
        chrome.storage.sync.get('count', (result) =>{
            let counterKeybr = 0
            if(result.count){
                counterKeybr = result.count;
            } else {
                chrome.storage.sync.set({count: 0});
                counterKeybr = 0;
            }
            counterKeybr++;
            chrome.storage.sync.set({'count': counterKeybr});
            counterKeybrOutput.innerHTML = counterKeybr;
        });
    });

    // decrement count
    counterMinusKeybrButton.addEventListener('click', () => {
        chrome.storage.sync.get('count', (result) =>{
            let counterKeybr = 0
            if(result){
                counterKeybr = result.count;
            } else {
                chrome.storage.sync.set({count: 0});
                counterKeybr = 0;
            }
            counterKeybr--;
            chrome.storage.sync.set({count: counterKeybr});
            counterKeybrOutput.innerHTML = counterKeybr;
        });
    });
})();
