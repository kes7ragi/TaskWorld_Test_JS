var data = require('../data/userData');

var HomePage = function() {

    HomePage.prototype.TaskWorldSite_Home = function () {
        browser.driver.get(data.urls.TaskWorld_Site_URL);
        browser.ignoreSynchronization=true;
        browser.waitForAngularEnabled(false);
        
    };
};

module.exports = new HomePage();
