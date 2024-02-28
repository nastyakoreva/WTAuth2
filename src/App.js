import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [userLogin, setInputLogin] = useState("");
  const [userPassword, setInputPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorText, setErrorText] = useState("");


  function formSubmitCookie(userLogin, userPassword) {
    const form = new FormData();
    form.set("user_login", userLogin);
    form.set("user_password", userPassword);
    const req = axios.post("http://localhost/custom/react_login/build/action.html", form);
    req.then(response => {
      console.log(response);
      if(response.data) {
        setIsLoggedIn(response.data.access);
        setErrorText(response.data.error_text);
      }
    });
  }

  function formSubmitBasic(userLogin, userPassword) {
    const req = axios.post("http://localhost/custom/react_login/build/action.html", {}, { auth: {
      username: userLogin,
      password: userPassword
    }});
    
    req.then(response => {
      console.log(response);
      if(response.data) {
        setIsLoggedIn(response.data.access);
        setErrorText(response.data.error_text);
        console.log('response');
        console.log(response);
        if(response.data.access) {
          //axios.defaults.headers.common['Authorization']=  req.headers.Authorization;
        }
      }
    });
  
  }

  function checkHomePageBasic() {
    var username = 'ag'; var password = 'ag';
    var credentials = btoa(username + ':' + password);
    var basicAuth = 'Basic ' + credentials;

    const req = axios.get("http://localhost/home", /*{headers: { 'Authorization': basicAuth}}*/{ withCredentials: true });
    req.then(response => {
      console.log(response);
    });
  
  }

  function checkHomePageCookie() {
    const req = axios.get("http://localhost/home", {params: { 'auth_type': 'cookie'}});
    req.then(response => {
      console.log(response);
    });
  
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='Login-form'>
          <input name='userLogin' value={userLogin} onChange={(e) => setInputLogin(e.target.value)}/>
          <input name='userPassword' value={userPassword} onChange={(e) => setInputPassword(e.target.value)}/>
          <div className='Login-btn' onClick={()=>formSubmitCookie(userLogin, userPassword)}>Login Cookie</div>
          <div className='Login-btn' onClick={()=>formSubmitBasic(userLogin, userPassword)}>Login Basic</div>

          {!isLoggedIn && errorText !== '' && <div className='Login-err'>Ошибка: {errorText}</div>}
          {isLoggedIn && <div className='Login-success'>Успешно</div>}

          <div className='Login-btn' onClick={()=>checkHomePageCookie()}>Check home page cookie</div>
          <div className='Login-btn' onClick={()=>checkHomePageBasic()}>Check home page basic</div>
        </div>
      </header>
    </div>
  );
}

export default App;
