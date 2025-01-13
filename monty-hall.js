const random = (min, max) => {
    const range = (max - min + 1)
    const n = Math.random() * range
    return Math.floor(n) + min
}

document.addEventListener("DOMContentLoaded", () => {

    var simCount = 0
    var winCount = 0

    const clearScore = () => {
        simCount = 0
        winCount = 0
    }

    const updateScore = (outcome) => {
        simCount++
        winCount += outcome
        const rawPercent = (winCount / simCount) * 100
        const percent = parseFloat(rawPercent.toFixed(2))
        const results = document.getElementById('results')
        results.textContent = `you won ${winCount}/${simCount} or ${percent}%`
    }

    const runOnce = () => {
        // did you choose correctly the first time?
        const change = document.getElementById("change")
        const doorsInput = document.getElementById("doors")
        const quantity = parseInt(doorsInput.value, 10) - 1
        const winner = random(0, quantity)
        const choice = random(0, quantity)
        const outcome = change.checked ? winner != choice : winner == choice
        updateScore(outcome)
    }

    const run = () => {
        const rounds = document.getElementById("rounds")
        const n = parseInt(rounds.value, 10)
        Array.from({ length: n })
            .map(e => runOnce())
            .filter(i => i)
    }

    document.getElementById("run").addEventListener("click", clearScore)
    document.getElementById("run").addEventListener("click", run)
})