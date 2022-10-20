import  {useRef, useState, useEffect} from 'react';
import axios from "axios";

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const Etudiant = { email, password };
        const res = await axios.post(`http://127.0.0.1:8000/api/auth/login`, Etudiant).catch((error)=>{
          if (error.response) {
            console.log(error.response)
          }
        });
        if (email) {
            setEmail('');
        };
        
        if (password) {
            setPwd('');
        };
        
        if (res) {
            setSuccess(true)
            console.log(email, password);
        };
    }

    return (
        <>
            {success ? (
                <section>
                    <h1> You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">
                            Go to Home
                        </a>
                    </p>
                </section>
            ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg} </p>
            <h1> Sign in </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username"> Email : </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <label htmlFor="password"> Password : </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an account ?
                <span className='line'>
                    <a href="#">
                        Sign Up
                    </a>
                </span>
            </p>
        </section>
            )}
        </>
    )
}

export default Login;