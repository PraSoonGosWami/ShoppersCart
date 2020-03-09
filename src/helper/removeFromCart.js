import axiosInstance from "../AxiosInstance";

const removeFromCart = (id, contextValue, addToast, setAdding) => {

    setAdding(true)

    //cloning current cart value from context cart
    let cart = [...contextValue.cart]
    cart = cart.filter(i => i.id !== id);
    contextValue.setCart(cart)

    if(contextValue.isLoggedIn) {
        const url = `/cart/${contextValue.user.uid}/${contextValue.user.uid + id}.json`
        axiosInstance.delete(url)
            .then(response => {
                //alert("Product removed from cart")
                addToast("Product successfully removed from cart!", {
                    appearance: 'success',
                    autoDismiss: true
                })
                setAdding(false)
            })
            .catch(error=>{
                console.log(error)
                //alert("Error")

                addToast("Something went wrong!", {
                    appearance: 'error',
                    autoDismiss: true,
                })
                setAdding(false)
            })

    }else{
        //alert("Product added to cart")
        addToast("Product successfully removed from cart!", {
            appearance: 'success',
            autoDismiss: true,
        })
        setAdding(false)
    }
}

export default removeFromCart
