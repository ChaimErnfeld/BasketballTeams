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
const selectSearch = document.getElementById("selectSearch");
const pointsInput = document.getElementById("pointsInput");
const twoPercentInput = document.getElementById("twoPercentInput");
const threePercentInput = document.getElementById("threePercentInput");
const addPlayerBtn = document.getElementById("addPlayerBtn");
const pointsSpan = document.getElementById("pointsSpan");
const twoPercentSpan = document.getElementById("twoPercentSpan");
const threePercentSpan = document.getElementById("threePercentSpan");
pointsInput.addEventListener("input", () => {
    pointsSpan.textContent = pointsInput.value;
});
twoPercentInput.addEventListener("input", () => {
    twoPercentSpan.textContent = twoPercentInput.value;
});
threePercentInput.addEventListener("input", () => {
    threePercentSpan.textContent = threePercentInput.value;
});
const requestPlayer = () => __awaiter(void 0, void 0, void 0, function* () {
    const myPlayer = {
        position: selectSearch.value,
        twoPercent: +pointsInput.value,
        threePercent: +threePercentInput.value,
        points: +pointsInput.value,
    };
    return myPlayer;
});
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
    const request = yield requestPlayer();
    yield clearTable();
    yield addDataToTable(getPlayersApi(request));
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
    PlayerNameCell.textContent = player.playerName;
    PositionCell.textContent = player.position;
    PointsCell.textContent = player.points.toString();
    twoPercentCell.textContent = player.twoPercent.toString();
    threePercentPCell.textContent = player.threePercent.toString();
    let btnAddPlayer = document.createElement("button");
    btnAddPlayer.id = "addPlayerToDivBtn";
    btnAddPlayer.textContent = "Add Damian ToCurrent Team";
    actionCell.appendChild(btnAddPlayer);
    btnAddPlayer.addEventListener("click", () => {
        playerSelection(player);
    });
}
function clearTable() {
    const rows = table.getElementsByTagName("tr");
    while (rows.length > 1) {
        table.deleteRow(1);
    }
}
function playerSelection(player) {
    const playerCard = document.getElementById(`${player.position}`.toLowerCase());
    playerCard.innerHTML = "";
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const p4 = document.createElement("p");
    playerCard.appendChild(p1);
    playerCard.appendChild(p2);
    playerCard.appendChild(p3);
    playerCard.appendChild(p4);
    p1.textContent = player.playerName;
    p2.textContent = `Points: ${player.points.toString()}`;
    p3.textContent = `Tow Percent: ${player.twoPercent.toString()}%`;
    p4.textContent = `Three Percent: ${player.threePercent.toString()}%`;
}
addPlayerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    showAllPlayers();
});
