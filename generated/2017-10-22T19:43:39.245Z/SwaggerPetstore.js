export default class SwaggerPetstore {


	constructor(basePath) {
		this.basePath = basePath.replace(/\/+$/, '') || 'http://petstore.swagger.io/v2';
	}

	/**
	 * 
	**/
	async updateAnExistingPet(securityToken, body) {
		if (!securityToken || securityToken == '') {
			throw new Error('Update an existing pet requires [securityToken] parameter');
		}
		if (!body || body == '') {
			throw new Error('Update an existing pet requires [body] parameter');
		}
		if (!body['name'] || body['name'] == '') {
			throw new Error('Update an existing pet requires [body[\'name\']] parameter. An example value is [doggie]');
		}
		if (!body['photoUrls'] || body['photoUrls'] == '') {
			throw new Error('Update an existing pet requires [body[\'photoUrls\']] parameter. An example value is [null]');
		}
		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Authorization', `Bearer ${securityToken}`);
		headers.append('Content-Type', 'application/json');


		const request = new Request(this.basePath + `/pet`,
			{
				headers: headers,
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(body)
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * 
	**/
	async addANewPetToTheStore(securityToken, body) {
		if (!securityToken || securityToken == '') {
			throw new Error('Add a new pet to the store requires [securityToken] parameter');
		}
		if (!body || body == '') {
			throw new Error('Add a new pet to the store requires [body] parameter');
		}
		if (!body['name'] || body['name'] == '') {
			throw new Error('Add a new pet to the store requires [body[\'name\']] parameter. An example value is [doggie]');
		}
		if (!body['photoUrls'] || body['photoUrls'] == '') {
			throw new Error('Add a new pet to the store requires [body[\'photoUrls\']] parameter. An example value is [null]');
		}
		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Authorization', `Bearer ${securityToken}`);
		headers.append('Content-Type', 'application/json');


		const request = new Request(this.basePath + `/pet`,
			{
				headers: headers,
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(body)
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * Multiple status values can be provided with comma separated strings
	**/
	async findsPetsByStatus(securityToken, status) {
		if (!securityToken || securityToken == '') {
			throw new Error('Finds Pets by status requires [securityToken] parameter');
		}
		if (!status || status == '') {
			throw new Error('Finds Pets by status requires [status] parameter');
		}
		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Authorization', `Bearer ${securityToken}`);
		headers.append('Content-Type', 'application/json');

		const queryParams = [];
		queryParams.push({name: 'status', value:status});


		const queryParamsString = queryParams.map((param) => {
			if (param.value) {
				return `${param.name}=${param.value}`;
			} else {
				return null;
			}
		}).filter((param) => param !== null)
		.reduce((accumulator, param) => accumulator + param);

		const request = new Request(this.basePath + `/pet/findByStatus${queryParamsString.length>0?`?${queryParamsString}`:''}`,
			{
				headers: headers,
				method: 'GET',
				credentials: 'include'
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
	**/
	async findsPetsByTags(securityToken, tags) {
		if (!securityToken || securityToken == '') {
			throw new Error('Finds Pets by tags requires [securityToken] parameter');
		}
		if (!tags || tags == '') {
			throw new Error('Finds Pets by tags requires [tags] parameter');
		}
		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Authorization', `Bearer ${securityToken}`);
		headers.append('Content-Type', 'application/json');

		const queryParams = [];
		queryParams.push({name: 'tags', value:tags});


		const queryParamsString = queryParams.map((param) => {
			if (param.value) {
				return `${param.name}=${param.value}`;
			} else {
				return null;
			}
		}).filter((param) => param !== null)
		.reduce((accumulator, param) => accumulator + param);

		const request = new Request(this.basePath + `/pet/findByTags${queryParamsString.length>0?`?${queryParamsString}`:''}`,
			{
				headers: headers,
				method: 'GET',
				credentials: 'include'
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * 
	**/
	async deletesAPet(securityToken, apiKey, petid) {
		if (!securityToken || securityToken == '') {
			throw new Error('Deletes a pet requires [securityToken] parameter');
		}
		if (!petid || petid == '') {
			throw new Error('Deletes a pet requires [petid] parameter');
		}
		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Authorization', `Bearer ${securityToken}`);
		headers.append('Content-Type', 'application/json');


		const request = new Request(this.basePath + `/pet/${petid}`,
			{
				headers: headers,
				method: 'DELETE',
				credentials: 'include'
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * 
	**/
	async updatesAPetInTheStoreWithFormData(securityToken, petid, name, status) {
		if (!securityToken || securityToken == '') {
			throw new Error('Updates a pet in the store with form data requires [securityToken] parameter');
		}
		if (!petid || petid == '') {
			throw new Error('Updates a pet in the store with form data requires [petid] parameter');
		}
		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Authorization', `Bearer ${securityToken}`);
		headers.append('Content-Type', 'application/json');


		const request = new Request(this.basePath + `/pet/${petid}`,
			{
				headers: headers,
				method: 'POST',
				credentials: 'include'
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * Returns a single pet
	**/
	async findPetById(securityToken, petid) {
		if (!securityToken || securityToken == '') {
			throw new Error('Find pet by ID requires [securityToken] parameter');
		}
		if (!petid || petid == '') {
			throw new Error('Find pet by ID requires [petid] parameter');
		}
		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Authorization', `Bearer ${securityToken}`);
		headers.append('Content-Type', 'application/json');


		const request = new Request(this.basePath + `/pet/${petid}`,
			{
				headers: headers,
				method: 'GET',
				credentials: 'include'
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * 
	**/
	async uploadsAnImage(securityToken, petid, additionalmetadata, file) {
		if (!securityToken || securityToken == '') {
			throw new Error('uploads an image requires [securityToken] parameter');
		}
		if (!petid || petid == '') {
			throw new Error('uploads an image requires [petid] parameter');
		}
		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Authorization', `Bearer ${securityToken}`);
		headers.append('Content-Type', 'application/json');


		const request = new Request(this.basePath + `/pet/${petid}/uploadImage`,
			{
				headers: headers,
				method: 'POST',
				credentials: 'include'
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * Returns a map of status codes to quantities
	**/
	async returnsPetInventoriesByStatus(securityToken) {
		if (!securityToken || securityToken == '') {
			throw new Error('Returns pet inventories by status requires [securityToken] parameter');
		}
		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Authorization', `Bearer ${securityToken}`);
		headers.append('Content-Type', 'application/json');


		const request = new Request(this.basePath + `/store/inventory`,
			{
				headers: headers,
				method: 'GET',
				credentials: 'include'
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * 
	**/
	async placeAnOrderForAPet(body) {
		if (!body || body == '') {
			throw new Error('Place an order for a pet requires [body] parameter');
		}


		const request = new Request(this.basePath + `/store/order`,
			{
				headers: headers,
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(body)
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
	**/
	async deletePurchaseOrderById(orderid) {
		if (!orderid || orderid == '') {
			throw new Error('Delete purchase order by ID requires [orderid] parameter');
		}


		const request = new Request(this.basePath + `/store/order/${orderid}`,
			{
				headers: headers,
				method: 'DELETE',
				credentials: 'include'
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
	**/
	async findPurchaseOrderById(orderid) {
		if (!orderid || orderid == '') {
			throw new Error('Find purchase order by ID requires [orderid] parameter');
		}


		const request = new Request(this.basePath + `/store/order/${orderid}`,
			{
				headers: headers,
				method: 'GET',
				credentials: 'include'
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * This can only be done by the logged in user.
	**/
	async createUser(body) {
		if (!body || body == '') {
			throw new Error('Create user requires [body] parameter');
		}


		const request = new Request(this.basePath + `/user`,
			{
				headers: headers,
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(body)
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * 
	**/
	async createsListOfUsersWithGivenInputArray(body) {
		if (!body || body == '') {
			throw new Error('Creates list of users with given input array requires [body] parameter');
		}


		const request = new Request(this.basePath + `/user/createWithArray`,
			{
				headers: headers,
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(body)
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * 
	**/
	async createsListOfUsersWithGivenInputArray(body) {
		if (!body || body == '') {
			throw new Error('Creates list of users with given input array requires [body] parameter');
		}


		const request = new Request(this.basePath + `/user/createWithList`,
			{
				headers: headers,
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(body)
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * 
	**/
	async logsUserIntoTheSystem(username, password) {
		if (!username || username == '') {
			throw new Error('Logs user into the system requires [username] parameter');
		}
		if (!password || password == '') {
			throw new Error('Logs user into the system requires [password] parameter');
		}

		const queryParams = [];
		queryParams.push({name: 'username', value:username});
		queryParams.push({name: 'password', value:password});


		const queryParamsString = queryParams.map((param) => {
			if (param.value) {
				return `${param.name}=${param.value}`;
			} else {
				return null;
			}
		}).filter((param) => param !== null)
		.reduce((accumulator, param) => accumulator + param);

		const request = new Request(this.basePath + `/user/login${queryParamsString.length>0?`?${queryParamsString}`:''}`,
			{
				headers: headers,
				method: 'GET',
				credentials: 'include'
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * 
	**/
	async logsOutCurrentLoggedInUserSession() {


		const request = new Request(this.basePath + `/user/logout`,
			{
				headers: headers,
				method: 'GET',
				credentials: 'include'
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * This can only be done by the logged in user.
	**/
	async deleteUser(username) {
		if (!username || username == '') {
			throw new Error('Delete user requires [username] parameter');
		}


		const request = new Request(this.basePath + `/user/${username}`,
			{
				headers: headers,
				method: 'DELETE',
				credentials: 'include'
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * This can only be done by the logged in user.
	**/
	async updatedUser(username, body) {
		if (!username || username == '') {
			throw new Error('Updated user requires [username] parameter');
		}
		if (!body || body == '') {
			throw new Error('Updated user requires [body] parameter');
		}


		const request = new Request(this.basePath + `/user/${username}`,
			{
				headers: headers,
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(body)
			});

		return await fetch(request).then(response => response.json());
	}

	/**
	 * 
	**/
	async getUserByUserName(username) {
		if (!username || username == '') {
			throw new Error('Get user by user name requires [username] parameter');
		}


		const request = new Request(this.basePath + `/user/${username}`,
			{
				headers: headers,
				method: 'GET',
				credentials: 'include'
			});

		return await fetch(request).then(response => response.json());
	}

}