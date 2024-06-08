import Project from "./Project";

export function viewAllTodo() {
	// function returns true if the storage has no values stored
	const isObjectEmpty = (objectName) => {
		return (
			Object.keys(objectName).length === 0 &&
			objectName.constructor === Object
		);
	};

	const content = document.getElementById("content");

	// generating headers text
	const h1 = document.createElement("h1");
	const h1TextNode = document.createTextNode("Viewing all Todos");
	h1.appendChild(h1TextNode);
	content.appendChild(h1);

	let storage = { ...localStorage };
	// if storage is empty, return valid value
	if (isObjectEmpty(storage)) {
		const p = document.createElement("p");
		p.innerHTML = "There are currently no todos found!";
		content.appendChild(p);
		return;
	}

	// generating table n its headers
	const table = document.createElement("table");
	table.classList.add("todo-table");
	const tr = document.createElement("tr");
	const tableHeaders = ["Title", "Due date", "Priority", "Description"];

	for (let i = 0; i < tableHeaders.length; i++) {
		const th = document.createElement("th");
		th.innerHTML = tableHeaders[i];
		tr.appendChild(th);
	}

	table.appendChild(tr);

	for (var key in storage) {
		// retrieving all project data from storage and getting its project list after
		const projectData = JSON.parse(storage[key]);
		var project = new Project(projectData.name, projectData.projectList);
		var projectList = project.getProjectList;

		// generate new row for each todo in the project
		for (let i = 0; i < projectList.length; i++) {
			const tr = document.createElement("tr");
			for (var todoKey in projectList[i]) {
				console.log("todo", todoKey);
				const td = document.createElement("td");
				td.innerHTML = projectList[i][todoKey];
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
	}

	content.appendChild(table);

	return content;
}
