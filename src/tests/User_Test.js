/* Contains test cases for the User.js class
    1) Login Functionality 
        --> test cases 1-5
        --> seen working in LoginPage.tsx
    2) Logout Functionality
        --> test cases 6-8
        --> seen working in Header.tsx (handleLogout function)
    3) Signup Functionality (Pt.1 and Pt.2)
        --> Pt.1: test cases 9-12
        --> seen working in SignupPage.tsx
*/

const User = require('./User'); 
 
 describe('User Class', () => {
     let user;
     const validUser = {
         email: "test@example.com",
         password: "Password1!"
     };
 
     beforeAll(() => {
         // Mock user database
         User.userDB = {
             "test@example.com": new User(
                 "test@example.com",
                 "Password1!"
             )
         };
         
         // Mock active sessions
         User.activeSessions = {
             "session.12345": { 
                 userId: "validUser123",
                 expires: Date.now() + 3600000 // 1 hour from now
             },
             "expired-token.12345": {
                 userId: "validUser123",
                 expires: Date.now() - 3600000 // 1 hour ago
             }
         };
     });
 
     beforeEach(() => {
         user = new User();
     });
 
     describe('Login Functionality', () => {
         test('TC1: Valid email and password should login successfully', () => {
             const result = User.login("test@example.com", "Password1!");
             expect(result).toBe("Login successful");
         });
 
         test('TC2: Invalid email format should return error', () => {
             const result = User.login("invalid@user", "Password1!");
             expect(result).toBe("Please enter a valid email address");
         });
 
         test('TC3: Empty password should return error', () => {
             const result = User.login("test@example.com", "");
             expect(result).toBe("Please fill in all fields");
         });
 
         test('TC4: Empty username should return error', () => {
            const result = User.login("", "Password1!");
            expect(result).toBe("Please fill in all fields");
         });

         test('TC5: Valid email but wrong password should return error', () => {
             const result = User.login("test@example.com", "WrongPass1!");
             expect(result).toContain("Login failed");
         });
     });
 
     describe('Logout Functionality', () => {
         beforeAll(() => {
             User.login("test@example.com", "Password1!"); // valid session
         });
 
         test('TC6: Valid session token should logout successfully', () => {
             const result = User.logout("session.12345");
             expect(result).toBe("Logout successful");
         });
 
         test('TC7: Invalid session token should return error', () => {
             const result = User.logout("invalid-token");
             expect(result).toBe("No active user session.");
         });
 
         test('TC8: Expired session token should return error', () => {
             const result = User.logout("expired-token.12345");
             expect(result).toBe("No active user session.");
         });
     });
 
     describe('Sign Up Functionality Pt.1', () => {
         test('TC9: Valid registration should succeed', () => {
             const result = User.register(
                 "new@example.com",
                 "NewPass1!"
             );
             expect(result).toBe("Registration successful");
             expect(User.userDB["new@example.com"]).toBeInstanceOf(User);
         });
 
         test('TC10: Invalid email format should return error', () => {
             const result = User.register(
                 "invalid-email",
                 "NewPass1!"
             );
             expect(result).toBe("Invalid email format");
         });
 
         test('TC11: Weak password should return error', () => {
             const result = User.register(
                 "weak@example.com",
                 "weakpass"
             );
             expect(result).toBe("Password requirements not met");
         });
 
         test('TC12: Empty email should return error', () => {
             const result = User.register(
                 "",
                 "NewPass1!",
             );
             expect(result).toBe("Please fill in all fields");
         });

         test('TC13: Empty password should return error', () => {
            const result = User.register(
                "new@example.com",
                "",
            );
            expect(result).toBe("Please fill in all fields");
        });
     });
 
     describe('Sign Up Functionality Pt.2', () => {
         test('should validate password strength correctly', () => {
             expect(user.checkPassword_ValidCharacters("StrongPass1!")).toBe(true);
             expect(user.checkPassword_ValidCharacters("weakpass")).toBe(false);
             expect(user.checkPassword_ValidCharacters("NoSpecial1")).toBe(false);
             expect(user.checkPassword_ValidCharacters("nolower1!")).toBe(false);
         });
 
         test('should validate email format correctly', () => {
             expect(user.checkEmail_Format("test@example.com")).toBe(true);
             expect(user.checkEmail_Format("invalid.com")).toBe(false);
             expect(user.checkEmail_Format("missing@domain")).toBe(false);
         });
     });
 });
