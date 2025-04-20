// schemas/contactSchema.ts
import * as yup from 'yup';

export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .max(100, "Email must be less than 100 characters"),
  
  subject: yup
    .string()
    .required("Subject is required")
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  
  message: yup
    .string()
    .required("Message is required")
    .min(20, "Message must be at least 20 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

export type ContactFormData = yup.InferType<typeof contactSchema>;