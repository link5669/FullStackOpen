sequenceDiagram
Browser->>Server: HTTP POST request to new_note
Server->>Browser: 302 response, request for HTTP GET to the address defined in the header's location
