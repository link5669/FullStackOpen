```mermaid
  sequenceDiagram
  Browser->>Server: HTTP POST request to new_note
  Server->>Browser: 302 response, request for HTTP GET to the address defined in the header's location
  Note left of Browser: Reloads page
  Browser->>Server: Fetch style sheet
  Server->>Browser: Sends style sheet
  Browser->>Server: Fetch JS code
  Server->>Browser: Sends JS code
  Browser->>Server: Fetch data of the notes
  Server->>Browser: Sends data of the notes
  note over Server:
    Data is sent via POST request. Server parses data from the request and adds it to the list of notes```
