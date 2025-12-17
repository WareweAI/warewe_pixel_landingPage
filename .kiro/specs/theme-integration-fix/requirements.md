# Requirements Document

## Introduction

This document outlines the requirements for fixing the theme integration functionality in the Shopify pixel analytics application. The current theme integration page is experiencing application errors due to TypeScript compilation issues and API compatibility problems with the Shopify Admin API.

## Glossary

- **Theme Integration System**: The functionality that allows merchants to inject pixel tracking scripts into their Shopify themes
- **Script Injection Service**: The server-side service responsible for managing Shopify Script Tags for pixel tracking
- **Shopify Admin API**: The API used to interact with Shopify store data and functionality
- **AdminApiContext**: The TypeScript interface provided by Shopify's authentication system
- **Script Tag**: A Shopify resource that allows apps to inject JavaScript into a store's theme
- **Pixel Tracking Script**: The JavaScript code that tracks user interactions and sends analytics data

## Requirements

### Requirement 1

**User Story:** As a merchant, I want to access the theme integration page without encountering application errors, so that I can set up pixel tracking on my Shopify store.

#### Acceptance Criteria

1. WHEN a merchant navigates to the theme integration page, THE Theme Integration System SHALL load without TypeScript compilation errors
2. WHEN the page loads, THE Theme Integration System SHALL display the available pixels and integration options
3. WHEN there are no pixels created, THE Theme Integration System SHALL show an appropriate empty state message
4. WHEN the system encounters an error, THE Theme Integration System SHALL display a user-friendly error message instead of crashing

### Requirement 2

**User Story:** As a merchant, I want to inject pixel tracking scripts into my theme automatically, so that I can track user behavior without manual code changes.

#### Acceptance Criteria

1. WHEN a merchant clicks "Inject Script", THE Script Injection Service SHALL create a Shopify Script Tag using the correct API methods
2. WHEN the script injection is successful, THE Theme Integration System SHALL update the UI to show the script is active
3. WHEN the script injection fails, THE Theme Integration System SHALL display the specific error message to the user
4. WHEN a script is already injected, THE Theme Integration System SHALL prevent duplicate injections and show current status

### Requirement 3

**User Story:** As a merchant, I want to remove pixel tracking scripts from my theme, so that I can disable tracking when needed.

#### Acceptance Criteria

1. WHEN a merchant clicks "Remove Script", THE Script Injection Service SHALL delete the corresponding Shopify Script Tag
2. WHEN the script removal is successful, THE Theme Integration System SHALL update the UI to show the script is no longer active
3. WHEN the script removal fails, THE Theme Integration System SHALL display an appropriate error message
4. WHEN no script exists to remove, THE Script Injection Service SHALL handle the operation gracefully without errors

### Requirement 4

**User Story:** As a developer, I want the script injection service to use the correct Shopify API interfaces, so that the application compiles and runs without TypeScript errors.

#### Acceptance Criteria

1. WHEN the Script Injection Service interacts with Shopify's Admin API, THE service SHALL use the correct GraphQL API methods instead of deprecated REST API methods
2. WHEN handling configuration objects, THE Script Injection Service SHALL properly type all object spread operations
3. WHEN dealing with nullable values, THE Script Injection Service SHALL handle null and undefined values appropriately
4. WHEN the service is compiled, THE TypeScript compiler SHALL not report any type errors

### Requirement 5

**User Story:** As a merchant, I want to create and manage custom events for tracking specific user interactions, so that I can gather detailed analytics about user behavior.

#### Acceptance Criteria

1. WHEN a merchant creates a custom event, THE Theme Integration System SHALL store the event configuration in the database
2. WHEN displaying custom events, THE Theme Integration System SHALL show all active events with their configuration details
3. WHEN a merchant deletes a custom event, THE Theme Integration System SHALL mark the event as disabled in the database
4. WHEN generating integration code, THE Theme Integration System SHALL include all active custom events in the generated script

### Requirement 6

**User Story:** As a merchant, I want to view and copy the theme integration code, so that I can manually add pixel tracking to my theme if needed.

#### Acceptance Criteria

1. WHEN a merchant requests the integration code, THE Theme Integration System SHALL generate valid JavaScript code with the correct pixel configuration
2. WHEN the code is displayed, THE Theme Integration System SHALL format it in a readable manner with proper syntax highlighting
3. WHEN a merchant clicks "Copy Code", THE Theme Integration System SHALL copy the generated code to the clipboard
4. WHEN custom events are configured, THE Theme Integration System SHALL include them in the generated integration code