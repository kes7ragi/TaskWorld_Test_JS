# TaskWorld_JS


Regression End to End Test:

WORSPACE(ACTUAL CODE) = Check Folder Name WORKSPACE_TESTCODE  

READ-ME folder has 
           HOW TO SETUP
		   HOW TO RUN
		   OTHER EXPLANATION


HOW TO RUN THE TEST :

	RUN FROM COMMAND LINE:

		1.Clone the project
		2.npm install
		3.npm start

//package.json file has configuration about dependencies to install, Test run configuration.
	
	RUN FROM WEBSTORM IDE :
		
		WebStorm ide can be installed from https://www.jetbrains.com/webstorm/download/

			1.Open Webstorm IDE, Click on Create New Project.
			  >Enter Project name
			  >Select Location of Workspace or Protractor Project Directory.
			  >Project Type : Empty project
			  
			2.EDIT Configuartion
			  >Click on Down arrow ,click on "Edit Configuration"
			  >Press '+' button on top left corner.
			  >Select 'Protractor'.
			  >Enter name
			  >Configuration File : Locate the location of config file     (eg, C:\Users\<user>\...\WORKSPACE_TESTCODE\config.js)
			  >Protractor Package : Locate the protractor package path     (eg, C:\Users\<user>\...\WORKSPACE_TESTCODE\node_modules\protractor\)
			  >Click 'Apply' and 'OK' buttons.

			  
			TO RUN :
			Click on execute button to run the script.

 
