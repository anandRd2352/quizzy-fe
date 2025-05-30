import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from './components/Auth/1.1.1';
import RegistrationForm from './components/Auth/Registration';
import EmailOTPVerification from './components/Auth/EmailOTPVerification';

// Admin
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminPanel from './components/Admin/AdminPanel';
import Question from './components/Admin/Question';
import ExamTable from './components/Tables/ExamTable';
import CreateExamPage from './components/Admin/CreateExamPage';

// Modals (optional if still used somewhere else)
import QuestionModal from './components/Modals/QuestionModal';

// Exams
import AvailableExams from './components/Exams/3.1.1';
import ExamInterface from './components/Exams/Examinterface';
import ExamPage from './components/Exams/ExamPage';
import CountdownTimerUI from './components/Exams/CountdownTimerUI';
import QuestionCard from './components/Exams/QuestionCard';

// Results
import ResultSummary from './components/Results/ResultSummary';

// Profile
import UserProfile from './components/Profile/UserProfile';
import UserProfileUpdate from './components/Profile/1.2.2';

// Routes
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/verify-email" element={<EmailOTPVerification />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/panel"
          element={
            <PrivateRoute role="admin">
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/create-exam"
          element={
            <PrivateRoute role="admin">
              <CreateExamPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/questions"
          element={
            <PrivateRoute role="admin">
              <Question />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/exam-table"
          element={
            <PrivateRoute role="admin">
              <ExamTable />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/question-modal"
          element={
            <PrivateRoute role="admin">
              <QuestionModal />
            </PrivateRoute>
          }
        />

        {/* Student/User Routes */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/edit" element={<UserProfileUpdate />} />
        <Route path="/exams" element={<AvailableExams />} />
        <Route path="/exam/interface" element={<ExamInterface />} />
        <Route path="/exam/page" element={<ExamPage />} />
        <Route path="/exam/timer" element={<CountdownTimerUI />} />
        <Route path="/exam/question" element={<QuestionCard />} />

        {/* Results */}
        <Route path="/results" element={<ResultSummary />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
