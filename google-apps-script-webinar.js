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
  var SPREADSHEET_ID = "1JhnKXYocLFI333fyrYi4Z71Vk5Q7tA9CDn271GPbeFo";
  var SHEET_NAME = "Sheet1";
  
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.getActiveSheet();
  }
  
  return sheet;
}
