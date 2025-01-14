const random = (min, max) => {
    const range = (max - min + 1)
    const n = Math.random() * range
    return Math.floor(n) + min
}

document.addEventListener("DOMContentLoaded", () => {

    const runBulkSimulator = () => {
        const doorsInput = document.getElementById("doors")
        const quantity = parseInt(doorsInput.value, 10) - 1
        const change = document.getElementById("change")
        const rounds = document.getElementById("rounds")
        const n = parseInt(rounds.value, 10)

        const results = Array.from({ length: n })
            .map(e => runSim(quantity, change.checked))

        showResults(results)
    }

    document.getElementById("run").addEventListener("click", runBulkSimulator)

    const runSim = (n, change) => {
        // did you choose correctly the first time?
        const choice = random(0, n)
        const winner = random(0, n)
        const won = change ? winner != choice : winner == choice
        return { choice, winner, won }
    }

    const showResults = (results) => {
        const wins = results.filter(e => e.won)
        const w = wins.length
        const n = results.length
        const rawPercent = (w / n) * 100
        const percent = parseFloat(rawPercent.toFixed(2))
        
        const title = document.getElementById('bulkResultsH')
        title.textContent = 'Results'

        const outcome = document.getElementById("bulkResultsP")
        outcome.textContent = `you won ${w}/${n} or ${percent}%`
    }
})