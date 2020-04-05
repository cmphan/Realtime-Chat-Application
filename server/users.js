const users = [];
const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()
    // check is new user tries to sign up for the same name and room 
    const existingUser = users.find((user) => user.room === room && user.name === name);
    if (existingUser) {
        return { error: 'Username is taken'};
    }
    // Create a new user 
    const user = {id, name, room};
    users.push(user);
    return {user};
}
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    //remove user from users array
    if (index !== -1) {
        return users.splice(index,1)[0];
    }

}
// Check if user exists
const getUser = (id) => users.find((user) => user.id === id);

const getUserInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {addUser, removeUser, getUser, getUserInRoom}