const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct = async (category) => {
    const categoryList = Array.isArray(category) ? category : [category]
  
    const response = await fetch(SummaryApi.categoryWiseProduct.url, {
      method: SummaryApi.categoryWiseProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: categoryList
      })
    })
  
    const dataResponse = await response.json()
  
    return dataResponse
  }
  
  export default fetchCategoryWiseProduct
  