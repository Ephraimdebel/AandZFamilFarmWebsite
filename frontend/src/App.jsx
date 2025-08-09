import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import LoginPage from "./markup/pages/Admin/LoginPage.jsx"
import DashboardLayout from "./markup/components/admin/DashboardLayout.jsx"
import Dashboard from "./markup/pages/Admin/Dashboard.jsx"
import Orders from "./markup/pages/Admin/Orders.jsx"
import Animals from "./markup/pages/Admin/Animals.jsx"
import Pricing from "./markup/pages/Admin/Pricing.jsx"
import Gallery from "./markup/pages/Admin/Gallery.jsx"
import Testimonials from "./markup/pages/Admin/Testimonials.jsx"
import Admins from "./markup/pages/Admin/Admins.jsx"
import Settings from "./markup/pages/Admin/Settings.jsx"
import ProtectedRoute from "./markup/components/admin/ProtectedRoute.jsx"
import SignupPage from "./markup/pages/Admin/SignupPage.jsx"
import OrderPage from "./markup/pages/OrderPage.jsx"
import {OrderProvider} from "./contexts/OrderContext.jsx"
import Home from "./markup/pages/Home.jsx"
import { Toaster } from 'sonner';


// import './assets/template_asset/css/bootstrap.min.css'
// import './assets/template_asset/css/navigation.css'
// import './assets/template_asset/css/style.css'
// import './assets/template_asset/css/range.css'

// import './assets/template_asset/css/layers.css'
// import './assets/template_asset/css/settings.css'
// import './assets/template_asset/css/nice-select.css'
// import './assets/template_asset/css/font.css'
// import './assets/template_asset/css/nice-select.css'

// import './assets/template_asset/css/color/color7.css'
import PaymentPage from "./markup/pages/Admin/PaymentPage.jsx"
import SuccessPage from "./markup/pages/Admin/SuccessPage.jsx"
import Layout from "./markup/layout/Layout.jsx"
import ContactInfoPage from "./markup/pages/Admin/ContactInfoPage.jsx"
import PaymentInstructionsPage from "./markup/pages/Admin/PaymentInstructionsPage.jsx"
import AdminRoute from "./markup/components/admin/AdminRoute.jsx"
// import './App.css'
function App() {
  return (
    <Router> 
      <AuthProvider>
        <OrderProvider>
          <div className="App">
            <Routes>
              {/* <Route path = "/" element={<Layout/>}>


              </Route> */}
                <Route path="/" element={<Home />} />
              <Route
                path="/order"
                element={
                  // <ProtectedRoute>
                    <OrderPage />
                  //  </ProtectedRoute>
                }
              />
             
            <Route
              path="/payment"
              element={
                // <ProtectedRoute>
                  <PaymentPage />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/success"
              element={
                // <ProtectedRoute>
                  <SuccessPage />
                // </ProtectedRoute>
              }
            />

            <Route
              path="/contact-info"
              element={
                // <ProtectedRoute>
                  <ContactInfoPage />
                // </ProtectedRoute>
              }
            />

            <Route
              path="/payment-instructions"
              element={
                // <ProtectedRoute>
                  <PaymentInstructionsPage />
                // </ProtectedRoute>
              }
             />
              
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <DashboardLayout />
                  </AdminRoute>
                 </ProtectedRoute>
              }
            >

            
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="animals" element={<Animals />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="users" element={<Admins />} />
              <Route path="settings" element={<Settings />} />
            </Route>
              
            </Routes>
             
          </div>
        </OrderProvider>
      </AuthProvider>
      <Toaster position="top-right" richColors />
    </Router>
  )
}

export default App
