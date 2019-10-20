const dataSave = {
  fixedCost:          data.fixedCost,
  variableCost:       data.variableCost,
  price:              data.price,
  productionCapacity: data.productionCapacity,
  sells:              data.sells,
  fixedCostItems:     data.fixedCostItems,
  variableCostItems:  data.variableCostItems,
  barangModalTetap:   tabel.barangModalTetap,
  barangModalKerja:   tabel.barangModalKerja,
  laba:               tabel.laba,
  jumlahProduk:       tabel.jumlahProduk,
}

if (!navigator.doNotTrack) {
  const fs = require("fs");
  const {app} = require('electron');
  const userPath = app.getPath('home');
}