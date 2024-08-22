import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function insertUser(username: string, password: string, firstName: string, lastName: string) {
const res = await   prisma.user.create({
    data:{
        email:username,
        password,
        firstName,
        lastName
    }
  })
  console.log(res);
}
insertUser("john.doe@example.com", "password123", "John", "Doe");
insertUser("jane.doe@example.com", "securepassword", "Jane", "Doe");
insertUser("sam.smith@example.com", "sam12345", "Sam", "Smith");
insertUser("lisa.brown@example.com", "lisaPass", "Lisa", "Brown");
insertUser("michael.johnson@example.com", "michaelPass", "Michael", "Johnson");