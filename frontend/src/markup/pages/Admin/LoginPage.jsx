"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/admin/ui/card";
import { Input } from "../../components/admin/ui/input";
import { Label } from "../../components/admin/ui/label";
import { Button } from "../../components/admin/ui/button";
import { Alert, AlertDescription } from "../../components/admin/ui/alert";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    identifier: "", // email or phone
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^\d{10}$/; // US phone format
    return regex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { identifier, password } = formData;

    // Validate identifier
    if (!identifier.trim()) {
      setError("Email or phone number is required");
      return;
    }

    let normalizedIdentifier = identifier;

    if (validateEmail(identifier)) {
      // It's an email
      normalizedIdentifier = identifier;
    } else if (validatePhone(identifier)) {
      // It's a phone → add +1
      normalizedIdentifier = `+1${identifier}`;
    } else {
      setError("Please enter a valid email or 10-digit phone number");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    setLoading(true);

    try {
      const result = await login(normalizedIdentifier, password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Login failed");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand mb-2">A&Z Family Farm</h1>
          <p className="text-gray-600">Fresh, Local, Quality Meats</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-semibold text-gray-800">Welcome Back</CardTitle>
            <p className="text-gray-600 mt-2">Sign in to place your order</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="identifier" className="text-gray-700">
                  Email or Phone Number
                </Label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder="your@email.com or 5551234567"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="mt-1"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-brand hover:bg-brand/90 text-white font-medium py-2.5"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-brand hover:text-brand/80 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
