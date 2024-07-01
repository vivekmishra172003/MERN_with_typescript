// Import necessary modules from React and the user service functions
import React, { useEffect, useState } from 'react';
import { getUsers, createUser } from '../services/userService';

// Define an interface for the User object
interface IUser {
  name: string;
  email: string;
}

// Define a functional component named UserList
const UserList: React.FC = () => {
  // Define state for the list of users, initialized as an empty array
  const [users, setUsers] = useState<IUser[]>([]);
  // Define state for the input field for name, initialized as an empty string
  const [name, setName] = useState('');
  // Define state for the input field for email, initialized as an empty string
  const [email, setEmail] = useState('');

  // useEffect hook to fetch users when the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch users
    const fetchUsers = async () => {
      // Call the getUsers function to get the list of users
      const users = await getUsers();
      // Update the users state with the fetched users
      setUsers(users);
    };
    // Call the fetchUsers function
    fetchUsers();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Define a function to handle adding a new user
  const handleAddUser = async () => {
    // Call the createUser function with the input name and email to create a new user
    const newUser = await createUser({ name, email });
    // Update the users state to include the newly created user
    setUsers([...users, newUser]);
  };

  // Return the JSX to render the component
  return (
    <div>
      {/* Display a heading */}
      <h1>User List</h1>
      {/* Display the list of users */}
      <ul>
        {users.map((user, index) => (
          // Render each user as a list item with name and email
          <li key={index}>{user.name} - {user.email}</li>
        ))}
      </ul>
      {/* Form to add a new user */}
      <div>
        {/* Input field for the name */}
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        {/* Input field for the email */}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        {/* Button to add a new user */}
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
};

// Export the UserList component as the default export
export default UserList;
