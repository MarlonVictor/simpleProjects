class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class UI {
    static displayBooks() {
        const books = Storage.getBooks()

        books.forEach(book => UI.addBookToList(book))
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list')
        const row = document.createElement('tr')

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `

        list.appendChild(row)
    }

    static deleteBook(e) {
        if(e.classList.contains('delete')) {
            e.parentElement.parentElement.remove()
        }
    }

    // Menssagem de alerta personalizada
    static showAlert(msg, className) {
        const div = document.createElement('div')
        div.className = `alert alert-${className} text-center`
        div.appendChild(document.createTextNode(msg))

        const container = document.querySelector('.container')
        const form = document.querySelector('#form')
        container.insertBefore(div, form)

        setTimeout(() => document.querySelector('.alert').remove(), 2500)
    }
}

class Storage {
    static getBooks() {
        let books

        if(localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }

    static addBook(book) {
        const books = Storage.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn) {
        const books = Storage.getBooks()

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1)
            }
        })

        localStorage.setItem('books', JSON.stringify(books))
    }
}

// Atualiza a lista
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Adicionar livro
document.querySelector('.btn-block').addEventListener('click', e => {
    const title = document.querySelector('#title')
    const author = document.querySelector('#author')
    const isbn = document.querySelector('#isbn')

    if(title.value === '' || author.value === '' || isbn.value === '')
        UI.showAlert('Por favor, complete todos os campos!', 'danger')
    else {
        const book = new Book(title.value, author.value, isbn.value)
        UI.showAlert('Seu livro foi salvo!', 'success')

        // Adicionando no UI e no localStorage
        UI.addBookToList(book)
        Storage.addBook(book)
        
        // Limpar inputs
        title.value=author.value=isbn.value = ''
    }
})

// Deletar Livro
document.querySelector('#book-list').addEventListener('click', e => {
    UI.showAlert('Livro removido', 'warning')

    // Removendo do UI e do localStorage
    UI.deleteBook(e.target)
    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent)
})