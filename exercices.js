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
  collecterArtefactV2(artefact, afficherRechercheArtefact);
});

const afficherRechercheArtefact = ({ artefact, epoque, success = true }) => {
  const li = document.createElement("li");
  li.textContent = `${success ? "✅" : "❌"} ${artefact} (Epoque ${epoque})`;
  listeArtefactHTML.appendChild(li);
};

/**
 * Votre partie commence ici, la partie modifiable par vos soins
 */

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

  voyagerTempsV2(nomEpoque, () => {
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

// La Mission Temporelle Complexe
function missionTemporelleComplexe() {
  console.log("Voyager à l'époque médiévale");
  if (true) {
    console.log("Collecter une épée de chevalier");
    if (true) {
      console.log("Voyager à l'époque romaine");
      if (true) {
        console.log("Collecter un bouclier romain");
        if (true) {
          console.log("Collecter une épée romaine");
        }
      }
    }
  }
}
// missionTemporelleComplexe();

// Je te promet des voyages temporels sans tracas !
function voyagerTempsV2(destination, callback) {
  loader.style.display = "block";
  afficherDestination("");
  new Promise((res, rej) => {
    res(destination);
    rej(err);
  }).then(setTimeout(() => callback(destination), generationNombreAleatoireEntre(1000, 3000)));
}

function collecterArtefactV2(nomArtefact, callback) {
  const result = Math.random() * 100;
  let isFound;
  if (result >= 50) {
    isFound = true;
  } else {
    isFound = false;
  }
  new Promise((res, rej) => {
    res();
  }).then(
    setTimeout(() => {
      callback({
        artefact: nomArtefact,
        epoque: nomEpoqueActuelle,
        success: isFound,
      });
    }, generationNombreAleatoireEntre(1000, 3000))
  );
}

function missionTemporelleComplexeV2() {
  new Promise((res, rej) => res())
    .then(console.log("Voyager à l'époque médiévale"))
    .then(console.log("Collecter une épée de chevalier"))
    .then(console.log("Voyager à l'époque romaine"))
    .then(console.log("Collecter un bouclier romain"))
    .then(console.log("Collecter une épée romaine"));
}

// missionTemporelleComplexeV2();

// La Mission Finale Asynchrone
fetch("http://localhost:5500/data/epoques.json")
  .then((res) => res.json())
  .then((epoques) => creerLesChoixEpoque(epoques));
