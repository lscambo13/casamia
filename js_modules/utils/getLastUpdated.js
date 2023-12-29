export function getLastUpdated(id) {
	fetch('https://api.github.com/repos/lscambo13/casamia/commits/HEAD')
		.then((response) => {
			response.json().then((response) => {
				const date = new Date(response.commit.committer.date);
				let time = date.toISOString();
				time = time.slice(0, time.length - 5);
				time = time
					.replaceAll('T', '-')
					.replaceAll(':', '')
					.replaceAll('-', '.');
				const element = document.getElementById(id);
				element.innerHTML = `Version ${time}`;
			});
		}).catch((e) => {
			console.error('getLastUpdated', e);
		});
}
