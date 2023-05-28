import dotenv from 'dotenv';
const path = `${__dirname}/../../.env`;
dotenv.config({ path });

const { MONGODB_URI } = process.env;
const { MONGODB_DB } = process.env;
const { MONGODB_USER_COLLECTION } = process.env;

export {
    MONGODB_URI,
    MONGODB_DB,
    MONGODB_USER_COLLECTION
}