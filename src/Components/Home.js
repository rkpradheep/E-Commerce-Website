import Navigation from "./Navigation";
import { Carousel } from "react-bootstrap";
import styles from "../Styles/home.module.css";
import bg from "../tiny.png"
import C1 from "../C1.jpeg"
import C2 from "../C2.jpg"
import C3 from "../C3.jpeg"
import C4 from "../C4.jpg"
import C5 from "../C5.jpg"
import C6 from "../C6.jpg"

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
                <img className={styles.H}  src={C3}   alt="First slide"/>
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <img className={styles.H} src={C2} alt="Second slide"/>
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <img className={styles.H} src={C1}    alt="Third slide"/>
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <img className={styles.H} src={C4}    alt="Fourth slide"/>
              </Carousel.Item>
              <Carousel.Item interval={1500}>
                <img className={styles.H} src={C5} alt="Fifth slide" />
                  </Carousel.Item>
                  <Carousel.Item interval={1500}>
                <img src={C6} className={styles.H} alt="Sixth slide" />
                                  </Carousel.Item>
    </Carousel>
    </div>
    </div>
    </div> 
);




}
export default Home