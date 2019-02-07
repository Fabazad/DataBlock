function goToUrl(url) {
    if (window.location.href != url) {
        bigBrowser.runtime.sendMessage({action: "waitForFacebook", page: window.location.href});
        window.location.replace(url);
    }
}

function stopTreatments(fullName, email, country) {
    goToUrl("https://www.facebook.com/help/contact/367438723733209")
    // Click radio buttons to get to the form
    $('input[name="product_selection"][value="Facebook"]').prop("checked", true).click();
    $('input[name="eu_what_can_we_help_you_with"][value="I want to manage my data"]').prop("checked", true).click();
    $('input[name="data_management_eu"][value="I have a different objection to the use of my data"]').prop("checked", true).click();
    // Fill out the form
    $('input[name="name"]').prop("value", fullName)
    $('input[name="email"]').prop("value", email)
    $('input[name="country"]').prop("value", country)
    $('textarea[name="objection_reason"]').prop("value", "Test")
    $('textarea[name="objection_explanation"]').prop("value", "Test")
    // Click the "I agree" button
    $('input[name="truth_statement[]"]').click();
    // Click the "send" button
    // $('._42ft._4jy0._4jy4._4jy1.selected._51sy._42fr').click()
}

async function deleteApps(isDeleteAllApps, isDeleteAllData, url = null) {
    let dest = url ? url : "https://www.facebook.com/settings?tab=applications&section=inactive";
    goToUrl(dest);
    await wait(500);
    $("._1gcq._29c-._1gco._5e9w").click();
    $('._271k._271m._1qjd').click();
    await wait(500);
    $('input[name="delete_activity"]').prop("checked", isDeleteAllData);
    $('._42ft._4jy0.layerConfirm.uiOverlayButton._4jy3._4jy1.selected._51sy').click();
    await wait(2000);
    $('._10.uiLayer._4-hy._3qw').addClass('hidden_elem')
    if (isDeleteAllApps) deleteApps(false, isDeleteAllData, "https://www.facebook.com/settings?tab=applications&section=active")
}

bigBrowser.runtime.onMessage.addListener(function (request, sender, sendResponse){
    switch (request.action) {
        case "stopTreatments":
            stopTreatments(request.fullName, request.email, request.country);
            break;
        case "deleteApps":
            deleteApps(request.deleteAll, request.url);
            break;
        default:
            break;
    }
});
