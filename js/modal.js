const generateFixedCostList = function (nama, harga, jumlah, total) {
  let li = document.createElement('li');
  li.innerHTML = `<button id="${pointer.idToAssign}" class="btn w-full">
        <div class="justify-between flex">
          <h3 class="text-2xl text-left text-purple-500">${nama}</h3>
          <h3 class="text-xl text-right leading-loose">Total: <span class="text-orange-500">Rp ${total},00</span></h3>
        </div>
        <div class="justify-between flex">
          <h3 class="text-left text-green-500">Rp ${harga},00</h3>
          <h3 class="text-right">Jumlah Barang: ${jumlah}</h3>
        </div></button>`;
  li.className = "py-2 flex-grow cursor-pointer border-gray-100 border-2 min-w-1/3 py-5 rounded-lg hover:shadow-lg px-2 m-2"
  pointer.targetRender.appendChild(li);
}

const getModalData = function () {
  return {
    namaBarang: $('#-nama').value,
    hargaBarang: $('#-harga').value,
    jumlahBarang: $('#-jumlah').value,
    total: function () {
      return this.hargaBarang * this.jumlahBarang;
    }
  }
}

const renderFixedCostList = function () {
  pointer.targetRender.innerHTML = "";
  pointer.variable.forEach((item, index) => {
    generateFixedCostList(item.namaBarang, item.hargaBarang, item.jumlahBarang, item.total());
  });
  updateTotal();
}

const fixedCostItemsUpdate = function (index = null, newData) {
  pointer.variable[index == null ? pointer.variable.length : index] = newData;
  renderFixedCostList();
  listItemAttacher();
}

const formValidation = function () {
  if (!$('#-nama').value == false && !$('#-harga').value == false && !$('#-jumlah').value == false) {
    $('#add-modal-confirmed').disabled = false;
    $('#-item-total').value = Number($('#-harga').value) * Number($('#-jumlah').value);
  } else {
    $('#add-modal-confirmed').disabled = true;
  }
}

const addModalToggle = function (index) {
  $('#add-modal').classList.toggle('hidden');
  if (index == null ) {
    $('#add-version').classList.toggle('hidden');
  } else {
    console.log(index);
    $('#edit-version').classList.toggle('hidden');
    $('#-nama').value = pointer.variable[index].namaBarang;
    $('#-harga').value = pointer.variable[index].hargaBarang;
    $('#-jumlah').value = pointer.variable[index].jumlahBarang;
    $('#-item-total').value = pointer.variable[index].total();
    $("#edit-modal-confirmed").onclick = () => {
      fixedCostItemsUpdate(index, getModalData());
      addModalToggle(index);
    };
    $("#edit-modal-canceled").onclick = () => addModalToggle(index);
    $("#edit-modal-deleted").onclick = () => {
      addModalToggle(index);
      pointer.variable.splice(index, 1);
      renderFixedCostList();
      listItemAttacher();
    };
  }
}

const listItemAttacher = function () {
  $$(`#${pointer.idToAssign}`).forEach((item, index) => {
    item.addEventListener('click', () => addModalToggle(index));
  });
}

$('#-nama').addEventListener('input', formValidation);
$('#-harga').addEventListener('input', formValidation);
$('#-jumlah').addEventListener('input', formValidation);
$('#add-modal-confirmed').addEventListener('click', () => fixedCostItemsUpdate(null, getModalData()))
$('#open-1st-modal').addEventListener('click', firstModalToggle);
$('#close-1st-modal').addEventListener('click', firstModalToggle);
$('#gray-area').addEventListener('click', firstModalToggle);
$('#add-modal-open').addEventListener('click', () => addModalToggle());
$('#add-modal-confirmed').addEventListener('click', () => addModalToggle());
$('#add-modal-canceled').addEventListener('click', () => addModalToggle());
$('#close-add-modal').addEventListener('click', () => addModalToggle());