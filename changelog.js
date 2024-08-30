
// Holds the version number, a description of the change, and any additional details.
class Change {
    constructor(version, description, details = "") {
        this.version = version;
        this.description = description;
        this.details = details;
    }

    getVersion() {
        return this.version;
    }

    getDescription() {
        return this.description;
    }

    getDetails() {
        return this.details;
    }

    setDetails(details) {
        this.details = details;
    }
}

// The Changelog class holds an array of Change objects and provides methods to add and retrieve them.
class Changelog {
  constructor() {
    this.changes = [];
  }

  addChange(change) {
    this.changes.push(change);
  }

  getChanges() {
    return this.changes;
  }

  populateChangelog(){
    const changelogDiv = document.getElementById('changelog');
    
    this.getChanges().forEach(change => {
        // Create a container div for each change
        const changeDiv = document.createElement('div');
        changeDiv.className = 'change';

        // Create and append the version
        const version = document.createElement('h2');
        version.textContent = `Version ${change.getVersion()}`;
        changeDiv.appendChild(version);

        // Create and append the description
        const description = document.createElement('p');
        description.textContent = change.getDescription();
        changeDiv.appendChild(description);

        // If there are details, create and append them
        if (change.getDetails()) {
            const details = document.createElement('p');
            details.textContent = change.getDetails();
            changeDiv.appendChild(details);
        }

        // Append the changeDiv to the changelogDiv
        changelogDiv.appendChild(changeDiv);
    });
  }
}


// On page load, create a new Changelog object and populate it with Change objects.
window.onload = function() {
    let changelog = new Changelog();
    
    let change1 = new Change("2024.08.16", "Initial release");
    changelog.addChange(change1);

    let change2 = new Change("2024.08.30", "Improved field crossout",
       "Crossing out fields now keeps the input value instead of resetting it. This allows for easier tracking of scores."
    );
    changelog.addChange(change2);

    changelog.populateChangelog();
}