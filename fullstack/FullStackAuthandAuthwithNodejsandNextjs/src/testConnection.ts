// src/testConnection.ts
import prisma from './prismaClient';  // Ensure this imports your Prisma Client instance

async function testConnection() {
  try {
    // Attempt to fetch a simple data item or perform a query
    const users = await prisma.user.findMany();
    console.log('Connection successful. Users:', users);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await prisma.$disconnect(); // Ensure to disconnect after the test
  }
}

testConnection();
