import React, { useEffect, useState } from "react";

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Card from "../../components/Card";

import BeasiswaIcon from "../../assets/home/Beasiswa.svg"
import bookIcon from "../../assets/book.png"
import movieIcon from "../../assets/movie.png"
import healthIcon from "../../assets/health.png"
import noodles from "../../assets/noodles.png"
import star from "../../assets/star.png"
import searchIcon from "../../assets/searchicon.svg"
import axios from "axios";

import { Link } from "react-router-dom";

import './style.scss'

export default function Beasiswa () {
    const [beasiswa, setBeasiswa] = useState([])

    const loadBeasiswa = async () => {
        try {
            const response = await axios.get('/api/v1/event?model=2')
            setBeasiswa(response.data.data)
        } catch (e) {
            console.log(e)
        }
    }
    const filter = (kategori, tipe, terbaru, price) => {
        let filtered = [...beasiswa]
        if (kategori === 'default' && tipe === 'default' && terbaru === 'default' && price === 'default') {
            
            return filtered.reverse()
        }
       
        if (kategori !== 'default') {
            filtered = filtered.filter((item) => item.category_id === kategori)
        }
        if (tipe !== 'default') {
            filtered = filtered.filter((item) => item.type_event_id === tipe)
        }

        if (terbaru === 'terlama') {
            let rev = []
            for (let i = 0; i < filtered.length; i++) {
                rev.push(filtered[i])
            }
            
            filtered = [...rev]
        }
        
        if (terbaru === 'default') {
        
            let rev = []
            for (let i = filtered.length - 1; i >= 0 ; i--) {
                rev.push(filtered[i])
            }
            
          
            filtered = [...rev]
        }

      
        if (price === 'ascending') {
           
            filtered = filtered.sort(function(a, b) {
                return parseFloat(a.price) - parseFloat(b.price);
            });
        }
        if (price === 'descending') {
           
            filtered = filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }
        return filtered
    }

    const [kategori, setKategori] = useState('default')
    const [terbaru, setTerbaru] = useState('default')
    const [tipe, setTipe] = useState('default')
    const [price, setPrice] = useState('default')

    const filteredData = filter(kategori,tipe,terbaru,price);

    useEffect(() => {
        loadBeasiswa()
    }, [])

   
    const displayCategory = () => {
        if (kategori === 'default') {
            return (<h4 className="my-3">Menampilkan Kategori: Semua</h4>)
        } else if (kategori === 1) {
            return (<h4 className="my-3">Menampilkan Kategori: Pendidikan</h4>)
        } else if (kategori === 2) {
            return (<h4 className="my-3">Menampilkan Kategori: Hiburan</h4>)
        } else if (kategori === 3) {
            return (<h4 className="my-3">Menampilkan Kategori: Kesehatan</h4>)
        } else if (kategori === 4) {
            return (<h4 className="my-3">Menampilkan Kategori: Kuliner</h4>)
        }
    }
    
    const [query, setQuery] = useState('')

    const handleQuery = (e) => {
        setQuery(e.target.value)
    }
   

    const [searchData, setSearch] = useState([])

    const search = async () => {
        try {
            let q
            if (query.trim().length !== 0) {
                q = query
            } else {
                q = null
            }
            const response = await axios.get(`/api/v1/event?search=${q}`)
        

             setSearch(response.data?.data)
             if (response.data.data === undefined) {
                setSearch([])
            }
        } catch (e) {
            console.log(e)
        }
    }

    const [catButton, setCatButton] = useState('all')

    let allBtn
    let eduBtn
    let entBtn
    let heaBtn
    let kulBtn

    if (catButton === 'all') {
        allBtn = 'cat-btn-active'
        eduBtn = 'cat-btn-inactive'
        entBtn = 'cat-btn-inactive'
        heaBtn = 'cat-btn-inactive'
        kulBtn = 'cat-btn-inactive'
    } else if (catButton === 'eduBtn') {
        allBtn = 'cat-btn-inactive'
        eduBtn = 'cat-btn-active'
        entBtn = 'cat-btn-inactive'
        heaBtn = 'cat-btn-inactive'
        kulBtn = 'cat-btn-inactive'
    } else if (catButton === 'entBtn') {
        allBtn = 'cat-btn-inactive'
        eduBtn = 'cat-btn-inactive'
        entBtn = 'cat-btn-active'
        heaBtn = 'cat-btn-inactive'
        kulBtn = 'cat-btn-inactive'
    } else if (catButton === 'heaBtn') {
        allBtn = 'cat-btn-inactive'
        eduBtn = 'cat-btn-inactive'
        entBtn = 'cat-btn-inactive'
        heaBtn = 'cat-btn-active'
        kulBtn = 'cat-btn-inactive'
    } else if (catButton === 'kulBtn') {
        allBtn = 'cat-btn-inactive'
        eduBtn = 'cat-btn-inactive'
        entBtn = 'cat-btn-inactive'
        heaBtn = 'cat-btn-inactive'
        kulBtn = 'cat-btn-active'
    }

    useEffect(() => {
        search()
    }, [query])

    const [placeHolderTerbaru, setplaceHolderTerbaru] = useState('Terbaru')
    const [placeHolderTipe, setplaceHolderTipe] = useState('Default')
    const [placeHolderHarga, setplaceHolderHarga] = useState('Default')

    const [currentPage, setCurr] = useState(1)
    const [itemPerPages, setItemPerPages] = useState(18)
    
    const handlePageClicked = (e) => {
        setCurr(e.target.id)
    }
    const handlePrevBtn = () => {
        if (currentPage > 1){
            const curr = currentPage - 1
            setCurr(curr)
        } 
    }
    const handleNextBtn = () => {
        if (currentPage < pageNumber.length){
            const curr = currentPage + 1
            setCurr(curr)
        } 
    }

    const indexLastItem = currentPage * itemPerPages
    const indexFirstItem = indexLastItem - itemPerPages
    const currentItem = filteredData.slice(indexFirstItem, indexLastItem)
    

    const pageNumber = [];
    
    for (let i = 1; i <= Math.ceil(filteredData.length / itemPerPages); i++) {
        pageNumber.push(i);
    }

    return (
        <div className="position-relative">
            <Navbar />
            <div className="container">
                <div className="row d-flex flex-row">
                    <div className="col-6">
                        <h1>Event Beasiswa</h1>
                        <p>Menawarkan informasi untuk menemukan beasiswa yang kamu inginkan.</p>
                    </div>
                    <div className="col-6">
                        <img src={BeasiswaIcon} width="400px" className="img-fluid rounded d-block mx-auto"/>
                    </div>
                </div>
            </div>
            <div className="bg-light position-relative">
                <div className="d-flex justify-content-center py-2 position-relative">
                    <div className="search-section position-relative" style={{width: "500px"}}>
                        <div className="d-flex flex-row gap-2 position-relative">
                            <input type="text" className="form-control" placeholder="Search Event" onChange={handleQuery} />
                            <img className="icon-search" src={searchIcon}/>
                        </div>
                      
                        <div className="list-result container">
                            <div className="d-flex gap-2 p-2 flex-column">
                               
                                {
                                    searchData.length > 0 && 
                                        searchData.map((item, index) => (
                                            <Link to={`/event/seminar/${item.id}`} key={index}>
                                                <div className="list-item-result py-1 rounded">
                                                    <span>{item.title}</span>
                                                </div>
                                            </Link>
                                        ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h3 className="mb-5">Kategori</h3>
                <div className="d-flex justify-content-around">
                    
                    <div className={`${allBtn} kategori d-flex p-2 border rounded align-items-center`} onClick={() => {setKategori('default'); setCatButton('all')}}>
                        <div className={`d-flex flex-column`} >
                            <img src={star} width="70px" height="70px" className="d-block mx-auto"/>
                            <p className="mt-2 text-center">All</p>
                        </div>
                    </div>

                    <div className={`${eduBtn} kategori d-flex p-2 border rounded align-items-center`} onClick={() => {setKategori(1); setCatButton('eduBtn')}}>
                        <div className={`d-flex flex-column`}>
                            <img src={bookIcon} width="70px" height="70px" className="d-block mx-auto"/>
                            <p className="mt-2 text-center">Pendidikan</p>
                        </div>
                    </div>
                    <div className={`${entBtn} kategori d-flex p-2 border rounded align-items-center`} onClick={() => {setKategori(2); setCatButton('entBtn')}}>
                        <div className={`d-flex flex-column`}>
                            <img src={movieIcon} width="70px" height="70px" className="d-block mx-auto"/>
                            <p className="mt-2 text-center">Hiburan</p>
                        </div>
                    </div>
                    <div className={`${heaBtn} kategori d-flex p-2 border rounded align-items-center`} onClick={() => {setKategori(3); setCatButton('heaBtn')}}>
                        <div className={`d-flex flex-column`}>
                            <img src={healthIcon} width="70px" height="70px" className="d-block mx-auto"/>
                            <p className="mt-2 text-center">Kesehatan</p>
                        </div>
                    </div>
                    <div className={`${kulBtn} kategori d-flex p-2 border rounded align-items-center`} onClick={() => {setKategori(4); setCatButton('kulBtn')}}>
                        <div className={`d-flex flex-column`}>
                            <img src={noodles} width="70px" height="70px" className="d-block mx-auto"/>
                            <p className="mt-2 text-center">Kuliner</p>
                        </div>
                    </div>
                </div>
                {displayCategory()}
                <div className="d-flex flex-column mb-3">
                    <div>
                        <h3>Sort</h3>
                        <button className="btn btn-outline-success" onClick={() => {setTerbaru('default'); setTipe('default'); setPrice('default')}}>Reset</button>
                    </div>
                    <div className="d-flex gap-5">

                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="text-center">Tanggal Ditambahkan</h6>
                            <div className="dropdown">
                                <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {placeHolderTerbaru}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><button className="dropdown-item" onClick={() => {setTerbaru('default'); setplaceHolderTerbaru('Terbaru')}}>Terbaru</button></li>
                                    <li><button className="dropdown-item" onClick={() => {setTerbaru('terlama'); setplaceHolderTerbaru('terlama')}}>Terlama</button></li>
                                </ul>
                            </div>
                        </div>

                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="text-center">Tipe Seminar</h6>
                            <div className="dropdown">
                                <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {placeHolderTipe}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><button className="dropdown-item" onClick={() => {setTipe('default'); setplaceHolderTipe('Default')}}>Default</button></li>
                                    <li><button className="dropdown-item" onClick={() => {setTipe(1); setplaceHolderTipe('Online')}}>Online</button></li>
                                    <li><button className="dropdown-item" onClick={() => {setTipe(2); setplaceHolderTipe('Offline')}}>Offline</button></li>
                                </ul>
                            </div>
                        </div>

                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="text-center">Harga</h6>
                            <div className="dropdown">
                                <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {placeHolderHarga}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><button className="dropdown-item" onClick={() => {setPrice('default'); setplaceHolderHarga('Default')}}>Default</button></li>
                                    <li><button className="dropdown-item" onClick={() => {setPrice('ascending'); setplaceHolderHarga('Harga terendah')}}>Harga terendah</button></li>
                                    <li><button className="dropdown-item" onClick={() => {setPrice('descending'); setplaceHolderHarga('Harga tertinggi')}}>Harga tertinggi</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-wrap gap-3">
                    {
                        currentItem.length > 0 && 
                            currentItem.map((item, index) => (
                                <Card banner={item.banner_img} id={item.id} price={item.price} title={item.title} key={index} model={'beasiswa'} />
                            ))
                    }
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <ul className="pagination d-flex gap-2 ">
                        <li className="page-item btn-prev page-link border border-dark rounded" onClick={handlePrevBtn}>Previous</li>
                        {
                            pageNumber.map((number, idx) => {
                               if (number === parseInt(currentPage)) {
                                return (<li className="pgn-active page-item btn-prev page-link border border-dark rounded" id={number} onClick={handlePageClicked} key={idx}>{number}</li>)
                               } 
                               return (<li className="page-item btn-prev page-link border border-dark rounded" id={number} onClick={handlePageClicked} key={idx}>{number}</li>
                            )})
                        }
                        <li className="page-item btn-prev page-link border border-dark rounded" onClick={handleNextBtn}>Next</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    )
}