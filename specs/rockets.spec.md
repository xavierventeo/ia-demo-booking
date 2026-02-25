# Rocket Management API Specification
## Problem Description
- As a travel operations manager, I want to create, update, and remove rocket records so that the booking system stays accurate.
- As a booking agent, I want to list and view rocket details so that I can match customers to suitable routes.
- As a system integrator, I want the API to validate rocket data so that downstream services receive reliable inputs.
## Solution Overview
- Application: Provide a single Rocket Management API with endpoints to create, read, update, and delete rockets, returning consistent JSON responses.
- Logic: Validate required fields, enforce allowed `range` values and `capacity` limits, and return clear validation or not-found errors.
- Infrastructure: Store rocket records in the existing data store and expose the API through the current service runtime with standard logging and error handling.
## Acceptance Criteria
```gherkin
Feature: Rocket Management API

	Scenario: Create a rocket with valid fields
		Given a client has a rocket payload with name, range, and capacity
		When the client sends a create request
		Then the system creates the rocket record
		And the system returns the created rocket in the response

	Scenario: Reject create or update when name is missing
		Given a client has a rocket payload without name
		When the client sends a create or update request
		Then the system rejects the request with a validation error

	Scenario: Reject create or update when range is invalid
		Given a client has a rocket payload with range outside suborbital, orbital, moon, or mars
		When the client sends a create or update request
		Then the system rejects the request with a validation error

	Scenario: Reject create or update when capacity is out of bounds
		Given a client has a rocket payload with capacity outside 1 to 10
		When the client sends a create or update request
		Then the system rejects the request with a validation error

	Scenario: List all rockets
		Given rocket records exist
		When the client requests the rocket list
		Then the system returns all rocket records

	Scenario: Get an existing rocket by identifier
		Given a rocket record exists for the requested identifier
		When the client requests the rocket by identifier
		Then the system returns the rocket record

	Scenario: Get a rocket by identifier that does not exist
		Given no rocket record exists for the requested identifier
		When the client requests the rocket by identifier
		Then the system returns a not-found error

	Scenario: Update an existing rocket
		Given a rocket record exists for the requested identifier
		And the client has valid updated fields
		When the client sends an update request
		Then the system persists the changes
		And the system returns the updated rocket record

	Scenario: Delete an existing rocket
		Given a rocket record exists for the requested identifier
		When the client sends a delete request
		Then the system removes the rocket record
		And the system confirms deletion
```
