const button = document.getElementById("random-button")
const nameBox = document.getElementById("name-box")
const imageBox = document.getElementById("image-box")

const jsonFetch = url => fetch(url).then(r => r.json())
const sleep = ms => new Promise(r => setTimeout(r, ms))

;(async () => {
  const allVersions = await jsonFetch("https://ddragon.leagueoflegends.com/api/versions.json")
  const version = allVersions[0]

  const champsJSON = await jsonFetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)

  const champs = champsJSON.data

  button.addEventListener("click", async () => {
    let randomNumber

    for (let i = 0; i < 10; i++) {
      randomNumber = Math.floor(Math.random() * Object.values(champs).length)
      button.textContent = randomNumber
      await sleep(100)
    }

    const champName = Object.keys(champs)[randomNumber]
    const champ = champs[champName]

    nameBox.textContent = champ.id
    imageBox.src = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champ.key}.png`
  })
})()