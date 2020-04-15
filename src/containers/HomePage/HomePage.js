import React, {Component} from 'react'
import Categories from '../../components/categories/categories'
import Showcase from './HomePageProducts/showcase/showcase'
import Carousel from "nuka-carousel";
import Style from './HomePage.module.css'
import {withRouter} from "react-router";
import axios from '../../AxiosInstance'
import HomePageProducts from "./HomePageProducts/HomePageProducts";
import Spinner from '../../ui/spinner/spinner'
import AppFooter from "../../ui/AppFooter/AppFooter";


class HomePage extends Component {
    state = {
        categories: null,
        showcase: null,
        isCategoryLoading: true,
        isShowCaseLoading: true
    }

    componentDidMount() {
        //getting categories
        
        axios.get("/categories.json")
            .then((response) => {
                this.setState({categories: response.data})
                this.setState({isCategoryLoading: false})
            })
            .catch((error) => {
                console.log(error)
                this.setState({isCategoryLoading: false})
            })

        //getting showcase
        axios.get("/showcase.json")
            .then((response) => {
                this.setState({showcase: response.data})
                this.setState({isShowCaseLoading: false})
            })
            .catch(error => {
                console.log(error)
                this.setState({isShowCaseLoading: false})
            })

    }

    showcaseClickHandler = (url) => {
        //this.props.history.push(url)
    }

    render() {
        let spinner = <Spinner/>
        let categories = null
        let showcase = null
        let footer = null

        if(!this.state.isShowCaseLoading && !this.state.isCategoryLoading) {
            spinner = null

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
                showcase = (
                    <Carousel autoplay={true} wrapAround={true} autoplayInterval={2000}>
                        {Object.keys(this.state.showcase)
                            .map((id) => {
                                return (
                                    <Showcase
                                        key={id}
                                        onClick={() => this.showcaseClickHandler(this.state.showcase[id].url)}
                                        src={this.state.showcase[id].src}/>
                                )
                            })}
                    </Carousel>
                )

            footer = <AppFooter/>
        }


        return (
            <section >
                <div className={Style.HomeCategories}>
                    {categories}
                </div>
                {showcase}
                <HomePageProducts/>
                <div className={Style.Spinner}>
                    {spinner}
                </div>
                {footer}
            </section>
        )
    }
}

export default withRouter(HomePage)
