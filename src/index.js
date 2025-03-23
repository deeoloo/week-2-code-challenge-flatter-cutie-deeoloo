// Your code here
document.addEventListener('DOMContentLoaded',()=>{
    const characterBar = document.getElementById("character-bar")
    const infoDetails = document.getElementById('detailed-info')
    const votesForm = document.getElementById('votes-form');
    const votesInput = document.getElementById('votes');
    const characterForm = document.getElementById('character-form');
    const characterNameInput = document.getElementById('name');
    const characterImageInput = document.getElementById('image-url');
    let currentCharacter = null;


    fetch ('http://localhost:3000/characters')
    .then(res=>res.json())
    .then (characters=>{
        
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

    function addCharacterToBar(character) {
        const characterSpan = document.createElement('span');
        characterSpan.textContent = character.name;

        characterSpan.addEventListener('click', () => {
            displayInfo(character);
        });

        characterBar.appendChild(characterSpan);
    }


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

            fetch (`http://localhost:3000/characters/${currentCharacter.id}`,{
                method: 'PATCH',
                headers: {
                'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    votes:currentCharacter.votes
                }) 
            })
            .then(response=>response.json())
            .then(updatedCharacter => {
                const votesCount = document.getElementById("vote-count");
                votesCount.textContent = updatedCharacter.votes;
            })
            .catch(error => {
                console.error("Error updating votes:", error);
            });

            const votesCount = document.getElementById("vote-count")
            votesCount.textContent = currentCharacter.votes;
        }
    }
    votesForm.reset();
})

characterForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const newCharacter = {
        name: characterNameInput.value,
        image: characterImageInput.value,
        votes: 0
    }
    fetch('http://localhost:3000/characters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCharacter),
    })
        .then(res => res.json())
        .then(createdCharacter => {
            
            addCharacterToBar(createdCharacter);

            characterForm.reset();
        })
        .catch(error => {
            console.error("Error adding character:", error);
        });

})


})


