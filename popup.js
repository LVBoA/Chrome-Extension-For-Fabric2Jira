window.addEventListener('DOMContentLoaded', function () { 
    document.getElementById("btnCopy").onclick = function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "copy" }, function (response) {
                var win = chrome.extension.getBackgroundPage();
                win.data=response;
                console.log(response);
            });  
        }); 
    };

    document.getElementById("btnPaste").onclick = function() {
        var win = chrome.extension.getBackgroundPage();

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "paste", data: win.data }, function (response) {
                console.log(response);
            });  
        }); 
    }
 });

// $(function () {
//     $("#btnCopy").click(function () {
//         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, { action: "copy" }, function (response) {
//                 var win = chrome.extension.getBackgroundPage();
//                 win.data=response;
//                 console.log(response);
//             });  
//         }); 
//     });
//     $("#btnPaste").click(function () {
//         var win = chrome.extension.getBackgroundPage();
//         if (win.data) {
//             chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//                 chrome.tabs.sendMessage(tabs[0].id, { action: "paste", data: win.data }, function (response) {
//                     console.log(response);
//                 });
//             }); 
//         }
//     });
// });