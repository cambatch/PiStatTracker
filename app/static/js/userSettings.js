document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('selected');
    });
});

document.getElementById('saveButton').addEventListener('click', function() {
    let selections = [];

    document.querySelectorAll('.category-item.selected').forEach(function(item) {
        selections.push(item.textContent);
    });

    fetch('/save-settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({selections: selections})
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch((error) => {
        console.log("Error: ", error)
    });
});