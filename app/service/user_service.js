const XLSX = require('xlsx');
const path = require('path');

exports.loginService = async (username, password) => {
    let userDetailsSheet;
    let firstSheet;
    let data;
    //Lets load google sheet to userDetailsSheet
    try {
        userDetailsSheet = XLSX.readFile(path.join(__dirname, '../../assets/', 'User_Details.xlsx'));
        firstSheet = userDetailsSheet.Sheets[userDetailsSheet.SheetNames[0]];
        data = XLSX.utils.sheet_to_json(firstSheet);
    } catch (error) {
        console.error("Error loading or parsing the user details:", error);
    }
    // Now lets add logic to check given user and his password is present in our sheet or not
    const user = data.find((dataSnapShot) => dataSnapShot.Name === username);

    if (!user || user.Password != password) {
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
    }
}

exports.getSchemeService = async (username) => {
    let userSchemeSheet;
    let schemeMappingSheet;
    let firstUserSchemeSheet;
    let firstSchemeMappingSheet;
    let schemeData;
    let mappingData;
    //Lets load google sheet to userDetailsSheet
    try {
        userSchemeSheet = XLSX.readFile(path.join(__dirname, '../../assets/', 'Scheme_Details.xlsx'));
        schemeMappingSheet = XLSX.readFile(path.join(__dirname, '../../assets/', 'User Scheme Mapping Details.xlsx'));

        firstUserSchemeSheet = userSchemeSheet.Sheets[userSchemeSheet.SheetNames[0]];
        firstSchemeMappingSheet = schemeMappingSheet.Sheets[schemeMappingSheet.SheetNames[0]];

        schemeData = XLSX.utils.sheet_to_json(firstUserSchemeSheet);
        mappingData = XLSX.utils.sheet_to_json(firstSchemeMappingSheet);
        //getting user from mapping sheet
        const user = mappingData.find((dataSnapShot) => dataSnapShot.UserName === username);
        //getting scheme for this user
        const enrolledScheme = schemeData.filter((dataSnapShot) => dataSnapShot.SchemeName === user.SchemaName.trim());
        //getting available other scheme
        const availableScheme = schemeData.filter((dataSnapShot) => dataSnapShot.SchemeName != user.SchemaName.trim());


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
    } catch (error) {
        console.error("Error loading or parsing the user details:", error);
    }
}


