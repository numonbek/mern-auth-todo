import React from 'react';
import { Link } from 'react-router-dom';

const Registration = ({ changeHandler, registerHandler }) => {
  return (
    <React.Fragment>
      <h3>Регистрация</h3>
      <form className="form form-login" onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="input-field col s12">
            <input type="email" name="email" className="validate" onChange={changeHandler} />
            <label htmlFor="Email">Email</label>
          </div>
          <div className="input-field col s12">
            <input type="password" name="password" className="validate" onChange={changeHandler} />
            <label htmlFor="password">Парол</label>
          </div>
        </div>
        <div className="row">
          <button className="wawes-effect wawes-light btn blue" onClick={registerHandler}>
            Регистрация
          </button>
          <Link to="/login" className="btn-outline btn-reg">
            Уже есть акаунта?
          </Link>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Registration;
