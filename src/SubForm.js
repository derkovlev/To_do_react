import React, { Component } from 'react';

class SubForm extends Component {
    initialState = {
        userLogin : "",
        userPassword:"",
        userCheckPassword:"",
    }

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

    handleSubmit = event =>{
        event.preventDefault();

       this.state.userPassword !== this.state.userCheckPassword ?
        alert("Les mots de passe ne sont pas identique !")
        :
        this.props.addUser({id : this.state.userLogin, pwd: this.state.userPassword, tasks:[] });
  
        /* if (this.state.userPassword !== this.state.userCheckPassword) {
            alert("Mot de passe non identique")
        }
        else{
            
            const user = {id : this.state.userLogin, pwd: this.state.userPassword, tasks:[] }
            this.props.addUser(user);
        } */

    }


    render() {
        return (
            <div>
                <div className="menu">
                    <button className="log_gestion" onClick={this.props.coInterfaceDisplay}>Retour accueil</button>
                </div>
                <form className="log" onSubmit={this.handleSubmit}>
                    <label htmlFor="Login" >Nom ou pseudo (*)</label>
                    <input 
                        type="texte"
                        name="userLogin"
                        value={this.state.userLogin}
                        onChange={this.handleChange}
                        id="login" 
                        placeholder="Votre identifiant"
                        required 
                    />
                    <label htmlFor="password">Mot de passe (*)</label>
                    <input type="password"
                        name="userPassword"
                        value={this.state.userPassword}
                        onChange={this.handleChange}
                        id="password"
                        placeholder="Votre password"
                        required 
                    />
                    <label htmlFor="password">Veillez confirmer votre mot de passe (*)</label>
                    <input type="password"
                        name="userCheckPassword"
                        value={this.state.userCheckPassword}
                        onChange={this.handleChange}                    
                        id="checkPassword"
                        placeholder="votre password" 
                        required 
                    />
                    <button className="inbox"> Valider </button>
                </form>
            </div>
        );
    }
}

export default SubForm;