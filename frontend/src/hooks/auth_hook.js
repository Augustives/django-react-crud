import { useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user_provider";

const useAuth = () => {
  return useContext(UserContext);
};

const useProviderAuth = () => {
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

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:8000/user/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
      setError(`An unexpected error occurred: ${err.message}`);
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
      setError(`An unexpected error occurred: ${err.message}`);
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
        if (data.detail === "Invalid token.") {
          localStorage.removeItem("token");
          setToken(null);
          setError("Invalid token");
          return;
        }
        setError(data.detail ?? data);
      }
    } catch (err) {
      setError(`An unexpected error occurred: ${err.message}`);
    }
  }, [token]);

  const registerUser = async (formData) => {
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
      setError(`An unexpected error occurred: ${err.message}`);
    }
  };

  const putUser = async (formData) => {
    try {
      const csrfToken = getCookie("csrftoken");
      const res = await fetch("http://localhost:8000/user/", {
        method: "PUT",
        headers: {
          Authorization: token.value,
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
        navigate("/user");
      }
    } catch (err) {
      setError(`An unexpected error occurred: ${err.message}`);
    }
  };

  const deleteUser = async () => {
    try {
      const csrfToken = getCookie("csrftoken");
      const res = await fetch("http://localhost:8000/user/", {
        method: "DELETE",
        headers: {
          Authorization: token.value,
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
      });

      if (res.ok) {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        navigate("/");
      }
    } catch (err) {
      setError(`An unexpected error occurred: ${err.message}`);
    }
  };

  return {
    user,
    setUser,
    token,
    setToken,
    error,
    setError,

    login,
    logout,

    getUser,
    registerUser,
    putUser,
    deleteUser,
  };
};

export { useProviderAuth, useAuth };
