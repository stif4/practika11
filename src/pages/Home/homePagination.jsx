import React from 'react'
import style from './homepagination.module.scss'

export const Pagination = ({postsPage,totalPosts,pagination})=>{
    const pageNumber =[]

    for (let i=1;i<= Math.ceil(totalPosts / postsPage);i++){
        pageNumber.push(i)
    }

    return(
        <div>
            <ul className={style.pagination}>
                {
                    pageNumber.map(number=>(
                        <li className={style.page_item} key={number}>
                            <a href="#" onClick={()=>pagination(number)} className={style.page_link}>
                                {number}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
