# FiveM - Validator

## Description
This script adds a unified validation function to validate user input from the frontend for FiveM. The script is written in JavaScript and can be integrated via the .html file.

## Installation
Download the latest version and drag the folder into the resources folder of your FiveM server.

## Usage
To validate all user input, you can simply call the static function of the `Validator` class.

Keep in mind that you need to put `await` before calling this function. 
```js
const result = await Validator.validate({
    fieldName: {
        rules: "required|string",
        value: $('#firstname').val()
    }
});
```

An example response would be the following:
```json
{
    "firstname": "First name must be filled in.",
    "lastname": "Last name must be filled in."
}
```

### Add your own rules
You can add your own rules and customize existing rules as well.

1. Open the file located in `src/main.js`.
2. Find the property `availableRules` (It is at the top of the class)
3. Copy an existing rule and customize the name as well as the logic to your needs.

### Additional Informations
Some of our rules require additional arguments to properly validate the field. For example, the `max` rule requires a number of characters that the field should have. The rule would look like this `max:10`. This means that the field must have at least 10 characters or be equal to or greater than 10. Or if it is an array, it needs at least 10 entries in the array.

### Existing Rules
| Rule name   | Requires argument | Argument | Example              | Explanation |
| ---------   | ----------------- | -------- | -------------------- | ----------- |
| required    | :x:               |          |                      | Checks if the field has been filled.
| string      | :x:               |          |                      | Checks if the field is an string.
| numeric     | :x:               |          |                      | Checks if the field only contains numbers.
| max         | :white_check_mark:              | number   | max:12               | Checks if the field does not exceeds the given value.
| min         | :white_check_mark:               | number   | min:12               | Checks if the field isn't lower than the given value.
| in          | :white_check_mark:               | string   | in:FiveM,altV,RageMP | Checks if the field is included in the given value.
| array       | :x:               |          |                      | Checks if the field is an array.
| date_format | :x: (optional)    | string   | date_format:YYYY-MM-DD      | Checks if the field follows the same format.


## Support
I'm happy to help with any questions or problems. Please open an issue on Github or contact me on Discord: `oakyy`