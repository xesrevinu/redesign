// Errors
// CODE	OVERVIEW
// 401 - Invalid Authentication	Cause: Invalid Authentication
// Solution: Ensure the correct API key and requesting organization are being used.
// 401 - Incorrect API key provided	Cause: The requesting API key is not correct.
// Solution: Ensure the API key used is correct, clear your browser cache, or generate a new one.
// 401 - You must be a member of an organization to use the API	Cause: Your account is not part of an organization.
// Solution: Contact us to get added to a new organization or ask your organization manager to invite you to an organization.
// 429 - Rate limit reached for requests	Cause: You are sending requests too quickly.
// Solution: Pace your requests. Read the Rate limit guide.
// 429 - You exceeded your current quota, please check your plan and billing details	Cause: You have hit your maximum monthly spend (hard limit) which you can view in the account billing section.
// Solution: Apply for a quota increase.
// 429 - The engine is currently overloaded, please try again later	Cause: Our servers are experiencing high traffic.
// Solution: Please retry your requests after a brief wait.
// 500 - The server had an error while processing your request	Cause: Issue on our servers.
// Solution: Retry your request after a brief wait and contact us if the issue persists. Check the status page.

export class InvalidAuthenticationError extends Error {
  readonly _tag = 'InvalidAuthenticationError';
  readonly code = 401;
  constructor() {
    super('Invalid Authentication');
  }
}

export class IncorrectApiKeyError extends Error {
  readonly _tag = 'IncorrectApiKeyError';
  readonly code = 401;
  constructor() {
    super('Incorrect API key provided');
  }
}

export class NotMemberOfOrganizationError extends Error {
  readonly _tag = 'NotMemberOfOrganizationError';
  readonly code = 401;
  constructor() {
    super('You must be a member of an organization to use the API');
  }
}

export class RateLimitReachedError extends Error {
  readonly _tag = 'RateLimitReachedError';
  readonly code = 429;
  constructor() {
    super('Rate limit reached for requests');
  }
}

export class ExceededQuotaError extends Error {
  readonly _tag = 'ExceededQuotaError';
  readonly code = 429;
  constructor() {
    super(
      'You exceeded your current quota, please check your plan and billing details'
    );
  }
}

export class EngineOverloadedError extends Error {
  readonly _tag = 'EngineOverloadedError';
  readonly code = 429;
  constructor() {
    super('The engine is currently overloaded, please try again later');
  }
}

export class ServerError extends Error {
  readonly _tag = 'ServerError';
  readonly code = 500;
  constructor() {
    super('The server had an error while processing your request');
  }
}

export class RequestError extends Error {
  readonly _tag = 'RequestError';

  constructor(
    readonly reason:
      | InvalidAuthenticationError
      | IncorrectApiKeyError
      | NotMemberOfOrganizationError
      | RateLimitReachedError
      | ExceededQuotaError
      | EngineOverloadedError
      | ServerError
  ) {
    super('OpenAI Request Error');
  }
}
