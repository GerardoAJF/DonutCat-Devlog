// Interactive Series 

const svg = document.getElementById("number-line");
const startX = 15, endX = svg.clientWidth - 15, y = svg.clientHeight / 2; 

// Place the main line
const mainLine = document.getElementById("main-line");
mainLine.setAttribute("x1", startX - 10);
mainLine.setAttribute("y1", y);
mainLine.setAttribute("x2", endX + 10);
mainLine.setAttribute("y2", y);

const array_examples = [
    [[1, 0], [2, 0], [3, 0], [2, 0], [4, 0]],
    [[6, 0], [1, 0], [2, 0], [2, 0], [1, 0]], 
    [[0, 0], [5, 0], [2, 0], [1, 0], [8, 0]]
]
const array = array_examples[Math.floor(Math.random() * array_examples.length)];
let index = Math.floor(array.length / 2)

// Place the numbers in the main line
let markX = startX
const step = (endX - startX) / (array.length - 1)
array.forEach(element => {

    const mark = document.createElementNS("http://www.w3.org/2000/svg", "line");
    mark.setAttribute("x1", markX);
    mark.setAttribute("y1", y);
    mark.setAttribute("x2", markX);
    mark.setAttribute("y2", y + 20);
    mark.setAttribute("stroke", "#1D1616");
    mark.setAttribute("stroke-width", "10");
    svg.appendChild(mark);

    const number = document.createElementNS("http://www.w3.org/2000/svg", "text");
    number.setAttribute("x", markX - 3);
    number.setAttribute("y", y + 40);
    number.setAttribute("font-size", "14");
    number.setAttribute("font-weight", "bold");

    number.textContent = element[0]; 
    svg.appendChild(number);

    element[1] = markX
    markX += step

});

// Add the labels
const left_label = document.getElementById("left-sum")
const right_label = document.getElementById("right-sum")

left_label.setAttribute("x", startX + 30)
left_label.setAttribute("y", y - 30)

right_label.setAttribute("x", endX - 30)
right_label.setAttribute("y", y - 30)

// Update the labels when the pointer moves
function update_series () {
    const left_sum = array.slice(0, index + 1)
    .map(sub_array => sub_array[0])
    .reduce((acc, num) => acc + num, 0)

    const right_sum = array.slice(index + 1, )
    .map(sub_array => sub_array[0])
    .reduce((acc, num) => acc + num, 0)

    left_label.setAttribute("fill", "#8E1616")
    right_label.setAttribute("fill", "#8E1616")

    if (left_sum == right_sum) {
        left_label.setAttribute("fill", "#167E16")
        right_label.setAttribute("fill", "#167E16")

        left_label.textContent = "=" + left_sum
        right_label.textContent = "=" + right_sum

        return
    }

    if (left_sum < right_sum) {
        left_label.textContent = "<" + left_sum
        right_label.textContent = ">" + right_sum

        return
    }

    left_label.textContent = ">" + left_sum
    right_label.textContent = "<" + right_sum

}

update_series()

// Add the pointer
const circle = document.getElementById("circle")
circle.setAttribute("cx", array[index][1])
circle.setAttribute("cy", y)
svg.appendChild(circle);

// Move the pointer with the buttons
const left = document.getElementById("left")
const right = document.getElementById("right")
left.addEventListener("click", (e) => {
    if (index <= 0) {
        return
    }

    index -= 1
    circle.setAttribute("cx", array[index][1])
    update_series()
});

right.addEventListener("click", (e) => {
    if (index >= (array.length - 1)) {
        return
    }

    index += 1
    circle.setAttribute("cx", array[index][1])
    update_series()
});

