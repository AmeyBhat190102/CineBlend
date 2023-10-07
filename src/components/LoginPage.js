import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
  const dispatch = useDispatch()

  const allDispatch = (users) => {
    dispatch({
      type: "setLoggedInLoggedOut"
    }) 
    dispatch({
      type:"setEmail" , payload : users.email
    })
    dispatch({
      type:"setPhoneNumber" , payload : users.mobile
    })
    dispatch({
      type:"setFirstName" , payload : users.firstName
    })
    dispatch({
      type:"setLastName" , payload : users.lastName
    })
    dispatch({
      type:"setUsername" , payload : users.username
    })
    dispatch({
      type:"setPassword" , payload : users.password
    })
    dispatch({
      type:"setBirthday" , payload : users.birthday
    })
    dispatch({
      type:"setGender" , payload : users.gender
    })
    dispatch({
      type:"setMember" , payload : users.member
    }) 
    navigate("/home")
  }

  function makeGlobal() {
      if(loginMethod === "emailPassword"){
        const emailUser = userData.find((u)=> (u.email===email && u.password===password))
        allDispatch(emailUser)
      }else{
        const mobileUser = userData.find((u)=>u.mobile===mobile)
        allDispatch(mobileUser)
    }
  }

  const [loginMethod, setLoginMethod] = useState('emailPassword');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobileNumber] = useState('');
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("")
  const [isNewUser, setIsNewUser] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userData, setUsersData] = useState([])
  const [gender, setGender] = useState("Other")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const navigate = useNavigate()

  const getUsers = async () => {
    await fetch("https://cine-blend-backend-deployment.vercel.app//api/getAllUsers", { method: "GET" })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Error retrieving data');
        }
      }).then(data => {
        setUsersData(data)
      }).catch(error => {
        console.error('Error retrieving data:', error);
      })
  }

  useEffect(() => {
    getUsers();
  }, [])


  const handleLogin = () => {
    let flag = true
    if (loginMethod === "emailPassword") {
      userData.map((users) => {
        if (users.email === email && users.password === password) {
          flag = false
        }
      })
      if (flag) {
        alert("Not Logged In")
      } else {
        makeGlobal()
      }
    } else {

    }
  };

  const handleNewUser = async () => {

    const selectedDate = new Date(birthday);

    const day = String(selectedDate.getDate()).padStart(2, '0');
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Note: Months are zero-based
    const year = selectedDate.getFullYear();

    const formattedDate = day + "/" + month + "/" +  year;

    const dataSent = { firstName: firstName, lastName: lastName, email: email, password: password , birthday:formattedDate , mobile:mobile ,
                        username:username , gender:gender} 
    if (password === confirmPassword) {
      try {
        const response = await fetch('https://cine-blend-backend-deployment.vercel.app//api/addNewUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataSent),
        });

        if (response.ok) {
          navigate("/")
        } else {
          alert('Error adding User');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert("Passwords Are Not Matching!!")
    }
  }

  const toggleNewUser = () => {
    setIsNewUser(!isNewUser);
  };

  const isUserPresent = (userData) => {
      const user = userData.find((u) => u.mobile === mobile)
      if(typeof(user)==="undefined"){
        return false
      }
      return true
  }
  const sendOTP = async () => {

    if (isUserPresent(userData)){
      const number = "+91".concat(mobile)
      await fetch('https://cine-blend-backend-deployment.vercel.app//api/sendOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number }),
      })
        .then((response) => response.json())
        .then((data) => {
          setOtpSent(true);
        })
        .catch((error) => {
          alert('Failed to send OTP');
        });
    }else{
      alert("User Not Registered")
    }
  }

  const verifyOTP = async () => {
    const number = "+91".concat(mobile)
    await fetch('https://cine-blend-backend-deployment.vercel.app//api/verifyOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number: number, otp: otp }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.message==="success"){
        makeGlobal() 
      }else{
        alert(`Invalid OTP`)
        setOtp("")
        navigate("/")
      }
      })
      .catch((error) => {
        alert('OTP verification failed' + error);
      });
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 flex-shrink-0 bg-cover bg-center animate-fade-in" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1540224871915-bc8ffb782bdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60")', minHeight: '300px' }}></div>

      <div className="w-full md:w-1/2 md:h-full flex flex-col justify-center items-center min-h-screen" style={{ backgroundImage: 'url("https://www.filmibeat.com/img/2021/12/netflix11-1639468647.jpg")', minHeight: '100vh' }}>
        <div className="w-4/5 p-8 rounded-lg animate-fade-in">
          <p className="text-white mb-2 text-4xl font-bold text-center">
            <span className="font-semibold text-neutral-50 animate-pulse text-5xl">Unlimited</span> movies, TV shows, and more.
          </p>
          <br />
          <h1 className="text-3xl font-semibold mb-6 text-white text-center">
            {isNewUser ? 'Sign Up' : 'Sign In'}
          </h1>
          <div className="m-4">
            {isNewUser ? (
              <form className="max-w-lg mx-auto">
                <div className="m-4">
                  <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <input type="text" className="w-full px-4 py-2 bg-gray-100 rounded border focus:outline-none focus:border-red-600" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <input type="text" className="w-full px-4 py-2 bg-gray-100 rounded border focus:outline-none focus:border-red-600" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <input type="text" className="w-full px-4 py-2 bg-gray-100 rounded border focus:outline-none focus:border-red-600" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <input type="email" className="w-full px-4 py-2 bg-gray-100 rounded border focus:outline-none focus:border-red-600" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <input type="password" className="w-full px-4 py-2 bg-gray-100 rounded border focus:outline-none focus:border-red-600" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <input type="password" className="w-full px-4 py-2 bg-gray-100 rounded border focus:outline-none focus:border-red-600" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Birthday</label>
                      <input type="date" className="w-full px-4 py-2 bg-gray-100 rounded border focus:outline-none focus:border-red-600" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                    </div>
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                      <select className="w-full px-4 py-2 bg-gray-100 rounded border focus:outline-none focus:border-red-600" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="other">Other</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="w-full px-2 mb-4">
                      <input type="tel" className="w-full px-4 py-2 bg-gray-100 rounded border focus:outline-none focus:border-red-600" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobileNumber(e.target.value)} />
                    </div>
                  </div>

                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M19.293 5.293a1 1 0 00-1.414-1.414l-7 7a1 1 0 00-.002 1.417l7 7a1 1 0 001.415-1.415L12.414 12l6.879-6.879a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                      <button className="w-full py-3 bg-red-600 text-white rounded hover:bg-red-700" onClick={handleNewUser}>Sign Up</button>
              </form>
            ) : (
              <>
                <div className="flex justify-between mb-4 h-full">
                  <button
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      loginMethod === 'emailPassword' ? 'text-white' : 'text-orange-50 hover:text-red-600'
                    }`}
                    onClick={() => setLoginMethod('emailPassword')}
                  >
                    Login with Password
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      loginMethod === 'mobileOTP' ? 'text-white' : 'text-orange-50 hover:text-red-600'
                    }`}
                    onClick={() => setLoginMethod('mobileOTP')}
                  >
                    Login with Mobile OTP
                  </button>
                </div>
                {loginMethod === 'emailPassword' && (
                  <>
                    <input type="email" className="w-full px-4 py-2 mb-4 bg-gray-100 rounded border focus:outline-none focus:border-red-600" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" className="w-full px-4 py-2 mb-6 bg-gray-100 rounded border focus:outline-none focus:border-red-600" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {!isNewUser ? <button className="w-full py-3 bg-red-600 text-white rounded hover:bg-red-700" onClick={handleLogin}>Sign In</button> :
                      <button className="w-full py-3 bg-red-600 text-white rounded hover:bg-red-700" onClick={handleNewUser}>Sign Up</button>}
                  </>
                )}
                {loginMethod === 'mobileOTP' && (
                  <>
                    {otpSent ?
                      <>
                        <input type="number" className="w-full px-4 py-2 mb-4 bg-gray-100 rounded border focus:outline-none focus:border-red-600" placeholder="Enter OTP Sent" value={otp} onChange={(e) => setOtp(e.target.value)} />
                        <button className="w-full py-3 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => { verifyOTP() }}>Veify OTP</button>
                      </> :
                      <>
                        <input type="tel" className="w-full px-4 py-2 mb-4 bg-gray-100 rounded border focus:outline-none focus:border-red-600" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobileNumber(e.target.value)} />
                        <button className="w-full py-3 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => { sendOTP() }}>Send OTP</button>
                      </>
                    }

                  </>
                )}
              </>
            )}
          </div>

          <p className="mt-4 text-sm text-white text-center">
            {isNewUser ? 'Already have an account?' : "New to Netflix?"}{' '}
            <span className="text-white cursor-pointer" onClick={toggleNewUser}>
              {isNewUser ? 'Sign in now.' : 'Sign up now.'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
