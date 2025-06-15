import { recurse } from 'cypress-recurse';

interface RecurseInputOptions {
  delay?: number;
  maxAttempts?: number;
}

const recurseInput = (selector: string, content: string, options: RecurseInputOptions = {}) => {
  const { delay = 1000, maxAttempts = 10 } = options;

  recurse(
    () => cy.get(selector).click().clear().type(content),
    ($input) => $input.val() === content,
    {
      delay,
      limit: maxAttempts,
      error: `Failed to set input value to "${content}" after ${maxAttempts} attempts.`,
    },
  );
};

export default recurseInput;
