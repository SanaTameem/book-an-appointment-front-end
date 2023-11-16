import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import axios from '../api/axios';

const EMAIL_REGEX = /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'auth/signup';

const Register = () => {
  const navigate = useNavigate();
  // To focus on the input form
  const userRef = useRef();
  const errRef = useRef();

  // managing user name
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // managing user email
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // managing password
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // managing confirmation password
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  // managing error message and success
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState('');

  // Focus on the user name input
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  // checking user name validation
  useEffect(() => {
    const result = USER_REGEX.test(user);

    setValidName(result);
  }, [user]);

  // checking user Email validation
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);

    setValidEmail(result);
  }, [email]);

  // checking password validation
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);

    setValidPwd(result);
    const matcher = pwd === matchPwd;
    setValidMatchPwd(matcher);
  }, [pwd, matchPwd]);

  // handle the error message when user make changes on input
  useEffect(() => {
    setErrMsg('');
  }, [user, email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if the button is hack with js
    // this safeguard to not submit
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(pwd);
    const v4 = PWD_REGEX.test(matchPwd);

    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg('invalid Entry');
      return;
    }

    const formData = {
      user: {
        email,
        name: user,
        password: pwd,
        password_confirmation: matchPwd,
      },
    };
    try {
      axios.post(REGISTER_URL, JSON.stringify(formData), {
        headers: { 'Content-Type': 'application/json' },
        Accept: '*/*',
      });
      // clean up the form
      setEmail('');
      setUser('');
      setPwd('');
      setMatchPwd('');
      navigate('/login');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 422) {
        setErrMsg(err.response.data.status.message);
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current?.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <span className="line">
            <Link to="/login">Sign In</Link>
          </span>
        </section>
      ) : (
        <section className="rounded-1 login-register-style">
          <p
            ref={errRef}
            className={`container ${errMsg ? 'errMsg' : 'offScreen'}`}
          >
            {errMsg}
          </p>
          <h3>Register</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="text"
              id="username"
              placeholder="name"
              ref={userRef}
              autoComplete="off"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby="uidnote"
              required
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
            <label htmlFor="email">
              Email:
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              autoComplete="off"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby="emdnote"
              required
            />
            <p
              id="emdnote"
              className={
                emailFocus && email && !validEmail
                  ? 'instructions'
                  : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must have proper email address
              <br />
              example@gmail.com
            </p>
            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              autoComplete="off"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwdnote"
              required
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </p>
            <label htmlFor="matchPassword">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatchPwd && matchPwd ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatchPwd || !matchPwd ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="password"
              id="matchPassword"
              autoComplete="off"
              placeholder="Confirm Password"
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              onFocus={() => setMatchPwdFocus(true)}
              onBlur={() => setMatchPwdFocus(false)}
              aria-invalid={validMatchPwd ? 'false' : 'true'}
              aria-describedby="confirmnote"
              required
            />
            <p
              id="confirmnote"
              className={
                matchPwdFocus && !validMatchPwd ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
            <button
              className="btn-color text-light"
              type="submit"
              disabled={!validName || !validPwd || !validMatchPwd}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <Link to="/login" className="text-light">
              <span className="text-login"> Sign In</span>
            </Link>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
