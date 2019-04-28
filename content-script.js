chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    if (msg.action === "copy") {
        var codes = document.getElementsByTagName("code");
        var codeResult = "";
        var summaryText = "";
        for (var i = 0; i < codes.length; i++) {
            var codeTexts = codes[i].getElementsByTagName("textarea");
            var codeText = codeTexts[0].defaultValue;
            codeResult += codeText;

            if (i == codes.length -1) {
                var index = codeText.indexOf("\n");
                summaryText = codeText.substring(0,index);
            }
        }
        var result = {
            codeText: codeResult,
            url: window.location.href,
            summary: summaryText
        }
        response(result);
    } else if (msg.action === "paste") {
        var newJira = document.getElementById("create_link");
        newJira.click();
        setTimeout(function () { fill(msg.data) }, 1000);
    }
});

function fill(data) {
    var codeText = data.codeText;
    var urlText = data.url;
    var summaryText = data.summary;


    var type = document.getElementById("issuetype-field");
    type.value = "Bug";

    var summary = document.getElementById("summary");
    summary.value = summaryText;

    var priority = document.getElementById("customfield_11207");
    var allOptions = priority.options;
    allOptions.selectedIndex = 1;

    var description = document.getElementById("description");
    description.defaultValue = urlText + "\n" + codeText;

    var port = document.getElementById("customfield_11211");
    var allOptions = port.options;
    allOptions.selectedIndex = 0;

    var feature = document.getElementById("customfield_11175-textarea");
    feature.value = "崩溃处理"
}
