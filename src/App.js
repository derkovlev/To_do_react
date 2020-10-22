import React, { Component } from 'react';
import Connection from './Connection';
import Form from './Form';
import List from './List';
import SubForm from './SubForm'



class App extends Component {
  state = {
    users: [
      {
        id: "derkovlev",
        pwd: "123456",
        tasks: [
          { name: "Faire le café", checked: false },
          { name: "Dire bonjour au voisin", checked: true }
        ]
      },
      {
        id: "derkovlev2",
        pwd: "654321",
        tasks: []
      },
      {
        id: "alison",
        pwd: "123456",
        tasks: [{name: "comprendre réact", checked: false},{name:"persévérer a comprendre", checked:true}]
      }
    ],
    userIndexConnected: -1,
    userLoginConnected: "",
    userTasksConnected : [],
    subInterface : false,
  };

  checkLogin = (login, password) => {
    let connected = false;
    this.state.users.forEach((user, index) => {
      if (login === user.id && password === user.pwd) {
        connected = true;

        this.setState({
          userIndexConnected: index,
          userLoginConnected: user.id,
          userTasksConnected: user.tasks
        });
      }
    });

    if (!connected) {
      alert("Ce couple identifiant / mot de passe n'existe pas !");
    }
  }

  updateUserTasks = () => {
    this.setState({ users: this.state.users.map(user => {
      if (user.id === this.state.userLoginConnected) {
        user.tasks = this.state.userTasksConnected;
      }
      return user;
    })});
  }

  addTache = input => {
    /* let mesTaches = this.state.taches.slice();
    mesTaches.push({ name: tache });
    this.setState({taches: mesTaches}); */
    this.setState({ userTasksConnected: [...this.state.userTasksConnected, { name: input, checked: false }] }, this.updateUserTasks);
  }

  checkTache = index => {
    this.setState({ userTasksConnected: this.state.userTasksConnected.map((tache, i) => {
      if (index === i) {
        tache.checked = !tache.checked;
      }
      return tache;
    })}, this.updateUserTasks);
  }

  removeChecked = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer vos todos accomplies ?")) {
      /* this.setState({ taches: this.state.taches.filter((tache, i) => {
        return !tache.checked;
      })}); */
      this.setState({ userTasksConnected: this.state.userTasksConnected.filter(tache => !tache.checked )}, this.updateUserTasks);
    }
  }

  removeAllTaches = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer toutes vos todos ?")) {
      this.setState({ userTasksConnected: [] }, this.updateUserTasks);
    }
  }

  addUser = (user)=>{
    let userExist = false
    this.state.users.forEach(element => {
      if (user.id === element.id) {
        alert("Compte dèjà existant !")
        userExist=true
      }
      
    });
    if(userExist === false)
      {this.setState({users: [...this.state.users, user]},this.coInterfaceDisplay)}
  }

  removeUser = ()=>{
 /*    let users = [...this.state.users];
    if (window.confirm("Vous êtes sur le point de supprimer votre compte. Est-ce bien ce que vous voulez ?")) {
      users.splice(this.state.userIndexConnected,1)
      this.setState({users},this.logoff)
    } */
    if (window.confirm("Attention, si vous acceptez votre compte sera déffinitivement effacé !!!")){
    const {users, userLoginConnected}= this.state;
    this.setState({users: users.filter(user => user.id!== userLoginConnected)},this.logoff)
  } //autre façon de faire plus opti
    
  }




  logoff = () =>{
    this.setState(
      {
        userIndexConnected: -1,
        userLoginConnected: "",
        userTasksConnected : []
      }
    )
  }

   coInterfaceDisplay= () =>{
    this.setState({    
      subInterface : false })
  }

  subInterfaceDisplay = () =>{
    this.setState({    
      subInterface : true })
  }


  
  render(){
    const {userLoginConnected, userTasksConnected} = this.state;
    const wichForm = this.state.subInterface ? <SubForm coInterfaceDisplay={this.coInterfaceDisplay} addUser={this.addUser} /> : <Connection  subInterfaceDisplay={this.subInterfaceDisplay}  verifyLogin={this.checkLogin} />;
    return (
      <div>
        <h1>Todo List</h1>
        {
          userLoginConnected !== "" ?
          <div>
            <div className="menu">
              <button className="log_gestion" onClick={this.logoff} >Déconnection</button>
              <button className="log_gestion" onClick={this.removeUser}>Supprimer Compte</button>
            </div>             
            <div className="add_task" >
              <Form  addTache={this.addTache} />
              <List  taches={userTasksConnected} checkTache={this.checkTache} />
              <div className="delete">  
                <button className="action" onClick={this.removeChecked}>Supprimer les tâches accomplies</button>
                <button className="action" onClick={this.removeAllTaches}>Supprimer toutes les tâches</button>
              </div>
            </div>

          </div>  
          :
            wichForm
        }
      </div>
    );

    /* let formOrList = <Connection verifyLogin={this.checkLogin} />;
    if (this.state.userLoginConnected) {
      formOrList = <TodoList />;
    }

    return (
      {formOrList}
    ); */
  }
}

export default App;
