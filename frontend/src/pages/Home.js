import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      < CategoryList />
      <BannerProduct />

      <HorizontalCardProduct category={"literature-books"}  heading={"Sách bán chạy"}/>

      <HorizontalCardProduct category={"romance-books"}  heading={"Sách Ngôn Tình"}/>
      
      < VerticalCardProduct category={"literature-books"}  heading={"Sách Văn Học"}/>
      < VerticalCardProduct category={"economics-books"}  heading={"Sách Kinh Tế"}/>
      < VerticalCardProduct category={"science-books"}  heading={"Sách Khoa Học"}/>
      < VerticalCardProduct category={"art-books"}  heading={"Sách Nghệ Thuật"}/>


    </div>
  )
}

export default Home