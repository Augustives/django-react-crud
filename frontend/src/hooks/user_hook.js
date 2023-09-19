import { useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user_provider";

const useUser = () => {
  return useContext(UserContext);
};

const useUserProvider = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : null;
  });
  const [error, setError] = useState(null);

  const saveToken = (newToken) => {
    localStorage.setItem("token", JSON.stringify(newToken));
    setToken(newToken);
  };

  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:8000/user/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        saveToken({ value: `Token ${data.token}`, expiry: data.expiry });
        navigate("/user");
      } else {
        setError(data.error ?? data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const register = async (formData) => {
    try {
      const res = await fetch("http://localhost:8000/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        navigate("/");
      } else {
        const data = await res.json();
        setError(data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:8000/user/logout/", {
        method: "POST",
        headers: { Authorization: token.value },
      });

      if (res.ok) {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const getUser = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8000/user/", {
        method: "GET",
        headers: { Authorization: token.value },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
      } else {
        setError(data);
      }
    } catch (err) {
      setError(err.message);
    }
  }, [token]);

  // const patchUser = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8000/user/", {
  //       method: "PATCH",
  //       headers: { Authorization: token.value },
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       setUser(data);
  //       navigate("/user");
  //     } else {
  //       setError(data);
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  return {
    user,
    setUser,
    token,
    setToken,
    error,
    setError,

    login,
    register,
    logout,
    getUser,
  };
};

export { useUserProvider as useProviderAuth, useUser as useAuth };
