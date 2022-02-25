import React from 'react';
import { Link } from 'react-router-dom';

const Login = ({ changeHandler }) => {
  return (
    <React.Fragment>
      <h3>Авторизация</h3>
      <form className="form form-login" onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="input-field col s12">
            <input type="email" name="email" className="validate" onChange={changeHandler} />
            <label htmlFor="Email">Email</label>
          </div>
          <div className="input-field col s12">
            <input type="password" name="password" className="validate" onChange={changeHandler} />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <button className="wawes-effect wawes-light btn btn blue">Войти</button>
          <Link to="/registration" className="btn-outline btn-reg">
            Нет акаунта?
          </Link>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Login;
