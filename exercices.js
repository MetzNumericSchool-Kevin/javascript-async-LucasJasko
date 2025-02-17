/**
 * Code de base, ne pas modifier
 */

// Définition
const boutonVoyageHTML = document.querySelector(".btn-voyage");
const localisationEpoqueHTML = document.querySelector(".localisation_epoque");
const listeArtefactHTML = document.querySelector(".liste_artefacts");
const formChoixEpoqueHtml = document.querySelector(".form__choix_epoque");
const formRechercheArtefact = document.querySelector(".form__recherche_artefact");

const epoques = {
  romaine: "Romaine",
  medievale: "Médievale",
  jurassique: "Jurassique",
};

const creerLesChoixEpoque = (epoques) => {
  const selectHtml = formChoixEpoqueHtml.querySelector("select");
  Object.entries(epoques).forEach(([id_epoque, nom_epoque]) => {
    const option = document.createElement("option");
    option.value = id_epoque;
    option.text = nom_epoque;
    selectHtml.appendChild(option);
  });
};

function generationNombreAleatoireEntre(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const afficherDestination = (nomEpoque) => (localisationEpoqueHTML.textContent = nomEpoque);

// Execution
formChoixEpoqueHtml.addEventListener("submit", (event) => {
  event.preventDefault();
  const epoque = new FormData(formChoixEpoqueHtml).get("epoque");

  if (!epoque) {
    alert("Choisie une époque de voyage temporel Chronos !");
    return;
  }

  quandEpoqueChoisie(epoque);
});

formRechercheArtefact.addEventListener("submit", (event) => {
  event.preventDefault();
  const artefact = new FormData(formRechercheArtefact).get("artefact");
  collecterArtefact(artefact, afficherRechercheArtefact);
});

const afficherRechercheArtefact = ({ artefact, epoque, success = true }) => {
  const li = document.createElement("li");
  li.textContent = `${success ? "✅" : "❌"} ${artefact} (Epoque ${epoque})`;
  listeArtefactHTML.appendChild(li);
};

/**
 * Votre partie commence ici, la partie modifiable par vos soins
 */

creerLesChoixEpoque(epoques);

// Le téléporteur temporel
const loader = document.querySelector(".voyage_en_cours");
function voyagerTemps(destination, callback) {
  loader.style.display = "block";
  afficherDestination("");
  setTimeout(() => callback(destination), generationNombreAleatoireEntre(1000, 3000));
}

let nomEpoqueActuelle;
function quandEpoqueChoisie(nomEpoque) {
  nomEpoqueActuelle = nomEpoque;

  voyagerTemps(nomEpoque, () => {
    loader.style.display = "none";
    afficherDestination(nomEpoque);
  });
  return nomEpoqueActuelle;
}

// La Collecte d'Artefact Mystère
function collecterArtefact(nomArtefact, callback) {
  const result = Math.random() * 100;
  let isFound;
  if (result >= 50) {
    isFound = true;
  } else {
    isFound = false;
  }
  setTimeout(() => {
    callback({
      artefact: nomArtefact,
      epoque: nomEpoqueActuelle,
      success: isFound,
    });
  }, generationNombreAleatoireEntre(1000, 3000));
}
