import React, { Component } from 'react';
import './App.css';
import KanbanBoard from './component/kanban';

// const title = "Kanban Board";

class App extends Component {
  render() {
    return (
      <div>
        <KanbanBoard/>
      </div>
    );
  }
}

export default App;
