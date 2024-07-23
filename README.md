# Understanding automation
> Since the testing humans actually do cannot be put into words, it cannot be encoded and therefore cannot be automated. We should not use a term that implies it can be.   --- James Bach & Michael Bolton from *A Context-Driven Approach to Automation in Testing*

> **Output Checks.** Mechanized or mechanizable processes for gathering product observations and evaluating them. A test is always human-guided, whereas a check, by definition, can be completely automated. A test often includes one or more checks, but a check cannot include a test.   --- James Bach, Jonathan Bach & Michael Bolton from *Elements of Excellent Testing*

The two quotes above lay a groundwork for how use of this software should proceed. It is not without the human's intervention that any script here can be utilized. Therefore, what are commonly referred to as "test scripts" will instead be referred to as "check scripts" here.

# Check2U
This software is designed to allow the quick implementation of check scripts. Check scripts can be added to the software and then run with any parameters defined from within the script itself.

Currently, Check2U can only run python-based scripts written in the [Appium](https://appium.io/docs/en/latest/) framework.

## Running scripts

To run a script, select the script you want to run, fill out any input fields you choose to alter, and then click the 'Run Test' button.

## Future Goals

- Create sections based on script OS type
- Add analytics for scripts that have been run
    - Create database for script analytics
- Create a quick script creation tool on the frontend for smaller tests

