```typescript
import { Router, Route, Switch } from "wouter";
import { Toaster } from "./components/ui/toaster";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
```
