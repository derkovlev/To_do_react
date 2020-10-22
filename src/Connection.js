import React, { Component } from 'react';

class Connection extends Component {
    initialState = {
        userLogin: "",
        userPassword: ""
    };

    state = this.initialState;

    handleChange = event => {
        const {name, value} = event.target;
        // Equivaut à :
        // const name = event.target.name;
        // const value = event.target.value;

        // Les crochets servent à utiliser la valeur de la constante (ou variable) comme nom de propriété pour un objet
        this.setState({
            [name]: value
        });
    }

    /* handleChangeLogin = event => {
        this.setState({
            userLogin: event.target.value
        });
    }

    handleChangePassword = event => {
        this.setState({
            userPassword: event.target.value
        });
    } */

    handleSubmit = event => {
        event.preventDefault();

        const {userLogin, userPassword} = this.state;

        this.props.verifyLogin(userLogin, userPassword);
        this.setState(this.initialState);
    }

    render() {
        return (
            <div>
                <div className="menu">
                    <button className="log_gestion" onClick={this.props.subInterfaceDisplay} >Inscription</button>
                </div>    
                <form className="log" onSubmit={this.handleSubmit}>
                    <label htmlFor="login">Identifiant</label>
                    <input
                        type="text"
                        name="userLogin"
                        id="login"
                        placeholder="Votre identifiant"
                        value={this.state.userLogin}
                        onChange={this.handleChange}
                        /* onChange={this.handleChangeLogin} */
                        required
                        minLength="6"
                    />
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        name="userPassword"
                        id="password"
                        placeholder="Votre mot de passe"
                        value={this.state.userPassword}
                        onChange={this.handleChange}
                        /* onChange={this.handleChangePassword} */
                        required
                        minLength="6"
                    />
                    <button className="inbox"> Connection </button>
                </form>
                
            </div>    
        );
    }
}

export default Connection;
