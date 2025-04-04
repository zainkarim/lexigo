const User = require('./User'); 
 
 describe('User Authentication System', () => {
     let user;
     const validUser = {
         userID: "validUser123",
         username: "test@example.com",
         password: "Password1!",
         email: "test@example.com",
         phoneNumber: "123-456-7890"
     };
 
     beforeAll(() => {
         // Mock user database
         User.userDB = {
             "validUser123": new User(
                 "validUser123",
                 "test@example.com",
                 "Password1!",
                 "test@example.com",
                 "123-456-7890"
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
         test('TC1: Valid username and password should login successfully', () => {
             const result = User.login("validUser123", "Password1!");
             expect(result).toBe("Login successful");
             expect(User.currentSession).toBeTruthy();
         });
 
         test('TC2: Invalid username format should return error', () => {
             const result = User.login("invalid@user", "Password1!");
             expect(result).toBe("Invalid username format");
         });
 
         test('TC3: Empty password should return error', () => {
             const result = User.login("validUser123", "");
             expect(result).toBe("Password cannot be empty");
         });
 
         test('TC4: Valid username but wrong password should return error', () => {
             const result = User.login("validUser123", "WrongPass1!");
             expect(result).toBe("Invalid credentials");
         });
 
         test('TC5: Empty username should return error', () => {
             const result = User.login("", "Password1!");
             expect(result).toBe("User not found");
         });
     });
 
     describe('Logout Functionality', () => {
         beforeAll(() => {
             User.login("validUser123", "Password1!"); // valid session
         });
 
         test('TC6: Valid session token should logout successfully', () => {
             const result = User.logout("session.12345");
             expect(result).toBe("Logout successful");
         });
 
         test('TC7: Invalid session token should return error', () => {
             const result = User.logout("invalid-token");
             expect(result).toBe("Invalid session token");
         });
 
         test('TC8: Expired session token should return error', () => {
             const result = User.logout("expired-token.12345");
             expect(result).toBe("Expired session token");
         });
     });
 
     describe('Registration Functionality', () => {
         test('TC9: Valid registration should succeed', () => {
             const result = User.register(
                 "newuser123",
                 "new@example.com",
                 "NewPass1!",
                 "new@example.com",
                 "987-654-3210"
             );
             expect(result).toBe("Registration successful");
             expect(User.userDB["newuser123"]).toBeInstanceOf(User);
         });
 
         test('TC10: Invalid email format should return error', () => {
             const result = User.register(
                 "newuser456",
                 "invalid-email",
                 "NewPass1!",
                 "invalid-email",
                 "987-654-3210"
             );
             expect(result).toBe("Invalid email format");
         });
 
         test('TC11: Invalid phone format should return error', () => {
             const result = User.register(
                 "newuser789",
                 "valid@example.com",
                 "NewPass1!",
                 "valid@example.com",
                 "1234567890"
             );
             expect(result).toBe("Invalid phone format");
         });
 
         test('TC12: Weak password should return error', () => {
             const result = User.register(
                 "weakuser",
                 "weak@example.com",
                 "weakpass",
                 "weak@example.com",
                 "987-654-3210"
             );
             expect(result).toBe("Password requirements not met");
         });
 
         test('TC13: Empty email should return error', () => {
             const result = User.register(
                 "emptyemail",
                 "",
                 "NewPass1!",
                 "",
                 "987-654-3210"
             );
             expect(result).toBe("Email cannot be empty");
         });
     });
 
     describe('User Validation Methods', () => {
         test('should validate userID length correctly', () => {
             expect(user.checkUserID_Length("valid123")).toBe(true);
             expect(user.checkUserID_Length("short")).toBe(false);
             expect(user.checkUserID_Length("a".repeat(21))).toBe(false);
         });
 
         test('should validate userID characters correctly', () => {
             expect(user.checkUserID_ValidCharacters("valid_user-123")).toBe(true);
             expect(user.checkUserID_ValidCharacters("invalid@user")).toBe(false);
         });
 
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
 
         test('should validate phone format correctly', () => {
             expect(user.checkPhoneNumber_ValidCharactersAndFormat("123-456-7890")).toBe(true);
             expect(user.checkPhoneNumber_ValidCharactersAndFormat("1234567890")).toBe(false);
             expect(user.checkPhoneNumber_ValidCharactersAndFormat("123-45-67890")).toBe(false);
         });
     });
 });
