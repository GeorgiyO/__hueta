let request = new XMLHttpRequest();
request.open("GET", "/ajax/get-public-projects-list", false);
request.send();
if (request.status === 200) {
    setContent(request.responseText);
}

function setContent(response) {
    response = JSON.parse(response);
    response.children.forEach((child) => {
        decompose(document.body, [], child);
    })
}

function decompose(parentNode, path, element) {
    let name = element.name;
    let children = element.children;
    path.push(name);

    if (children) {
        let p = document.createElement("p");
        p.innerText = name;
        parentNode.appendChild(p);

        let ul = document.createElement("ul");
        children.forEach((child) => {
            let li = document.createElement("li");
            ul.appendChild(li);
            decompose(li, [...path], child);
        });
        parentNode.appendChild(ul);
    } else {
        let a = document.createElement("a");
        a.innerText = name;
        a.href = "/root/" + path.join("-");
        parentNode.appendChild(a);
    }
}