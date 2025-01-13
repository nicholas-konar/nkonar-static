document.addEventListener("DOMContentLoaded", () => {

    const random = (min, max) => {
        const range = (max - min + 1)
        const n = Math.random() * range
        return Math.floor(n) + min
    }

    const runOnce = () => {
        // did you choose correctly the first time?
        const change = document.getElementById("change")
        const doorsInput = document.getElementById("doors")
        const quantity = parseInt(doorsInput.value, 10) - 1
        const winner = random(0, quantity)
        const choice = random(0, quantity)
        return change.checked ? winner != choice : winner == choice
    }

    const run = () => {
        const rounds = document.getElementById("rounds")
        const n = parseInt(rounds.value, 10)
        const results = Array.from({ length: n })
            .map(e => runOnce())
            .filter(i => i)
        console.log(results.length, n, results.length / n)
    }

    document.getElementById("run").addEventListener("click", run)
})