import DevicesToast from "../Toast/DevicesToast";

// ==============================================

const FirebaseErrorHandler = (error) => {
  let errorMessage = "Wrong information provided!";

  if (error.code) {
    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "Invalid email format!";
        break;
      case "auth/user-not-found":
        errorMessage = "User doesn't exist!";
        break;
      case "auth/email-already-exists":
        errorMessage = "Email is already registered";
        break;
      case "auth/invalid-password":
        errorMessage = "Invalid password!";
        break;
      case "auth/wrong-password":
        errorMessage = "Wrong password!";
        break;
      case "auth/too-many-requests":
        errorMessage = "Account temporarily blocked. Reset password now!";
        break;
      case "auth/email-already-in-use":
        errorMessage = "Account already exist!";
        break;
      case "auth/weak-password":
        errorMessage = "Password should be at least 6 characters!";
        break;
      default:
        errorMessage = "Something went wrong. Try again later!";
    }
  }
  DevicesToast(errorMessage);
};

export default FirebaseErrorHandler;
