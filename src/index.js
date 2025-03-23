// Your code here
document.addEventListener('DOMContentLoaded',()=>{
    const characterBar = document.getElementById("character-bar")
    const infoDetails = document.getElementById('detailed-info')
    const votesForm = document.getElementById('votes-form');
    const votesInput = document.getElementById('votes');
    let currentCharacter = null;


// function displayCharacters(){
    fetch ('http://localhost:3000/characters')
    .then(res=>res.json())
    .then (characters=>{
        // const characters = data.characters
        
        characters.forEach(character => {
            const characterSpan = document.createElement('span')
            characterSpan.textContent= character.name

            characterSpan.addEventListener('click', () => {
                displayInfo(character);
            });

            characterBar.appendChild(characterSpan);
            
        });
    })
    .catch(error=>{
        console.log("Not available", error)
    })


function displayInfo(character){
    currentCharacter = character
    const detailsHTML = `
    <h2>${character.name}</h2>
    <img src="${character.image}" alt="${character.name}" style="max-width: 200px;">
    <h4>Votes: <span id="vote-count">${character.votes}</span></h4>
`;
    infoDetails.innerHTML = detailsHTML;

    infoDetails.appendChild(votesForm);
}

votesForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    if (currentCharacter){
        const votesAdded = parseInt(votesInput.value, 10)
        if(!isNaN(votesAdded)){
            currentCharacter.votes += votesAdded;
            const votesCount = document.getElementById("vote-count")
            votesCount.textContent = currentCharacter.votes;
        }
    }
    votesForm.reset();
})


})


