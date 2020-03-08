import axios from '../AxiosInstance'
const addToCartFunction = (product, contextValue, addToast, setAdding ) => {

    setAdding(true)

    const matchedId = contextValue.cart.find(item => {
        return (item.id === product.id)
    })
    if(matchedId){
        setAdding(false)
        return addToast("Product already in cart!", {
            appearance: 'info',
            autoDismiss: true,
        })
    }
    contextValue.setCart(prevState => prevState.concat(product))
    //storing current cart to database if user is logged in
    if (contextValue.isLoggedIn) {
        //send data to backend
        const url = `/cart/${contextValue.user.uid}/${contextValue.user.uid + product.id}.json`
        axios.put(url,product)
            .then(response=>{
                //alert("Product added to cart")
                addToast("Product successfully added to your cart!", {
                    appearance: 'success',
                    autoDismiss: true,
                })
                setAdding(false)
            })
            .catch(error=>{
                addToast("Something went wrong! Please try again", {
                    appearance: 'error',
                    autoDismiss: true,
                })
                setAdding(false)
            })
    }else{
        addToast("Product successfully added to your cart!", {
            appearance: 'success',
            autoDismiss: true,
        })
    }


}

export default addToCartFunction
