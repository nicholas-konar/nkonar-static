const random = (min, max) => {
    const range = (max - min + 1)
    const n = Math.random() * range
    return Math.floor(n) + min
}

const runBulkSimulator = () => {
    const doorsInput = document.getElementById('doors')
    const d = parseInt(doorsInput.value, 10)
    const change = document.getElementById('change')
    const rounds = document.getElementById('rounds')
    const n = parseInt(rounds.value, 10)

    const results = Array.from({ length: n })
        .map(e => runSim(d, change.checked))

    const wins = results.filter(e => e.won).length
    const percent = getPercentWon(wins, n)
    const priorProb = getPriorProb(d, change.checked)

    showResults(results, wins, n, percent, priorProb)
}

const runSim = (d, c) => {
    // did you choose correctly the first time?
    const choice = random(1, d)
    const winner = random(1, d)
    const won = c ? winner != choice : winner == choice
    return { choice, winner, won }
}

const getPercentWon = (w, n) => {
    const rawPercent = (w / n) * 100
    return parseFloat(rawPercent.toFixed(2))
}

const getPriorProb = (d, c) => {
    const rawPercent = c ? (d - 1) / d : 1 / d
    return parseFloat(rawPercent.toFixed(2))
}

const showResults = (results, w, n, p, priorProb) => {
    const outcome = document.getElementById('bulkResultsP')
    outcome.innerHTML = `You won ${w}/${n} or ${p}% <br>Prior probability was ${priorProb}`

    const table = document.getElementById('tableData')

    // clear old results before repopulating
    while (table.firstChild) {
        table.removeChild(table.firstChild)
    }

    results.map((e, i) => {
        const row = document.createElement('tr')

        const simNumCell = document.createElement('td')
        simNumCell.textContent = i
        row.appendChild(simNumCell)

        const choiceCell = document.createElement('td')
        choiceCell.textContent = e.choice
        row.appendChild(choiceCell)

        const winnerCell = document.createElement('td')
        winnerCell.textContent = e.winner
        row.appendChild(winnerCell)

        const outcomeCell = document.createElement('td')
        outcomeCell.textContent = e.won ? 'won' : 'lost'
        row.appendChild(outcomeCell)

        table.insertBefore(row, table.firstChild)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('run').addEventListener('click', runBulkSimulator)
})