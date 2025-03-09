# CLI Request Utility

A simple Node.js command-line tool for making HTTP requests with configurable headers and body.

## Features

- Supports standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`).
- Allows custom headers and request body.
- Validates input URLs and request methods.
- Provides clear, formatted output messages.

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Usage

Run the CLI tool with the following syntax:

```bash
node index.js [options] <name> <url>
```

### Options

- `-h, --headers <headers>`: Specify request headers (JSON format).
- `-b, --body <char>`: Request body content.

### Examples

```bash
# Simple GET request
node index.js GET https://example.com

# POST request with headers and body
node index.js POST https://example.com -h '{"Content-Type":"application/json"}' -b '{"key":"value"}'
```

### Testing

```bash
# Run all tests that are located in ./tests/cli-helpers.test.js
npm test
```

## Supported HTTP Methods

- GET
- POST
- PUT
- DELETE
- PATCH

## Features

- Validates URLs
- Validates HTTP methods
- Styled logging for enhanced readability
- Loading indicator for requests

## Dependencies

- `commander`: Parses command-line arguments
- `loading-cli`: Provides visual loading spinner
- `chalk`: Colored terminal output

## Contributing

Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.

