let input = document.getElementById("inp");
let result = document.getElementById("res");

let state;

let globalStorage = new GlobalStorage();

let $ = globalStorage.addCallback;

globalStorage.setRealState = (storageState) => {
    console.log(storageState);
    state = storageState;
    result.innerText = state.result;
}

input.onchange = $(() => {
    let val = input.value;
    val = val.split("").reverse().join("");
    globalStorage.state.result = val;
})

