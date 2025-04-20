import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
});

export const registerSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string(),
    username: yup.string().required("Username is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    address: yup.string(),
});