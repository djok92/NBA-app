//Setup table after/before event
function setupTable() {
  removeActiveClass(tables);
  clearTables(tables);
  goBackArrowHolder.style.display = "none";
}

export default setupTable;