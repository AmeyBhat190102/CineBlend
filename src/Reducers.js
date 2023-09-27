import { createReducer } from "@reduxjs/toolkit";

const initialState = {email : "" , isLoggedin : false , phoneNumber : "" ,
                gender : "" , firstName : "" , lastName : "" , 
                username : "" , password : "" , birthday : "" ,
                member : false
} 

export const customReducer = createReducer(initialState,{
    setEmail : (state,action) =>{
        state.email = action.payload
        console.log(action.payload)
    }  ,
    setLoggedInLoggedOut : (state,action) => {
        state.isLoggedin = !state.isLoggedin
    } ,
    setPhoneNumber : (state,action)=> {
        state.phoneNumber = action.payload
        console.log(action.payload)
    } ,
    setFirstName : (state,action)=>{
        state.firstName = action.payload
        console.log(action.payload)
    },
    setLastName : (state,action)=>{
        state.lastName = action.payload
        console.log(action.payload)
    },
    setUsername : (state,action)=>{
        state.username = action.payload
        console.log(action.payload)
    },
    setPassword : (state,action)=>{
        state.password = action.payload
        console.log(action.payload)
    },
    setBirthday : (state,action)=>{
        state.birthday = action.payload
        console.log(action.payload)
    },
    setGender : (state,action)=>{
        state.gender = action.payload
        console.log(action.payload)
    },
    setMember : (state,action)=>{
        state.member = action.payload
        console.log(action.payload)
    }
})