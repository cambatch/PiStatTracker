document.addEventListener('DOMContentLoaded', (event) => {
    const selectedStats = JSON.parse(document.getElementById('selectedStatsData').textContent);
    const stats = JSON.parse(document.getElementById('statsData').textContent);
    let currentIndex = 0;

    function updateStat() {
        const statName = selectedStats[currentIndex];
        const formattedStatName = statName.replace(/\s+/g, '_'); // replace space with underscore if needed
        let statValue = stats[statName];
        if (!isNaN(statValue)) { //check if value's a number
            if (statValue % 1 !== 0) {
                statValue = statValue.toFixed(2); //round floats 
            }
            statValue = statValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //commas for thousand, hundred thousand, etc.
        }

        // prepare the new image
        const newImage = new Image();
        newImage.onload = function() {
            // prevent desync and update once the image is loaded
            document.getElementById('dynamicStatName').textContent = statName.charAt(0).toUpperCase() + statName.slice(1); // Capitalize first letter
            document.getElementById('dynamicStatValue').textContent = statValue;
            document.getElementById('dynamicStatImage').src = this.src; //use the loaded image's src
        };
        // Set the source of the new image to start loading it
        newImage.src = `/static/images/medals/${formattedStatName}.png`;

        currentIndex = (currentIndex + 1) % selectedStats.length; //cycle through stats
    }

    updateStat(); //update immediately on load
    setInterval(updateStat, 3000); //update timer
});
