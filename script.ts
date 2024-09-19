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

const pointsSpan = document.getElementById("pointsSpan")! as HTMLSpanElement;
const twoPercentSpan = document.getElementById(
  "twoPercentSpan"
)! as HTMLSpanElement;
const threePercentSpan = document.getElementById(
  "threePercentSpan"
)! as HTMLSpanElement;

pointsInput.addEventListener("input", () => {
  pointsSpan.textContent = pointsInput.value;
});

twoPercentInput.addEventListener("input", () => {
  twoPercentSpan.textContent = twoPercentInput.value;
});

threePercentInput.addEventListener("input", () => {
  threePercentSpan.textContent = threePercentInput.value;
});

interface player {
  position: string;
  twoPercent: Number;
  threePercent: Number;
  points: Number;
  playerName?: string;
}

const requestPlayer = async (): Promise<player> => {
  const myPlayer: player = {
    position: selectSearch.value,
    twoPercent: +pointsInput.value,
    threePercent: +threePercentInput.value,
    points: +pointsInput.value,
  };
  return myPlayer;
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
  const request: player = await requestPlayer();

  await clearTable();
  await addDataToTable(getPlayersApi(request));
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

  PlayerNameCell.textContent = player.playerName!;
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

function clearTable(): void {
  const rows = table.getElementsByTagName("tr");
  while (rows.length > 1) {
    table.deleteRow(1);
  }
}

function playerSelection(player: player) {
  const playerCard = document.getElementById(
    `${player.position}`.toLowerCase()
  )! as HTMLParagraphElement;

  playerCard.innerHTML = "";

  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const p4 = document.createElement("p");

  playerCard.appendChild(p1);
  playerCard.appendChild(p2);
  playerCard.appendChild(p3);
  playerCard.appendChild(p4);

  p1.textContent = player.playerName!;
  p2.textContent = `Points: ${player.points.toString()}`;
  p3.textContent = `Tow Percent: ${player.twoPercent.toString()}%`;
  p4.textContent = `Three Percent: ${player.threePercent.toString()}%`;
}

addPlayerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  showAllPlayers();
});
