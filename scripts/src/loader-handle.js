//Handling loader for every request
function loaderHandle(func) {
  const loader = document.querySelector(".loader-wrapper");
  loader.style.display = "block";
  setTimeout(() => {
    loader.style.display = "none";
    func();
  }, 3000);
}

export default loaderHandle;