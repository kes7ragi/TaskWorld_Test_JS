
var homePage = require('../page/homePages');
var CommonObject = require('../page/commonPageObjects');
var taskCreationPage = require('../page/taskWorld_locators');
var EC = protractor.ExpectedConditions;
const PROJECT_NAME = "this is a sample project";
const PROJECT_DESCRIPTION = "this is a sample description";
const CREATE_TASKLIST_NAME = "this is a sample task name";
const TASK_NAME = "this is task name"
const expectedTaskCompleteText = "Completed on";
var login = ".tw-button"
var navigateToTaskCreationPage = '.\\--padding-normal > .tw-button__main-container';
var data = require('../data/userData');
var ProjectTemplate1 = {
    BLANK: 'PRIVATE',
    WEEKDAY:'WEEKDAY',
    TEAM:'TEAM',
    DEPARTMENT:'DEPARTMENT'
}

async function verify_login_to_taskworld_successful(){
    await browser.sleep(6000)
    await taskCreationPage.verifyElement_Is_Present_Css(navigateToTaskCreationPage,5000,"not clickable")
    return await taskCreationPage.getTextby_Css(navigateToTaskCreationPage)
}

async function createProject_TaskList(){

   let returnProject = await taskCreationPage.create_new_project(PROJECT_NAME,PROJECT_DESCRIPTION,'PRIVATE',ProjectTemplate1.BLANK);
   await browser.sleep(6000);
   let returnedText = await taskCreationPage.createTaskList(CREATE_TASKLIST_NAME);      
    return {returnProject,returnedText} ;
                    
}
async function createProject(CREATE_TASKLIST_NAME){
 await taskCreationPage.create_new_project(PROJECT_NAME,PROJECT_DESCRIPTION,'PRIVATE',ProjectTemplate1.BLANK);
 return await taskCreationPage.createTaskList(CREATE_TASKLIST_NAME);
}

async function createTask(TASK_NAME){
    await createProject_TaskList();
         await taskCreationPage.clickToAddSubTask();
         await browser.sleep(6000)
         await taskCreationPage.addTasksToTaskList(TASK_NAME);
         await browser.sleep(6000)
        return await  taskCreationPage.clickonCreatedTask()
    }
async function makeTaskComplete(TASK_NAME){
         await createProject_TaskList();
         await taskCreationPage.clickToAddSubTask();
         await browser.sleep(6000)
         await taskCreationPage.addTasksToTaskList(TASK_NAME);
         await browser.sleep(6000)
         await taskCreationPage.clickonCreatedTask()
         return await taskCreationPage.completeTheTask()
}
async function verify_details_completedTask(TASK_NAME){
    await createProject_TaskList();
    await taskCreationPage.clickToAddSubTask();
    await browser.sleep(6000)
    await taskCreationPage.addTasksToTaskList(TASK_NAME);
    await browser.sleep(6000)
    await taskCreationPage.clickonCreatedTask()
    await taskCreationPage.completeTheTask()
    return await taskCreationPage.verifyCompleteTheTask()
}

describe('TaskWorld End to End Regression Test',function(){
    beforeEach(async function () {
        isAngularSite(false);
        CommonObject.waitforAngular(false);
        homePage.TaskWorldSite_Home();
        taskCreationPage.verifyElement_Is_Clickable_Name(data.Logins.Email,5000,"not clickable")
        taskCreationPage.inputText_by_Name(data.Logins.Email,data.Logins.Username)
        taskCreationPage.inputText_by_Name(data.Logins.password,data.Logins.Password)
        await taskCreationPage.clickby_Css(login)
        browser.sleep(5000)
    });
    afterEach(function(){
        // After all close the browser and restart for next SPEC
        browser.close();
        browser.restart();
    });
        
    describe('TestCases for Creation of a new Project, TaskList , adding/completing task',function(){
         
        it("An_existing_user_logs_into_the_system",async function(){
             
            let result = await verify_login_to_taskworld_successful();
            expect(result).toContain('New Project')
                
         });

        it("The_user_creates_a_new_project()", async function(){
            
            await verify_login_to_taskworld_successful();
                taskCreationPage.create_new_project(PROJECT_NAME,PROJECT_DESCRIPTION,'PRIVATE',ProjectTemplate1.BLANK).then(function(returnedText){
                    //*************ASSERTIONS*********************** we can add additional assertions
                    expect(returnedText).toBe(PROJECT_NAME,'New Project is not created successfully')
                    })       
                })
        });
      
        xit("The_user_creates_a_new_tasklist_in_the_project()",async function (){
                browser.ignoreSynchronization = true;
                await verify_login_to_taskworld_successful();
                let result = await createProject(CREATE_TASKLIST_NAME);
                expect(result.returnedText).toBe(CREATE_TASKLIST_NAME,'New Task List is not created successfully.');
                
        });
            
        it("The_user_adds_a_new_task_to_the_tasklist",async function(){
               await verify_login_to_taskworld_successful();
                createTask(TASK_NAME).then(function(result){
                     expect(result).toBe(TASK_NAME,'New Task List is not created successfully.')
                });
        })
        
        it("The_user_marks_the_task_as_completed",async function(){
            await verify_login_to_taskworld_successful();
            makeTaskComplete(TASK_NAME).then(function(result){
                expect(result).toContain(expectedTaskCompleteText,'task is not completed successfully')
            });

        })
        it("The_user_opens_the_completed_task_to_see_its_details",async function(){
            await verify_login_to_taskworld_successful();
            verify_details_completedTask(TASK_NAME).then(function(result){
                expect(result).toContain(expectedTaskCompleteText,'completed task does not show status as completed')
            });

        });

    });
