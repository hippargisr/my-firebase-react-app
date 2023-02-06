import React, { useState } from 'react';
import { auth, googleProvider } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	
	console.log(auth?.currentUser?.email);

	const signIn = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.error(error);
		}
	}

	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
		} catch (error) {
			console.error(error);
		}
	}

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div>
			<input 
				placeholder='Enter Email...' 
				type="text" name="email"
				onChange={ (e)=> setEmail(e.target.value) } 
			/>
			<input 
				placeholder='Enter Password...' 
				type="password" 
				name="password" 
				onChange={ (e)=> setPassword(e.target.value) }
			/>

			<button type="submit" onClick={signIn}>Sign In</button>
			<button type="submit" onClick={logout}>Logout</button>
			<button type="submit" onClick={signInWithGoogle}>Sign In With Google</button>
		</div>
	)
}

export default Auth;