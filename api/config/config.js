//require('dotenv').config();
import * as dotenv from 'dotenv';
import process from 'process';

dotenv.config();

export const config =  {
  PORT: process.env.PORT || 5000,
  DB: process.env.DB
};
