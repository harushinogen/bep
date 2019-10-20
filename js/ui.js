const deadactivateTabs = function(){
  $$("#tab").forEach((tab, index) => {
    tab.className = "px-5 border-b-4 hover:bg-blue-400 hover:border-blue-400 hover:text-white border-blue-500 focus:outline-none text-blue-100 z-10";
    $$("#tab-content")[index].className = "w-full h-screen flex-col sm:flex-row hidden";
  })
}

const activateTab = function(index){
  $$("#tab")[index].className = "px-5 border-b-4 border-white focus:outline-none text-white z-10";
  $$("#tab-content")[index].className = "h-full flex flex-col max-h-full overflow-auto";
  if (index === 0) $$("#tab-content")[index].className += " sm:flex-row";
  if (index === 2) $$("#tab-content")[index].className = "w-full pt-2 pb-6 h-screen flex flex-col sm:flex-row overflow-auto";
}

$$("#tab").forEach((tab, index) => {
  tab.addEventListener('click', () => {
    deadactivateTabs();
    activateTab(index);
  });
  $$("#drop-item")[index].addEventListener('click', () => {
    deadactivateTabs();
    activateTab(index);
  })
})

$('#toggle-tahap').addEventListener('click', function (e) {
  $('#tahap-penjualan').classList.toggle('sm:-ml-64');
  $('#arrow-tahap').classList.toggle('left');
  $('#arrow-tahap').classList.toggle('right');
  $('#toggle-tahap').classList.toggle('-mr-8');
  $('#toggle-tahap').classList.toggle('border-r');
  $('#main').classList.toggle('ml-4');
})

const updateForms = function () {
  fixedCostInput.value = data.totalFixedCost();
  variableCostInput.value = data.totalVariableCost();
  data.fixedCost = data.totalFixedCost();
  data.variableCost = data.totalVariableCost();
  updateChart();
}

const firstModalToggle = function () {
  if ($('#slide-yeah').classList.contains('md:-m-r-1/2')){
    $('#modal-fixed').classList.toggle('hidden');
    setTimeout(() => $('#slide-yeah').classList.toggle('md:-m-r-1/2'), 100)
  } else {
    $('#slide-yeah').classList.toggle('md:-m-r-1/2');
    setTimeout(() => $('#modal-fixed').classList.toggle('hidden'), 600);
  }
  updateForms();
}
  
  let pointer = {
  variable: data.fixedCostItems,
  idToAssign: "fixed-cost-item",
  targetRender: $("#fixed-cost-item-list"),
  isFixed: true
};

const updateTotal = function () {
  $('#total').innerHTML = pointer.isFixed ? data.totalFixedCost() : data.totalVariableCost();
  data.fixedCost = data.totalFixedCost();
  data.variableCost = data.totalVariableCost();
}

const switchTabs = function (index) {
  $$('#tab-modal')[0].className = "btn hover:bg-gray-100 border-b-4 hover:border-gray-100 border-white px-2";    
  $$('#tab-modal')[1].className = "btn hover:bg-gray-100 border-b-4 hover:border-gray-100 border-white px-2";
  $$('#tab-modal')[index].className = "btn text-blue-700 border-b-4 border-blue-500 px-2";
  $("#fixed-cost-item-list").classList.toggle('hidden');
  $("#variable-cost-item-list").classList.toggle('hidden');
  if (pointer.isFixed == true){
    pointer.variable = data.variableCostItems;
    pointer.idToAssign = "variable-cost-item";
    pointer.targetRender = $('#variable-cost-item-list');
  } else {
    pointer.variable = data.fixedCostItems;
    pointer.idToAssign = "fixed-cost-item";
    pointer.targetRender = $("#fixed-cost-item-list");
  }
  pointer.isFixed = !pointer.isFixed;
  updateTotal();
}

$$('#tab-modal')[0].addEventListener('click', () => switchTabs(0));
$$('#tab-modal')[1].addEventListener('click', () => switchTabs(1));

if (!navigator.doNotTrack) {
  const electron = require('electron');
  const { remote } = require('electron');
  const ipc = electron.ipcRenderer;

  $('#minimize').classList.toggle('hidden');
  $('#maximize').classList.toggle('hidden');
  $('#close-window').classList.toggle('hidden');
  $('#minimize').addEventListener('click', () => {
    remote.BrowserWindow.getFocusedWindow().minimize();
  })

  $('#maximize').addEventListener('click', () => {
    const window = remote.BrowserWindow.getFocusedWindow();
    window.isMaximized() ? window.unmaximize() : window.maximize();
  })

  $('#close-window').addEventListener('click', () => {
    remote.BrowserWindow.getFocusedWindow().close();
  })
}

