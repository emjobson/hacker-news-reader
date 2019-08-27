import React from 'react';
import NavBar from './Components/NavBar';
import Home from './Pages/Home';
import { Route, withRouter } from 'react-router-dom';
import PreviewList from './Pages/PreviewList';
import Story from './Pages/Story';
import User from './Pages/User';

function App() {
  return (
    <div
      style={{
        paddingLeft: '90px',
        paddingRight: '90px',
        paddingBottom: '20px'
      }}
    >
      <NavBar />
      <Route exact path='/' component={Home} />
      <Route path='/top/:id' component={PreviewList} />
      <Route path='/new/:id' component={PreviewList} />
      <Route path='/ask/:id' component={PreviewList} />
      <Route path='/show/:id' component={PreviewList} />
      <Route path='/jobs/:id' component={PreviewList} />
      <Route path='/item/:id' component={Story} />
      <Route path='/user/:id' component={User} />
      {/* I'm worried this won't work for ask title links bc I <a href> to /item in that case */}
      {/* ^ this was fine -- props.location.pathname properly updated, even when we reached page through <a href> */}
    </div>
  );
}

export default withRouter(App);
