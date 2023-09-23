import {useState, useEffect} from 'react';
import './Users.css';

// Set one source of truth with the API url.

const API_URL = 'https://650cc34347af3fd22f67f87e.mockapi.io/test/users'

// Set up the GetUserData component with all of the functions states. getUsers, deleteUsers, postNewUser, and updatedUser all deal with the api calls.

function GetUserData() { 
    
    const [users, setUsers] = useState([{}]);

    const [newUserName, setNewUserName] = useState('')
    const [newUserTitle, setNewUserTitle] = useState('')
    const [newUserType, setNewUserType] = useState('')

    const [updatedName, setUpdatedName] = useState('')
    const [updatedTitle, setUpdatedTitle] = useState('')
    const [updatedType, setUpdatedType] = useState('')
   
    // The api data is converted to json, this is true for all of the api fetches.

    const getUsers = () => { 
       fetch(API_URL)
       .then(data => data.json())
       .then(data => setUsers(data))
    }

    // useEffect handles side of effects.

    useEffect(() => { 
        getUsers()
        console.log(users)
    }, [])
    
    // deleteUser takes one parameter id and we use the 'DELETE' method and then return users.

    const deleteUser = (id) => { 
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        }).then(() => getUsers())
        .catch(error => console.error('Error deleting user:', error))
    
    }
    
    // postNewUser takes an event and we declare a new variable data, which contains the json structure.

    const postNewUser = (e) => { 
        e.preventDefault()


        let data = { 
            name: newUserName, 
            title: newUserTitle,
            type: newUserType
        }

        fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(() => getUsers())
    }

    // updatedUser takes an event and the userObject to update a new user.

    const updatedUser = (e, userObject) => { 
        e.preventDefault();

        let updatedUserObject = {
            ...userObject, 
            name: updatedName,
            title: updatedTitle,
            type: updatedType
        }

        fetch(`${API_URL}/${userObject.id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedUserObject),
            headers: {'Content-Type': 'application/json'}
        }).then(() => getUsers())
    }

    // The JSX below deals with the way the data is laid out on the page as well as the inputs and button clicks.
    // Here is where we complete the state of the data and freturn input values.
    
    return (
        <div className='display-users'>

            <form className='post-user'>
                <h3>Post a new, questionable user.</h3>
                <label><strong>Name</strong></label>
                <input onChange={(e) => setNewUserName(e.target.value)}></input><br/><br/>
                <label><strong>Job Title</strong></label>
                <input onChange={(e) => setNewUserTitle(e.target.value)}></input><br/><br/>
                <label><strong>Temperment</strong></label>
                <input onChange={(e) => setNewUserType(e.target.value)}></input><br/><br/>
                <button id='submit-button'onClick={(e) => postNewUser(e)}>Submit</button><br/><br />
            </form>

            {users.map((user, index) => (
                <div className='userContainer' key={index}>
                    <div id='user-display'>
                    <h3>User</h3>
                    Name: {user.name}<br />
                    Title: {user.title}<br />
                    Temperment: {user.type}<br /><br />
                    <button id='delete-button' onClick={() => deleteUser(user.id)}>Delete</button>
                </div>
                <form id='update-form'>
                    <h3>Update This User</h3>
                    <label>Update Name</label>
                    <input onChange={(e) => setUpdatedName(e.target.value)}></input><br/>

                    <label>Update Job title</label>
                    <input onChange={(e) => setUpdatedTitle(e.target.value)}></input><br/>

                    <label>Update Temperment</label>
                    <input onChange={(e) => setUpdatedType(e.target.value)}></input><br/>
                    <button id='update-button' onClick={(e) => updatedUser(e, user)}>Update</button>
                </form>
                </div>
            ))}

                
        </div>
    )

}

export default GetUserData;

