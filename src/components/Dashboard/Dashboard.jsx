import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext.jsx'
import { index } from '../../services/userService.js'

const Dashboard = () => {

    const { user } = useContext(UserContext)

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedData = await index()
            // console.log(fetchedData)
            setUsers(fetchedData)
        }
        if (user) fetchUsers()
    }, [])

  return (
    <main>
        <h1>Welcome back, {user.username}</h1>
        <p>This is the dashboard where you can see a list of all users</p>
        <h2>Users:</h2>
        {!users ? (<p>No users in the database</p>) : (<ul>
            {users.map(user => {
                return <li key={user._id}>{user.username} </li>
            })}
        </ul>)}
    </main>
  )
}

export default Dashboard