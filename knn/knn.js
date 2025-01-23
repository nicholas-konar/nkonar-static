const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
let drawing = false;
let lastX = 0, lastY = 0;

// Setup brush style
ctx.lineWidth = 15;
ctx.lineCap = 'round';
ctx.strokeStyle = '#000';

function startPosition(e) {
    drawing = true;
    [lastX, lastY] = getCoordinates(e);
}

function finishedPosition() {
    drawing = false;
    ctx.beginPath(); // Reset the path for the next drawing gesture
}

function draw(e) {
    if (!drawing) return;
    const [x, y] = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

function getCoordinates(e) {
    let rect = canvas.getBoundingClientRect();
    let x, y;
    if (e.touches) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }
    return [x, y];
}

// Mouse events
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseout', finishedPosition);
canvas.addEventListener('mouseup', () => {
    const imageData = getImageData();
    process(imageData.data);
});

// Touch events
canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchend', finishedPosition);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchcancel', finishedPosition);
// todo: process touch input

function getImageData() {
    // Returns a 2D pixel array from the canvas
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// Cleaner to iterate over arrays in sections. Yields n elements at a time.
function* chunks(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
        yield arr.slice(i, i + n);
    }
}

function normalize(data, threshold) {
    const normalized = []
    for (const chunk of chunks(data, 4)) {
        const e = (chunk[3] / 255) >= threshold ? 1 : 0
        normalized.push(e)
    }
    return normalized
}

function condense(data, threshold, rowSegmentLength, columnSegmentLength) {
    const condensed = []
    const rowLength = Math.sqrt(data.length), columnLength = Math.sqrt(data.length)
    const grid = createGrid(data, rowLength)

    // Iterate over the array with a square window
    for (let rowSegment = 0; rowSegment < rowLength; rowSegment += rowSegmentLength)  {
        for (let columnSegment = 0; columnSegment < columnLength; columnSegment += columnSegmentLength) {
            // Loop over each element within the window
            let pixel = []
            for (let x = rowSegment; x < rowSegment + rowSegmentLength; x++) {
                for (let y = columnSegment; y < columnSegment + columnSegmentLength; y++) {
                    pixel.push(grid[x][y])
                }
            }
            // Take the average of all elements in the window
            const average = pixel.reduce((acc, x) => acc + x, 0) / pixel.length
            // Save the normalized data to the new lower resolution array
            condensed.push(average > threshold ? 1 : 0)
        }
    }
    return condensed
}

function createGrid(data, rowLength) {
    const grid = []
    for (const row of chunks(data, rowLength)) {
        grid.push(row)
    }
    return grid
}

function process(data) {
    const threshold = .5
    const normalized = normalize(data, threshold)
    const condensed = condense(normalized, threshold, 10, 10)
    for (let chunk of chunks(condensed, 28)) {
        console.log(chunk)
    }
}

