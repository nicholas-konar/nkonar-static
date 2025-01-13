document.addEventListener("DOMContentLoaded", () => {

    const makeDoors = () => {
        const input = document.getElementById("doors")
        const quantity = parseInt(input.value, 10)
        const doors = new Array(quantity).fill(false)
        const winner = Math.floor(Math.random() * quantity)
        doors[winner] = true
        return doors
    }

    const run = () => {
        const rounds = document.getElementById("rounds")
        const change = document.getElementById("change")
        const doors = makeDoors()

        console.log(rounds.value, change.checked, doors)
    }

    document.getElementById("run").addEventListener("click", run)
})