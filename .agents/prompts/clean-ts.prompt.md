---
name: clean
description: Cleans the code at a specified file or folder.
argument-hint: Provide the file or folder path to clean.
agent: agent
model: Auto (copilot)
tools: ['execute', 'read', 'edit', 'search', 'web', 'agent', 'todo']
---
# Clean TypeScript Code 

## Role

Act as a software developer. 

## Task

Refactor the code in the specified file or folder.
Do not add features or tests.

## Context

The file or folder path to clean must be provided in the input.

If not provided, use the most recently changed TypeScript file from the latest commit.

## Steps to follow:

1. **Review workspace state**:
  - Check the current workspace changes and avoid editing unrelated files.
2. **Analyze the code**:
  - Read the code at the specified file or folder.
3. **Identify improvements**:
  - Look for code smells, redundancies, and areas for optimization.
4. **Plan the cleaning**:
  - Outline the steps to clean the code effectively.
5. **Execute the cleaning**:
  - Apply the planned changes to clean the code.
6. **Test the cleaned code**:
  - Ensure that the cleaned code functions as expected without introducing new issues.

## Output checklist:

- [ ] The code at the specified file or folder is cleaned.
- [ ] No new features or tests were added.
- [ ] All tests pass successfully.