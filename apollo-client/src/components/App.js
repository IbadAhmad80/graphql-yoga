import React from "react";
import PostList from "./PostList";
import { Switch, Route } from "react-router-dom";
import PostCreation from "./PostCreation";
function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={PostList} exact />
        <Route path="/post-creation" component={PostCreation} />
      </Switch>
    </div>
  );
}

export default App;
