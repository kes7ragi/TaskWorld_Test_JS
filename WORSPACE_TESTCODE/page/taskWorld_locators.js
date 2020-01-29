
//Reference
var EC = protractor.ExpectedConditions;
var navigateToTaskCreationPage = '.\\--padding-normal > .tw-button__main-container';
var projectName = 'project-name';
var projectDescription = '.tw-form-input__input-element:nth-child(1)';
var privatePrivacyPicker ='.ax-privacy-picker__private > .tw-choice__label';
const NextChooseTemplate ='.\\--size-42px span';
const projectTemplate_Weekday = "[data-title='weekday']"
const projectTemplate_Team ="[data-title='team']";
const projectTemplate_Blank = "[data-title='blank']";
const projectTemplate_Department ="[data-title='department']";
const getprojectName = '.tw-project-header__title .tw-editable-text-field__text'
const createProjectButton ='.ax-create-project-button > .tw-button__main-container'
const createNewTaskList ='.tw-editable-text-field__input'
const addSubTask = '.tw-task-input-panel__input-box'
const clickAddTasktoList ="//div[@class='tw-click-area tw-tasklist-header__add-icon ax-tasklist-header__add-icon']"
const clickCreateTaskButton = '.\\--primary span'
const clickCancelTaskButton = ".\\--secondary span"
const selectCreatedTask = '.tw-task-header'
const getCreatedTaskName ='.tw-editable-panel-title__text'
const getCompletedTaskStatus ='.tw-task-completed-stat__message-stat > span'
const closeSelectedTask = '.tw-floating-panel-desktop__close > .tw-icon'
const checkboxCompleteTask ='.tw-kanban-item:nth-child(1) .tw-click-area'
const checkTaskisCompleted = '.tw-task-date > span'
const verifyTaskListIsCreated = '.tw-kanban-column:nth-child(1) .tw-editable-text-field__text:nth-child(1)'

var searchBtnElm = $(getprojectName)
var clickprojectButton = $(createProjectButton)
var clickEnterAfterCreateTask = async function(){
    await browser.actions().sendKeys(protractor.Key.ENTER).perform()
}


var privacySetting1 = {
    PRIVATE:'PRIVATE',
    PUBLIC: 'PUBLIC'
}
var ProjectTemplate1 = {
    BLANK: 'PRIVATE',
    WEEKDAY:'WEEKDAY',
    TEAM:'TEAM',
    DEPARTMENT:'DEPARTMENT'
}
var EC = protractor.ExpectedConditions;
// Waits for the element with id 'abc' to be clickable.
var waitForElementToClickable = function(locator){
    browser.wait(EC.elementToBeClickable($(locator)), 5000,"Element could not be located.");
}


var locators = function () {

    locators.prototype.create_new_project = async function(name,description,private){
        await this.clickby_Css(navigateToTaskCreationPage);
        this.inputText_by_Name(projectName,name);
        await this.inputText_by_Css(projectDescription,description);
        this.select_Privacy_Setting(private)
        browser.sleep(5000)
        await this.clickby_Css(NextChooseTemplate)
        //browser.sleep(3000)
        await this.clickby_Css(createProjectButton)
        
        browser.sleep(3000)
        return await this.getTextby_Css(getprojectName);
    
    };
    locators.prototype.createTaskList =  async function(name){
        
        await this.inputText_by_Css(createNewTaskList,name)
        clickEnterAfterCreateTask();
        clickEnterAfterCreateTask();
        await browser.sleep(4000)
        console.log("reached 3")
        return await this.getTextby_Css(verifyTaskListIsCreated)

    };
    
    locators.prototype.select_Privacy_Setting = async function(privacySetting){
            switch (privacySetting) {
                case privacySetting1.PRIVATE:
                    await this.clickby_Css(privatePrivacyPicker);
                    break;
                case privacySetting1.PUBLIC:
                    await this.clickby_Css(publicPrivacyPicker);
                    break;
            }
    };
    locators.prototype.select_Project_Template = async function(projectTemplate){
        switch (projectTemplate){
            case ProjectTemplate1.WEEKDAY:
                await this.clickby_Css(projectTemplate_Weekday);
                break;
            case ProjectTemplate1.BLANK:
                await this.clickby_Css(projectTemplate_Blank);
                break;
            case ProjectTemplate1.TEAM:
                await this.clickby_Css(projectTemplate_Team);
                break;
            case ProjectTemplate1.DEPARTMENT:
                await this.clickby_Css(projectTemplate_Department);
                break;
        }
    }

    locators.prototype.completeTheTask = async function(){
        await this.clickby_Css(checkboxCompleteTask)
        return await this.getTextby_Css(checkTaskisCompleted)
    }

    locators.prototype.verifyCompleteTheTask = async function(){
        await this.clickby_Css(selectCreatedTask)
        return await this.getTextby_Css(getCompletedTaskStatus)
    }
   
    locators.prototype.clickToAddSubTask = async function(){
        browser.sleep(3000)
        await this.clickby_Css(clickAddTasktoList)
    }
    locators.prototype.addTasksToTaskList = async function(TaskName){
        this.inputText_by_Name(addSubTask,TaskName)
        await this.clickby_Css(clickCreateTaskButton)
    }
    locators.prototype.clickonCreatedTask = async function(){
        browser.sleep(4000);
        await this.clickby_Css(selectCreatedTask)
        browser.sleep(4000); 
        return await this.getTextby_Css(getCreatedTaskName)
    }
    
    locators.prototype.inputText_by_ID = function (ID, Sendkeys) {
        element(by.id(ID)).sendKeys(Sendkeys);
    };
    locators.prototype.inputText_by_Css = async function (Css, Sendkeys) {
        await element(by.css(Css)).sendKeys(Sendkeys);
    };

    locators.prototype.inputText_by_Name = function (Name, Sendkeys) {
        element(by.name(Name)).sendKeys(Sendkeys);
    };

    locators.prototype.clickby_ClassName = function (ClassName) {
        element(by.className(ClassName)).click();
    };

    locators.prototype.clickby_Css = async function (Css) {
        browser.sleep(4000);
        await element(by.css(Css)).click();
    };

    locators.prototype.clickby_Xpath = function (Xpath) {
        element(by.xpath(Xpath)).click()
    };
    locators.prototype.verify_Is_Present_by_Xpath = function (Xpath,True_False) {
        expect(element(by.xpath(Xpath)).isPresent()).toBe(True_False)
    };
    locators.prototype.verify_Is_Present_by_Xpath_Return = function (Xpath) {
       return element(by.xpath(Xpath)).isPresent().then(function (result) {
            return result;
        })
    };

    locators.prototype.getTextby_ID = function (ID) {
        //read the text and return
        return element(by.id(ID)).getText().then(function (text) {
            return text;
        })
    };
    locators.prototype.getTextby_ClassName = function (Class) {
        return element(by.className(Class)).getText().then(function (text) {
            return text;
        })
    };

    locators.prototype.getTextby_XPath = function (Xpath) {
        return element(by.xpath(Xpath)).getText().then(function (text) {
            return text;
        })
    };

    locators.prototype.getTextby_Css = async function (Css) {
        return await element(by.css(Css)).getText();
    };
    locators.prototype.verifyElement_Is_Clickable_Xpath = function (Xpath, TimeInSec, FailureMessage) {
        browser.driver.wait(EC.elementToBeClickable(element(by.xpath(Xpath))), TimeInSec,FailureMessage);
    };
    locators.prototype.verifyElement_Is_Clickable_ID = function (ID, TimeInSec, FailureMessage) {
        browser.driver.wait(EC.elementToBeClickable(element(by.id(ID))), TimeInSec,FailureMessage);
    };
    locators.prototype.verifyElement_Is_Clickable_Name = function (name, TimeInSec, FailureMessage) {
        browser.driver.wait(EC.elementToBeClickable(element(by.name(name))), TimeInSec,FailureMessage);
    };
    locators.prototype.verifyElement_Is_Present_Name = function (name, TimeInSec, FailureMessage) {
        browser.driver.wait(EC.presenceOf(element(by.name(name))), TimeInSec,FailureMessage);
    };
    locators.prototype.verifyElement_Is_Present_Css = function (Css, TimeInSec, FailureMessage) {
        browser.driver.wait(EC.presenceOf(element(by.css(Css))), TimeInSec,FailureMessage);
    };

    locators.prototype.verifyElement_Is_Clickable_Css = function (Css, TimeInSec, FailureMessage) {
        browser.driver.wait(EC.elementToBeClickable(element(by.css(Css))), TimeInSec,FailureMessage);
    };

};

module.exports = new locators();