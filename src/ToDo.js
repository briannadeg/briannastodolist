import React, { Component } from 'react';
import './App.css';
import TodoList from './ToDoList';
import Button from '@material-ui/core/Button';
import { Edit, Save, Delete } from '@material-ui/icons';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';

export default class ToDo extends Component {

  constructor(props) {
    super(props);
    this.state = { editing: false, title: props.toDo.title };
  }

  edit = () => {
    this.setState({ editing: !this.state.editing })
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.edit();
    }
  }

  toggleCompleted = () => {
    this.props.toggleCompleted(this.props.toDo.id);
  }

  removeToDo = () => {
    this.props.removeToDo(this.props.toDo.id);
  }

  inputChange = ({ target }) => {
    this.setState({ title: target.value });
  }

  render() {
    const { toDo } = this.props;
    return (
      <div>
        <FormGroup row className="toDoRowFormGroup">
          <Checkbox
            checked={toDo.completed}
            onChange={this.toggleCompleted}
          />
          <Input value={this.state.title} onChange={this.inputChange} onKeyPress={this.onKeyPress} className="toDoInput" />
          <span size="small" className="actionButton" onClick={this.edit}>
            { this.state.editing ? <Save /> : <Edit /> }
          </span>
          <span size="small" className="actionButton" color="secondary" onClick={this.removeToDo}>
            <Delete />
          </span>
        </FormGroup>
      </div>
    );
  }
}
