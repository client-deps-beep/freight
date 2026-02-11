import emailjs from '@emailjs/browser';

// Initialize EmailJS
export const initEmailJs = () => {
  try {
    // Get public key using import.meta.env for Vite
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    
    if (!publicKey) {
      console.warn("EmailJS public key is missing");
      return false;
    }
    
    emailjs.init(publicKey);
    return true;
  } catch (error) {
    console.error("Error initializing EmailJS:", error);
    return false;
  }
};

// Send contact form email
export const sendContactEmail = async (params: {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}) => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    
    if (!serviceId || !templateId) {
      throw new Error("EmailJS configuration is incomplete");
    }
    
    const response = await emailjs.send(serviceId, templateId, params);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// Send quote request email
export const sendQuoteRequestEmail = async (params: {
  from_name: string;
  from_email: string;
  phone: string;
  company: string;
  shipment_type: string;
  origin: string;
  destination: string;
  details: string;
}) => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    
    if (!serviceId || !templateId) {
      throw new Error("EmailJS configuration is incomplete");
    }
    
    const response = await emailjs.send(serviceId, templateId, params);
    return response;
  } catch (error) {
    console.error("Error sending quote request:", error);
    throw error;
  }
};