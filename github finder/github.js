class Github {
	constructor() {
		this.client_id = 'ca32ef40eadc029e07d6';
		this.client_secret = 'd17b85ec5d97e89f99da202179afd4a64d72da25';
		this.repos_count = 10;
		this.repos_sort = 'created: asc';
	}

	async getUser(user) {
		const profileResponse = await fetch(
			`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
		);
		// Now if you want to see all the "repositories" that particular user has created then the url is slightly different than the url that we have written in line 11 and the difference is that after "${user}" we have to add a word called "repos" as shown in the green-circle of page-1.png but the problem is that suppose a particular user has made "thousands" of repositories if you only write the url in the form as told in the green-circle of page-1.png then all the thousand repositories will be displayed on the screen but if we want  only 5 or 6 of those repositories to be displayed on the website then what we do is add to the url of green-circle of page-1.png "?per_page=${this.repos_count}" as shown in the below line then only 5 repositories will show up(because of line 5).But still now there is one problem normally we want to see the 5 "recent" repositories but instead of line 15 if we write "https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}" then any 5 random repositories will be displayed but if you want only the recent repositories to be shown we write the url given in line 15
		const repoResponse = await fetch(
			`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
		);

		const profile = await profileResponse.json();
		const repos = await repoResponse.json(); // Dont forget this line which is also imporataant just like the above line
		// Now in line 15 of lecture 73 we have discussed that we dont know exactly why we had returned an object but now the actual reason why we have returned has been explained in the last couple of lines of the lecture
		return {
			profile,
			repos,
		};
	}
}
// Now as soon as the interpreter see the word "return" then the innterpreter will not look any further part of that function and exist the function as soon as it see's the word "return" so logically suppose instead of writing line 21 to line 24 if we write :-
//return profile;
//return repos;
// Now if we write line 28 and line 29 instead of writing line 21 to line 24 then the interpreter will only return the "profile" variable of line 28 and wont return "repos" variable of line 29 because of the reason told in line 27
