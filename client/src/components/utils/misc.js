//contains global general data

export const SERVER = "/api";
// SERVER ROUTES
export const USER_SERVER = "/api/users";
//product server routes
export const PRODUCT_SERVER = "/api/product";
export const CATEGORY_SERVER = "/api/categories/";
export const USER_ADMIN_SERVER = "/api/admin";
export const CONTACT_SERVER = "/api/contact/"

export const SITE_SERVER = '/api/admin';


export const validate = (element) => {
  let error = [true, ""];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? "Must be a valid email" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== "";
    const message = `${!valid ? "This field is required" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};



