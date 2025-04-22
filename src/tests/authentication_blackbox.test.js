/**
 * Black Box testing class for Authentication class
 * Winston Shih
 */
const { login, logout } = require('./authentication');
/**
 * Valid: 
 * User name is a valid email address
 * Password matches credentials associated with user name
 * Login session token is active and has not expired.
 * Invalid:
 * User name is not in email format, not a existing email address, or is empty.
 * Password does not match username credentials.
 * Login session token expired or token does not exist.
 */
describe('Authentication System', () => {
    // Test cases for login functionality
    describe('Login Functionality', () => {
        test('TC1: Login with password that has correct letters but accidentally have wrong capitalization.', () => {
            const result = login('validUser@example.com', 'correctpassword');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Wrong password');
        });

        test('TC2: Login with no username or password', () => {
            const result = login('', '');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Please input a valid username and password');
        });

        test('TC3: Login with empty password', () => {
            const result = login('', 'password123');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Username cannot be empty');
        });

        test('TC4: Login with capitalization errors in username', () => {
            const result = login('validUser@EXample.com', 'wrongPassword');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Invalid username');
        });

        test('TC5: Login with capitalization errors in username and password', () => {
            const result = login('nonexistent@EXAMPLE.com', 'anyPASSWORD');
            expect(result.success).toBe(false);
            expect(result.message).toBe('User not found');
        });
    });

    // Test cases for logout functionality
    describe('Logout Functionality', () => {
        let userSession;

        beforeEach(() => {
            // Simulate a logged-in user before each logout test
            userSession = login('validUser@example.com', 'correctPassword');
        });

        test('TC6: Logout with exceptional token', () => {
            const result = logout('in_@$%valid-token');
            expect(result.success).toBe(false);
            expect(result.message).toBe('Session token is nonexistent');
        });

        test('TC7: Logout with previously logged out session token', () => {
            const loggedOutToken = 'loggedout-token-12345';
            const result = logout(loggedOutToken);
            expect(result.success).toBe(false);
            expect(result.message).toBe('Session token already used');
        });
        test('TC8: Logout with token with capitalization errors', () => {
            const invalidToken = 'USERSession.tOKen';
            const result = logout(invalidToken);
            expect(result.success).toBe(false);
            expect(result.message).toBe('Invalid session token');
        });
        test('TC9: Logout with token with misspelling issues', () => {
            const misspellToken = 'userSesion.tolkien';
            const result = logout(misspellToken);
            expect(result.success).toBe(false);
            expect(result.message).toBe('Invalid session token');
        });
    });
});