
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
    return this.changes.reverse();
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
        const description = document.createElement('h3');
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
    changelog.addChange(new Change("2024.08.16", "Initial release"));
    changelog.addChange(new Change("2024.08.30", "Improved field crossout",
      "- Crossing out fields now keeps the input value instead of resetting it. This allows for easier tracking of scores."
    ));
    changelog.addChange(new Change("2024.12.28", "Language support",
      "- A selection of languages are now available for the website. These include English, German and Korean."
    ));
    changelog.addChange(new Change("2025.04.26", "QR Code share",
      "- Added QR Code to share to friends."
    ));
    changelog.addChange(new Change("2025.07.07", "Translation fix & Bonus update",
      "- Fixed translation for the 'Bonus' field in English.",
      "- The bonus field shows how many points are missing to reach the bonus threshold of 63 points in the upper section.",
      "- Added flags for each language in the language selection dropdown."
    ));
    changelog.populateChangelog();
}