# Lexigo

Lexigo is a mobile dictionary app with a gamified learning experience. The app allows users to look up words, save favorites, use flashcards, take quizzes, and track their vocabulary growth.

## Installation and Setup

rm -rf node_modules package-lock.json

npm install --legacy-peer-deps

# If you still encounter the 'ajv' error after installation, install these specific packages:
if you got the ajv error like me, run this: npm install ajv@8.12.0 ajv-keywords@5.1.0 --legacy-peer-deps


npm start


## Login Credentials:

- Username: `test`
- Password: `test`

## Features

- Dictionary lookup
- Word of the Day
- Favorites collection
- Flashcards for practice
- Quizzes to test knowledge
- User profile with progress tracking

## Troubleshooting

If you encounter dependency issues:

1. **"Cannot find module 'ajv/dist/compile/codegen'" error**:

   npm install ajv@8.12.0 ajv-keywords@5.1.0 --legacy-peer-deps


2. **TypeScript version conflicts**: React-scripts 5 works best with TypeScript 4.9.5

   npm install typescript@4.9.5 --legacy-peer-deps


3. **"digital envelope routines::unsupported" error**: This is a Node.js 17+ issue

   # For Mac/Linux
   export NODE_OPTIONS=--openssl-legacy-provider
   
   # For Windows
   set NODE_OPTIONS=--openssl-legacy-provider


4. **Clearing npm cache**: Sometimes a fresh cache helps resolve issues

   npm cache clean --force
