var _a;
class Validator {
    static async validate(fields) {
        /** @ts-ignore */
        this.fields = fields;
        let errorMessages = [];
        for (const fieldKey in fields) {
            const validationRules = fields[fieldKey].rules.split('|');
            if (typeof this.fields[fieldKey] !== 'object') {
                throw new Error(`Bitte gebe die einzelnen Felder als objekt an. Du hast angegeben: ${typeof this.fields[fieldKey]}`);
            }
            if (!this.fields[fieldKey].hasOwnProperty('value') || !this.fields[fieldKey].hasOwnProperty('rules')) {
                throw new Error("An object property for the field " + fieldKey + " is missing.");
            }
            const result = await this.validateField(validationRules, fieldKey);
            console.log(result, fieldKey);
            if (!result.success && result.message) {
                errorMessages[fieldKey] = result.message;
            }
        }
        return errorMessages;
    }
    static async validateField(rules, key) {
        for (const rule in rules) {
            if (rules[rule].includes(':')) {
                const splitRule = rules[rule].split(':');
                const ruleName = splitRule[0];
                if (!this.availableRules.hasOwnProperty(ruleName)) {
                    throw new Error(`The validation rule you've specified isn't supported. Rule: ${rules[rule]}`);
                }
                if (splitRule[1] === null || splitRule[1] === undefined || splitRule[1].length === 0) {
                    throw new Error(`You have entered an invalid value. Please make sure that you enter a valid value after the colon. Validation Rule: ${splitRule[0]}`);
                }
                splitRule.shift();
                const result = await this.availableRules[ruleName](this.fields[key].value, key, splitRule);
                if (result.success) {
                    continue;
                }
                return result;
            }
            else {
                if (!this.availableRules.hasOwnProperty(rules[rule])) {
                    throw new Error(`The validation rule you've specified isn't supported. Rule: ${rules[rule]}`);
                }
                const result = await this.availableRules[rules[rule]](this.fields[key].value, key);
                if (result.success) {
                    continue;
                }
                return result;
            }
        }
    }
    static async getLabel(key) {
        /** @ts-ignore */
        const data = await fetch(`https://oaky_validator/getTranslations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({})
        });
        const json = await data.json();
        return json.resp.attributes.hasOwnProperty(key) ? json.resp.attributes[key] : key;
    }
}
_a = Validator;
Validator.availableRules = {
    max: async (value, key, ...args) => {
        const label = await _a.getLabel(key);
        switch (typeof value) {
            case 'string':
                if (value.length > args[0]) {
                    return {
                        success: false,
                        message: `${label} darf maximal ${args[0]} Charakter beinhalten.`
                    };
                }
                break;
            case 'object':
                if (Object.keys(value).length > args[0]) {
                    return {
                        success: false,
                        message: `${label} darf maximal ${args[0]} Charakter beinhalten.`
                    };
                }
                break;
            case 'number':
                if (value > args[0]) {
                    return {
                        success: false,
                        message: `${label} darf maximal ${args[0]} Charakter beinhalten.`
                    };
                }
                break;
        }
        return {
            success: true,
            message: null
        };
    },
    min: async (value, key, ...args) => {
        const label = await _a.getLabel(key);
        switch (typeof value) {
            case 'string':
                if (value.length < args[0]) {
                    return {
                        success: false,
                        message: `${label} muss mindestens ${args[0]} Charakter beinhalten.`
                    };
                }
                break;
            case 'object':
                if (Object.keys(value).length < args[0]) {
                    return {
                        success: false,
                        message: `${label} muss mindestens ${args[0]} Charakter beinhalten.`
                    };
                }
                break;
            case 'number':
                if (value < args[0]) {
                    return {
                        success: false,
                        message: `${label} muss mindestens ${args[0]} Charakter beinhalten.`
                    };
                }
        }
        return {
            success: true,
            message: null
        };
    },
    numeric: async (value, key, ...args) => {
        const label = await _a.getLabel(key);
        const regex = /^([0-9]+)$/;
        if (!regex.test(value)) {
            return {
                success: false,
                message: `${label} darf nur aus Zahlen bestehen.`
            };
        }
        return {
            success: true,
            message: null
        };
    },
    string: async (value, key, ...args) => {
        return {
            success: true,
            message: null
        };
    },
    array: async (value, key, ...args) => {
        return {
            success: true,
            message: null
        };
    },
    required: async (value, key, ...args) => {
        const label = await _a.getLabel(key);
        switch (typeof value) {
            case 'string':
                if (value.length === 0 || value === null || value === undefined) {
                    return {
                        success: false,
                        message: `${label} muss ausgefüllt werden.`
                    };
                }
                break;
            case 'number':
                if (value < 0 || value.toString().length === 0) {
                    return {
                        success: false,
                        message: `${label} muss ausgefüllt werden.`
                    };
                }
        }
        return {
            success: true,
            message: null
        };
    },
    in: async (value, key, ...args) => {
        const label = await _a.getLabel(key);
        if (!args.includes(value)) {
            return {
                success: false,
                message: `${label} hat einen ungültigen Wert.`
            };
        }
        return {
            success: true,
            message: value
        };
    }
};
