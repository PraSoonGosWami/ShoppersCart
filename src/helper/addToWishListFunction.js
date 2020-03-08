import Axios from "../AxiosInstance";
import dataModel from "./dataModel";

const addToWishListFunction = (contextValue, setAdding, product, addToast) => {
    //storing current wishlist to database if user is logged in
    if(contextValue.isLoggedIn){
        //send data to database
        setAdding(true)
        const data = dataModel(product)
        const url = `/wishlist/${contextValue.user.uid}/${contextValue.user.uid+product.id}.json`
        Axios.put(url,data)
            .then(response=>{
                setAdding(false)
                addToast("Product successfully added to your wish list!" , {
                    appearance: 'success',
                    autoDismiss: true,
                })

            })
            .catch(error=>{
                setAdding(false)
                addToast("Something went wrong!Please try again", {
                    appearance: 'error',
                    autoDismiss: true,
                })
            })
    }
}

export default addToWishListFunction
