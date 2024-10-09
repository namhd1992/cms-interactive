//const dotenv = await import('dotenv');
//dotenv.config();

require('dotenv').config();

const port = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);