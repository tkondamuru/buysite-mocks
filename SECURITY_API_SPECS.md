# Security API Specifications

## Overview

This document provides detailed specifications for the Security API endpoints in the buysite-mocks service. These endpoints handle user security questions, profile management, and credential updates.

## Base URL

```
https://your-worker-url.workers.dev
```

## Authentication

All endpoints support CORS and return JSON responses with appropriate HTTP status codes.

## Endpoints

### 1. Get All Security Questions

**Endpoint:** `GET /api/security/all_questions`

**Description:** Retrieves a complete list of available security questions for user registration or profile setup.

**Request:**
- Method: `GET`
- Headers: None required
- Body: None

**Response:**
- Status: `200 OK`
- Content-Type: `application/json`

**Response Body:**
```json
[
  { "id": 1, "question": "In what city were you born?" },
  { "id": 2, "question": "What high school did you attend?" },
  { "id": 3, "question": "What is the name of your first school?" },
  { "id": 4, "question": "Which phone number do you remember?" },
  { "id": 5, "question": "What is your favorite movie?" },
  { "id": 6, "question": "Who is your favorite actor, musician, or artist?" },
  { "id": 7, "question": "What is your favorite color?" },
  { "id": 8, "question": "What is your favorite place to visit?" },
  { "id": 9, "question": "What is your father's middle name?" },
  { "id": 10, "question": "What street did you grow up on?" },
  { "id": 11, "question": "What was the make of your first car?" },
  { "id": 12, "question": "What is the name of your first grade teacher?" },
  { "id": 13, "question": "What was your high school mascot?" },
  { "id": 14, "question": "What is the name of your favorite pet?" }
]
```

**Client Implementation Notes:**
- Use this endpoint to populate security question dropdowns in registration forms
- Store question IDs for form submission
- Questions are static and can be cached client-side

---

### 2. Get User Security Profile

**Endpoint:** `GET /api/security/{username}/profile`

**Description:** Retrieves a user's security profile including email and configured security questions with answers.

**Request:**
- Method: `GET`
- Headers: None required
- Path Parameters:
  - `username` (string): The username to retrieve profile for

**Response:**
- Status: `200 OK`
- Content-Type: `application/json`

**Response Body:**
```json
{
  "email": "tkondamuru@pgwautoglass.com",
  "questions": [
    { "id": 1, "question": "In what city were you born?", "answer": "TEST" },
    { "id": 2, "question": "What high school did you attend?", "answer": "TEST" },
    { "id": 3, "question": "What is the name of your first school?", "answer": "TEST" },
    { "id": 4, "question": "Which phone number do you remember?", "answer": "TEST" },
    { "id": 5, "question": "What is your favorite movie?", "answer": "TEST" }
  ]
}
```

**Client Implementation Notes:**
- Use for displaying user's current security settings
- Answers are masked in production (currently showing "TEST")
- Always returns exactly 5 questions
- Email can be used for account recovery flows

---

### 3. Update User Email

**Endpoint:** `PUT /api/security/{username}/email`

**Description:** Updates the email address for a specific user.

**Request:**
- Method: `PUT`
- Headers: `Content-Type: application/json`
- Path Parameters:
  - `username` (string): The username to update email for
- Body:
```json
{
  "email": "newemail@example.com"
}
```

**Response (Success):**
- Status: `200 OK`
- Content-Type: `application/json`

**Response Body:**
```json
{
  "success": true,
  "message": "Email updated successfully for user username",
  "email": "newemail@example.com"
}
```

**Response (Error):**
- Status: `400 Bad Request`
- Content-Type: `application/json`

**Response Body:**
```json
{
  "error": "Email is required"
}
```

**Client Implementation Notes:**
- Validate email format client-side before submission
- Show success/error messages to user
- Consider email verification flow in production
- Update local user state after successful response

---

### 4. Update User Password

**Endpoint:** `PUT /api/security/{username}/password`

**Description:** Updates the password for a specific user.

**Request:**
- Method: `PUT`
- Headers: `Content-Type: application/json`
- Path Parameters:
  - `username` (string): The username to update password for
- Body:
```json
{
  "password": "newpassword123"
}
```

**Response (Success):**
- Status: `200 OK`
- Content-Type: `application/json`

**Response Body:**
```json
{
  "success": true,
  "message": "Password updated successfully for user username"
}
```

**Response (Error):**
- Status: `400 Bad Request`
- Content-Type: `application/json`

**Response Body:**
```json
{
  "error": "Password is required"
}
```

**Client Implementation Notes:**
- Implement strong password validation client-side
- Consider password strength indicators
- Show confirmation dialog before submission
- Clear password fields after successful update
- Log user out after password change in production

---

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "Invalid JSON body"
}
```

**CORS Headers:**
All responses include:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## Client App Development Guidelines

### 1. User Registration Flow

1. **Fetch Security Questions:**
   - Call `GET /api/security/all_questions`
   - Populate dropdown with questions
   - Allow user to select 5 questions

2. **Collect User Data:**
   - Username, email, password
   - Selected security questions with answers
   - Validate all fields client-side

3. **Submit Registration:**
   - Use existing login endpoint for authentication
   - Store security questions locally or in separate endpoint

### 2. Profile Management Flow

1. **Load User Profile:**
   - Call `GET /api/security/{username}/profile`
   - Display current email and security questions
   - Show masked answers (asterisks or dots)

2. **Edit Profile:**
   - Allow email updates via `PUT /api/security/{username}/email`
   - Allow password updates via `PUT /api/security/{username}/password`
   - Show confirmation dialogs for sensitive changes

### 3. Security Question Management

1. **Question Selection:**
   - Use question IDs from `/api/security/all_questions`
   - Prevent duplicate question selection
   - Validate answer length and format

2. **Answer Storage:**
   - Hash answers client-side before transmission
   - Implement answer strength requirements
   - Allow answer updates through profile endpoint

### 4. Form Validation

**Email Validation:**
- Check for valid email format
- Verify email uniqueness (if applicable)
- Show real-time validation feedback

**Password Validation:**
- Minimum 8 characters
- Include uppercase, lowercase, numbers, symbols
- Show password strength indicator
- Confirm password field

**Security Questions:**
- Require answers for all selected questions
- Minimum answer length (3 characters)
- Prevent common answers (test, 123, etc.)

### 5. UI/UX Considerations

**Loading States:**
- Show loading spinners during API calls
- Disable forms during submission
- Provide clear feedback for all actions

**Error Handling:**
- Display user-friendly error messages
- Highlight invalid form fields
- Provide retry options for failed requests

**Success Feedback:**
- Show success messages after updates
- Update UI immediately after successful changes
- Provide undo options where appropriate

### 6. Security Best Practices

**Client-Side:**
- Never store passwords in plain text
- Use HTTPS for all API calls
- Implement session timeout
- Clear sensitive data on logout

**Validation:**
- Validate all inputs client-side
- Sanitize data before submission
- Implement rate limiting for API calls
- Show appropriate error messages

---

## Testing Scenarios

### 1. Happy Path Testing
- Register new user with all required fields
- Update email successfully
- Update password successfully
- View profile with security questions

### 2. Error Path Testing
- Submit invalid email format
- Submit weak password
- Submit empty required fields
- Test with non-existent username

### 3. Edge Cases
- Very long email addresses
- Special characters in passwords
- Unicode characters in security answers
- Network timeout scenarios

---

## Integration with Existing Endpoints

The security API works alongside existing endpoints:

- **Login:** `POST /api/login` - Use for authentication
- **Shops:** `GET /api/{username}/shops` - Use username from security profile

### Authentication Flow
1. User logs in via `/api/login`
2. Store JWT token for subsequent requests
3. Use username from login for security endpoints
4. Include token in headers for protected endpoints

---

## Production Considerations

### Security Enhancements
- Implement proper JWT validation
- Add rate limiting
- Use HTTPS only
- Implement proper password hashing
- Add audit logging

### Performance
- Cache security questions client-side
- Implement request debouncing
- Use optimistic UI updates
- Add offline support where possible

### Monitoring
- Track API usage metrics
- Monitor error rates
- Log security events
- Set up alerts for suspicious activity

---

## API Versioning

Current version: `v1`

Future considerations:
- Add version prefix to URLs
- Implement backward compatibility
- Plan for breaking changes
- Document migration guides

---

## Support and Documentation

For questions or issues:
- Check the main README.md for general API documentation
- Review error responses for troubleshooting
- Test with provided mock data
- Contact development team for clarifications 