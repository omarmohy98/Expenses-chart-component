async function getData() {
  try {
    let res = await fetch("data.json");
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

let amountArr = [];
let maxAmount;

let data = getData();
data.then((data) => {
  let el = document.querySelector(".chart");
  data.forEach((element) => {
    let valueEle = creatElement("div", "value", `$${element.amount}`);
    let rateEle = creatElement("div", "rate", "");
    let dayEle = creatElement("p", "chart-ele", `${element.day}`);
    let container = creatElement("div", "day-container", "");
    rateEle.style.height = `${(element.amount / 100) * el.offsetHeight}px`;
    container.appendChild(valueEle);
    container.appendChild(rateEle);
    container.appendChild(dayEle);
    el.appendChild(container);
    amountArr.push(element.amount);
    maxAmount = Math.max(...amountArr);
  });
  document.querySelectorAll(".value").forEach((ele) => {
    if (+ele.innerHTML.slice(1) == maxAmount) {
      ele.nextElementSibling.classList.add("high-spend");
    }
  });
});

function creatElement(ele, className, text) {
  let e = document.createElement(ele);
  e.classList.add(className);
  let eText = document.createTextNode(text);
  e.appendChild(eText);
  return e;
}
