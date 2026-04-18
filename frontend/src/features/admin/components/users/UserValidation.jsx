export function validateUser(details) {
  const errors = {};

  // Regex: letters only (allow spaces for names like "De Leon")
  const nameRegex = /^[A-Za-z\s]+$/;

  // FIRST NAME
  if (!details.first_name?.trim()) {
    errors.first_name = "First name is required";
  } else if (!nameRegex.test(details.first_name)) {
    errors.first_name = "First name must not contain numbers";
  }

  // LAST NAME
  if (!details.last_name?.trim()) {
    errors.last_name = "Last name is required";
  } else if (!nameRegex.test(details.last_name)) {
    errors.last_name = "Last name must not contain numbers";
  }

  // MIDDLE INITIAL 
  if (!details.middle_initial?.trim()) {
    errors.middle_initial = "Middle initial is required";
  } else if (!nameRegex.test(details.middle_initial)) {
    errors.middle_initial = "Middle initial must not contain numbers";
  }

  // BRANCH
  if (!details.branch_id) {
    errors.branch_id = "Branch is required";
  }

  // ROLE
  if (!details.role_id) {
    errors.role_id = "Role is required";
  }

  // CONTACT NUMBER (exactly 11 digits)
  if (!details.contact_number?.trim()) {
    errors.contact_number = "Contact number is required";
  } else if (!/^\d{11}$/.test(details.contact_number)) {
    errors.contact_number = "Contact number must be exactly 11 digits";
  }

  // EMAIL
  if (!details.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(details.email)) {
    errors.email = "Invalid email format";
  }

  // GENDER
  if (!details.gender) {
    errors.gender = "Gender is required";
  }

  // DATE HIRED
  if (!details.date_hired) {
    errors.date_hired = "Date hired is required";
  }

  return errors;
}