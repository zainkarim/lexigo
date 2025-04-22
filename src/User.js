/* 
    Zora Lahlou and Wan Kim and Zahra Ashfaq
    CS 3354 Group 14 Phase 4
    4/3/25
*/

/*
Class User
•    constructor
•    changePassword(password)
•    changeEmail(email)

•    checkPassword_Length(pwd) -> Checks if the password length is greater than or equal to 8 characters.
•    checkPassword_ValidCharacters(pwd) -> Checks if the password contains at least one uppercase letter and one special character.
•    isUpperCaseLetter(char)

•    checkEmail_Length(email) -> Checks if the email length is between 5 and 320 characters.
•    checkEmail_ValidCharacters(email) -> Checks if the email contains at any invalid characters (depending on prefix or domain).
•    checkEmail_Format(email) -> Checks if the password is in the following format: xxx@xxx.xxx where prefix is between 1 and 64 characters and domain is between 1 and 255 characters
•    getAtLocation(email) -> returns the location of '@'
•    getEmailPrefix(email) -> return the substring of email before the '@' (prefix)
•    getEmailDomain(email) -> returns the substring of email after the '@' (domain)

*/

export class User {

    static MIN_LENGTH_PWD = 8;

    static MIN_LENGTH_EMAIL = 5; // smallest form: a@b.c --> 5 characters
    static MAX_LENGTH_EMAIL = 320; // {64}@{255} = 64 + 1 + 255 = 320
    static MIN_LENGTH_EMAILPREFIX = 1; 
    static MAX_LENGTH_EMAILPREFIX = 64; 
    static MIN_LENGTH_EMAILDOMAIN = 3;
    static MAX_LENGTH_EMAILDOMAIN = 255; 

    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.isLoggedIn = false;
        this.favorites = [];
    }

    changePassword(password){
        this.password = password;
    }

    changeEmail(email){
        this.email = email;
    }

    addFavorite(favorite){
        if(!this.favorites.includes(favorite)){
            this.favorites.push(favorite);
        }
    }

    deleteFavorite(favorite){
        if(this.favorites.includes(favorite)){
            this.favorites.splice(this.favorites.indexOf(favorite), 1);
        }
    }

    // checkUserID_Length(userID){
    //     //Check if the userID length is greater than 5 and less than 20

    //     if(userID.length < User.MIN_LENGTH_USERID || userID.length >User.MAX_LENGTH_USERID){
    //         return false;
    //     }
    //     return true;
    // }

    // checkUserID_ValidCharacters(userID){
    //     // Check if the userID does not contain any disallowed characters and space.

    //     const specialChar = ['_', '-', '.', '@', '!', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '{', '}', '[', ']', '|',':', ';', '"', "'", '<', '>', '?', ',', '/', '~', '`'];

    //     for(let i = 0; i <userID.length; i++){
    //         if(specialChar.includes(userID[i])){
    //             return false;
    //         }
    //     }

    //     return true;
    // }

    // checkUsername_Length(name){
    //     //Check if the userID length is greater than 3 and less than 20

    //     if(name.length<User.MIN_LENGTH_USERNAME || name.length > User.MAX_LENGTH_USERNAME){
    //         return false;
    //     }
    //     return true;
    // }

    // checkUsername_ValidCharacters(name){
    //     // Check if the username does not contain any disallowed characters and space.
    //     // Allowed special characters: '_', '-', '.'

    //     const specialChar = ['@', '!', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '{', '}', '[', ']', '|', ':', ';', '"', "'", '<', '>', '?', ',', '/', '~', '`'];
    //     for(let i =0; i<name.length; i++){
    //         if(specialChar.includes(name[i])){
    //             return false;
    //         }
    //     }

    //     return true;
    // }

    checkPassword_Length(pwd){
        // Check if the password length is greater than 8.

        if(pwd.length < User.MIN_LENGTH_PWD){
            return false;
        }
        return true;
    }

    checkPassword_ValidCharacters(pwd){
        // Check if the password contains at least one uppercase letter and one special character.

        let checkSpecialChar = false;
        let checkUpperLetter = false;

        const specialChar = ['_', '-', '.', '@', '!', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '{', '}', '[', ']', '|',':', ';', '"', "'", '<', '>', '?', ',', '/', '~', '`'];

        for(let i = 0; i < pwd.length; i++){
            if (specialChar.includes(pwd[i])) {
                checkSpecialChar = true;
            }
            if (this.isUpperCaseLetter(pwd[i])) {
                checkUpperLetter = true;
            }

            if (checkSpecialChar && checkUpperLetter) {
                break;
            }
        }

        return (checkUpperLetter && checkSpecialChar);
    }

    isUpperCaseLetter(char) {
        return char >= 'A' && char <= 'Z';
    }

    checkEmail_Length(email) {
        // Check if the email length is greater than 5 and less than 320

        if(email.length <= User.MIN_LENGTH_EMAIL || email.length >= User.MAX_LENGTH_EMAIL) {
            return false;
        }
        return true;
    }

    checkEmail_ValidCharacters(email) {
        // checks the valid characters for the prefix and the domain
        const atLocation = this.getAtLocation(email);
        if (atLocation < 0) {
            return false;
        }

        // for prefix only allow '_', '-', and '.' (no @ b/c there should only be one)
        const prefixChar = [' ', '@', '!', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '{', '}', '[', ']', '|',':', ';', '"', "'", '<', '>', '?', ',', '/', '~', '`'];
        for (let i = 0; i < atLocation; i++) {
            if (prefixChar.includes(email[i])) {
                return false;
            }
        }

        // for domain only allow '-', and '.' (no @ b/c there should only be one)
        const domainChar = [' ', '@', '_', '!', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '{', '}', '[', ']', '|',':', ';', '"', "'", '<', '>', '?', ',', '/', '~', '`'];
        for (let i = atLocation + 1; i < email.length; i++) {
            if (domainChar.includes(email[i])) {
                return false;
            }
        }

        return true;
    }


    checkEmail_Format(email) {
        // Check if email is in xxx@xxx.xxx format 
        const atLocation = this.getAtLocation(email);
        if (atLocation < 0) {
            return false;
        } else {
            const prefix = this.getPrefix(email);
            const domain = this.getDomain(email);

            if (prefix.length < User.MIN_LENGTH_EMAILPREFIX || prefix.length > User.MAX_LENGTH_EMAILPREFIX) {
                return false;
            }

            if (domain.length < User.MIN_LENGTH_EMAILDOMAIN || domain.length > User.MAX_LENGTH_EMAILDOMAIN) {
                return false;
            }

            let dotLocation = -1;
            for (let i = 0; i < domain.length; i++) {
                if (domain[i] === '.') {
                    dotLocation = i;
                    if (dotLocation === 0 || dotLocation === domain.length - 1) {
                        return false;
                    }
                }
            }

            if (dotLocation === -1) {
                return false;
            }

            return true;
        }
    }

    getAtLocation(email) {
        // Return the location of '@' in the email
        for (let i = 0; i < email.length; i++) {
            if (email[i] === '@') {
                return i
            }
        }

        return -1;
    }

    getPrefix(email) {
        const atLocation = this.getAtLocation(email);
        return email.substring(0, atLocation);
    }

    getDomain(email) {
        const atLocation = this.getAtLocation(email);
        return email.substring(atLocation + 1);
    }

    // checkPhoneNumber_Length(phoneNumber) {
    //     // Check if the phoneNumber length is equal to 13 characters

    //     if (phoneNumber.length !== User.LENGTH_PHONE_NUMBER){
    //         return false;
    //     }
    //     return true;
    // }

    // checkPhoneNumber_ValidCharactersAndFormat(phoneNumber) {
    //     // check if the phoneNumber is comprised of only digits and dashes

    //     const digitsChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'];
    //     const dash = '-';

    //     for (let i = 0; i < phoneNumber.length; i++) {
    //         if (i === 3 || i === 7) {
    //             if (phoneNumber[i] !== dash) {
    //                 return false;
    //             }
    //         } 
    //         else {
    //             if (!digitsChars.includes(phoneNumber[i])) {
    //                 return false;
    //             }
    //         }
    //     }

    //     return true;
    // }
}