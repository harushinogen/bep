const deadactivateTabs = function(){
  $$("#tab").forEach((tab, index) => {
    tab.className = "hover:bg-gray-100 hover:border-gray-100 px-5 border-b-4 border-white focus:outline-none text-blue-800 z-10";
    $$("#tab-content")[index].className = "w-full h-screen flex-col sm:flex-row hidden";
  })
}

const activateTab = function(index){
  $$("#tab")[index].className = "px-5 border-b-4 border-blue-600 focus:outline-none text-blue-700 z-10";
  $$("#tab-content")[index].className = "w-full h-screen flex flex-col";
  if (index === 0) $$("#tab-content")[index].className += " sm:flex-row";
  if (index === 2) $$("#tab-content")[index].className = "w-full pt-16 pb-6 h-screen flex flex-col sm:flex-row";
}

$$("#tab").forEach((tab, index) => {
  tab.addEventListener('click', () => {
    deadactivateTabs();
    activateTab(index);
  })
})

// $("#show-table-1").addEventListener('click', function(e){
//   $("#show-table-1").classList.toggle('down');
//   tabelModalTetap.classList.toggle('hidden');
// })

// $("#show-table-2").addEventListener('click', function(e){
//   $("#show-table-2").classList.toggle('down');
//   tabelModalKerja.classList.toggle('hidden');
// })


