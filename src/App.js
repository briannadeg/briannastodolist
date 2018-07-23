import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoList from './ToDoList';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Paper from '@material-ui/core/Paper';
import ToDo from '@material-ui/icons/Today';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Image from './me.jpg'
import Avatar from '@material-ui/core/Avatar';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toDoList: [],
      currentInput: '',
      selectedTab: "todo",
    }
  }

  addToDo = (newToDo) => {
    if (newToDo === '') { return false }
    const toDoObject = {
      title: newToDo,
      id: this.state.toDoList.length + 1,
      completed: false,
    }
    const newToDoList = this.state.toDoList.concat(toDoObject);
    this.setState({ toDoList: newToDoList });
  }

  removeToDo = (id) => {
    const newToDoList = this.state.toDoList.filter(toDo => toDo.id !== id);
    this.setState({ toDoList: newToDoList });
  }

  toggleCompleted = (id) => {
    const toBeCompleted = this.state.toDoList.filter(toDo => toDo.id === id);
    this.setState({
      toDoList: this.state.toDoList.map(toDo => {
        if(toDo.id === id) {
          toDo.completed = !toDo.completed;
        }
        return toDo;
      })
    });
  }

  handleChange = ({ target }) => {
    let innerText = ''
    if (!target.innerText) {
      innerText = target.parentElement.parentElement.innerText.trim();
    } else {
      innerText = target.innerText.trim()
    }

    if (innerText == "About Me") {
      this.setState({ selectedTab: "aboutMe"})
    } else {
      this.setState({ selectedTab: "todo"})
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.addToDo(this.state.currentInput);
    this.setState({ currentInput: '' });
  }

  inputChange = ({ target }) => {
    this.setState({ currentInput: target.value });
  }

  render() {
    const { removeToDo, toggleCompleted } = this;
    const { value } = this.state;

    return (
      <Grid
        item
        xs={16}
        alignItems="center"
        container
        spacing={10}
        direction={"row"}
        justify="center"
        className="main-app"
      >
        {
          this.state.selectedTab == "aboutMe"
          ?
            <Grid
              item
              xs={6}
              alignItems="center"
              container
              spacing={10}
              direction={"row"}
              justify="center"
            >
              <Paper
                xs={6}
                className="toDoRow centered"
              >
              <h1>Brianna de Gaston</h1>
              <Avatar src={Image} className="myImage" />
              <p>
                 Hey there! My name is Brianna and I am an aspiring web developer. I am from the USA and I came here to Singapore about 2 years ago. I originally started studying Computer Science in University because since I was very young, I knew I wanted to be a part of the tech field and community. After enrolled in my classes in University I noticed it was a heavily male dominated field despite the changing times of feminism and gender equality. I want to change that stereotype and to be around like minded women.</p>

               <p>I am hoping to gain more technical knowledge and experience through Tech Ladies. It is the perfect environment for me to thrive in and to be with other women who like to code! I am interested in all types of coding including design, front end, back end, graphics, user experience, user interface design, etc. I am hoping that Tech Ladies can help me figure out where my strengths, interests, and weaknesses are. I am a committed learner and I like to try new things!</p>

               <p>I hope you consider me to be a part of the program. You will not be disappointed! 🙂</p>
              </Paper>
            </Grid>
          :
          <span>
          <form onSubmit={this.onSubmit}>
            <Input className="form-control col-md-16" onChange={this.inputChange} value={this.state.currentInput} placeholder="New to do item..."/>
          </form>
          <ToDoList toDoList={this.state.toDoList} {...{ removeToDo, toggleCompleted }} />
          </span>
        }

        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className="bottomNavigation"
        >
          <BottomNavigationAction label="ToDo's" icon={<ToDo />} />
          <BottomNavigationAction label="About Me" icon={<FavoriteIcon />} />
        </BottomNavigation>
      </Grid>
    );
  }
}
