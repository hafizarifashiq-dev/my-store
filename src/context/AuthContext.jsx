import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_USER,
} from "../config/auth";

const AuthContext = createContext(null);

const USERS_KEY = "mystore_users";
const CURRENT_USER_KEY = "mystore_current_user";

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function readCurrentUser() {
  try {
    return (
      JSON.parse(
        sessionStorage.getItem(CURRENT_USER_KEY)
      ) || null
    );
  } catch {
    return null;
  }
}

function saveUsers(users) {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
}

function saveCurrentUser(user) {
  if (user) {
    sessionStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(user)
    );
  } else {
    sessionStorage.removeItem(CURRENT_USER_KEY);
  }
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(readUsers);
  const [currentUser, setCurrentUser] =
    useState(readCurrentUser);

  /*
    Important for testing:

    If Seller registers in Tab 2,
    Admin Tab 1 should see the new seller.

    localStorage changes trigger "storage"
    event in other tabs.
  */
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === USERS_KEY) {
        setUsers(readUsers());
      }
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  const signup = ({
    name,
    email,
    password,
    accountType,
  }) => {
    const cleanEmail = email.trim().toLowerCase();

    if (
      !name.trim() ||
      !cleanEmail ||
      !password ||
      !accountType
    ) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    if (
      cleanEmail === ADMIN_EMAIL.toLowerCase()
    ) {
      return {
        success: false,
        message:
          "This email is reserved for the admin account.",
      };
    }

    const exists = users.some(
      (user) =>
        user.email.toLowerCase() === cleanEmail
    );

    if (exists) {
      return {
        success: false,
        message:
          "An account with this email already exists.",
      };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password,

      role:
        accountType === "seller"
          ? "seller"
          : "customer",

      /*
        Customer:
        no seller approval needed.

        Seller:
        pending until Admin approves.
      */
      sellerStatus:
        accountType === "seller"
          ? "pending"
          : "none",

      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [
      ...users,
      newUser,
    ];

    setUsers(updatedUsers);
    saveUsers(updatedUsers);

    return {
      success: true,
      user: newUser,
    };
  };

  const login = (email, password) => {
    const cleanEmail =
      email.trim().toLowerCase();

    /*
      Admin is NOT created through Signup.
    */
    if (
      cleanEmail ===
        ADMIN_EMAIL.toLowerCase() &&
      password === ADMIN_PASSWORD
    ) {
      saveCurrentUser(ADMIN_USER);
      setCurrentUser(ADMIN_USER);

      return {
        success: true,
        user: ADMIN_USER,
      };
    }

    const user = users.find(
      (item) =>
        item.email.toLowerCase() ===
          cleanEmail &&
        item.password === password
    );

    if (!user) {
      return {
        success: false,
        message:
          "Invalid email or password.",
      };
    }

    saveCurrentUser(user);
    setCurrentUser(user);

    return {
      success: true,
      user,
    };
  };

  const logout = () => {
    saveCurrentUser(null);
    setCurrentUser(null);
  };

  const updateUser = (
    userId,
    changes
  ) => {
    setUsers((previousUsers) => {
      const updatedUsers =
        previousUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                ...changes,
              }
            : user
        );

      saveUsers(updatedUsers);

      /*
        If current tab belongs to this user,
        update its session too.
      */
      if (
        currentUser &&
        currentUser.id === userId
      ) {
        const updatedUser =
          updatedUsers.find(
            (user) =>
              user.id === userId
          );

        if (updatedUser) {
          saveCurrentUser(
            updatedUser
          );

          setCurrentUser(
            updatedUser
          );
        }
      }

      return updatedUsers;
    });
  };

  const approveSeller = (
    userId
  ) => {
    updateUser(userId, {
      role: "seller",
      sellerStatus: "approved",
    });
  };

  const rejectSeller = (
    userId
  ) => {
    updateUser(userId, {
      role: "customer",
      sellerStatus: "rejected",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        signup,
        login,
        logout,
        updateUser,
        approveSeller,
        rejectSeller,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}