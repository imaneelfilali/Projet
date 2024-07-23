import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'; 
import './App.css';
import Home from './Home.js';
import StudentsView from './component/student/StudentsView.js';
import AddStudent from './component/student/AddStudent'; // Import AddStudent component
import NavBar from './component/common/NavBar.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditeStudent from './component/student/EditeStudent.js';
import StudentPofile from './component/student/StudentProfile.js';

function App() {
  return (
    <main className="container mt-5">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/view-students" element={<StudentsView />} />
          <Route exact path="/add-student" element={<AddStudent />} /> {/* Use AddStudent component */}
          <Route exact path="/edit-student/:id" element={<EditeStudent/>} />
          <Route exact path="/student-profile/:id" element={<StudentPofile/>} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
