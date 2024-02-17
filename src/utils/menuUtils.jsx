// Function to work with the search
export const handleSearch = (productSearch, setProductSearch, initialProductSearch) => {
  let inputSearch = document.getElementById("inputSearch").value.toLowerCase().trim();
  const contentSearch = document.getElementById("contentSearch");
    
  if (inputSearch === "") {
    setProductSearch(initialProductSearch);
    contentSearch.classList.add("hidden");
  } else {
    let filterSearch = productSearch.filter(item => {
      return item.name.toLowerCase().includes(inputSearch);
    });
    contentSearch.classList.remove("hidden");
    setProductSearch(filterSearch);
  }
}