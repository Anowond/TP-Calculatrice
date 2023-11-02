/* Récuparation du body */

let body = document.querySelector("body");

/* Création de la div "container" qui contiendra la calculatrice */

let container = document.createElement("div");
container.classList.add("container");
body.appendChild(container);

/* Création de la div d'affichage */

let affichage = document.createElement("div");
affichage.classList.add("affichage");
container.appendChild(affichage);

/* Création de la div contenant le pavé numérique */

let divNum = document.createElement("div");
divNum.classList.add("divNum");
container.appendChild(divNum);

/* Création de la div contenant le pavé des oprérations */

let divOps = document.createElement("div");
divOps.classList.add("divOps");
container.appendChild(divOps);

/* Création de la div séparée "divEqual" corréspondant au signe "=" (séparée du reste car plus simple à gérer par la suite) */

let divEqual = document.createElement("div");
divEqual.classList.add("toucheOps");
divEqual.setAttribute("id", "=");
divEqual.textContent = "=";

/* Création de la div séparée "divClear" corréspondant au signe "C" (séparée du reste car plus simple à gérer par la suite) */

let divClear = document.createElement("div");
divClear.classList.add("toucheOps");
divClear.setAttribute("id", "C");
divClear.textContent = "C";

/* Création des tableaux contenants le pavé numérique, ainsi que pavé des opérations */

let paveNumerique = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
let paveOpérations = ["+", "-", "*", "/",];

/* Création d'une variable "number" dont le rôle sera de stocker temporairement les chiffres avant leur saisie dans le tableau "tableauNumber" */

let number = "";

/* Création d'une variable "operation" dont le rôle sera de stocker temporairement l'opération avant sa saisie dans le tableau "tableauNumber" */

let operation = "";

/* Création du tableau "tableauNumber" */

let tableauNumber = [];

/* Déclaration des fonctions de calcul */

function addition(num1, num2) {
    let resultat = num1 + num2;
    return resultat;
}

function soustraction(num1, num2) {
    let resultat = num1 - num2;
    return resultat;
}

function multiplication(num1, num2) {
    let resultat = num1 * num2;
    return resultat;
}

function division(num1, num2) {
    let resultat = num1 / num2;
    return resultat;
}

/* Déclaration d'un fonction "clearAll" qui remet toutes les variables à leur valeur d'origine */

function clearAll() {

    number = "";
    operation = "";
    tableauNumber = [];
    affichage.textContent = "";

}

/* Création des touches du pavé numérique */

paveNumerique.forEach(element => {

    let toucheNum = document.createElement("div");
    toucheNum.classList.add("toucheNum");
    toucheNum.setAttribute("id", element);
    toucheNum.textContent = element;
    divNum.appendChild(toucheNum)

    /* Création d'un écouteur d'événement sur les touches afin de récupérer leur valeur grâce au paramétre "event" */

    toucheNum.addEventListener("click", (e) => {

        /* Récupération du chiffre choisi et l'affiche dans la div affichage */

        affichage.textContent += e.originalTarget.id;
        number += e.originalTarget.id;

    })

});

/* Création des touches du pavé des opérations */

paveOpérations.forEach(element => {

    let toucheOps = document.createElement("div");
    toucheOps.classList.add("toucheOps");
    toucheOps.setAttribute("id", element);
    toucheOps.textContent = element;
    divOps.appendChild(toucheOps);

    /* Création d'un écouteur d'événement sur les touches afin de récupérer leur valeur grâce au paramétre "event" 
        au clic, cela ajoute également la séquence de chiffres "number" dans un tableau */

    toucheOps.addEventListener("click", (e) => {

        /* Récupération du caractére choisi */

        operation = e.originalTarget.id;

        /* Ajout au tableau "tableauNumber" des variables "number" et "operation" (dans cet ordre !), puis, remise a zéro des variables */

        /* Ajout d'une condition pour n'ajouter que les cas ou number vaut un nombre */

        if (isNaN(parseFloat(number))) {
            console.log("\"number\" n'est pas un nombre");
        } else {
            tableauNumber.push(parseFloat(number));
        }
        tableauNumber.push(operation);
        number = "";
        operation = "";
        affichage.textContent = "";

    });

});

/* Création d'un écouteur d'événement sur la touche "divEqual", au clic, il récupérera le 2e chiffre, le stockera dans le tableau, et effectuera le calcul */

divEqual.addEventListener("click", () => {

    /* Récupération du 2e chiffre */

    tableauNumber.push(parseFloat(number));

    /* Ajout de la condition de calcul, on contrôle l'opérateur par la chaine de caractére définie à l'index tableauNumber[1] et on appelle 
    la fonction de calcul correspondant avec comme paramétre tableauNumber[0] (le premier chiffre)
    et tableauNumber[2] (le 2e chiffre), ensuite, on purge le tableau, on reset la valeur de number, et on y ajoute le résultat pour un éventuel prochain calcul */

    console.log(tableauNumber)

    if (tableauNumber[1] === "+") {

        resultat = addition(tableauNumber[0], tableauNumber[2]);
        tableauNumber = [];
        number = "";
        tableauNumber.unshift(resultat);

    }

    else if (tableauNumber[1] === "-") {

        resultat = soustraction(tableauNumber[0], tableauNumber[2]);
        tableauNumber = [];
        number = "";
        tableauNumber.unshift(resultat);

    }

    else if (tableauNumber[1] === "*") {

        resultat = multiplication(tableauNumber[0], tableauNumber[2]);
        tableauNumber = [];
        number = "";
        tableauNumber.unshift(resultat);

    }

    else if (tableauNumber[1] === "/") {

        resultat = division(tableauNumber[0], tableauNumber[2]);
        tableauNumber = [];
        number = "";
        tableauNumber.unshift(resultat);

    } else {

        alert("ERREUR ! Aucun opérateur trouvé à l'index 1 du tableau tableauNumber")

    }
    console.log(tableauNumber)

    /* Affichage du résultat dans la div d'affichage */

    affichage.textContent = resultat

})

/* Création de l'écouteur d'événements sur le bouton "divClear", au clic, cela appellera la fonction clearAll */

divClear.addEventListener("click", () => {

    clearAll();

})

/* Ajout des div "divEqual" et "divClear" au DOM (seulement maintenant et pas avant par souci esthétique, pour qu'ils apparraissent aprés les boutons d'opérations) */

divOps.appendChild(divEqual);
divOps.appendChild(divClear);

