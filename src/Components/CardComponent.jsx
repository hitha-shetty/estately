import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';


function CardComponent({ img,text,link }) {

    const navigate = useNavigate()

    return (
        <>
            <Card sx={{ width: "40%" }}>
                <CardMedia
                    image={img}
                    sx={{ height: 200 }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:'grey',fontWeight:400}}>
                       {text}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" sx={{color:'var(--green)',border:'1px solid var(--green)'}}
                            onClick={()=>navigate(`/${link}`)}
                    >
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </>


    )
}

export default CardComponent

