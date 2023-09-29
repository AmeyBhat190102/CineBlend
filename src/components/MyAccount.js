import React from 'react'
import { useSelector} from 'react-redux/es/hooks/useSelector'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const MyAccount = () => {

  const {email,phoneNumber,gender,firstName,lastName,username,password,birthday,member} = useSelector(state => state.customReducer)

  const [isChangeUsername,setIsChangeUsername] = useState(false)
  const [isChangePassword,setIsChangePassword] = useState(false)

  const [newPassword,setNewPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")

  const [newUsername,setNewusername] = useState("")
  const [confirmUsername,setConfirmUsername] = useState("")

  const [changeMembership,setChangeMembership] = useState(false)
  const [membership,setMembership] = useState(member)

  const dispatch = useDispatch()

  const checkNewPassword = async () => {
    if(newPassword===confirmPassword){
      try{
        const url = `https://cine-blend-backend.vercel.app/api/updatePassword` 
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password , newPassword })
          });
        if (response.ok) {
          alert('Password updated successfully');
          dispatch({
            type:"setPassword",
            payload:newPassword
          })
        } else {
          alert('Error updating password:', response.statusText);
        }
      } catch (error) {
        alert('Error updating password:', error.message);
      }
    }else{
      alert("Passwords Dont Match")
    }
  }

  const checkNewUsername = async () => {
    if(newUsername===confirmUsername){
      try{
      const url = `https://cine-blend-backend.vercel.app/api/updateUsername` 
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, username , newUsername })
          });
        if (response.ok) {
          alert('Username updated successfully');
          dispatch({
            type:"setUsername",
            payload:newUsername
          })
        } else {
          alert('Error updating username:', response.statusText);
        }
      } catch (error) {
        alert('Error updating username:', error.message);
      }
    }else{
      alert("Usernames Dont Match")
    }
  }

  const checkNewMembership = async  () => {
    if(membership==="None"){
      alert("Choose A Membership")
    }else if(membership===member){
      alert("You Chose Current MemberShip")
    }else{
      try{
        const url = `https://cine-blend-backend.vercel.app/api/updateMembership` 
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username , membership })
            });
          if (response.ok) {
            alert('Membership updated successfully');
            dispatch({
              type:"setMember",
              payload:membership
            })
          } else {
            alert('Error updating Membership:', response.statusText);
          }
        } catch (error) {
          alert('Error updating Membership:', error.message);
        }
    }
    
  }


  return (
    <div className="bg-black text-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap w-full h-full">
    <div className="w-full sm:w-1/2 flex items-stretch p-4 sm:p-0">
      <div className="w-full h-full">
        <h1 className="text-2xl sm:text-4xl font-semibold">Account Information</h1>
        <div className="m-4">
          <div className="flex flex-wrap">
            <p className="text-gray-300 text-base sm:text-lg p-2 sm:p-5"><strong>First Name:</strong>{firstName}</p>
            <p className="text-gray-300 text-base sm:text-lg p-2 sm:p-5"><strong>Last Name:</strong> {lastName}</p>
            <p className="text-gray-300 text-base sm:text-lg p-2 sm:p-5"><strong>Phone Number</strong> {phoneNumber}</p>
          </div>
          <div className="flex flex-wrap">
            <p className="text-gray-300 text-base sm:text-lg p-2 sm:p-5"><strong>Gender:</strong> {gender}</p>
            <p className="text-gray-300 text-base sm:text-lg p-2 sm:p-5"><strong>Birthday:</strong> {birthday}</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-300 text-base sm:text-lg p-2 sm:p-5"><strong>Email ID:</strong> {email}</p>
            <div className='flex items-center'>
              <p className="text-gray-300 text-base sm:text-lg p-2 sm:p-5"><strong>Password:</strong> {password} </p>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold p-1 sm:p-2 rounded-full text-base sm:text-lg"
              onClick={()=>{setIsChangePassword(!isChangePassword)}}>
                Change Password
              </button>
            </div>
            {
               ! isChangePassword ?
                 <></>:
                <>
                  <div className='flex'>
                  <input type='text' placeholder='Enter New Password' onChange={(e)=>{setNewPassword(e.target.value)}} className='m-2 text-black w-1/2 px-4 py-2 bg-gray-100 rounded border focus:outline-none focus:border-red-600'></input>
                  <input type='text' placeholder='Confirm New Password' onChange={(e)=>{setConfirmPassword(e.target.value)}} className='m-2 text-black w-1/2 px-4 py-2 bg-gray-100 rounded border focus:outline-none focus:border-red-600'></input>
                  </div>
                  <button onClick={()=>{checkNewPassword()}} className='bg-red-500 hover:bg-red-700 text-white font-bold p-1 sm:p-2 rounded-full text-base sm:text-lg w-full'>Set Password</button>
                </>
              }
            <div className='flex items-center'>
              <p className="text-gray-300 text-base sm:text-lg p-2 sm:p-5"><strong>Username:</strong> {username}</p>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold p-1 sm:p-2 rounded-full text-base sm:text-lg"
                onClick={()=>{setIsChangeUsername(!isChangeUsername)}}>
                  Change Username
                </button>
            </div>
              {
               ! isChangeUsername ?
                 <></>:
                <>
                  <div className='flex'>
                    <input type='text' placeholder='Enter New Username' onChange={(e)=>{setNewusername(e.target.value)}} className=' m-2 text-black w-1/2 px-4 py-2 bg-gray-100 rounded border focus:outline-none focus:border-red-600'></input>
                    <input type='text' placeholder='Confirm New Username' onChange={(e)=>{setConfirmUsername(e.target.value)}} className=' m-2 text-black w-1/2 px-4 py-2 bg-gray-100 rounded border focus:outline-none focus:border-red-600'></input>
                  </div>
                  <button onClick={()=>{checkNewUsername()}} className='bg-red-500 hover:bg-red-700 text-white font-bold p-2 sm:p-3 rounded-full text-base sm:text-lg w-full'>Set Username</button>
                </>
              }
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold">Membership Details</h2>
          <div className="space-y-2 flex-col sm:flex-row sm:justify-between">
            <div className='flex gap-2 sm:gap-7'>
              <p className="text-gray-300 text-base sm:text-lg p-2 sm:p-5"><strong>Membership Type:</strong> {member}</p>
              <p className="text-gray-300 text-base sm:text-lg p-2 sm:p-5"><strong>Membership ID:</strong> 12345</p>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold p-1 sm:p-2 rounded-full text-base sm:text-lg" onClick={()=>{setChangeMembership(!changeMembership)}}>
              Change Membership
            </button>
            </div>
          </div>
          { !changeMembership ? <></> : 
          <>
            <label className="text-gray-300 text-base sm:text-lg p-2 sm:p-5">Membership Tier</label>
            <div className="w-full md:w-1/2 px-2 mb-4 flex">
              <select className=" m-2 px-4 py-2 bg-gray-100 rounded border focus:outline-none focus:border-red-600 text-black" onChange={(e)=>{setMembership(e.target.value)}}>
                <option value="Premium">Premium</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
              </select>
              <button onClick={()=>{checkNewMembership()}} className='m-2 bg-red-500 hover:bg-red-700 text-white font-bold p-2 sm:p-3 rounded-full text-base sm:text-lg'>Set Membership</button>
            </div>
          </>
          }
          <br/><br/><br/><br/>

        </div>

      </div>
    </div>
    <div className="w-full sm:w-1/2 flex items-stretch h-screen">
      <img
        src="https://images.ctfassets.net/4cd45et68cgf/7ciNwxNKBqygzOsGzp1jSI/1d13387defe2332403543d610a10b1cc/-_____________________--__________________-____________________________________2022_________________________________________.jpg?w=2000"
        alt="Membership"
        className="w-full h-full"
      />
    </div>
  </div>
</div>

  )
}

export default MyAccount