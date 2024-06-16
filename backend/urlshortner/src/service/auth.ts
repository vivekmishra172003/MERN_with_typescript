// Defining User interface
interface User {
    name: string;
    email: string;
    password: string;
}

// Creating a map to store session IDs and corresponding users
const sessionIdToUserMap: Map<string, User> = new Map();

// Function to set a user in the session map
function setUser(id: string, user: User) {
    sessionIdToUserMap.set(id, user);
}

// Function to get a user from the session map
function getUser(id: string): User | undefined {
    return sessionIdToUserMap.get(id);
}

// Exporting the functions
export { setUser, getUser };
