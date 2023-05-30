import React from "react";
import { Link } from "react-router-dom";
import ContinueButton from "../components/ContinueButton";
import Navbar from "../components/Navbar";
import { Item } from "./Eligible";
import { Arrow } from "./AskPropertyType";

const sendData = () => {
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbzG9RfbifJzpervYFs_7LY2t_FYmDhABdv0OzCZIMJlc2V9KRck0bZvIR7u5JHBqce0kQ/exec";

  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const telephone = localStorage.getItem("telephone");
  const propertyType = localStorage.getItem("propertyType");
  const constructionTime = localStorage.getItem("constructionTime");
  const area = localStorage.getItem("area");
  const electricBill = localStorage.getItem("electricBill");

  const goals = JSON.parse(localStorage.getItem("goals"));
  const isolate = JSON.parse(localStorage.getItem("isolate"));

  const floorInsulation = localStorage.getItem("floorInsulation");
  const atticInsulation = localStorage.getItem("atticInsulation");
  const atticArea = localStorage.getItem("atticArea");
  const basement = localStorage.getItem("basementArea");
  const crawlSpace = localStorage.getItem("crawlSpaceArea");
  const wallInsulation = localStorage.getItem("wallInsulation");
  const wallarea = localStorage.getItem("wallarea");
  const ceilingHeight = localStorage.getItem("ceilingHeight");
  const cellarArea = localStorage.getItem("cellarArea");

  const heatingEnergy = JSON.parse(localStorage.getItem("heatingEnergy"));
  const gasEquipment = localStorage.getItem("gasEquipment");
  const electricEquipment = localStorage.getItem("electricEquipment");
  const oilEquipment = localStorage.getItem("oilEquipment");
  const fuelBill = localStorage.getItem("fuelBill");
  const gasBill = localStorage.getItem("gasBill");
  const woodBill = localStorage.getItem("woodBill");
  const coalBill = localStorage.getItem("coalBill");
  const electricBillShare = localStorage.getItem("electricBillShare");

  const heatingInstall = JSON.parse(localStorage.getItem("heatingInstall"));
  const solarOption = localStorage.getItem("solarOption");
  const roofOrientation = localStorage.getItem("roofOrientation");
  const roofArea = localStorage.getItem("roofArea");
  const slopeChoice2 = localStorage.getItem("slopeChoice2");
  const slopeChoice = localStorage.getItem("slopeChoice");
  const accomodationAffected = localStorage.getItem("accomodationAffected");
  const accomodationAffectee = localStorage.getItem("accomodationAffectee");
  const people = localStorage.getItem("people");
  const totalIncomeTax = localStorage.getItem("totalIncomeTax");
  const startTime = localStorage.getItem("startTime");
  const mailAddress = localStorage.getItem("mailAddress");
  const appointmentDate = localStorage.getItem("appointmentDate");
  const appointmentTime = localStorage.getItem("appointmentTime");
  const workStartTime = localStorage.getItem("workStartTime");

  // Goals Transformation
  // Goal 1 -> Insulate Home
  // Goal 2 -> Change Heating System
  // Goal 3 -> Install Solar Panels
  let goalString = "";

  if (goals.goal1 === true) {
    goalString += "Je souhaite isoler mon logement ";
  }
  if (goals.goal2 === true) {
    if (goals.goal1) {
      goalString += ", Changer mon mode de chauffage ";
    } else {
      goalString += "Changer mon mode de chauffage ";
    }
  }
  if (goals.goal3 === true) {
    if (goals.goal1 || goals.goal2) {
      goalString += ", Réduire le prix de mes factures";
    } else {
      goalString += "Réduire le prix de mes factures";
    }
  }

  // Isolate Transformation
  // Isolate 1 -> floorInsulation
  // Isolate 2 -> Attic
  // Isolate 3 -> Basement
  // Isolate 4 -> Crawl Space
  // Isolate 5 -> Wall

  let isolateString = "";
  if (isolate) {
    if (isolate.isolate1 === true) {
      isolateString += "Sous-sol ";
    }
    if (isolate.isolate2 === true) {
      if (isolate.isolate1) {
        isolateString += ", Combles ";
      } else {
        isolateString += "Combles ";
      }
    }
    if (isolate.isolate3 === true) {
      if (isolate.isolate1 || isolate.isolate2) {
        isolateString += ", Murs ";
      } else {
        isolateString += "Murs ";
      }
    }
  }

  // Construction Time Transformation
  // Construction Time 1 -> Moins de 2 ans
  // Construction Time 2 -> Entre 2 et 15 ans
  // Construction Time 3 -> Plus de 15 ans

  let constructionTimeString = "";
  switch (constructionTime) {
    case "1":
      constructionTimeString = "Moins de 2 ans";
      break;
    case "2":
      constructionTimeString = "Entre 2 et 15 ans";
      break;
    case "3":
      constructionTimeString = "Plus de 15 ans";
      break;
    default:
      break;
  }

  // Attic Insulation Transformatin
  // Attic Insulation 1 -> Comble Perdu
  // Attic Insulation 2 -> Comble aménagé

  let atticInsulationString = "";
  switch (atticInsulation) {
    case "1":
      atticInsulationString = "Combles aménagés";
      break;
    case "2":
      atticInsulationString = "Combles perdus";
      break;
    default:
      break;
  }

  // Wall Insulation Transformation

  // Wall Insulation 1 -> Intérieurs
  // Wall Insulation 2 -> Attenant floorInsulation

  let wallInsulationString = "";
  switch (wallInsulation) {
    case "1":
      wallInsulationString = "Intérieurs";
      break;
    case "2":
      wallInsulationString = "Extérieur";
      break;
    default:
      break;
  }

  // Heating Energy Transformation

  // Heating Energy 1 -> Chauffage au Fioul
  // Heating Energy 2 -> Chauffage Éléctrique
  // Heating Energy 3 -> Chauffage au Gaz
  // Heating Energy 4 -> Chauffage au Bois
  // Heating Energy 5 -> Pompe à chaleur
  // Heating Energy 6 -> Chauffage au Charbon

  let heatingEnergyString = "";
  if (heatingEnergy["1"]) {
    heatingEnergyString += "Chauffage au fioul ";
  }
  if (heatingEnergy["2"]) {
    if (heatingEnergyString !== "") {
      heatingEnergyString += ", Chauffage électrique ";
    } else {
      heatingEnergyString += "Chauffage électrique ";
    }
  }
  if (heatingEnergy["3"]) {
    if (heatingEnergyString !== "") {
      heatingEnergyString += ", Chauffage au gaz ";
    } else {
      heatingEnergyString += "Chauffage au gaz ";
    }
  }
  if (heatingEnergy["4"]) {
    if (heatingEnergyString !== "") {
      heatingEnergyString += ", Chauffage au bois ";
    } else {
      heatingEnergyString += "Chauffage au bois ";
    }
  }
  if (heatingEnergy["5"]) {
    if (heatingEnergyString !== "") {
      heatingEnergyString += ", Pompe à chaleur ";
    } else {
      heatingEnergyString += "Pompe à chaleur ";
    }
  }
  if (heatingEnergy["6"]) {
    if (heatingEnergyString !== "") {
      heatingEnergyString += ", Chauffage au charbon ";
    } else {
      heatingEnergyString += "Chauffage au charbon ";
    }
  }

  // Electric Equipment Transformation

  // Electric Equipment 1 -> Chaudière électrique
  // Electric Equipment 2 -> Plafond chauffant
  // Electric Equipment 3 -> Plancher chauffant
  // Electric Equipment 4 -> Radiateur électrique

  let electricEquipmentString = "";
  switch (electricEquipment) {
    case "1":
      electricEquipmentString = "Chaudière électrique";
      break;
    case "2":
      electricEquipmentString = "Plafond chauffant";
      break;
    case "3":
      electricEquipmentString = "Plancher chauffant";
      break;
    case "4":
      electricEquipmentString = "Radiateur électrique";
      break;
    default:
      break;
  }

  // Gas Equipment Transformation

  // Gas Equipment 1 -> Chaudière à condensation
  // Gas Equipment 2 -> Autre qu’à condensation
  // Gas Equipment 3 -> Radiateur gaz
  // Gas Equipment 4 -> Poêle au gaz

  let gasEquipmentString = "";
  switch (gasEquipment) {
    case "1":
      gasEquipmentString = "Chaudière à condensation";
      break;
    case "2":
      gasEquipmentString = "Autre qu’à condensation";
      break;
    case "3":
      gasEquipmentString = "Radiateur gaz";
      break;
    case "4":
      gasEquipmentString = "Poêle au gaz";
      break;
    default:
      break;
  }

  // Oil Equipment Transformation

  // Oil Equipment 1 -> Chaudière gaz à condensation
  // Oil Equipment 2 -> Chaudière à bois
  // Oil Equipment 3 -> Chaudière fioul à condensation

  let oilEquipmentString = "";
  switch (oilEquipment) {
    case "1":
      oilEquipmentString = "Chaudière à condensation ";
      break;
    case "2":
      oilEquipmentString = "Chaudière classique";
      break;
    case "3":
      oilEquipmentString = "Poêle";
      break;
    default:
      break;
  }

  // Heating Equipment Transformation

  // Heating Equipment 1 -> Pompe à chaleur
  // Heating Equipment 2 -> Chaudière
  // Heating Equipment 3 -> Poêle à bois
  // Heating Equipment 4 -> Insert cheminée
  // Heating Equipment 5 -> Radiateur électrique

  let heatingInstallString = "";
  if (heatingInstall[1]) {
    heatingInstallString += "Pompe à chaleur";
  }
  if (heatingInstall[2]) {
    if (heatingInstallString.length > 0) {
      heatingInstallString += ", Poêle à granulés";
    } else {
      heatingInstallString += "Poêle à granulés";
    }
  }

  // Solar Option Transformation

  // Solar Option 1 -> Panneaux Solaires Photovoltaïques
  // Solar Option 2 -> Système Solaire Combiné

  let solarOptionString = "";
  switch (solarOption) {
    case "1":
      solarOptionString = "Panneaux Solaires Photovoltaïques";
      break;
    case "2":
      solarOptionString = "Système Solaire Combiné";
      break;
    default:
      break;
  }

  // Roof Orientation Transformation

  // Roof Orientation 1 -> Est
  // Roof Orientation 2 -> Sud
  // Roof Orientation 3 -> Sud-Est
  // Roof Orientation 4 -> Sud-Est
  // Roof Orientation 5 -> Nord-Est
  // Roof Orientation 6 -> Sud-Ouest
  // Roof Orientation 7 -> Sud-Ouest
  // Roof Orientation 8 -> Ouest

  let roofOrientationString = "";
  switch (roofOrientation) {
    case "1":
      roofOrientationString = "Est";
      break;
    case "2":
      roofOrientationString = "Sud-Est";
      break;
    case "3":
      roofOrientationString = "Sud";
      break;
    case "4":
      roofOrientationString = "Sud-Ouest";
      break;
    case "5":
      roofOrientationString = "Ouest";
      break;
    default:
      break;
  }

  // Roof Slope Transformation

  // Roof Slope 1 -> 0° - Toit plat
  // Roof Slope 2 -> 15° - Méditerranéenne
  // Roof Slope 3 -> 30° - Classique
  // Roof Slope 4 -> 45° - Alsacienne

  let roofSlopeString = "";
  switch (slopeChoice) {
    case "1":
      roofSlopeString = "Toit Plat - 0° ";
      break;
    case "2":
      roofSlopeString = "Toit Méditerranéen - 15°";
      break;
    case "3":
      roofSlopeString = "Toit Classique - 30° ";
      break;
    case "4":
      roofSlopeString = "Toit Alsacien - 45°";
      break;
    default:
      break;
  }

  // Roof Slope2 Transformation

  // Roof Slope2 1 -> Tuile mécanique
  // Roof Slope2 2 -> Ardoise
  // Roof Slope2 3 -> Bac acier
  // Roof Slope2 4 -> Autre

  let roofSlope2String = "";
  switch (slopeChoice2) {
    case "1":
      roofSlope2String = "Tuile mécanique";
      break;
    case "2":
      roofSlope2String = "Ardoise";
      break;
    case "3":
      roofSlope2String = "Bac acier";
      break;
    case "4":
      roofSlope2String = "Autre";
      break;
    default:
      break;
  }

  let floorInsulationString = "";
  switch (floorInsulation) {
    case "1":
      floorInsulationString = "Garage";
      break;
    case "2":
      floorInsulationString = "Vide sanitaire";
      break;
    case "3":
      floorInsulationString = "Cave";
      break;
    default:
      break;
  }

  let workStartTimeString = "";
  // 1 -> Le plus tôt possible
  // 2 -> Avant l’hiver
  // 3 -> Avant l’été
  switch (workStartTime) {
    case "1":
      workStartTimeString = "Le plus tôt possible";
      break;
    case "2":
      workStartTimeString = "Avant l’hiver";
      break;
    case "3":
      workStartTimeString = "Avant l’été";
      break;
    default:
      break;
  }

  let accomodationAffecteeString = "";
  switch (accomodationAffectee) {
    case "1":
      accomodationAffecteeString = "Propriétéaire occupant";
      break;
    case "2":
      accomodationAffecteeString = "Propriétaire d’une résidence secondaire";
      break;
    case "3":
      accomodationAffecteeString = "Propriétaire bailleur";
      break;
    case "4":
      accomodationAffecteeString = "Locataire";
      break;
    default:
      break;
  }

  let totalIncomeTaxString = "";
  switch (totalIncomeTax) {
    case "1":
      totalIncomeTaxString = "Inférieur à 22 320 €";
      break;

    case "2":
      totalIncomeTaxString = "Entre 22 320 et 28 614 €";
      break;
    case "3":
      totalIncomeTaxString = "Entre 28 614 € et 42 848 €";
      break;
    case "4":
      totalIncomeTaxString = "Supérieur à 42 848 €";
      break;
    default:
      break;
  }

  // get current time and date
  const date = new Date();
  const endtime = date.toLocaleTimeString();
  const endday = date.toLocaleDateString();

  // append all these variables to a formData
  const formData = new FormData();
  // formData.append("goal", goal);
  formData.append("Appointment Date", appointmentDate);
  formData.append("Appointment Time", appointmentTime);
  formData.append("First Name", firstName);
  formData.append("Last Name", lastName);
  formData.append("Telephone", telephone);
  formData.append("Property Type", propertyType);
  formData.append("Construction Time", constructionTimeString);
  formData.append("Area (m2)", area);
  formData.append("Goals", goalString);
  formData.append("Insulate", isolateString);

  formData.append("Floor Insulation", floorInsulationString);
  formData.append("Attic Insulation", atticInsulationString);
  formData.append("Attic Area (m2)", atticArea);
  formData.append("Basement Area (m2)", basement);
  formData.append("Crawl Space (m2)", crawlSpace);
  formData.append("Wall Insulation", wallInsulationString);
  formData.append("Wall Area (m2)", wallarea);
  formData.append("Ceiling Height (m)", ceilingHeight);
  formData.append("Cellar Area (m2)", cellarArea);

  formData.append("Heating Energy", heatingEnergyString);
  formData.append("Electric Equipment", electricEquipmentString);
  formData.append("Gas Equipment", gasEquipmentString);
  formData.append("Oil Equipment", oilEquipmentString);
  formData.append("Heating Equipment", heatingInstallString);
  formData.append("Fuel Bill", fuelBill);
  formData.append("Gas Bill", gasBill);
  formData.append("Wood Bill", woodBill);
  formData.append("Coal Bill", coalBill);
  formData.append("Electric Bill Share", electricBillShare);

  formData.append("Solar Option", solarOptionString);
  formData.append("Roof Orientation", roofOrientationString);
  formData.append("Roof Area (m2)", roofArea);
  formData.append("Roof Slope", roofSlopeString);
  formData.append("Roof Slope2", roofSlope2String);
  formData.append("Electric Bill (mois)", electricBill);
  formData.append("Accomodation Affected", accomodationAffected);
  formData.append("Accomodation Affectee", accomodationAffecteeString);
  formData.append("People", people);
  formData.append("Total Income Tax", totalIncomeTaxString);
  formData.append("Mail Address", mailAddress);
  formData.append("Work Start Time", workStartTimeString);
  formData.append("Start Time", startTime);
  formData.append("End Time", endtime);
  formData.append("Date", endday);

  fetch(scriptUrl, { method: "POST", body: formData })
    .then((response) => console.log("Success!", response))
    .catch((error) => console.error("Error!", error.message));

  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
};

const EndScreen = () => {
  React.useEffect(() => {
    sendData();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen ">
        <Navbar one two three four />
        <div className="flex h-full">
          {/* LEFT */}
          <div className="w-[30%] h-full flex items-center justify-center">
            <div className="bg-[#FCFFFE] min-h-[90%] flex flex-col gap-4 p-5 m-5 items-center justify-center w-[90%] rounded-2xl shadow-leftCard">
              <div className="bg-[#F7F9FC] w-[80%] p-4 flex items-center justify-center gap-6 flex-col">
                {/* LOGO */}
                <div className="flex flex-col">
                  <img src="./assets/logo.png" alt="HappyFace" className="" />
                </div>

                {/* CENTER ITEM */}
                <div className="flex flex-col items-center w-[50%] gap-6">
                  <p className="font-bold text-[#2D3142] text-lg text-center">
                    Estimation des aides pour votre projet
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <floorInsulationIcon />
                    <p className="nunito font-bold text-[#2D3142]">
                      Isolation floorInsulation
                    </p>
                  </div>
                </div>

                {/* BOTTOM ITEMS */}
                <div className="flex flex-col items-center w-full gap-6">
                  <Item title="MaprimeRenov’" value="4 000 €" />
                  <Item title="Montant CEE" value="4 000 €" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 flex flex-col gap-4 w-full px-16 pt-6 pb-4 ">
            <Link to={"/workstart"} className="flex items-center gap-3">
              <Arrow />
              <p className="text-xl text-[#1E1D4C] font-medium">Retour</p>
            </Link>

            <section className="flex-1 flex flex-col items-center justify-evenly">
              <div className="flex flex-col items-center gap-8 bg-white rounded-[20px] px-32 py-20 relative">
                <img
                  src="./assets/notif.png"
                  alt="Celebrate"
                  className="absolute -top-16"
                />
                <h2 className="nunito text-2xl font-bold text-center">
                  Votre rendez-vous <br /> bilan énergétique est confirmé!
                </h2>
                <p className="text-[#8A90A3] font-medium text-xl">
                  Mardi • 11h - 12 Avril - 2021
                </p>
                <p className="gradientColor font-bold">
                  À bientôt, l’équipe Greener
                </p>
                <Link to="/">
                  <ContinueButton message="Retourner sur Greener" />
                </Link>
              </div>
              <p className="text-[#1E1D4C] font-medium text-2xl">
                Une invitation vous a été envoyé par mail
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default EndScreen;
