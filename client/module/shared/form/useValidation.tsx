import { useState, useEffect } from 'react';

interface ValidationRule {
  validate: (value: string | null) => boolean;
  message: string;
}

const useValidation = (value: string | null, rules: ValidationRule[]) => {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Iterate through the rules and apply the first one that fails
    for (let rule of rules) {
      if (!rule.validate(value)) {
        setIsValid(false);
        setErrorMessage(rule.message);
        return; // Stop at the first validation failure
      }
    }
    // If all validations pass, reset the state
    setIsValid(true);
    setErrorMessage(null);
  }, [value, rules]);

  return { isValid, errorMessage };
};

export default useValidation;
