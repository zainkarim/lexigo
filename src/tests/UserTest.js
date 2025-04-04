import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserTest {
    private User user;

    @BeforeEach
    void setUp() {
        user = new User("validUser123", "JohnDoe", "Password1!", "john.doe@example.com", "123-456-7890");
    }

    // Basic Functionality Tests
    @Test
    void testConstructorInitialization() {
        assertEquals("validUser123", user.userID);
        assertEquals("JohnDoe", user.username);
        assertEquals("Password1!", user.password);
        assertEquals("john.doe@example.com", user.email);
        assertEquals("123-456-7890", user.phoneNumber);
        assertFalse(user.isLoggedIn);
        assertTrue(user.favorites.isEmpty());
    }

    @Test
    void testChangeUserName() {
        user.changeUserName("NewUsername");
        assertEquals("NewUsername", user.username);
    }

    @Test
    void testChangePassword() {
        user.changePassword("NewPass1!");
        assertEquals("NewPass1!", user.password);
    }

    @Test
    void testChangeEmail() {
        user.changeEmail("new.email@example.com");
        assertEquals("new.email@example.com", user.email);
    }

    @Test
    void testChangePhoneNumber() {
        user.changePhoneNumber("987-654-3210");
        assertEquals("987-654-3210", user.phoneNumber);
    }

    @Test
    void testAddFavorite() {
        user.addFavorite("item1");
        assertEquals(1, user.favorites.size());
        assertTrue(user.favorites.contains("item1"));
        
        // Test duplicate not added
        user.addFavorite("item1");
        assertEquals(1, user.favorites.size());
    }

    @Test
    void testDeleteFavorite() {
        user.addFavorite("item1");
        user.addFavorite("item2");
        user.deleteFavorite("item1");
        assertEquals(1, user.favorites.size());
        assertFalse(user.favorites.contains("item1"));
        assertTrue(user.favorites.contains("item2"));
        
        // Test deleting non-existent favorite
        user.deleteFavorite("nonexistent");
        assertEquals(1, user.favorites.size());
    }

    // UserID Validation Tests
    @Test
    void testCheckUserID_LengthValid() {
        assertTrue(user.checkUserID_Length("valid123"));
        assertTrue(user.checkUserID_Length("a".repeat(5)));  // min length
        assertTrue(user.checkUserID_Length("a".repeat(20))); // max length
    }

    @Test
    void testCheckUserID_LengthInvalid() {
        assertFalse(user.checkUserID_Length("short"));
        assertFalse(user.checkUserID_Length("a".repeat(4)));  // below min
        assertFalse(user.checkUserID_Length("a".repeat(21))); // above max
    }

    @Test
    void testCheckUserID_ValidCharactersValid() {
        assertTrue(user.checkUserID_ValidCharacters("simple123"));
        assertTrue(user.checkUserID_ValidCharacters("NoSpecialChars"));
    }

    @Test
    void testCheckUserID_ValidCharactersInvalid() {
        assertFalse(user.checkUserID_ValidCharacters("invalid@user"));
        assertFalse(user.checkUserID_ValidCharacters("user#name"));
        assertFalse(user.checkUserID_ValidCharacters("name with space"));
    }

    // Username Validation Tests
    @Test
    void testCheckUsername_LengthValid() {
        assertTrue(user.checkUsername_Length("abc"));      // min length
        assertTrue(user.checkUsername_Length("a".repeat(20))); // max length
        assertTrue(user.checkUsername_Length("validName"));
    }

    @Test
    void testCheckUsername_LengthInvalid() {
        assertFalse(user.checkUsername_Length("ab"));      // below min
        assertFalse(user.checkUsername_Length("a".repeat(21))); // above max
    }

    @Test
    void testCheckUsername_ValidCharactersValid() {
        assertTrue(user.checkUsername_ValidCharacters("valid_name"));
        assertTrue(user.checkUsername_ValidCharacters("valid-name"));
        assertTrue(user.checkUsername_ValidCharacters("valid.name"));
        assertTrue(user.checkUsername_ValidCharacters("ValidName123"));
    }

    @Test
    void testCheckUsername_ValidCharactersInvalid() {
        assertFalse(user.checkUsername_ValidCharacters("invalid@name"));
        assertFalse(user.checkUsername_ValidCharacters("name#123"));
        assertFalse(user.checkUsername_ValidCharacters("name with space"));
    }

    // Password Validation Tests
    @Test
    void testCheckPassword_LengthValid() {
        assertTrue(user.checkPassword_Length("Password1!"));
        assertTrue(user.checkPassword_Length("a".repeat(8))); // min length
        assertTrue(user.checkPassword_Length("a".repeat(50))); // long password
    }

    @Test
    void testCheckPassword_LengthInvalid() {
        assertFalse(user.checkPassword_Length("short"));
        assertFalse(user.checkPassword_Length("a".repeat(7))); // below min
    }

    @Test
    void testCheckPassword_ValidCharactersValid() {
        assertTrue(user.checkPassword_ValidCharacters("Password1!"));
        assertTrue(user.checkPassword_ValidCharacters("PASSWORD!"));
        assertTrue(user.checkPassword_ValidCharacters("Pass@word"));
    }

    @Test
    void testCheckPassword_ValidCharactersInvalid() {
        assertFalse(user.checkPassword_ValidCharacters("password1")); // no uppercase
        assertFalse(user.checkPassword_ValidCharacters("PASSWORD1")); // no special char
        assertFalse(user.checkPassword_ValidCharacters("password!")); // no uppercase
    }

    @Test
    void testIsUpperCaseLetter() {
        assertTrue(user.isUpperCaseLetter('A'));
        assertTrue(user.isUpperCaseLetter('Z'));
        assertFalse(user.isUpperCaseLetter('a'));
        assertFalse(user.isUpperCaseLetter('1'));
        assertFalse(user.isUpperCaseLetter('!'));
    }

    // Email Validation Tests
    @Test
    void testCheckEmail_LengthValid() {
        assertTrue(user.checkEmail_Length("a@b.c"));      // min length
        assertTrue(user.checkEmail_Length("a".repeat(64) + "@" + "b".repeat(250) + ".com")); // near max length
    }

    @Test
    void testCheckEmail_LengthInvalid() {
        assertFalse(user.checkEmail_Length("a@b"));      // too short
        assertFalse(user.checkEmail_Length("a".repeat(65) + "@" + "b".repeat(255) + ".com")); // too long
    }

    @Test
    void testCheckEmail_ValidCharactersValid() {
        assertTrue(user.checkEmail_ValidCharacters("valid.email@example.com"));
        assertTrue(user.checkEmail_ValidCharacters("valid-email@example.com"));
        assertTrue(user.checkEmail_ValidCharacters("valid_email@example.com"));
    }

    @Test
    void testCheckEmail_ValidCharactersInvalid() {
        assertFalse(user.checkEmail_ValidCharacters("invalid email@example.com"));
        assertFalse(user.checkEmail_ValidCharacters("invalid@email@example.com"));
        assertFalse(user.checkEmail_ValidCharacters("invalid#email@example.com"));
    }

    @Test
    void testCheckEmail_FormatValid() {
        assertTrue(user.checkEmail_Format("simple@example.com"));
        assertTrue(user.checkEmail_Format("first.last@sub.domain.com"));
        assertTrue(user.checkEmail_Format("user@domain.co.uk"));
    }

    @Test
    void testCheckEmail_FormatInvalid() {
        assertFalse(user.checkEmail_Format("noatsign.com"));
        assertFalse(user.checkEmail_Format("missing.domain@"));
        assertFalse(user.checkEmail_Format("@missing.prefix.com"));
        assertFalse(user.checkEmail_Format("invalid..dot@example.com"));
        assertFalse(user.checkEmail_Format("domain.missing.dot@com"));
    }

    @Test
    void testGetAtLocation() {
        assertEquals(4, user.getAtLocation("user@domain.com"));
        assertEquals(-1, user.getAtLocation("noatsign.com"));
    }

    @Test
    void testGetPrefix() {
        assertEquals("user", user.getPrefix("user@domain.com"));
        assertEquals("", user.getPrefix("@domain.com"));
    }

    @Test
    void testGetDomain() {
        assertEquals("domain.com", user.getDomain("user@domain.com"));
        assertEquals("domain.com", user.getDomain("@domain.com"));
    }

    // Phone Number Validation Tests
    @Test
    void testCheckPhoneNumber_LengthValid() {
        assertTrue(user.checkPhoneNumber_Length("123-456-7890"));
        assertTrue(user.checkPhoneNumber_Length("987-654-3210"));
    }

    @Test
    void testCheckPhoneNumber_LengthInvalid() {
        assertFalse(user.checkPhoneNumber_Length("1234567890"));    // missing dashes
        assertFalse(user.checkPhoneNumber_Length("123-456-789"));   // too short
        assertFalse(user.checkPhoneNumber_Length("123-456-78901")); // too long
    }

    @Test
    void testCheckPhoneNumber_ValidCharactersAndFormatValid() {
        assertTrue(user.checkPhoneNumber_ValidCharactersAndFormat("123-456-7890"));
        assertTrue(user.checkPhoneNumber_ValidCharactersAndFormat("987-654-3210"));
    }

    @Test
    void testCheckPhoneNumber_ValidCharactersAndFormatInvalid() {
        assertFalse(user.checkPhoneNumber_ValidCharactersAndFormat("1234567890"));    // missing dashes
        assertFalse(user.checkPhoneNumber_ValidCharactersAndFormat("123-45-67890"));   // wrong dash positions
        assertFalse(user.checkPhoneNumber_ValidCharactersAndFormat("123-456-789a"));   // contains letter
        assertFalse(user.checkPhoneNumber_ValidCharactersAndFormat("123-456-789!"));   // contains special char
        assertFalse(user.checkPhoneNumber_ValidCharactersAndFormat("123 456 7890"));   // contains spaces
    }
}