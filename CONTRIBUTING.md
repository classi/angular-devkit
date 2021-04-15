# Contributing to classi/angular-devkit

We would love for you to contribute to DevKit and help make it even better than it is today! As a contributor, here are the guidelines we would like you to follow:

## Code of Conduct

There is still no code of conduct for classi/angular-devkit.

## Found an Issue?

If you find a bug in the source code or a mistake in the documentation, you can help us by [submitting an issue](https://github.com/classi/angular-devkit/issues). Even better, you can [submit a Pull Request](https://github.com/classi/angular-devkit/pulls) with a fix.

## Feature Requests

You can request a new feature by submitting an issue to our GitHub Repository. If you would like to implement a new feature, please submit an issue with a proposal for your work first, to be sure that we can use it. Please consider what kind of change it is:

- For a **Major Feature**, first [open an issue](https://github.com/classi/angular-devkit/issues) and outline your proposal so that it can be discussed. This will also allow us to better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it is successfully accepted into the project.
- **Small Features** can be crafted and directly [submitted as a Pull Request](https://github.com/classi/angular-devkit/pulls).

## Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes **must be tested** by one or more specs (unit-tests or e2e-tests).
- All public API methods **must be documented**. (Details TBC).

## Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to more readable messages that are easy to follow when looking through the project history. But also, we use the git commit messages to generate the Angular DevKit change log.

### Commit Message Format

Each commit message must follow [conventional commits format](https://www.conventionalcommits.org/en/v1.0.0/) like the below:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### Type

- feat: Creates a new feature
- fix: Fixes a previously discovered failure/bug
- build: Changes to local repository build system and tooling
- ci: Changes to CI configuration and CI specific tooling
- docs: Changes which exclusively affects documentation.
- perf: Improves performance without any change in functionality or API
- refactor: Refactor without any change in functionality or API (includes style changes)
- release: A release point in the repository
- test: Improvements or corrections made to the project's test suite

### Scope

- `google-analytics`
- `ngrx-extensions`
- `demoapp`

### Subject

- Both Japanese and English are OK.
- If you use English;
  - use the imperative, present tense: "change" not "changed" nor "changes"
  - don't capitalize first letter
  - be concise and direct
  - no dot (.) at the end
- 日本語で書く場合
  - 現在形で書くこと: "変更した" ではなく "変更する"
  - 簡潔に書くこと
  - 文末の`。`は不要
