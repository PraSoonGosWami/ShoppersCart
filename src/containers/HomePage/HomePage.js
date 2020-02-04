import React, {Component} from 'react'
import Categories from '../../components/categories/categories'
import Style from './HomePage.module.css'
import {withRouter} from "react-router";

class HomePage extends Component {
    state = {
        categories: [
            {
                catId: "c001",
                catName: "Phones & Accessories",
                catImg: "https://media.istockphoto.com/photos/school-supplies-on-green-background-picture-id829436690?k=6&m=829436690&s=612x612&w=0&h=H8q33NGT04SERD5VO06rOuGh-LcdemPvmKwA8UQez0c="
            },
            {
                catId: "c002",
                catName: "Laptops & Computers",
                catImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSF8hWG06yXLbcbFN4k4BOhmsBGLnvTi2FRSXViVtTTewQ9A91s"
            },
            {
                catId: "c003",
                catName: "Home & Appliances",
                catImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSpfI7Wu6O5CqHqlW4MGaJmdGqH5FWKr4W_Z5PFjvp_Lqx--hQp"
            },
            {
                catId: "c004",
                catName: "Fashion & Clothing",
                catImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcScElciOdWKZFW5G_-2xj_UrQOnuAGpwKNbNB2Lkm5hXBIRwz7R"
            },
            {
                catId: "c005",
                catName: "Furniture",
                catImg: "data:image/jpeg;base64,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"
            }
        ]
    }

    onCategoryClickHandler = (id) => (
        console.log(id)
    )

    render() {
        const categories = this.state.categories.map((obj) => {
            return (
                <Categories
                    key={obj.catId}
                    catName={obj.catName}
                    catImg={obj.catImg}
                    clicked={()=> (this.onCategoryClickHandler(obj.catId))}/>
            )

        })
        console.log(this.props)
        return (
            <section>
                <div className={Style.HomeCategories}>
                    {categories}
                </div>
            </section>
        )
    }
}

export default withRouter(HomePage)