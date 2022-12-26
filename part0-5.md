Note over Browser: The browser gets the form element and immediately prevents it from submitting the data to the server. Instead, it creates a new note locally and rerenders the notes list on the page
Browser->>Server: A 201 POST request with JSON data containing the note added and the time it was created
