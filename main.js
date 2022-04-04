'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}
    

const tempClient = {
    nome: "Ferri Alves",
    email: "angelo@gmail.com",
    celular: "21970004273",
    cidade: "cabo frio"
}

const getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

    //CRUD

const updateClient = (index,client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}
const readClient = () => getLocalStorage()

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client) 
    setLocalStorage(dbClient)
}
const clearFields = () =>{
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field =>field.value = "")
}
var saveClient = () => {
    let nomeClienteNovo = document.getElementById('name').value
    if (nomeClienteNovo == ""){
        alert('insira um nome')
    }else{
        const client = {
            nome : document.getElementById('name').value,
            email : document.getElementById('email').value,
            celular : document.getElementById('tel').value,
            cidade : document.getElementById('city').value
        }
    createClient(client)
    closeModal()
    updateTable();
    }
}
const createRow = (client) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green">editar</button>
            <button type="button" class="button red">excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}
const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row =>row.parentNode.removeChild(row))
}
const updateTable = () => {
    const dbClient = readClient()
    clearTable();
    dbClient.forEach(createRow)
}


document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)


document.getElementById('salvar').addEventListener('click', saveClient)
updateTable();