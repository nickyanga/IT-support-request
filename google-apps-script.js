/**
 * IT Support Request Form - Google Apps Script
 *
 * SETUP INSTRUCTIONS:
 *
 * 1. Create a new Google Sheet
 *    - Go to https://sheets.google.com and create a new spreadsheet
 *    - Name it "IT Support Requests" (or any name you prefer)
 *    - In the first row, add these headers:
 *      A1: Timestamp | B1: Request Type | C1: Name | D1: Class | E1: Email | F1: Timeslot | G1: Message
 *
 * 2. Open the Apps Script Editor
 *    - In Google Sheets, go to Extensions > Apps Script
 *    - Delete any existing code and paste this entire file
 *
 * 3. Deploy as Web App
 *    - Click Deploy > New deployment
 *    - Select type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click Deploy
 *    - Authorize the app when prompted
 *    - Copy the Web App URL
 *
 * 4. Update your HTML form
 *    - In index.html, replace 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' with the Web App URL
 *
 * IMPORTANT: After any changes to this script, you must create a NEW deployment
 * for the changes to take effect.
 */

/**
 * Handles POST requests from the form
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Format the request type for display
    const requestTypeDisplay = formatRequestType(data.requestType);

    // Add timestamp
    const timestamp = new Date().toLocaleString('en-SG', {
      timeZone: 'Asia/Singapore',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Append row to sheet
    sheet.appendRow([
      timestamp,
      requestTypeDisplay,
      data.name,
      data.class,
      data.email,
      data.timeslot || '-',
      data.message || '-'
    ]);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log the error
    console.error('Error processing request:', error);

    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Formats the request type for display
 */
function formatRequestType(type) {
  const types = {
    'password-reset': 'Password Reset',
    'laptop-repair': 'Laptop Repair Appointment',
    'other-enquiry': 'Other Enquiry'
  };
  return types[type] || type;
}

/**
 * Handles GET requests (for testing)
 */
function doGet() {
  return ContentService
    .createTextOutput('IT Support Form Backend is running. Use POST to submit data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Test function - run this to verify the script works
 */
function testSubmission() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        requestType: 'password-reset',
        name: 'Test Student',
        class: '3A',
        email: 'test@school.edu',
        timeslot: '',
        message: ''
      })
    }
  };

  const result = doPost(testData);
  console.log(result.getContent());
}
