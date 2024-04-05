import React from 'react'


function Footer() {
  return (
    <>
    <div className='footer'>
       <div><img src="./image.png" alt="" className="logo-img" /></div> 
       <ul className="footer-list-item">
            <li>About Us</li>
            <li>Projects</li>
            <li>Contact Us</li>
        </ul>
        <ul className='media' >
            <span>
                <img src="Facebook.svg" alt="" />
            </span>
            <span>
            <img src="Twitter.svg" alt="" />
            </span>
            <span>
            <img src="Instagram.svg" alt="" />
            </span>
        </ul>
       
    </div>
     <div className='copyright'>
     <p></p>
     <h2>© 024 by SmartChain Limited | All Rights Reserved</h2>
     </div>
     </>
  )
 
}

export default Footer