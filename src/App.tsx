import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from './lib/stripe';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import ListPropertyPage from './pages/ListPropertyPage';
import DashboardPage from './pages/DashboardPage';
import TransactionPage from './pages/TransactionPage';
import ProfilePage from './pages/ProfilePage';
import HowItWorksPage from './pages/HowItWorksPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  const stripePromise = getStripe();

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="property/:id" element={<PropertyDetailPage />} />
            <Route path="list-property" element={<ListPropertyPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="transaction/:id" element={<TransactionPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="how-it-works" element={<HowItWorksPage />} />
            <Route path="signin" element={<SignInPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
        </Routes>
      </Router>
    </Elements>
  );
}

export default App;

