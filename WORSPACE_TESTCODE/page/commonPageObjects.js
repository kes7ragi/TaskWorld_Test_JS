function commonPageObjects() {};


    commonPageObjects.prototype.waitForTitle = function (title) {
        //wait for the title to result in DOM, here it waits for 20 sec, On failure finding the title, Error Message(Pls CHeck the title) will be displayed)
        var Wait1 = protractor.ExpectedConditions;
        browser.driver.wait(Wait1.titleContains(title), 20000, 'Pls Check the title');
    };

    commonPageObjects.prototype.waitforAngular= function (True_False) {
        browser.waitForAngularEnabled(True_False);
    };
    commonPageObjects.prototype.assert_title = function (title) {
        //Jasmie Assert to get browser title
        expect(browser.getTitle()).toContain(title);
    };




module.exports = new commonPageObjects();