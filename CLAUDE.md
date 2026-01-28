# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IT Support Request Form - a static HTML form that submits support tickets to a Google Sheet via Google Apps Script. Used by students to request password resets, laptop repair appointments, or submit other IT enquiries.

## Architecture

**Frontend** (`index.html`): Single-file application with embedded CSS and JavaScript. No build process required.
- Radio button selection shows/hides conditional form sections (timeslot picker for repairs, message field for enquiries)
- Submits JSON via `fetch()` to Google Apps Script endpoint using `no-cors` mode

**Backend** (`google-apps-script.js`): Google Apps Script that runs as a web app, deployed separately in Google Sheets.
- `doPost()` receives form data and appends rows to the active Google Sheet
- Timestamps are formatted for Singapore timezone (Asia/Singapore)
- Must be deployed as a new version after any changes for updates to take effect

## Development

Open `index.html` directly in a browser for local testing. The form has a demo mode when `GOOGLE_SCRIPT_URL` is set to the placeholder value.

To deploy backend changes: In Google Sheets, go to Extensions > Apps Script, paste the script, then Deploy > New deployment.

## Form Fields

| Request Type | Required Fields |
|-------------|-----------------|
| Password Reset | name, class, email |
| Laptop Repair | name, class, email, timeslot |
| Other Enquiry | name, class, email, message |
