const $ = selector => {
    const element = document.querySelectorAll(selector)
    return element > 1 ? element : element[0]
}
window.onload = async () => {
    const data = await fetch("http://localhost:8080/").then(res => res.json())
    data.Users.forEach(elm => {
        createTable.bind(elm)()
    })
}
$("form").onsubmit = function (event) {
    event.preventDefault()
    const file = new FormData(this)
    const data = Object.fromEntries(file)
    submitData.bind(data)()
    clear()
}
function submitData() {
    if (this.name == "" || this.age == "" || this.gender == "") {
        alert("preencha todos os campos")
        return
    }
    fetch("http://localhost:8080/", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            name: this.name.toUpperCase(),
            age: Number(this.age),
            gender: this.gender.toUpperCase( v),
        })
    })
        .then(res => res.json())
        .then(data => {
            createTable.bind(data)()
        })
}
function createTable() {
    $("tbody").innerHTML += `
        <tr data-id = ${this.id} onclick="deleteClient(this)">
            <td>${this.name}</td>
            <td>${this.age}</td>
            <td>${this.gender}</td>
        </tr>
    `
}
function deleteClient(elm) {
    const response = confirm("Deseja excluir da lista?")
    if (response) {
        $("tbody").removeChild(elm)
        fetch("http://localhost:8080/", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "DELETE",
            body: JSON.stringify({
                id: Number(elm.dataset.id),
            })
        })
    }
}
function clear() {
    ((selector) => {
        selector.forEach(elm => {
            $(elm).value = ""
        })
        $(selector[0]).focus()
    })(["#name", " #age"])
}

