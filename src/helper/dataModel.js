
const dataModel = (product) => {
    const data = {
        name:product.name,
        catName:product.catName,
        id: product.id,
        cid: product.category,
        price: "₹"+Math.round(product.price - ((product.price) * (product.discount / 100)))
            .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        img:product.url,
        originalPrice:product.price,
        discount:product.discount,
        discountedPrice:Math.round((product.price) * (product.discount / 100))
    }
    return data
}

export default dataModel
