function warnTrips() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var firstSheet = spreadsheet.getSheets()[0];
  var dataRange = firstSheet.getDataRange().getValues();
  for(var i in dataRange) {
    if(i > 0) {
      var status = dataRange[i][3];
      if(status == 0) {
        var formattedDate = Utilities.formatDate(dataRange[i][0], "GMT", "dd/MM/yyyy");
        var origin = dataRange[i][1];
        var destination = dataRange[i][2];
        var url = "https://www.trcexpress.com/ticket/resultado_itinerario2.php?or=" + origin + "&de=" + destination + "&fs=" + formattedDate;
        var html = UrlFetchApp.fetch(url).getContentText();
        var trips = getInterestingTrips(html);
        if(trips != null && trips.length > 0) {
          sendMail(formattedDate, origin, destination, trips);
          firstSheet.getRange(parseInt(i) + 1, 4).setValue(1);
        }
      }
    }
  }
}

function getInterestingTrips(html) {
  var valuesToSearch = ["08:15 PM", "08:30 PM", "08:45 PM"];
  var foundValues = [];
  for(var i in valuesToSearch) {
    var indexFound = html.indexOf(valuesToSearch[i]);
    if(indexFound >= 0)
      foundValues.push(valuesToSearch[i]);
  }
  
  return foundValues;
}

function sendMail(date, origin, destination, trips) {
  valuesToPrint = trips.join(", ");
  MailApp.sendEmail({
     to: "myemail@gmail.com",
     subject: "TRC Itinerary",
    htmlBody: "Itineraries found<br>" + "Date: " + date + "<br>" + "Origin: " + origin + "<br>" + "Destination: " + destination + "<br>" + valuesToPrint
   });
}