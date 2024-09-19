const BASE_URL = "https://nbaserver-q21u.onrender.com/api/filter";

const table = document.getElementById("table")! as HTMLTableElement;

const selectSearch = document.getElementById(
  "selectSearch"
)! as HTMLSelectElement;

const pointsInput = document.getElementById("pointsInput")! as HTMLInputElement;

const twoPercentInput = document.getElementById(
  "twoPercentInput"
)! as HTMLInputElement;

const threePercentInput = document.getElementById(
  "threePercentInput"
)! as HTMLInputElement;

const addPlayerBtn = document.getElementById(
  "addPlayerBtn"
)! as HTMLButtonElement;

interface player {
  position: string;
  twoPercent: Number;
  threePercent: Number;
  points: Number;
  playerName?: string;
}

const myPlayer: player = {
  position: "PG",
  twoPercent: 4,
  threePercent: 5,
  points: 100,
};

const requestPlayer = () => {
    position: se,
  twoPercent: 4,
  threePercent: 5,
  points: 100
};

async function getPlayersApi(player: player): Promise<player[]> {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(player),
    });

    if (!response.ok) {
      throw new Error("Failed to add scooter");
    }
    const allPlayers: player[] = await response.json();
    return allPlayers;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const showAllPlayers = async (): Promise<void> => {
  await clearTable();
  await addDataToTable(getPlayersApi(myPlayer));
};

const addDataToTable = async (callback: Promise<player[]>): Promise<void> => {
  const response = await callback;
  response.forEach((player) => {
    addedRowToTable(player);
  });
};

function addedRowToTable(player: player): void {
  let newRow: HTMLTableRowElement = table.insertRow();

  let PlayerNameCell = newRow.insertCell(0);
  let PositionCell = newRow.insertCell(1);
  let PointsCell = newRow.insertCell(2);
  let twoPercentCell = newRow.insertCell(3);
  let threePercentPCell = newRow.insertCell(4);
  let actionCell = newRow.insertCell(5);
  //   let idCell = newRow.insertCell(6);
  //   let actionsCell = newRow.insertCell(7);

  PlayerNameCell.textContent = player.playerName!;
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

function clearTable(): void {
  const rows = table.getElementsByTagName("tr");
  while (rows.length > 1) {
    table.deleteRow(1);
  }
}

addPlayerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  showAllPlayers();
});
