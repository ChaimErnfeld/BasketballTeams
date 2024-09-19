"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = "https://nbaserver-q21u.onrender.com/api/filter";
const table = document.getElementById("table");
const sectionTeams = document.getElementById("sectionTeams");
const pointsInput = document.getElementById("pointsInput");
const twoPercentInput = document.getElementById("twoPercentInput");
const threePercentInput = document.getElementById("threePercentInput");
console.log(sectionTeams.value);
const addPlayerBtn = document.getElementById("addPlayerBtn");
const myPlayer = {
    position: "PG",
    twoPercent: 4,
    threePercent: 5,
    points: 100,
};
const requestPlayer = () => { };
function getPlayersApi(player) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(player),
            });
            if (!response.ok) {
                throw new Error("Failed to add scooter");
            }
            const allPlayers = yield response.json();
            return allPlayers;
        }
        catch (error) {
            console.log(error);
            return [];
        }
    });
}
const showAllPlayers = () => __awaiter(void 0, void 0, void 0, function* () {
    yield clearTable();
    yield addDataToTable(getPlayersApi(myPlayer));
});
const addDataToTable = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield callback;
    response.forEach((player) => {
        addedRowToTable(player);
    });
});
function addedRowToTable(player) {
    let newRow = table.insertRow();
    let PlayerNameCell = newRow.insertCell(0);
    let PositionCell = newRow.insertCell(1);
    let PointsCell = newRow.insertCell(2);
    let twoPercentCell = newRow.insertCell(3);
    let threePercentPCell = newRow.insertCell(4);
    let actionCell = newRow.insertCell(5);
    //   let idCell = newRow.insertCell(6);
    //   let actionsCell = newRow.insertCell(7);
    PlayerNameCell.textContent = player.playerName;
    PositionCell.textContent = player.position;
    PointsCell.textContent = player.points.toString();
    twoPercentCell.textContent = player.twoPercent.toString();
    threePercentPCell.textContent = player.threePercent.toString();
    //   idCell.textContent = scooter.id!.toString();
    let btnAddPlayer = document.createElement("button");
    //   let btnDelete = document.createElement("button");
    btnAddPlayer.id = "addPlayerToDivBtn";
    //   btnDelete.className = "delete-btn";
    btnAddPlayer.textContent = "Add Damian ToCurrent Team";
    //   btnDelete.textContent = "Delete";
    actionCell.appendChild(btnAddPlayer);
    //   actionsCell.appendChild(btnDelete);
    //   deleteScooter(btnDelete, scooter, newRow);
    //   addEditListener(btnEdit, scooter);
    //   //בלחיצה על כפתור עריכה
    //   btnEdit.addEventListener("click", () => {
    //     rowToEdit = newRow;
    //     homePage.style.display = "none";
    //     editPage.style.display = "flex";
    //     inputs[0].value = nameCell.textContent;
    //     inputs[1].value = rankCell.textContent;
    //     inputs[2].value = positionCell.textContent;
    //     inputs[3].value = platoonCell.textContent;
    //     editSelectStatus.value = statusCell.textContent;
    //   });
}
function clearTable() {
    const rows = table.getElementsByTagName("tr");
    while (rows.length > 1) {
        table.deleteRow(1);
    }
}
addPlayerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    showAllPlayers();
});
