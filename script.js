// constantes
const bookList = document.querySelector(".book-list");
const bookForm = document.querySelector(".book-form");
const container = document.querySelector(".container");

// class
class Book {
    constructor(titre, auteur, annee) {
        this.titre = titre;
        this.auteur = auteur;
        this.annee = annee;
    }

    // methode ajouter un livre
    addBookToList(book) {
        // création de la rangée
        const row = document.createElement("tr");
        // création des colonnes dans la rangée
        row.innerHTML = `
        <td>${book.titre}</td>
        <td>${book.auteur}</td>
        <td>${book.annee}</td>
        <td><button class="delete">X</button></td>
        `;

        // appel de la fonction
        bookList.appendChild(row);
    }
    // méthode pour clear chaque input après soumission
    clearFields() {
        // on insert une chaine de caractères vide
        document.getElementById("titre").value = "";
        document.getElementById("auteur").value = "";
        document.getElementById("annee").value = "";
    }
    // afficher des messages
    showAlert(message, className) {
        // on crée une div
        const alert = document.createElement("div");
        // on lui donne une classe
        alert.className = `alert ${className}`;
        // on va lui rajouter du texte
        alert.appendChild(document.createTextNode(message));
        // on insert la div avant le formulaire
        container.insertBefore(alert, bookForm);
        // tempo d'affichage du message
        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 2000);
    }
}

// classe utilitaire contenant des méthodes
class Interface {
    // méthode pour la suppression
    deleteBook(target) {
        if (target.className === "delete") {
            target.parentElement.parentElement.remove();
        }
    }
}

// interagir avec le formulaire avec la soumission
bookForm.addEventListener("submit", e => {
    // prévenir le comportement par défaut d'envoyer les données
    // sur le backend ou une autre page...
    // on en veut pas envoyer les données quelque part
    // on prévient le comportement par défaut de réactualisation
    // de la page
    e.preventDefault();
    // on prend les valeurs des input pour
    // les mettre dans une constante
    const titre = document.getElementById("titre").value;
    const auteur = document.getElementById("auteur").value;
    const annee = document.getElementById("annee").value;

    // nouvel objet qui correspond au livre
    const book = new Book(titre, auteur, annee);

    // affichage du message si besoin - voir les conditions
    if (titre === "" || auteur === "" || annee === "") {
        book.showAlert("Remplissez tous les champs !", "error");
    } else {
        // message de succès
        book.showAlert("Livre ajouté à la liste !", "success");
        // on ajoute les valeurs dans le tableau
        book.addBookToList(book);

        // on clear les valeurs dans chaque input
        book.clearFields();
    }
});

// suppression d'une ligne
bookList.addEventListener("click", e => {
    const ui = new Interface();
    ui.deleteBook(e.target);
});
