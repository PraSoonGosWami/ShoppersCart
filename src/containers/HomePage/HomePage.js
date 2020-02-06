import React, {Component} from 'react'
import Categories from '../../components/categories/categories'
import Showcase from '../../components/showcase/showcase'
import Carousel from "nuka-carousel";
import Style from './HomePage.module.css'
import {withRouter} from "react-router";
import ViewAllIcon from '../../components/categories/all category img.png'
import img from './iphone-x-plus-2018.png'
import axios from '../../AxiosInstance'
import logo from "../../ui/logo/logo";

class HomePage extends Component {
    state = {
        categories: null,
        showcase: null
    }

    componentDidMount() {
        //getting categories
        axios.get("/categories.json")
            .then((response) => {
                this.setState({categories: response.data})
            })
            .catch((error) => console.log(error))

        //getting showcase
        axios.get("/showcase.json")
            .then((response) => this.setState({showcase: response.data}))


    }


    render() {
        let categories = null
        let showcase = null
        if (this.state.categories)
            categories = Object.keys(this.state.categories)
                .map((obj) => {
                    return (
                        <Categories
                            key={obj}
                            catName={this.state.categories[obj].catName}
                            catImg={this.state.categories[obj].catImg}
                            catId={this.state.categories[obj].catId}
                        />
                    )
                })

        if (this.state.showcase)
            showcase = Object.keys(this.state.showcase)
                .map((id) => {
                    return (
                        <Showcase
                            key={id}
                            src={this.state.showcase[id].src}/>
                    )
                })

        return (
            <section>
                <div className={Style.HomeCategories}>
                    {categories}
                </div>
                <Carousel autoplay={true} wrapAround={true} autoplayInterval={2000}>
                    {showcase}
                </Carousel>



            </section>
        )
    }
}

export default withRouter(HomePage)
