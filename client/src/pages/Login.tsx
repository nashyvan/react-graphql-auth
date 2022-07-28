import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../context/authContext';
import { useForm } from '../utility/hooks';
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../graphql/mutations';

const Login = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function loginUserCallback() {
    loginUser();
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      context.login(userData);
      navigate('/');
    },
    onError({ graphQLErrors }) {
      // @ts-ignore
      setErrors(graphQLErrors);
    },
    variables: {
      loginInput: values,
    },
  });

  return (
    <div className="h-screen flex justify-center items-center dark:bg-gray-900">
      <div className="w-96 bg-white shadow-xl pt-11 pb-20 px-12 rounded-2xl border-2 border-blue-500 text-black dark:bg-gray-800 dark:text-white dark:border-indigo-400">
        <h1 className="block text-center text-2xl">Login</h1>
        <input className="block w-full h-14 mt-6 p-3 rounded-xl outline-none bg-gray-200" type="text" placeholder="Email" name="email" onChange={onChange} />
        <input className="block w-full h-14 mt-6 p-3 rounded-xl outline-none bg-gray-200" type="text" placeholder="Password" name="password" onChange={onChange} />
        <button className="block w-full h-14 mt-12 mx-auto bg-blue-500 text-white text-xl rounded-xl" type="button" onClick={onSubmit}>
        { loading
            && <span>loading...</span> }
          Log in
        </button>
        { errors.map((error:any) => {
          return (
            <p>{ error.message }</p>
          );
        }) }
      </div>
    </div>
  );

};

export default Login;
