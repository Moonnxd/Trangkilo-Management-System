export function validateBranch(details) {
  const errors = {};

  // Allows letters, numbers, spaces, commas, dots, hyphens
  const textRegex = /^[A-Za-z0-9\s.,-]+$/;

  // CONTACT NUMBER (PH format: 11 digits, starts with 09)
  const phoneRegex = /^09\d{9}$/;

  // EMAIL
  const emailRegex = /^\S+@\S+\.\S+$/;

  // BRANCH NAME (can have numbers)
  if (!details.branch_name?.trim()) {
    errors.branch_name = "Branch name is required";
  } else if (!textRegex.test(details.branch_name)) {
    errors.branch_name = "Invalid branch name format";
  }

  // ZONE
  if (!details.zone?.trim()) {
    errors.zone = "Zone is required";
  } else if (!textRegex.test(details.zone)) {
    errors.zone = "Invalid zone format";
  }

  // BARANGAY
  if (!details.barangay?.trim()) {
    errors.barangay = "Barangay is required";
  } else if (!textRegex.test(details.barangay)) {
    errors.barangay = "Invalid barangay format";
  }

  // CITY
  if (!details.city?.trim()) {
    errors.city = "City is required";
  } else if (!textRegex.test(details.city)) {
    errors.city = "Invalid city format";
  }

  // PROVINCE
  if (!details.province?.trim()) {
    errors.province = "Province is required";
  } else if (!textRegex.test(details.province)) {
    errors.province = "Invalid province format";
  }

  // CONTACT NUMBER
  if (!details.contact_number?.trim()) {
    errors.contact_number = "Contact number is required";
  } else if (!phoneRegex.test(details.contact_number)) {
    errors.contact_number = "Must be a valid PH number (e.g. 09123456789)";
  }

  // EMAIL
  if (!details.email?.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(details.email)) {
    errors.email = "Invalid email format";
  }

  return errors;
}