# Environment & Runtime Configuration Notes

This application may need to run in multiple environments with different runtime behavior, integration settings, and provider configurations.

Write a short note covering the following:

- How would you approach environment-specific configuration for an Angular app that may run across multiple deployment targets (e.g. local, staging, production)?
- How would you handle cases where different environments require different providers, feature flags, API endpoints, or runtime keys?
- What configuration should be build-time versus runtime, and why?
- What risks do you see in relying too heavily on static environment files for values that may vary by deployment?
- How would you keep this approach maintainable as the number of environment-specific keys grows over time?

Then implement a simple version of your proposal in this app by adding support for:
- `staging`
- `production`

Document any assumptions or trade-offs you make.
