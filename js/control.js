// Helper
function $(x) { return document.querySelector(x); }
function $$(x) { return document.querySelectorAll(x); }

const phaseList = $('#phase');
const addPhaseBtn = $('#add-phase');
const fixedCostInput = $('#fixed-cost');
const variableCostInput = $('#variable-cost');
const productPriceInput = $('#product-price');
const productionCapacityInput = $('#production-capacity');

const phaseCreator = function (index) {
  const li = document.createElement('li');
  li.innerHTML =
    `<li class="flex-col my-3 hover:shadow-md hover:my-5 rounded ml-1 border border-white">
      <div class="flex flex-grow justify-between">
        <p class="text-xs leading-loose font-bold uppercase text-blue-500 px-2">Tahap Ke ${index + 1}:</p>
        <p id="sell-percentage" class="text-xs font-semibold uppercase rounded-full bg-teal-500 px-2 m-1 text-red-100">${data.sellPercentage(index)}%</p>
        <p id="phase-status" class="text-xs font-semibold uppercase rounded-full bg-red-500 px-2 m-1 text-red-100">${data.isProfit(index)}</p>
      </div>
      <div class="flex pb-2">
        <input id="phase-input" type="number" value="${data.sells[index]}" class="pl-1 bg-transparent focus:outline-none text-gray-900 border-b-2 border-gray-400 hover:border-blue-300 focus:border-blue-500 mx-1 flex-grow w-1" placeholder="Tahap Penjualan">
        <button id="phase-delete-btn" class="mx-1 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current w-6 text-gray-400 hover:text-red-500 -mt-1">
            <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/>
          </svg>
        </button>
      </div>
    </li>`
  phaseList.appendChild(li);
}

const renderList = () => {
  phaseList.innerHTML = '';
  data.sells.forEach((sellItem, index) => phaseCreator(index));
  eventAttacher();
  updateChart();
}

const addPhase = () => {
  data.sells.push('');
  renderList();
  updateChart();
  $$('#phase-input')[$$('#phase-input').length - 1].focus();
}

const removePhase = index => {
  data.sells.splice(index, 1);
  renderList();
  updateChart();
}

const phaseUpdate = index => {
  data.sells[index] = $$('#phase-input')[index].value;
  $$('#sell-percentage')[index].innerHTML = data.sellPercentage(index) + '%';
  $$('#phase-status')[index].innerHTML = data.isProfit(index);
  updateChart();
}

const eventAttacher = () => {
  $$('#phase-input').forEach((phaseInput, index) => phaseInput.addEventListener('input', () => phaseUpdate(index)));
  $$('#phase-input').forEach((phaseInput, index) => phaseInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
      addPhase();
    }
  }));
  $$('#phase-delete-btn').forEach((deleteBtn, index) => deleteBtn.addEventListener('click', () => removePhase(index)));
  updateChart();
}

addPhaseBtn.addEventListener('click', addPhase)

const bepUpdate = () => {
  $('#bep-unit').value = data.bep();
  $('#bep-nominal').value = data.bep() * data.price;
  updateChart();
}

const fixedCostUpdate = () => {
  data.fixedCost = fixedCostInput.value;
  bepUpdate();
  updateChart();
};

const variableCostUpdate = () => {
  data.variableCost = variableCostInput.value;
  bepUpdate();
  updateChart();
}
const productPriceUpdate = () => {
  data.price = productPriceInput.value;
  bepUpdate();
  updateChart();
}


const productionCapacityUpdate = () => {
  data.productionCapacity = productionCapacityInput.value;
  bepUpdate();
  updateChart();
}

fixedCostInput.addEventListener('input', fixedCostUpdate)
variableCostInput.addEventListener('input', variableCostUpdate);
productPriceInput.addEventListener('input', productPriceUpdate);
productionCapacityInput.addEventListener('input', productionCapacityUpdate);

renderList();