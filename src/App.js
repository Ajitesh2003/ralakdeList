import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom'; 
import RolesList from './App/Screens/RolesList';
import CreateRoleForm from './App/Screens/CreateRoleForm';


function App() {
  return (
   <Routes>
      {/* Main List Page - accessible at the root '/' */}
      <Route path="/" element={<RolesList />} />

      {/* Create Role Page - accessible at '/new-role' */}
      <Route path="/new-role" element={<CreateRoleForm />} />

      {/* You can add more routes here, like a 404 page */}
    </Routes>
  );
}

export default App;
