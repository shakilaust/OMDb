import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LinkIcon from '@material-ui/icons/Link';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const CardView = ({intemInfo, onClickBookMark, showLink=true}) => {
  const history = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOnClickBookMark = intemInfo => {
    if(onClickBookMark) onClickBookMark(intemInfo);
  };

  const openLinkNewTab = intemInfo => {
    let url = `/omdb/${intemInfo.Type}/${intemInfo.imdbID}`;
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  };

  return (
    <Card className={classes.root} raised>
      <CardHeader
        title={intemInfo && intemInfo.title}
        subheader={moment(intemInfo && intemInfo.Year).format('llll')}
      />
      <CardMedia
        className={classes.media}
        image={intemInfo && intemInfo.Poster ? intemInfo.Poster : ""}
        title=""
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {intemInfo && intemInfo.Title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => handleOnClickBookMark(intemInfo)}>
          <FavoriteIcon />
        </IconButton>
        {showLink &&  <IconButton aria-label="share" onClick={() => openLinkNewTab(intemInfo)}>
          <LinkIcon />
        </IconButton>}
       
   
      </CardActions>
      
    </Card>
  );
}

export default CardView;
