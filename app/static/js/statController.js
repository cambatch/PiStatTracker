document.addEventListener('DOMContentLoaded', (event) => {
    const selectedStats = JSON.parse(document.getElementById('selectedStatsData').textContent);
    const stats = JSON.parse(document.getElementById('statsData').textContent);
   
    if (document.getElementById('singleStatView')) {
        initSingleStatView(selectedStats, stats);
    }

    if (document.getElementById('dashboardView')) {
        initDashboardView(selectedStats, stats);
    }
    
    window.toggleView = function(viewId) {
        const dashboardView = document.getElementById('dashboardView');
        const singleStatView = document.getElementById('singleStatView');
        //Toggle visibility based on the button clicked
        if (viewId === 'dashboardView') {
            dashboardView.style.display = (dashboardView.style.display === 'none') ? 'block' : 'none';
            singleStatView.style.display = 'none'; 
        } else if (viewId === 'singleStatView') {
            singleStatView.style.display = (singleStatView.style.display === 'none') ? 'block' : 'none';
            dashboardView.style.display = 'none'; 
        }
    };

    function initSingleStatView(selectedStats, stats){
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
        setInterval(updateStat, 3000); //update timer
    }

    function initDashboardView(selectedStats, stats) {
        const categories = {
            'Multi Medals': ['Double', 'Triple', 'Overkill', 'Killtacular', 'Killtrocity', 'Killimanjaro', 'Killtastrophe', 'Killpocalypse', 'Killionaire'],
            'Spree Medals': ['K Spree', 'Frenzy', 'Running Riot', 'Rampage', 'Nightmare', 'Boogeyman', 'Grim Reaper', 'Demon'],
            'Skill Medals': ['Perfect', 'No Scope', 'Quigley', 'Ninja', 'Remote Detonation'],
            'Secondary Stats': ['KD', 'Matches', 'Win %', 'Medal Count', 'Accuracy', 'Average KDA']
        };
        for (let category in categories) {
            const container = document.getElementById(`${category.toLowerCase().replace(/\s+/g, '-')}-parent`);
            container.innerHTML = ''; // Clear existing content
            //Heading
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'mb-4';
            categoryDiv.innerHTML = `<h4 class="text-title-md font-bold text-white dark:text-white">${category}</h4>`;
            container.appendChild(categoryDiv);
            // Metrics container
            const metricsDiv = document.createElement('div');
            metricsDiv.className = 'flex flex-col gap-2';
            // Loop through stats in the categories
            categories[category].forEach(stat => {
                if (selectedStats.includes(stat)) { 
                    let statValue = stats[stat];
                    if (!isNaN(statValue)) {   
                        if (statValue % 1 !== 0) {
                            statValue = statValue.toFixed(2); 
                        }
                        statValue = statValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
                    }

                    const formattedStatName = stat.replace(/\s+/g, '_'); //replace space with underscore
                    const statDiv = document.createElement('div');
                    statDiv.className = 'flex items-center justify-between';
                    statDiv.innerHTML = `
                        <div class="flex items-center gap-2">
                            <img src="/static/images/medals/${formattedStatName}.png" alt="${stat}" class="h-6">
                            <span class="text-sm font-medium text-white">${stat}</span>
                        </div>
                        <span class="text-meta-3 text-sm font-medium text-white">${statValue}</span>
                    `;
                    metricsDiv.appendChild(statDiv);
                }
            });
            container.appendChild(metricsDiv);
        }
    }
    
});
