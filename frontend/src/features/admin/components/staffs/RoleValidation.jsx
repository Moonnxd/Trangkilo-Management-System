export function validateRole(details) {
  const errors = {};

  // Regex: letters only (allow spaces for names like "De Leon")
  const nameRegex = /^[A-Za-z\s]+$/;

  // ROLE NAME
  if (!details.role_name?.trim()) {
    errors.role_name = "Role name is required";
  } else if (!nameRegex.test(details.role_name)) {
    errors.role_name = "Role name must not contain numbers";
  }

  // Description
  if (!details.description) {
    errors.description = "Description is required";
  }

  return errors;
}