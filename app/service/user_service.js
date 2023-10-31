
const { google } = require('googleapis');
const config = require('config');




exports.loginService = async (username, password) => {
    const sheets = google.sheets({
        version: 'v4',
        auth: config.credentials.google_key,
    });

    const loginSheetId = config.credentials.login_sheet_id;
    const range = 'userdetails!A:B';  // Specify the sheet and range you want to read

    // Get the spreadsheet data.
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: loginSheetId,
        range: range
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
        auth: config.credentials.google_key,
    });

    const schemeDetailsId = config.credentials.scheme_details_id;
    const schemeDetailsRange = 'scheme_details!A:C';

    const userSchemeId = config.credentials.user_scheme_id;
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



    const enrolledSchemes = enrolledScheme.map((scheme) => {
        return { schemeName: scheme[0], totalPrice: scheme[1], type: scheme[2] };
    });

    const availableSchemes = availableScheme.map((scheme) => {
        return { schemeName: scheme[0], totalPrice: scheme[1], type: scheme[2] };
    });

        if (enrolledScheme) {
            return {
                status: 200,
                message: "Data Found",
                data: { "enrolledSchemes": enrolledSchemes, "availableSchemes": availableSchemes }
            }
        }
        return {
            status: 400,
            message: "Data Not Found",
            data: null
        }
}


