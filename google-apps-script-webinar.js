/**
 * Google Apps Script for Webinar Leads
 * 
 * INSTRUCTIONS:
 * 1. Go to https://sheets.google.com → Create a new spreadsheet named "Samey.unfolds — Webinar Leads"
 * 2. In the spreadsheet: Extensions → Apps Script
 * 3. Delete any code in the editor, paste this entire file
 * 4. Click "Deploy" → "New deployment"
 * 5. Type: "Web app" → Execute as "Me" → Who has access: "Anyone"
 * 6. Click "Deploy" → Copy the URL
 * 7. Paste that URL into the index.html file, replacing "YOUR_SCRIPT_ID" in:
 *    var SHEETS_ENDPOINT = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
 */

function doPost(e) {
  try {
    var sheet = getOrCreateSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Append a new row with the lead data
    sheet.appendRow([
      data.date || "",
      data.time || "",
      data.name || "",
      data.phone || "",
      data.age || "",
      data.country || "",
      data.state || "",
      data.city || ""
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Health check / test endpoint
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Webinar leads endpoint is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  var SPREADSHEET_NAME = "Samey.unfolds — Webinar Leads";
  var SHEET_NAME = "Leads";
  
  // Try to find existing spreadsheet
  var files = DriveApp.getFilesByName(SPREADSHEET_NAME);
  var spreadsheet;
  
  if (files.hasNext()) {
    spreadsheet = SpreadsheetApp.open(files.next());
  } else {
    // Create new spreadsheet with headers
    spreadsheet = SpreadsheetApp.create(SPREADSHEET_NAME);
    var sheet = spreadsheet.getActiveSheet();
    sheet.setName(SHEET_NAME);
    
    // Add headers
    sheet.appendRow(["Date", "Time", "Full Name", "Phone Number", "Age", "Country", "State", "City"]);
    
    // Format header row
    var headerRange = sheet.getRange(1, 1, 1, 8);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#F5C518");
    headerRange.setFontColor("#000000");
    
    // Set column widths
    sheet.setColumnWidth(1, 100);  // Date
    sheet.setColumnWidth(2, 80);   // Time
    sheet.setColumnWidth(3, 180);  // Name
    sheet.setColumnWidth(4, 150);  // Phone
    sheet.setColumnWidth(5, 60);   // Age
    sheet.setColumnWidth(6, 130);  // Country
    sheet.setColumnWidth(7, 140);  // State
    sheet.setColumnWidth(8, 140);  // City
    
    // Freeze header row
    sheet.setFrozenRows(1);
  }
  
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.getActiveSheet();
    sheet.setName(SHEET_NAME);
  }
  
  return sheet;
}
