document.getElementById('fetchButton').addEventListener('click', function() {
    const username = document.getElementById('floatingInput').value;
    if (username.trim() === '') {
        alert('Please enter a GitHub username.');
        return;
    }

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            if (response.status === 404) {
                throw new Error('User not found');
            }
            if (!response.ok) {
                throw new Error('Error fetching repositories');
            }
            return response.json();
        })
        .then(data => {
            const repoList = document.getElementById('repoList');
            repoList.innerHTML = ''; // Clear previous results

            if (data.length === 0) {
                repoList.innerHTML = '<p>No repositories found.</p>';
                return;
            }

            data.forEach(repo => {
                const repoDiv = document.createElement('div');
                repoDiv.className = 'repo';
                repoDiv.innerHTML = `
                    <strong><a href="${repo.html_url}" target="_blank">${repo.name}</a></strong>
                    
                `;
                repoList.appendChild(repoDiv);
            });
        })
        .catch(error => {
            document.getElementById('repoList').innerHTML = `<p>${error.message}</p>`;
        });
});
