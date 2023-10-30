const XLSX = require('xlsx');
const path = require('path');
const { google } = require('googleapis');




exports.loginService = async (username, password) => {
    const sheets = google.sheets({
        version: 'v4',
        auth: "AIzaSyCebfm4YDwfDQXxCyzZwwir38twYiJbujY",
    });

    const spreadsheetId = '1sgYw2HVXryX29OP6dqmkqdk-9j3NfuQycJ0-RsNHIQA';
    const range = 'userdetails!A:B';  // Specify the sheet and range you want to read

    // Get the spreadsheet data.
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range
    });

    const values = response.data.values;
    const user = values.find((dataSnapShot) => dataSnapShot[0] === username);

    if (!user || user[1] !== password.toString()) {
        return {
            "status": user ? 401 : 404,
            "message": user ? "Please enter the correct password." : "User is not registered. Please register the user first.",
            "data": null
        };
    }

    return {
        "status": 200,
        "message": "Login successful",
        "data": user
    };
};




exports.getSchemeService = async (username) => {


    const sheets = google.sheets({
        version: 'v4',
        auth: "AIzaSyCebfm4YDwfDQXxCyzZwwir38twYiJbujY",
    });

    const schemeDetailsId = '1q5wJ98MbTmrs8WSiv2DHqBYR7S1vaDFrYKIk9eJRZ6c';
    const schemeDetailsRange = 'scheme_details!A:B';

    const userSchemeId = '1WjtienWENsFi_Q2Jnb_5r4Bt9QetPBloPeYP74LBgHQ';
    const userSchemeRange = 'user_scheme!A:B';

    // Get the spreadsheet data.
    const schemeDetailsResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: schemeDetailsId,
        range: schemeDetailsRange
    });

    const userSchemeResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: userSchemeId,
        range: userSchemeRange
    });


    const schemeDetailsValues = schemeDetailsResponse.data.values.slice(1);

    const userSchemeValues = userSchemeResponse.data.values.slice(1);
    console.log(userSchemeValues);
        //getting user from mapping sheet
    const user = userSchemeValues.find((dataSnapShot) => dataSnapShot[0] === username);
    const enrolledScheme = schemeDetailsValues.filter((dataSnapShot) => dataSnapShot[0] === user[1].trim());
    const availableScheme = schemeDetailsValues.filter((dataSnapShot) => dataSnapShot[0] !== user[1].trim());



        if (enrolledScheme) {
            return {
                status: 200,
                message: "Data Found",
                data: { "enrolledScheme": enrolledScheme, "availableScheme": availableScheme }
            }
        }
        return {
            status: 400,
            message: "Data Not Found",
            data: null
        }

}


