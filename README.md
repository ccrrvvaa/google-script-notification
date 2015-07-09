# google-script-notification
This is a script built in Google Apps Script technology that send me a notification when an itinerary is released in an specific web-page passengers transport.

First you have to create a new google spreadsheet with four columns: Date, Origin, Destination, Status.
The Status column is for indicate if the email was sent (1) or not yet (0).

Then you have to enter to submenu Tools => Script Editor. When the script editor is opened, you can paste the code written in code.gs file (You have to change the email that will receive the notification inside sendMail function).

You can run the application selecting the function to run (in the select box) and clicking on RUN button.

If you want to execute a job with a frecuency of time, you can go to submenu Resources => Current project's triggers in the script editor.