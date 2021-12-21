import Navigation from "./Navigation";
import { Carousel } from "react-bootstrap";
import styles from "../Styles/home.module.css";
import bg from "../tiny.png"
const Home=()=>{
return( 
  <div> 
    <div className={styles.main}>    
             <Navigation/>
    <br/><br/><br/>
             <div className={styles.IconSize} style={{width:"100px",backgroundSize:"cover",height:"150px",float:"right",backgroundRepeat:"no-repeat",backgroundImage:`url(${bg})`}}>
</div>
             <div className={styles.c1}>
<Carousel >
              <Carousel.Item interval={1500}>
                <img
                className={styles.H}
             src="https://images.pexels.com/photos/6214452/pexels-photo-6214452.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"   alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <img
                              className={styles.H}

                  src="https://acquireconvert.com/wp-content/uploads/2016/10/image01-1.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <img
                                className={styles.H}

                  src="https://images.pexels.com/photos/4049793/pexels-photo-4049793.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <img                 className={styles.H}

            src="https://images.unsplash.com/photo-1487700160041-babef9c3cb55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <img                 className={styles.H}

             src="https://media.istockphoto.com/photos/coin-in-mini-shopping-cart-on-table-for-work-and-laptop-for-work-to-picture-id993618778?k=20&m=993618778&s=612x612&w=0&h=eIbeaY45RWHJfh8a8STlPlI6KyM55VQkffXG2apFbqE="/>
                  </Carousel.Item>
                  <Carousel.Item interval={1500}>
                <img                 className={styles.H}

             src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dG95c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"/>
                  </Carousel.Item>
    </Carousel>
    </div>
    </div>
    </div> 
);




}
export default Home