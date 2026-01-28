# IT Support Request Form

A simple, no-frills IT support request form that allows students to submit tickets for password resets, laptop repairs, and other IT inquiries. Submissions are automatically logged to a Google Sheet via Google Apps Script.

## Features

- **Password Reset Requests** - Students can request password resets with their name, class, and email
- **Laptop Repair Appointments** - Book repair appointments with timeslot selection
- **Other Inquiries** - Submit miscellaneous IT questions with a message field
- **No Build Process** - Single static HTML file that works out of the box
- **Google Sheets Integration** - All submissions automatically stored in a Google Sheet
- **Singapore Timezone** - Timestamps automatically formatted for Singapore timezone

## Quick Start

### Frontend Setup

1. Open `index.html` directly in a web browser
2. The form works offline for testing (demo mode)
3. To enable actual submissions, you'll need to set up the backend (see below)

### Backend Setup

1. **Create a Google Sheet**

   - Go to https://sheets.google.com and create a new spreadsheet
   - Name it "IT Support Requests" (or your preferred name)
   - In the first row, add these headers:
     - A1: Timestamp
     - B1: Request Type
     - C1: Name
     - D1: Class
     - E1: Email
     - F1: Timeslot
     - G1: Message
2. **Deploy Google Apps Script**

   - In Google Sheets, go to **Extensions > Apps Script**
   - Delete any existing code and paste the contents of `google-apps-script.js`
   - Click **Deploy > New deployment**
   - Select type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and authorize when prompted
   - Copy the Web App URL
3. **Connect Frontend to Backend**

   - Open `index.html` and find the line with `const GOOGLE_SCRIPT_URL = ...`
   - Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your Web App URL
   - Save the file

## Architecture

### Frontend (`index.html`)

- Single-file HTML/CSS/JavaScript application
- Responsive design with built-in styling
- Radio buttons to select request type
- Conditional form sections that show/hide based on request type
- Submits data as JSON via `fetch()` API

### Backend (`google-apps-script.js`)

- Google Apps Script that receives form submissions
- Appends data to the active Google Sheet
- Formats timestamps for Singapore timezone
- Returns JSON success/error responses

## Form Fields

| Request Type              | Required Fields              |
| ------------------------- | ---------------------------- |
| Password Reset            | Name, Class, Email           |
| Laptop Repair Appointment | Name, Class, Email, Timeslot |
| Other Enquiry             | Name, Class, Email, Message  |

## How It Works

1. User selects a request type (Password Reset, Laptop Repair, or Other Enquiry)
2. Form fields adjust based on selection
3. User fills out required fields
4. Form submits data as JSON to Google Apps Script
5. Script receives data and appends a new row to Google Sheet
6. Success/error message displayed to user

## Important Notes

- **Backend Changes**: If you modify `google-apps-script.js`, you must create a NEW deployment for changes to take effect. Simply updating the script code is not enough.
- **No Build Process**: No npm packages or compilation needed—just open the HTML file in a browser
- **CORS Mode**: Frontend uses `no-cors` fetch mode for compatibility with Google's endpoints

## File Structure

```
IT-support-request/
├── index.html                 # Frontend form
├── google-apps-script.js      # Backend script
├── CLAUDE.md                  # Development notes
└── README.md                  # This file
```

## Troubleshooting

**Form won't submit?**

- Check that you've added the correct Google Apps Script Web App URL to `index.html`
- Ensure you've deployed the script as "Anyone" can access

**Submissions aren't appearing in Sheet?**

- Verify the sheet headers match exactly as specified in setup
- Check that you created a NEW deployment after pasting the script

**Timestamps are wrong?**

- The backend automatically uses Singapore timezone (Asia/Singapore)
- Check your browser's local time settings if testing locally

## License

[Add your license here if applicable]
